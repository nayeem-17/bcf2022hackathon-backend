const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const jwt = require('jsonwebtoken');
const { isPasswordValid } = require('./authServices');

module.exports.login = async (req, res, next) => {
    const { login, password } = req.body;
    // Fetching userData from database 
    const userInfo = await prisma.admin.findFirst({
        where: {
            login: login
        }
    });

    if (!userInfo) {
        return res.status(404).json({
            "message": "user not found"
        })
    }
    const hashPass = userInfo.password;
    //  Add more info if needed
    const { id, name } = userInfo;

    if (hashPass && isPasswordValid(hashPass, password)) {
        req.body = {
            userId: id,
            name: name
        }
        next();
    } else {
        res.status(400).send({ errors: ['Invalid email or password'] });
    }
}

module.exports.isValidAdminJWTToken = (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const userData = jwt.decode(authorization[1], process.env.JWT_SECRET);
                //    add necessary data to request body. Here i added only userId
                req.body.userId = userData.userId;
                next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}
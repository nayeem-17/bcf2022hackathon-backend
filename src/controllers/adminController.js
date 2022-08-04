const { PrismaClient } = require('@prisma/client');
const { makeHash } = require('../authentication/authServices');
const prisma = new PrismaClient()

class AdminController {
    constructor () {}
    create = async (req, res, next) => {
        const { login, password } = req.body;
        if (!login || !password) {
            // the fields must be defined
            return res.status(400).json({
                message: "Login or password missing"
            })
        }
        // first check if user exists or not
        const data = await prisma.admin.findFirst({
            where: {
                login: login
            }
        });
        if (data) {
            return res.status(409).json({
                message: "User already exists"
            })
        }
        const result = await prisma.admin.create({
            data: {
                login: login,
                password: makeHash(password)
            }
        });

        return res.status(200).json({ id: result.id })
    }

}
module.exports = AdminController;

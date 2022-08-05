class IndexController {
    constructor () {}
    helloWorld = (req, res, next) => {
        res.json({ status: 'ok' });
    }

}
module.exports = IndexController;

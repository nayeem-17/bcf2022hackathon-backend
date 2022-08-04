class IndexController {
    constructor () {}
    helloWorld = (req, res, next) => {
        res.json({ title: 'Express' });
    }

}
module.exports = IndexController;

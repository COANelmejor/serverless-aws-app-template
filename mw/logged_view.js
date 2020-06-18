module.exports = function (req, res, next) {
    if (req.user == undefined) {
        res.redirect('/')
    } else {
        next();
    }
}
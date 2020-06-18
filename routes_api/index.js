module.exports = function (app) {
    app.use('/api/', require('./home'));
    app.use('/api/logout', require('./logout'));

}
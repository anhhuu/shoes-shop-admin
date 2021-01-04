module.exports.protectRequest = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect('/login');
}
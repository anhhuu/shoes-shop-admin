const passport = require('../../config/passport');

module.exports.index = async(req, res, next) => {
    res.render('index');
}

module.exports.getLoginPage = async(req, res, next) => {
    let a = +'234d'
    let b = +'f3';
    console.log(a, b);
    res.render('users/login', { layout: false });
}

module.exports.logout = async(req, res, next) => {
    req.logout();
    res.redirect('/login');
}

module.exports.login = async(req, res, next) => {
    passport.authenticate('local', async(err, user, info) => {
        if (err) {
            return next(err)
        } else if (!user) {
            console.log('message: ' + info.message);
            return res.redirect('/login')
        } else {
            req.logIn(user, async(err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(req.session.returnTo || '/');
                delete req.session.returnTo;
            });
        }
    })(req, res, next);
}
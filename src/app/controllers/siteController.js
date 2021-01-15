const passport = require('../../config/passport');
const productService = require('../models/services/productService');

module.exports.index = async (req, res, next) => {


    const topTenProducts =await productService.getTopTenProducts();
    res.render('index', {
        topTenProducts
    });

}

module.exports.getLoginPage = async (req, res, next) => {
    const message = req.query.message;
    res.render('users/login', {
        layout: false,
        options: {
            message
        }
    },);
}

module.exports.logout = async (req, res, next) => {
    req.logout();
    res.redirect('/login');
}

module.exports.login = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return next(err)
        } else if (!user) {
            console.log('message: ' + info.message);
            return res.redirect('/login')
        } else {
            req.logIn(user, async (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(req.session.returnTo || '/');
                delete req.session.returnTo;
            });
        }
    })(req, res, next);
}
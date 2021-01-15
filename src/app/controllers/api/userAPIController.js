const jwt = require('jsonwebtoken');
const { use } = require('passport');
const { sendMail } = require("../../../config/mailjet");
const userService = require("../../models/services/userService");


module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


module.exports.signup = async(req, res, next) => {

    try {
        const { first_name, last_name, password, username: email, phone_number, address } = req.body;
        const user = await userService.createUser({
            first_name,
            last_name,
            password,
            email,
            phone_number,
            address,
            avatar_image_url: '',
            role_name: process.env.ROLE_NAME
        });


        if (user) {
            const userEmail = user.email;

            const token = await jwt.sign({ email: userEmail }, process.env.JWT_SECRET, { expiresIn: '1h' }, );
            const link = `${process.env.WEB_URL}/users/verification/${token}`
            sendMail(link, userEmail, 'Activate your account', 'Verify account');

            res.json({
                message: 'An email has been sent to your email please check ' + email + '\'s ads mail inbox'
            })

        } else {
            res.status(404).json({

                message: 'Could not create user'
            })
        }

    } catch (e) {
        res.status(500).json({
            message: 'Cannot sign up'
        });
        console.log(e);
    }
}

module.exports.verification = async(req, res, next) => {

    try {

        const token = req.params.token;
        const decodedID = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.activateUser(decodedID.email);
        console.log(user);
        if (user) {
            res.redirect('/login?message='+ encodeURI('Your email is verified'));
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }

    } catch (e) {

        res.status(500).json({
            message: 'Token expired'
        });

    }

}

module.exports.checkAuthentication = async(req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

/*
exports.forgotPassword = async (req, res, next) => {
    try {
        const {email} = req.body;
        if (!email) {
            next();
        }
        const user = await userService.findUser(email);

        if (user) {
            const link = await userService.generateUserResetPasswordLink(user.email);
            sendMail(link, email, 'Reset your password', 'Click to reset');

            res.render('users/forgot-password', {
                title: 'Forgot password',
                pageName: "Forgot Password",
                options: {email, confirm: false}
            });

        } else {
            next();
        }

    } catch (e) {
        next();
    }

}


exports.resetPassword = async (req, res, next) => {

    try {
        const token = req.params.token;
        if (!token) return next();

        const decodedID = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedID.email) return next();

        const exists = await userService.checkExistUser(decodedID.email);
        if (!exists) {
            return next();
        }

        res.render('users/forgot-password', {
            title: 'Forgot password',
            pageName: 'Forgot Password',
            options: {
                email: decodedID.email,
                confirm: true,
                token
            }
        })


    } catch (e) {
        next();
    }

}

exports.postResetPassword = async (req, res, next) => {

    try {
        const {password, token} = req.body;

        if (!token || !password) return next();

        const {email} = await jwt.verify(token, process.env.JWT_SECRET);
        if (!email) return next();

        const user = await userService.updateUserPassword(email, password);


        if (user) {
            res.render('users/forgot-password', {
                title: 'Forgot password',
                pageName: 'Forgot Password',
                options: {
                    email,
                    confirm: true,
                    token,
                    message: 'Update password successfully'
                }
            });
        } else {
            res.render('users/forgot-password', {
                title: 'Forgot password',
                pageName: 'Forgot Password',
                options: {
                    email,
                    confirm: true,
                    message: 'An error occur',
                    hasError: true
                }
            });
        }


    } catch (e) {
        next();
    }

}

*/
const userService = require('../models/services/userService');

const multerImageUpload = require('../../config/multer');

module.exports.getProfilePage = async(req, res, next) => {
    const errsMsg = await req.consumeFlash('errors');
    const successesMsg = await req.consumeFlash('successes');

    res.render('users/profile', { errsMsg: errsMsg, successesMsg: successesMsg });
}

module.exports.update = async(req, res, next) => {
    multerImageUpload.single('avatar')(req, res, async(error) => {
        if (error) {
            await req.flash('errors', 'Cập nhật không thành công!');
        }
        let userObj = new Object();
        const bodyObject = req.body;
        userObj._id = req.user._id;
        userObj.first_name = bodyObject.first_name;
        userObj.last_name = bodyObject.last_name;
        userObj.phone_number = bodyObject.phone_number;
        userObj.address = bodyObject.address;
        if (req.file) {
            userObj.avatar_image_url = req.file.path;
        }
        try {
            await userService.update(userObj);
            await req.flash('successes', 'Cập nhật thành công!');
        } catch (error) {
            console.log(error);
            await req.flash('errors', 'Cập nhật không thành công!');
        }
        res.redirect('/users/profile');
    })
}

module.exports.changePassword = async(req, res, next) => {
    let userObj = new Object();
    userObj._id = req.user._id;
    userObj.old_password = req.body.old_password;
    userObj.new_password = req.body.new_password;
    try {
        if (await userService.updatePassword(userObj)) {
            await req.flash('successes', 'Cập nhật thành công!');
        } else {
            await req.flash('errors', 'Cập nhật mật khẩu không thành công, sai mật khẩu cũ!');
        }
    } catch (error) {
        console.log(error)
        await req.flash('errors', 'Cập nhật mật khẩu không thành công!');
    }
    res.redirect('/users/profile#password');
}
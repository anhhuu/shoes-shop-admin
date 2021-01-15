const User = require('../mongooseModels/userMongooseModel');
const bcrypt = require('bcryptjs');
const { hashString } = require("../../../utils/hasingPassword");

/**
 *
 * @param user
 * @returns {Promise<boolean>}
 */
module.exports.signup = async(user) => {
    try {
        const userObj = await User.findOne({ email: user.email });

        if (userObj) {
            return false;
        }

        const userResult = await User.create(user);

        if (userResult) {
            return true
        }
        return false;
    } catch (e) {
        return false;
    }

}

/**
 *
 * @param password
 * @returns {!Promise}
 */

module.exports.validPassword = (user, password) => {
    return bcrypt.compare(password, user.password);
}

module.exports.getUserProfile = (id) => {
    return User.findOne({ _id: id }).populate('role_id').lean();
}

module.exports.getList = async(page, limit) => {
    try {
        page = !page || page < 1 ? 1 : page;
        limit = !limit || limit < 10 ? 10 : limit;
        const users = await User.find({}, '-password').populate('role_id').skip(page * limit - limit).limit(limit).lean();
        const count = await User.find({}, '-password').populate('role_id').countDocuments();
        return {
            users,
            count
        }
    } catch (error) {
        throw error;
    }
}

module.exports.updateBlockedStatus = async(id, isBlocked) => {
    try {
        console.log(isBlocked)
        const user = await User.findById(id);
        await user.updateOne({
            isBlocked: isBlocked
        })
    } catch (error) {
        throw error;
    }
}

module.exports.update = async(userObj) => {
    try {
        const user = await User.findById(userObj._id);
        await user.updateOne({
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            phone_number: userObj.phone_number,
            address: userObj.address,
            avatar_image_url: !userObj.avatar_image_url ? user.avatar_image_url : userObj.avatar_image_url
        })

        console.log(user);
    } catch (error) {
        throw error;
    }
}

module.exports.updatePassword = async(userObj) => {
    try {
        const user = await User.findById(userObj._id);
        const auth = await bcrypt.compare(userObj.old_password, user.password);
        if (auth) {
            userObj.password = await hashString(10, userObj.new_password);
            console.log(userObj.password);
            await user.updateOne({
                password: userObj.password,
            })
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }

}

/**
 *
 * @param user
 * @returns {Promise<boolean>}
 */
module.exports.createUser = async(user) => {
    try {
        const userObj = await User.findOne({ email: user.email });

        if (userObj) {
            return false;
        }
        console.log('x');
        //console.log(user);

        let roleID = await Role.findOne({ name: user.role_name }).lean();
        roleID = roleID._id;
        console.log(user);
        delete user.role_name;
        const userResult = await User.create({...user, role_id: roleID });

        if (userResult) {
            return userResult
        }
        return undefined;
    } catch (e) {
        return undefined;
    }

}

/**
 *
 * @param user
 * @param password
 * @returns {Promise}
 */
module.exports.validPassword = (user, password) => {
    return bcrypt.compare(password, user.password);
}

/**
 *
 * @param id
 * @returns {Promise*}
 */
module.exports.getUserProfile = (id) => {
    return User.findOne({ _id: id }).lean();
}

/**
 *
 * @param lastName
 * @param firstName
 * @param email
 * @param phoneNumber
 * @param password
 * @param address
 * @param avatar_image_url
 * @returns {Promise<Query|void|Collection~findAndModifyWriteOpResultObject>}
 */
module.exports.updateUserProfile = async(lastName, firstName, email, phoneNumber, password, address, avatar_image_url) => {


    const hashedPassword = await hashString(10, password);
    return User.findOneAndUpdate({ email }, {
        last_name: lastName,
        first_name: firstName,
        phone_number: phoneNumber,
        password: hashedPassword,
        address,
        avatar_image_url,
        $set: { isModified: true }
    });
}

/**
 *
 * @param email
 * @returns {Query|void|Promise<Collection~findAndModifyWriteOpResultObject>}
 */
module.exports.activateUser = (email) => {
    return User.findOneAndUpdate({ email }, {
        active: true
    });
}

/**
 *  Update image avatar for user
 */
module.exports.updateUserImageUrl = (userEmail, imageUrl) => {
    return User.findOneAndUpdate({ email: userEmail }, {
        avatar_image_url: imageUrl
    });

}

/**
 * Find an user
 */
module.exports.findUser = (email) => {
    return User.findOne({ email }).lean();
}

/**
 * email: user mail
 * link for user for he or she reset password
 */
module.exports.generateUserResetPasswordLink = async(email) => {
    const token = await jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' }, );
    return `${process.env.WEB_URL}/users/reset-password/${token}`;

}

module.exports.checkExistUser = (email) => {
    return User.exists({ email });
}

module.exports.updateUserPassword = async(email, newPassword) => {
    const hashedPassword = await hashString(10, newPassword);
    return User.findOneAndUpdate({ email }, {
        password: hashedPassword
    });
}
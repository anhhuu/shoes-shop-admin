const User = require('../mongooseModels/userMongooseModel');
const bcrypt = require('bcryptjs');

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
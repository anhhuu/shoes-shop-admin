const roleMongooseModel = require('../mongooseModels/roleMongooseModel');

module.exports.getList = async() => {
    try {
        const roles = await roleMongooseModel.find().lean();
        return roles;
    } catch (error) {
        throw error;
    }
}

module.exports.getByID = async(id) => {
    try {
        const role = await roleMongooseModel.findById(id).lean();
        return role;
    } catch (error) {
        throw error;
    }
}
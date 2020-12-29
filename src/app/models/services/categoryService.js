const categoryMongooseModel = require('../mongooseModels/categoryMongooseModel');

module.exports.getAll = async(id) => {
    try {
        let categories = await categoryMongooseModel.find().lean();

        return categories;
    } catch (error) {
        throw error;
    }
}

module.exports.getByID = async(id) => {
    try {
        let category = await categoryMongooseModel.findOne({ _id: id }).lean();

        return category;
    } catch (error) {
        throw error;
    }
}

module.exports.getByName = async(name) => {
    try {
        let category = await categoryMongooseModel.findOne({ name: name }).lean();

        return category;
    } catch (error) {
        throw error;
    }
}

module.exports.save = async(categoryObject) => {
    try {
        let category = new categoryMongooseModel({
            name: categoryObject.name,
            category_url: categoryObject.category_url,
        });

        await category.save();

    } catch (error) {
        throw error;
    }
}
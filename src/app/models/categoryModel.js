const categoryMongooseModel = require('./mongooseModels/categoryMongooseModel');
const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongooseToObject')

module.exports.getAll = async(id) => {
    try {
        let categories = await categoryMongooseModel.find();
        if (categories) {
            categories = multipleMongooseToObject(categories);
        }

        return categories;
    } catch (error) {
        throw error;
    }
}

module.exports.getByID = async(id) => {
    try {
        let category = await categoryMongooseModel.findOne({ _id: id });
        if (category) {
            category = mongooseToObject(category);
        }

        return category;
    } catch (error) {
        throw error;
    }
}

module.exports.getByName = async(name) => {
    try {
        let category = await categoryMongooseModel.findOne({ name: name });
        if (category) {
            category = mongooseToObject(category);
        }

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
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
        return category;

    } catch (error) {
        throw error;
    }
}

module.exports.isExistByName = async(name) => {
    try {
        let category = await categoryMongooseModel.findOne({ name: name }).lean();
        if (category && !category.is_deleted) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports.isExistByURL = async(url) => {
    try {
        let category = await categoryMongooseModel.findOne({ category_url: url }).lean();
        if (category && !category.is_deleted) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports.updateInfo = async(categoryObject) => {
    try {
        let category = await categoryMongooseModel.findById(categoryObject._id);
        await category.update({
            name: categoryObject.name,
            category_url: categoryObject.category_url
        })
    } catch (error) {
        throw error;
    }

}
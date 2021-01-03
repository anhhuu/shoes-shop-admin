const brandMongooseModel = require('../mongooseModels/brandMongooseModel');

module.exports.getByID = async(id) => {
    try {
        let brand = await brandMongooseModel.findOne({ _id: id }).lean();

        return brand;
    } catch (error) {
        throw error;
    }
}

module.exports.getAll = async() => {
    try {
        let brands = await brandMongooseModel.find().lean();

        return brands;
    } catch (error) {
        throw error;
    }
}

module.exports.getByName = async(name) => {
    try {
        let brand = await brandMongooseModel.findOne({ name: name }).lean();

        return brand;
    } catch (error) {
        throw error;
    }
}

module.exports.isExistByName = async(name) => {
    try {
        let brand = await brandMongooseModel.findOne({ name: name }).lean();
        if (brand && !brand.is_deleted) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports.isExistByURL = async(url) => {
    try {
        let brand = await brandMongooseModel.findOne({ brand_url: url }).lean();
        if (brand && !brand.is_deleted) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports.save = async(brandObject) => {
    try {
        let brand = new brandMongooseModel({
            name: brandObject.name,
            brand_url: brandObject.brand_url,
            image_url: brandObject.image_url
        });

        await brand.save();
        return brand;

    } catch (error) {
        throw error;
    }
}

module.exports.updateInfo = async(brandObject) => {
    try {
        let brand = await brandMongooseModel.findById(brandObject._id);
        await brand.update({
            name: brandObject.name
        })
    } catch (error) {
        throw error;
    }

}
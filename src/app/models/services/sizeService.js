const { Schema } = require('mongoose');

const sizeMongooseModel = require('../mongooseModels/sizeMongooseModel');

module.exports.getByID = async(id) => {
    try {
        let size = await sizeMongooseModel.findOne({ _id: id }).lean();

        return size;
    } catch (error) {
        throw error;
    }
}

module.exports.getListByBrandID = async(brandId) => {
    try {
        let sizes = await sizeMongooseModel.find({ brand_id: brandId }).sort({ VN_size: 'asc' }).lean();

        return sizes;
    } catch (error) {
        throw error;
    }
}

module.exports.getByVNSize = async(VNSize) => {
    try {
        let size = await sizeMongooseModel.findOne({ VN_size: VNSize }).lean();

        return size;
    } catch (error) {
        throw error;
    }
}

module.exports.getByVNSizeAndBrandID = async(VNSize, brand_id) => {
    try {
        let size = await sizeMongooseModel.findOne({ VN_size: VNSize, brand_id: brand_id }).lean();

        return size;
    } catch (error) {
        throw error;
    }
}

module.exports.save = async(sizeObject) => {
    try {
        let size = new sizeMongooseModel({
            text: sizeObject.text,
            US_size: sizeObject.US_size,
            VN_size: sizeObject.VN_size,
            CM_size: sizeObject.CM_size,
            brand_id: sizeObject.brand_id,
        });

        await size.save();

    } catch (error) {
        throw error;
    }
}

module.exports.update = async(sizeObj) => {
    try {
        let size = await sizeMongooseModel.findById(sizeObj._id);
        await size.updateOne({
            is_deleted: sizeObj.is_deleted
        });
    } catch (error) {
        throw error;
    }
}

module.exports.isVNSizeWithBrandIdExist = async(VNSize, brand_id) => {
    try {
        let size = await sizeMongooseModel.findOne({ VN_size: VNSize, brand_id: brand_id }).lean();
        if (size && !size.is_deleted) {
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}

module.exports.isUSSizeWithBrandIdExist = async(USSize, brand_id) => {
    try {
        let size = await sizeMongooseModel.findOne({ US_size: USSize, brand_id: brand_id }).lean();
        if (size && !size.is_deleted) {
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}

module.exports.isCMSizeWithBrandIdExist = async(CMSize, brand_id) => {
    try {
        let size = await sizeMongooseModel.findOne({ CM_size: CMSize, brand_id: brand_id }).lean();
        if (size && !size.is_deleted) {
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}
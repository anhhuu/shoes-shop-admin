const sizeService = require('../../models/services/sizeService');
const brandService = require('../../models/services/brandService');
const categoryService = require('../../models/services/categoryService');
const productService = require('../../models/services/productService');
const sizeMongooseModel = require('../../models/mongooseModels/sizeMongooseModel');

module.exports.getSizes = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    let sizes = await sizeService.getListByBrandID(brand_id);
    sizes = sizes.filter(item => (!item.is_deleted || item.is_deleted == false))

    res.send(sizes);
};

module.exports.isVNSizeExist = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const VN_size = req.query.VN_size;

    const isExist = await sizeService.isVNSizeWithBrandIdExist(VN_size, brand_id);

    if (isExist) {
        return {
            is_exist: true
        }
    }
    return {
        is_exist: false
    }
}

module.exports.isUSSizeExist = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const US_size = req.query.US_size;

    const isExist = await sizeService.isUSSizeWithBrandIdExist(US_size, brand_id);

    if (isExist) {
        return {
            is_exist: true
        }
    }
    return {
        is_exist: false
    }
}

module.exports.isCMSizeExist = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const CM_size = req.query.CM_size;

    const isExist = await sizeService.isCMSizeWithBrandIdExist(CM_size, brand_id);

    if (isExist) {
        return {
            is_exist: true
        }
    }
    return {
        is_exist: false
    }
}
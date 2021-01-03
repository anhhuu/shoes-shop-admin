const sizeService = require('../../models/services/sizeService');
const brandService = require('../../models/services/brandService');
const categoryService = require('../../models/services/categoryService');
const productService = require('../../models/services/productService');

module.exports.isExistByName = async(req, res, next) => {
    const name = req.query.name;
    const isExist = await brandService.isExistByName(name);
    if (isExist) {
        res.send({
            is_exist: true
        })
        return;
    }
    res.send({
        is_exist: false
    })
}

module.exports.isExistByURL = async(req, res, next) => {
    const url = req.query.url;
    const isExist = await brandService.isExistByURL(url);
    if (isExist) {
        res.send({
            is_exist: true
        })
        return;
    }
    res.send({
        is_exist: false
    })
}
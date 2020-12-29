const brandModel = require('../models/brandModel');
const sizeModel = require('../models/sizeModel');
const productModel = require('../models/productModel');

module.exports.index = async(req, res, next) => {
    // Get products from model
    let brands = await brandModel.getAll();
    for (let i = 0; i < brands.length; i++) {
        brands[i].totalProduct = await productModel.getTotalProductByBrandID(brands[i]._id);
    }
    res.render('brands', { brands: brands });
};
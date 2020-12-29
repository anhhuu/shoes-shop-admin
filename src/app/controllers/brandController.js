const brandService = require('../models/services/brandService');
const sizeService = require('../models/services/sizeService');
const productService = require('../models/services/productService');

module.exports.index = async(req, res, next) => {
    // Get products from model
    let brands = await brandService.getAll();
    for (let i = 0; i < brands.length; i++) {
        brands[i].totalProduct = await productService.getTotalProductByBrandID(brands[i]._id);
    }
    res.render('brands/brandsShow', { brands: brands });
};

module.exports.editBrand = async(req, res, next) => {

}
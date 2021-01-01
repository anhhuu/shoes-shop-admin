const sizeService = require('../../models/services/sizeService');
const brandService = require('../../models/services/brandService');
const categoryService = require('../../models/services/categoryService');
const productService = require('../../models/services/productService');

module.exports.getSizes = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const sizes = await sizeService.getListByBrandID(brand_id);
    sizes = sizes.filter(item => (!item.is_deleted || item.is_deleted == false))
    res.render('products/sizesShowOnCreateProduct', { layout: false, sizes: sizes }, (err, html) => {
        res.send(html);
    })
};
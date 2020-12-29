const sizeService = require('../models/services/sizeService');
const brandService = require('../models/services/brandService');
const categoryService = require('../models/services/categoryService');
const productService = require('../models/services/productService');

module.exports.getSizes = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const sizes = await sizeService.getListByBrandID(brand_id);
    res.render('products/sizesShowOnCreateProduct', { layout: false, sizes: sizes }, (err, html) => {
        res.send(html);
    })
};

module.exports.getProductsWithFiltters = async(req, res, next) => {
    const brands = await brandService.getAll();
    const categories = await categoryService.getAll();

    let query = req.query;
    let fillterProductsData = await productService.fillterProducts(query);

    res.render('products/productsTableShow', { layout: false, products: fillterProductsData.products, brands: brands, categories: categories, query: query, count: fillterProductsData.count }, (err, html) => {
        res.send(html);
    })
};
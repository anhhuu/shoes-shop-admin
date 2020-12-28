const sizeModel = require('../models/sizeModel');
const brandModel = require('../models/brandModel');
const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');

module.exports.getSizes = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const sizes = await sizeModel.getListByBrandID(brand_id);
    res.render('ajaxPartials/sizesShowOnCreateProduct', { layout: false, sizes: sizes }, (err, html) => {
        res.send(html);
    })
};

module.exports.getProductsWithFiltters = async(req, res, next) => {
    const brands = await brandModel.getAll();
    const categories = await categoryModel.getAll();

    let query = req.query;
    let fillterProductsData = await productModel.fillterProducts(query);

    res.render('ajaxPartials/productsTableShow', { layout: false, products: fillterProductsData.products, brands: brands, categories: categories, query: query, count: fillterProductsData.count }, (err, html) => {
        res.send(html);
    })
};
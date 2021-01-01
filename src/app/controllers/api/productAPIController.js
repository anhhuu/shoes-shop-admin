const sizeService = require('../../models/services/sizeService');
const brandService = require('../../models/services/brandService');
const categoryService = require('../../models/services/categoryService');
const productService = require('../../models/services/productService');

module.exports.getProductsWithFilters = async(req, res, next) => {
    const brands = await brandService.getAll();
    const categories = await categoryService.getAll();

    let query = req.query;
    let filterProductsData = await productService.filterProducts(query);

    res.render('products/productsTableShow', { layout: false, products: filterProductsData.products, brands: brands, categories: categories, query: query, count: filterProductsData.count }, (err, html) => {
        res.send(html);
    })
};

module.exports.isExistInDeletedSizeList = async(req, res, next) => {
    let product = await productService.getByID(req.query.id);
    if (product.product_detail) {
        for (let i = 0; i < product.product_detail.length; i++) {
            if (String(product.product_detail[i].size_id) === String(req.query.size_id)) {
                res.send(product.product_detail[i]);
                return;
            }
        }
    }

    res.send('');
}
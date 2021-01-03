const brandService = require('../models/services/brandService');
const sizeService = require('../models/services/sizeService');
const productService = require('../models/services/productService');

const productMongooseModel = require('../models/mongooseModels/productMongooseModel');
const { ObjectID } = require('mongodb');

module.exports.index = async(req, res, next) => {
    // Get products from model
    let brands = await brandService.getAll();
    for (let i = 0; i < brands.length; i++) {
        brands[i].totalProduct = await productService.getTotalProductByBrandID(brands[i]._id);
    }
    res.render('brands/brandsShow', { brands: brands });
};

module.exports.editBrand = async(req, res, next) => {
    let brand_id = req.params.id;
    console.log(brand_id);
    let brand = await brandService.getByID(brand_id);
    brand.totalProduct = await productService.getTotalProductByBrandID(brand._id);

    let sizes = await sizeService.getListByBrandID(brand._id);
    sizes = sizes.filter(item => (!item.is_deleted || item.is_deleted == false))

    //console.log(sizes);

    res.render('brands/brandEdit', { brand: brand, sizes: sizes });
}

module.exports.updateBrand = async(req, res, next) => {
    let brand = req.body;
    brand._id = brand.id;

    await brandService.updateInfo(brand);

    res.redirect('/brands/id/' + brand._id);
}

module.exports.deleteSize = async(req, res, next) => {
    const bodyObject = req.body;
    let products = await productService.getProductsBySizeID(bodyObject.size_id);

    for (let i = 0; i < products.length; i++) {
        index = products[i].product_detail.findIndex(item => String(item.size_id) === String(bodyObject.size_id));
        products[i].product_detail[index].is_deleted = true;
        let product = await productService.getByID(products[i]._id);
        product.product_detail = products[i].product_detail;
        productService.updateProductDetail(product);
    }

    let size = await sizeService.getByID(bodyObject.size_id);
    size.is_deleted = true;
    await sizeService.update(size);
    res.redirect('/brands/id/' + bodyObject.id);
}

module.exports.createSize = async(req, res, next) => {
    const bodyObject = req.body;
    const brand_id = req.params.id;

    const text = `Size ${String(parseFloat(bodyObject.US_size).toFixed(1))}US - ${String(parseFloat(bodyObject.VN_size).toFixed(1))}VN - ${String(parseFloat(bodyObject.CM_size).toFixed(1))}CM`;

    let newSize = {
        text: text,
        brand_id: brand_id,
        VN_size: bodyObject.VN_size,
        US_size: bodyObject.US_size,
        CM_size: bodyObject.CM_size
    }
    sizeService.save(newSize);
    res.redirect('/brands/id/' + brand_id);
}

module.exports.create = async(req, res, next) => {
    const brand = {
        name: req.body.name,
        brand_url: req.body.url
    }
    const brandResult = await brandService.save(brand);
    res.redirect('/brands/id/' + brandResult._id);
}
const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const brandModel = require('../models/brandModel');
const sizeModel = require('../models/sizeModel');
const { model } = require('../models/mongooseModels/brandMongooseModel');

const multipleFilesUpload = require('../../middlewares/multipleUploadMulter').multipleFilesUpload;

module.exports.index = async(req, res, next) => {
    // Get products from model
    const products = await productModel.getProducts(req, res, next);
    // Pass data to view to display list of products
    res.render('products', { products });
};

exports.details = async(req, res, next) => {
    res.render('books/detail', await productModel.getByID(req.params.id));
}

exports.save = async(req, res, next) => {
    await productModel.save(req.body);
    res.redirect('/');
}

module.exports.showProduct = async(req, res, next) => {
    let product = await productModel.getByID(req.params.id);
    let category = await categoryModel.getByID(product.category_id)
    let brand = await brandModel.getByID(product.brand_id)

    console.log(product)
    let sizes = Array();
    for (let i = 0; i < product.product_detail.length; i++) {
        let size = await sizeModel.getByID(product.product_detail[i].size_id);
        size.remaining_amount = product.product_detail[i].remaining_amount;
        size.amount = product.product_detail[i].amount;

        sizes.push(size);
    }

    console.log(sizes);

    res.render('product', {
        product: product,
        category: category,
        brand: brand,
        sizes: sizes
    });
}

module.exports.infoUpdate = async(req, res, next) => {
    console.log(req.body);
    res.redirect('/products/id/' + req.params.id);
}

module.exports.imageUpdate = async(req, res, next) => {

    multipleFilesUpload('img-des')(req, res, (error) => {
        if (error) {
            return res.send(`Error when trying to upload: ${error}`);
        }

        console.log(`------Request body-----`);
        console.log(req.body);

        console.log(`------Request file-----`);
        console.log(req.file);

        console.log(`------Test Done-----`)
        console.log(req.body);

        res.redirect('/products/id/' + req.params.id + '/#image');
    });

}
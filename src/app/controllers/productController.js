const productsModel = require('../models/productModel');

exports.index = async(req, res, next) => {
    // Get products from model

    const products = await productsModel.getProducts(req, res, next);
    // Pass data to view to display list of products
    // console.log(products);
    res.render('products', {products});
};

exports.details = async(req, res, next) => {
    res.render('books/detail', await productsModel.getByID(req.params.id));
}

exports.save = async(req, res, next) => {
    console.log(req.body);
    res.redirect('/');
}
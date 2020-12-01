const productsModel = require('../models/productsModel');

exports.index = async(req, res, next) => {
    // Get products from model
    const products = await productsModel.list();
    // Pass data to view to display list of products
    res.render('products', { products });
};

exports.details = async(req, res, next) => {
    res.render('books/detail', await productsModel.get(req.params.id));
}

exports.save = async(req, res, next) => {
    console.log(req.body);
    res.redirect('/');
}
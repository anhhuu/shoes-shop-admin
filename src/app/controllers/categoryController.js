const brandService = require('../models/services/brandService');
const sizeService = require('../models/services/sizeService');
const productService = require('../models/services/productService');
const categoryService = require('../models/services/categoryService');

const productMongooseModel = require('../models/mongooseModels/productMongooseModel');
const { ObjectID } = require('mongodb');

module.exports.index = async(req, res, next) => {
    let categories = await categoryService.getAll();
    for (let i = 0; i < categories.length; i++) {
        categories[i].totalProduct = await productService.getTotalProductByCategoryID(categories[i]._id);
    }
    res.render('categories/categoriesShow', { categories: categories });
}

module.exports.create = async(req, res, next) => {
    const category = {
        name: req.body.name,
        category_url: req.body.url
    }
    const categoryResult = await categoryService.save(category);
    res.redirect('/categories');
}

module.exports.update = async(req, res, next) => {
    if (!await categoryService.isExistByName(req.body.name) && !await categoryService.isExistByURL(req.body.url)) {
        const category = {
            _id: req.params.id,
            name: req.body.name,
            category_url: req.body.url
        }
        const categoryResult = await categoryService.save(category);
    }
    res.redirect('/categories');
}
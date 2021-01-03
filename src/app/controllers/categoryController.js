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
const brandService = require('../models/services/brandService');
const sizeService = require('../models/services/sizeService');
const productService = require('../models/services/productService');
const categoryService = require('../models/services/categoryService');

const productMongooseModel = require('../models/mongooseModels/productMongooseModel');
const {ObjectID} = require('mongodb');

module.exports.index = async (req, res, next) => {
    res.render('index', {
        options: {
            message: req.flash('message')
        }
    });
}

module.exports.getLoginPage = async (req, res, next) => {
    res.render('users/login', {
            layout: false,
            options: {
                message: req.flash('message')
            }
        },
    );
}

module.exports.logout = async (req, res, next) => {
    req.logout();
    res.redirect('/login');
}
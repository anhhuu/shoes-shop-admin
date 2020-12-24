const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const brandModel = require('../models/brandModel');
const sizeModel = require('../models/sizeModel');

const multerImageUpload = require('../../config/multer');

const { ObjectID } = require('mongodb');

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
    let categories = await categoryModel.getAll();

    let sizes = Array();
    for (let i = 0; i < product.product_detail.length; i++) {
        let size = await sizeModel.getByID(product.product_detail[i].size_id);
        size.remaining_amount = product.product_detail[i].remaining_amount;
        size.amount = product.product_detail[i].amount;

        sizes.push(size);
    }

    let sizesExpected = await sizeModel.getListByBrandID(product.brand_id);
    sizesExpected = sizesExpected.filter(item => !sizes.some(other => item.VN_size == other.VN_size));

    res.render('product', {
        product: product,
        category: category,
        categories: categories,
        brand: brand,
        sizes: sizes,
        sizesExpected: sizesExpected
    });
}

module.exports.infoUpdate = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productModel.getByID(req.body.id);

    let price = new Object();
    price.price_value = bodyObject.price;
    price.string_price = price.price_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    price.unit = bodyObject.unit;
    if (price.unit === "USD") {
        price.string_price += String('$')
    } else {
        price.string_price += String('₫')
    }

    productUpdate.price = price;
    productUpdate.name = bodyObject.name;
    productUpdate.discount = bodyObject.discount;
    productUpdate.color = bodyObject.color;
    productUpdate.category_id = bodyObject.category_id;
    productUpdate.SKU = bodyObject.SKU;
    productUpdate.description = bodyObject.description;

    await productModel.updateBasicInfo(productUpdate);

    //console.log(productUpdate);
    res.redirect('/products/id/' + productUpdate._id);
}

module.exports.imageUpdate = async(req, res, next) => {


}

module.exports.sizeUpdate = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productModel.getByID(req.body.id);

    let product_detail = productUpdate.product_detail;

    for (let i = 0; i < product_detail.length; i++) {
        if (String(product_detail[i].size_id) === String(bodyObject.size_id)) {
            if (+product_detail[i].remaining_amount >= +bodyObject.remaining_amount) {
                product_detail[i].remaining_amount = bodyObject.remaining_amount;
            } else {
                product_detail[i].amount = +product_detail[i].amount + +bodyObject.remaining_amount - +product_detail[i].remaining_amount;
                product_detail[i].remaining_amount = bodyObject.remaining_amount;
            }
        }
    }
    productUpdate.product_detail = product_detail;
    await productModel.updateProductDetail(productUpdate);

    res.redirect('/products/id/' + req.params.id + '/#size');
}

//todo: add isDelete attribute
module.exports.sizeDelete = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productModel.getByID(req.body.id);

    let product_detail = productUpdate.product_detail;

    for (let i = 0; i < product_detail.length; i++) {
        if (String(product_detail[i].size_id) === String(bodyObject.size_id)) {
            product_detail.splice(i, 1);
            console.log(product_detail[i]);
            i--;
        }
    }
    productUpdate.product_detail = product_detail;
    await productModel.updateProductDetail(productUpdate);

    res.redirect('/products/id/' + req.params.id + '/#size');
}

module.exports.sizeCreate = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productModel.getByID(req.body.id);

    let product_detail = productUpdate.product_detail;

    let newSize = Object();
    newSize.size_id = ObjectID(bodyObject.size_id);
    newSize.remaining_amount = bodyObject.remaining_amount;
    newSize.amount = bodyObject.remaining_amount;

    product_detail.push(newSize);

    productUpdate.product_detail = product_detail;
    console.log(newSize);
    await productModel.updateProductDetail(productUpdate);

    res.redirect('/products/id/' + req.params.id + '/#size');
}

module.exports.imageDelete = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productModel.getByID(req.body.id);
    if (bodyObject.is_image_show === 'true' && productUpdate.image_show_url) {
        delete productUpdate.image_show_url;
    } else {
        if (productUpdate.images_detail_url) {
            for (let i = 0; i < productUpdate.images_detail_url.length; i++) {
                if (String(productUpdate.images_detail_url[i]) === String(bodyObject.url)) {
                    productUpdate.images_detail_url.splice(i, 1);
                    i--;
                }
            }
        }
    }
    await productModel.updateProductImage(productUpdate);
    res.redirect('/products/id/' + req.params.id + '/#image');
}

module.exports.imageCreate = async(req, res, next) => {
    multerImageUpload.single('img')(req, res, async(error) => {
        if (error) {
            next(error);
            return;
            //return res.send(`Error when trying to upload: ${error}`);
        }

        let bodyObject = req.body;
        let productUpdate = await productModel.getByID(req.body.id);

        if (bodyObject.is_image_show === 'true') {
            productUpdate.image_show_url = req.file.path;
        } else {
            productUpdate.images_detail_url.push(req.file.path);
        }

        productModel.updateProductImage(productUpdate);
        res.redirect('/products/id/' + req.params.id + '/#image');
    });
}
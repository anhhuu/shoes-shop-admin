const createError = require('http-errors');

const productService = require('../models/services/productService');
const categoryService = require('../models/services/categoryService');
const brandService = require('../models/services/brandService');
const sizeService = require('../models/services/sizeService');

const multerImageUpload = require('../../config/multer');

const { ObjectID } = require('mongodb');

module.exports.index = async(req, res, next) => {
    // Get products from model
    const brands = await brandService.getAll();
    const categories = await categoryService.getAll();

    let query = req.query;
    let filterProductsData = await productService.filterProducts(query);
    const numberOfPage = Math.ceil(parseFloat(filterProductsData.count) / 10.0);

    // Pass data to view to display list of products
    res.render('products/productsShow', { products: filterProductsData.products, brands: brands, categories: categories, query: query, numberOfPage: numberOfPage });
};

module.exports.getCreatePage = async(req, res, next) => {
    let categories = await categoryService.getAll();
    let brands = await brandService.getAll();

    let sizes = await sizeService.getListByBrandID(brands[0]._id);
    sizes = sizes.filter(item => (!item.is_deleted || item.is_deleted == false))

    res.render('products/productCreate', { categories: categories, brands: brands, sizes: sizes });
};

module.exports.create = async(req, res, next) => {
    multerImageUpload.array('img', 5)(req, res, async(error) => {
        if (error) {
            next(error);
            return;
        }

        let bodyObject = req.body;

        let product = new Object();

        product.name = bodyObject.name;
        product.color = bodyObject.color;
        product.description = bodyObject.description;
        product.brand_id = bodyObject.brand_id;
        product.category_id = bodyObject.category_id;

        //price
        let price = new Object();
        price.price_value = +bodyObject.price_value;
        price.string_price = price.price_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        price.price_currency = bodyObject.price_currency;
        if (price.price_currency === "USD") {
            price.string_price += String('$')
        } else {
            price.string_price += String('₫')
        }

        product.price = price;

        //SKU
        if (bodyObject.SKU == '') {
            product.SKU = 'Đang cập nhật';
        } else {
            product.SKU = bodyObject.SKU;
        }

        let sizes = new Array();
        let amountArr = new Array();
        let remainingAmountArr = new Array();
        if (!Array.isArray(bodyObject.sizes)) {
            sizes.push(bodyObject.sizes);
            amountArr.push(bodyObject.amount);
            remainingAmountArr.push(bodyObject.remaining_amount);
        } else {
            sizes = bodyObject.sizes;
            amountArr = bodyObject.amount;
            remainingAmountArr = bodyObject.remaining_amount;
        }

        let product_detail = new Array();
        if (sizes.length) {
            for (let i = 0; i < sizes.length; i++) {
                let sizeObj = new Object();
                sizeObj.size_id = sizes[i];
                sizeObj.amount = !isNaN(amountArr[i]) ? +amountArr[i] : 0;
                sizeObj.remaining_amount = !isNaN(remainingAmountArr[i]) ? +remainingAmountArr[i] : 0;
                product_detail.push(sizeObj);
            }
        }

        product.product_detail = product_detail;
        let image_show_url;
        let images_detail_url = new Array();
        if (req.files.length) {
            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i].originalname == bodyObject.img_show_name) {
                    image_show_url = req.files[i].path;
                } else {
                    images_detail_url.push(req.files[i].path);
                }
            }
        }

        product.image_show_url = image_show_url;
        product.images_detail_url = images_detail_url;

        product_url = product.name.replace(/[&\/\\#,+()$~%.'" :*?<>{}]/g, '');

        product_url = product_url.toLowerCase();

        let i = 1;
        while (await productService.getByURL(product_url)) {
            product_url = product_url + '-' + String(i);
            i++;
        }

        product.product_url = product_url;

        const _id = await productService.save(product);

        //res.send(product);
        console.log(product);
        res.redirect('/products/id/' + _id);
    });
}

module.exports.getProductEditPage = async(req, res, next) => {
    try {
        let product = await productService.getByID(req.params.id);
        if (!product) {
            next(createError(404));
            return;
        }
        product.discount = product.discount * 100;
        let category = await categoryService.getByID(product.category_id)
        let brand = await brandService.getByID(product.brand_id)
        let categories = await categoryService.getAll();

        let sizes = Array();
        for (let i = 0; i < product.product_detail.length; i++) {
            if (!product.product_detail[i].is_deleted) {
                let size = await sizeService.getByID(product.product_detail[i].size_id);
                size.remaining_amount = product.product_detail[i].remaining_amount;
                size.amount = product.product_detail[i].amount;
                sizes.push(size);
            }
        }

        let sizesExpected = await sizeService.getListByBrandID(product.brand_id);
        sizesExpected = sizesExpected.filter(item => !sizes.some(other => item.VN_size == other.VN_size));
        sizesExpected = sizesExpected.filter(item => (!item.is_deleted || item.is_deleted == false))

        res.render('products/productEdit', {
            product: product,
            category: category,
            categories: categories,
            brand: brand,
            sizes: sizes,
            sizesExpected: sizesExpected
        });
    } catch (error) {
        next(createError(404, error));
    }
}

module.exports.updateBasicInfo = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productService.getByID(req.body.id);

    let price = new Object();
    price.price_value = bodyObject.price;
    if (!isNaN(price.price_value)) {
        price.string_price = price.price_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        price.price_currency = bodyObject.price_currency;
        if (price.price_currency === "USD") {
            price.string_price += String('$')
        } else {
            price.string_price += String('₫')
        }


        price.price_value = +price.price_value;

        if (!isNaN(bodyObject.discount)) {
            productUpdate.discount = parseFloat(+bodyObject.discount / 100);
        } else {
            productUpdate.discount = 0;
        }

        productUpdate.price = price;
        productUpdate.name = bodyObject.name;
        productUpdate.color = bodyObject.color;
        productUpdate.category_id = bodyObject.category_id;
        productUpdate.SKU = bodyObject.SKU;
        productUpdate.description = bodyObject.description;

        await productService.updateBasicInfo(productUpdate);
    }
    res.redirect('/products/id/' + productUpdate._id);
}

module.exports.updateSize = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productService.getByID(req.body.id);

    let product_detail = productUpdate.product_detail;

    for (let i = 0; i < product_detail.length; i++) {
        if (String(product_detail[i].size_id) === String(bodyObject.size_id)) {
            if (+product_detail[i].remaining_amount >= +bodyObject.remaining_amount) {
                product_detail[i].remaining_amount = +bodyObject.remaining_amount;
            } else if (+product_detail[i].remaining_amount < +bodyObject.remaining_amount) {
                product_detail[i].amount = +product_detail[i].amount + +bodyObject.remaining_amount - +product_detail[i].remaining_amount;
                product_detail[i].remaining_amount = +bodyObject.remaining_amount;
            }
        }
    }
    productUpdate.product_detail = product_detail;
    await productService.updateProductDetail(productUpdate);

    res.redirect('/products/id/' + req.params.id + '/#size');
}

//todo: add isDelete attribute
module.exports.deleteSize = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productService.getByID(req.body.id);

    let product_detail = productUpdate.product_detail;

    for (let i = 0; i < product_detail.length; i++) {
        if (String(product_detail[i].size_id) === String(bodyObject.size_id)) {

            product_detail[i].is_deleted = true;
            //product_detail.splice(i, 1);
            //console.log(product_detail[i]);
            //i--;
        }
    }
    productUpdate.product_detail = product_detail;
    await productService.updateProductDetail(productUpdate);

    res.redirect('/products/id/' + req.params.id + '/#size');
}

module.exports.createSize = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productService.getByID(req.body.id);

    console.log(bodyObject);
    let product_detail = productUpdate.product_detail;

    if (!bodyObject.isRestore) {
        let newSize = Object();
        newSize.size_id = ObjectID(bodyObject.size_id);
        newSize.remaining_amount = isNaN(bodyObject.remaining_amount) ? 0 : +bodyObject.remaining_amount;

        newSize.amount = isNaN(bodyObject.amount) ? 0 : +bodyObject.amount;
        product_detail.push(newSize);
    } else {
        index = product_detail.findIndex(item => String(item.size_id) === String(bodyObject.size_id));
        product_detail[index].is_deleted = false;
        product_detail[index].remaining_amount = isNaN(bodyObject.remaining_amount) ? product_detail[index].remaining_amount : bodyObject.remaining_amount;
        product_detail[index].amount = isNaN(bodyObject.amount) ? product_detail[index].amount : bodyObject.amount;
    }

    productUpdate.product_detail = product_detail;
    await productService.updateProductDetail(productUpdate);
    res.redirect('/products/id/' + req.params.id + '/#size');
}

module.exports.deleteImage = async(req, res, next) => {
    let bodyObject = req.body;
    let productUpdate = await productService.getByID(req.body.id);
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
    await productService.updateProductImage(productUpdate);
    res.redirect('/products/id/' + req.params.id + '/#image');
}

module.exports.createImage = async(req, res, next) => {
    multerImageUpload.single('img')(req, res, async(error) => {
        if (error) {
            next(error);
            return;
            //return res.send(`Error when trying to upload: ${error}`);
        }

        let bodyObject = req.body;
        let productUpdate = await productService.getByID(req.body.id);

        if (bodyObject.is_image_show === 'true') {
            productUpdate.image_show_url = req.file.path;
        } else {
            productUpdate.images_detail_url.push(req.file.path);
        }

        productService.updateProductImage(productUpdate);
        res.redirect('/products/id/' + req.params.id + '/#image');
    });
}

module.exports.delete = async(req, res, next) => {
    const id = req.params.id;
    await productService.delete(id);
    res.redirect('/products')
}
const {Schema} = require('mongoose');
const productMongooseModel = require('./mongooseModels/productMongooseModel');
const categoryMongooseModel = require('./categoryModel');
const brandMongooseModel = require('./brandModel');
const {mongooseToObject} = require("../../utils/mongooseToObject");

module.exports.getByID = async (id) => {
    try {
        let product = await productMongooseModel.findOne({ _id: id });
        console.log(product);
        if (product) {
            product = mongooseToObject(product);
        }
        console.log("product: " +product);
        return product;

    } catch (error) {
        throw error;
    }
}

module.exports.getByURL = async (product_url) => {
    try {
        let product = await productMongooseModel.findOne({product_url: product_url});
        if (product) {
            product = mongooseToObject(product);
        }

        return product;
    } catch (error) {
        throw error;
    }
}

module.exports.getProducts = async (req,res,next) => {
    try {
        const queryParams = req.query;
        let page = queryParams.page;
        let category = queryParams.category;
        let result = [];

        if (typeof page =='undefined')
            page = '1';
        console.log(page)
        let data = await productMongooseModel.paginate({},{page: parseInt(page,10), limit: 5});
        let paging = {
            pages: data.pages,
            page: data.page,
        }


        let products = [];
        for (let i = 0; i < data.docs.length; i++) {
            let product = {
                id: '',
                name: '',
                price: '',
                color: '',
                brand: '',
                category: '',
                imageURL: '',
            };
            product.id = data.docs[i]._id.toString();
            product.name = data.docs[i].name;
            product.price = data.docs[i].price.string_price;
            product.color = data.docs[i].color;
            let brand = await brandMongooseModel.getByID(data.docs[i].brand_id);
            product.brand = brand.name;
            let category = await categoryMongooseModel.getByID(data.docs[i].category_id);
            product.category = category.name;
            product.imageURL = data.docs[i].image_show_url;

            if (typeof products.length =='undefined')
                products.unshift(product);
            else
                products.push(product);
        }

        result.unshift(products);
        result.push(paging);
        if (typeof category =='undefined')
            category = ''
        result.push(category);
        return result;
    } catch (e) {

    }
}

module.exports.save = async (productObject) => {
    try {
        let product = new productMongooseModel({
            SKU: productObject.SKU,
            name: productObject.name,
            product_url: productObject.product_url,
            price: productObject.price,
            flash_sell: productObject.flash_sell,
            discount: productObject.discount,
            images_detail_url: productObject.img_detail_url,
            image_show_url: productObject.image_show_url,
            product_detail: productObject.product_detail,
            color: productObject.color,
            description: productObject.description,
            brand_id: productObject.brand_id,
            category_id: productObject.category_id
        })

        await product.save();

    } catch (error) {
        throw error;
    }
}
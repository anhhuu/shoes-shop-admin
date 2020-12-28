const { Schema } = require('mongoose');
const productMongooseModel = require('./mongooseModels/productMongooseModel');
const categoryMongooseModel = require('./mongooseModels/categoryMongooseModel');
const brandMongooseModel = require('./mongooseModels/brandMongooseModel');

const categoryModel = require('./categoryModel');

const { mongooseToObject } = require("../../utils/mongooseToObject");

module.exports.getByID = async(id) => {
    try {
        let product = await productMongooseModel.findOne({ _id: id });
        //console.log(product);
        if (product) {
            product = mongooseToObject(product);
        }
        //console.log("product: " + product);
        return product;

    } catch (error) {
        throw error;
    }
}

module.exports.getByURL = async(product_url) => {
    try {
        let product = await productMongooseModel.findOne({ product_url: product_url });
        if (product) {
            product = mongooseToObject(product);
        }

        return product;
    } catch (error) {
        throw error;
    }
}


module.exports.getList = async(page, limit) => {
    try {
        if (!page) {
            page = 1;
        }

        if (!limit) {
            limit = 12;
        }

        let products = await productMongooseModel.find().skip(limit * page - limit)
            .limit(limit);
        if (products.length) {
            products = multipleMongooseToObject(products);
        }
        return products;

    } catch (error) {
        throw error;
    }
}

/*
queryObj: {
    query_field: string,
    query_value: string,
    brand_id: ObjectID',
    price_currency: string,
    price_range: string,
    category_id: ObjectID,
    page: number,
    limit: number,
}
*/
module.exports.fillterProducts = async(queryObj) => {
    try {
        if (!queryObj.page) {
            queryObj.page = 1;
        }

        if (!queryObj.limit) {
            queryObj.limit = 10;
        }

        let priceMin = 0;
        let priceMax = 0;
        if (queryObj.price_range == 'all' || !queryObj.price_range) {
            priceMax = 100000000;
        } else {
            priceMin = +queryObj.price_range.split('-')[0];
            priceMax = +queryObj.price_range.split('-')[1];
        }

        let brands = await brandMongooseModel.find().lean();
        brands = brands.map(item => item._id);

        let categories = await categoryMongooseModel.find().lean();
        categories = categories.map(item => item._id);

        const mongooseQuery = {
            $and: [
                //{ $text: { $search: '././' } },
                {
                    $and: [
                        { name: queryObj.query_field == 'name' ? { $regex: '.*' + queryObj.query_value + '.*', $options: 'i' } : { $regex: '.*.*', $options: 'i' } },
                        { SKU: queryObj.query_field == 'SKU' ? { $regex: '.*' + queryObj.query_value + '.*', $options: 'i' } : { $regex: '.*.*', $options: 'i' } },
                        { color: queryObj.query_field == 'color' ? { $regex: '.*' + queryObj.query_value + '.*', $options: 'i' } : { $regex: '.*.*', $options: 'i' } },
                    ]
                },
                {
                    $and: [{
                            'price.price_value': {
                                $gt: priceMin
                            }
                        },
                        {
                            'price.price_value': {
                                $lt: priceMax
                            }
                        }
                    ]
                },
                {
                    'price.price_currency': !queryObj.price_currency ? { '$regex': '.*.*' } : { '$regex': '.*' + queryObj.price_currency + '.*' }
                },
                {
                    brand_id: !queryObj.brands_id ? { $in: brands } : { $in: queryObj.brands_id }
                },
                {
                    category_id: !queryObj.categories_id ? { $in: categories } : { $in: queryObj.categories_id }
                }
            ]
        };

        let count = await productMongooseModel.find(mongooseQuery).countDocuments();
        let products = await productMongooseModel.find(mongooseQuery).skip(queryObj.limit * queryObj.page - queryObj.limit).limit(queryObj.limit).lean();

        return {
            products,
            count
        }
    } catch (error) {
        throw error;
    }
}

module.exports.getProducts = async(req, res, next) => {
    const queryParams = req.query;
    let page = queryParams.page;
    let category = queryParams.category;
    let categoryID = '';
    let Search = queryParams.Search;

    //console.log(queryParams)

    try {
        let result = [];
        if (typeof page == 'undefined')
            page = '1';
        //console.log(page)

        if (typeof category != 'undefined') {
            categoryID = await categoryMongooseModel.find({ name: category });
            //console.log(categoryID);
        }

        let data = await productMongooseModel.paginate({}, { page: parseInt(page, 10), limit: 5 });
        //console.log(data);
        if (typeof Search != 'undefined') {
            data = await productMongooseModel.paginate({ name: { $regex: new RegExp(Search) } }, { page: parseInt(page, 10), limit: 5 });
        }

        if (typeof category != 'undefined') {
            data = await productMongooseModel.paginate({ category_id: categoryID[0]._id }, { page: parseInt(page, 10), limit: 5 });

        }
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
            let category = await categoryModel.getByID(data.docs[i].category_id);
            product.category = category.name;
            product.imageURL = data.docs[i].image_show_url;

            if (typeof products.length == 'undefined')
                products.unshift(product);
            else
                products.push(product);
        }

        result.unshift(products);
        result.push(paging);

        if (typeof category == 'undefined')
            result.push('')
        else
            result.push("category=" + category + "&");

        if (typeof Search == 'undefined')
            result.push('');
        else
            result.push("Search=" + Search + '&');

        //console.log(result[2])
        //console.log(result);
        return result;
    } catch (e) {

    }
}

module.exports.save = async(productObject) => {
    try {
        let product = new productMongooseModel({
            SKU: productObject.SKU,
            name: productObject.name,
            product_url: productObject.product_url,
            price: productObject.price,
            flash_sell: productObject.flash_sell,
            discount: productObject.discount,
            images_detail_url: productObject.images_detail_url,
            image_show_url: productObject.image_show_url,
            product_detail: productObject.product_detail,
            color: productObject.color,
            description: productObject.description,
            brand_id: productObject.brand_id,
            category_id: productObject.category_id
        })

        await product.save();
        return product._id;

    } catch (error) {
        throw error;
    }
}

//update basic info of shoes (SKU code, name, discount, color, description, category, price)
module.exports.updateBasicInfo = async(productObject) => {
    try {
        let product = await productMongooseModel.findById(productObject._id);
        await product.updateOne({
            SKU: productObject.SKU,
            name: productObject.name,
            discount: productObject.discount,
            color: productObject.color,
            description: productObject.description,
            category_id: productObject.category_id,
            price: productObject.price
        });
    } catch (error) {
        throw error;
    }
}

//update remaining amount of shoes
module.exports.updateProductDetail = async(productObject) => {
    try {
        let product = await productMongooseModel.findById(productObject._id);
        await product.updateOne({
            product_detail: productObject.product_detail
        });
    } catch (error) {
        throw error;
    }
}

module.exports.updateProductImage = async(productObject) => {
    try {
        let product = await productMongooseModel.findById(productObject._id);
        await product.updateOne({
            image_show_url: productObject.image_show_url,
            images_detail_url: productObject.images_detail_url
        });
    } catch (error) {
        throw error;
    }
}
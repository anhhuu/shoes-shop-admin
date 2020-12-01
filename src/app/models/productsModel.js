const { db } = require('../../config/db');
const { ObjectId } = require('mongodb');

exports.list = async() => {
    const productsCollection = db().collection('products');
    const products = await productsCollection.find({}).toArray();
    return products;
}

exports.get = async(id) => {
    const productsCollection = db().collection('products');
    const product = await booksCollection.findOne({ _id: ObjectId(id) })
    return product;
}
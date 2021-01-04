const productsAPIRouter = require('./productsAPI');
const brandsAPIRouter = require('./brandsAPI');
const categoriesAPIRouter = require('./brandsAPI');
const sizesAPIRouter = require('./sizesAPI');

routeAPI = app => {
    app.use('/api/products', productsAPIRouter);
    app.use('/api/brands', brandsAPIRouter);
    app.use('/api/categories', categoriesAPIRouter);
    app.use('/api/sizes', sizesAPIRouter);
}

module.exports = routeAPI;
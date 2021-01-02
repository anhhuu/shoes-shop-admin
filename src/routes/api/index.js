const productsAPIRouter = require('./productsAPI');
const brandsAPIRouter = require('./brandsAPI');
const sizesAPIRouter = require('./sizesAPI');

function routeAPI(app) {
    app.use('/api/products', productsAPIRouter);
    app.use('/api/brands', brandsAPIRouter);
    app.use('/api/sizes', sizesAPIRouter);
}

module.exports = routeAPI;
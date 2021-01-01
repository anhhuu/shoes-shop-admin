const productsAPIRouter = require('./productsAPI');
const brandsAPIRouter = require('./brandsAPI');

function routeAPI(app) {
    app.use('/api/products', productsAPIRouter);
    app.use('/api/brands', brandsAPIRouter);
}

module.exports = routeAPI;
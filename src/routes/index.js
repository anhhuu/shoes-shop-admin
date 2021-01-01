const siteRouter = require('./site');
const apiRouter = require('./api');
const productsRouter = require('./products');
const brandsRouter = require('./brands');

const routeAPI = require('./api/index');

function route(app) {
    app.use('/', siteRouter);
    app.use('/products', productsRouter);
    app.use('/brands', brandsRouter);

    routeAPI(app);
}

module.exports = route;
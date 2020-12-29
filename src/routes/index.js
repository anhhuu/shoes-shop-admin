const siteRouter = require('./site');
const apiRouter = require('./api');
const productsRouter = require('./products');
const brandsRouter = require('./brands');

function route(app) {
    app.use('/', siteRouter);
    app.use('/api', apiRouter);
    app.use('/products', productsRouter);
    app.use('/brands', brandsRouter);
}

module.exports = route;
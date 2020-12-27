const siteRouter = require('./site');
const apiRouter = require('./api');
const productsRouter = require('./products');

function route(app) {
    app.use('/', siteRouter);
    app.use('/api', apiRouter);
    app.use('/products', productsRouter);
}

module.exports = route;
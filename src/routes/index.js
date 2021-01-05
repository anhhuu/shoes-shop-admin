const siteRouter = require('./site');
const apiRouter = require('./api');
const productsRouter = require('./products');
const brandsRouter = require('./brands');
const categoriesRouter = require('./categories');
const customersRouter = require('./customers');

const routeAPI = require('./api/index');

route = app => {
    app.use('/', siteRouter);
    app.use('/products', productsRouter);
    app.use('/brands', brandsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/customers', customersRouter);
    routeAPI(app);
}

module.exports = route;
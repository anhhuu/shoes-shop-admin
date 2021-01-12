const siteRouter = require('./site');
const apiRouter = require('./api');
const productsRouter = require('./products');
const brandsRouter = require('./brands');
const categoriesRouter = require('./categories');
const customersRouter = require('./customers');
const usersRouter = require('./users');

const routeAPI = require('./api/index');

route = app => {
    app.use('/', siteRouter);
    app.use('/products', productsRouter);
    app.use('/brands', brandsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/customers', customersRouter);
    app.use('/users', usersRouter);
    routeAPI(app);
}

module.exports = route;
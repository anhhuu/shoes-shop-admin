const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const debugHttp = require('debug')('shoes-shop-admin:http');
const methodOverride = require('method-override');

const expressLayouts = require('express-ejs-layouts');

const passport = require("./config/passport");

const cookieParser = require('cookie-parser');
const session = require("express-session");

const { flash } = require('express-flash-message');

const route = require('./routes');

const db = require('./config/db');
db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);

app.use(logger('dev', { stream: { write: msg => debugHttp(msg.trimEnd()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//Config passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


route(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('errors/error', { layout: 'layouts/error' });
});

module.exports = app;
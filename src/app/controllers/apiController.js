const sizeModel = require('../models/sizeModel');

module.exports.getSizes = async(req, res, next) => {
    const brand_id = req.query.brand_id;
    const sizes = await sizeModel.getListByBrandID(brand_id);
    res.render('ajaxPartials/sizesShowOnCreateProduct', { layout: false, sizes: sizes }, (err, html) => {
        res.send(html);
    })
};
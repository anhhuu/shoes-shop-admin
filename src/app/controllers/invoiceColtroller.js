const invoiceService = require('../models/services/invoiceService');

module.exports.index = async(req, res, next) => {
    const invoices = await invoiceService.getList(1, 10);
    console.log(invoices);
    res.render('invoices/invoicesShow', {
        invoices: invoices
    });
}
const invoicesMongooseModel = require('../mongooseModels/invoiceMongooseModel');

module.exports.getList = async(page, limit) => {
    try {
        page = !page || page < 1 ? 1 : page;
        limit = !limit || limit < 10 ? 10 : limit;
        const invoices = await invoicesMongooseModel.find().populate('user_id').skip(page * limit - limit).limit(limit).lean();
        return invoices;
    } catch (error) {
        throw error;
    }
}
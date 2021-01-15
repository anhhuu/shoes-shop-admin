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

module.exports.getInvoice = async (invoice_id)=>{
    try{
        const invoice = await invoicesMongooseModel.findOne({_id:invoice_id}).lean();
        return invoice;
    }catch (e){
        throw e

    }
}

module.exports.updateInvoice = async (invoice_id,status)=>{
    try{
        const invoice =  await invoicesMongooseModel.findOneAndUpdate({_id: invoice_id}, {status: status})
        return invoice;
    }catch (e) {
        throw e
    }
}
const mongoose = require('mongoose');
const debug = require('debug')('shoes-shop-admin:db')

connect = async() => {
    try {
        await mongoose.connect(
            process.env.DB_URI_V2, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
        debug('connected successfully!');
        //console.log('connected successfully!')
    } catch (error) {
        debug('connected failure! <' + error + '>');
        //console.log('connected failure! <' + error + '>');
    }
}

module.exports = { connect };
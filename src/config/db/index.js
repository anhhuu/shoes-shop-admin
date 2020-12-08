const mongoose = require('mongoose');

const debug = require('debug')('shoes-shop:db')

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://anhhuu:QntiC4albYUOsYHz@shoes-shop-cluster.cdqes.mongodb.net/shoes-shop-dev-v1?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
        debug('connected successfully!')
        console.log('connected successfully!')
    } catch (error) {
        debug('connected failure! <' + error + '>');
        console.log('connected failure! <' + error + '>');
    }
}

module.exports = { connect };
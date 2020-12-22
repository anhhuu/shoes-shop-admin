const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Product = new Schema({
    SKU: { type: String },
    name: { type: String },
    product_url: { type: String },
    price: { type: Object },
    flash_sell: { type: Boolean },
    discount: { type: Number },
    images_detail_url: { type: Array },
    image_show_url: { type: String },
    color: { type: String },
    description: { type: String },
    product_detail: { type: Object },
    brand_id: { type: Schema.Types.ObjectId, ref: "Brand" },
    category_id: { type: Schema.Types.ObjectId, ref: "Category" }
}, {
    timestamps: true,
});
Product.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', Product);
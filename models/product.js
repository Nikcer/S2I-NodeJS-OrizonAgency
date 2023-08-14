const mongoose = require ('mongoose');


const productSchema = new mongoose.Schema ({
    nome: { type : String, require: true},
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Order'}],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product
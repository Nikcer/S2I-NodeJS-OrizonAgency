const mongoose = require ('mongoose');


const orderSchema = new mongoose.Schema({
    products : [{ type : mongoose.SchemaTypes.ObjectId,   ref: 'Product', require: true}],
    users : [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', require: true}],
    inputDate : { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
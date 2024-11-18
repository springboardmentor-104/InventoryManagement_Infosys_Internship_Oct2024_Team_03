// models/OrderSchema.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    cartData: [
        {
            id: { type: Number, required: true },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            date: { type: String, required: true },
        },
    ],
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);

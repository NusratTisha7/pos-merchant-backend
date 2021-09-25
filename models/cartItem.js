const { Schema, model } = require('mongoose');

const CartItemSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    qty: {
        type: Number,
        default: 1,
        min: 1
    },
    price: Number,
      
}, { timestamps: true });

module.exports.CartItemSchema = CartItemSchema;
module.exports.CartItem = model("CartItem", CartItemSchema);
const _ = require('lodash');
const { CartItem } = require('../models/cartItem');
const {SellDetails}=require('../models/sellDetails')

module.exports.createCartItem = async (req, res) => {
    let { price, product } = _.pick(req.body, ["price", "product"]);
    let cartItem = new CartItem({ price: price, product: product });
    const result = await cartItem.save();
    res.status(201).send({
        message: "Added to cart successfully!",
        data: result,
    });
}

module.exports.getCartItem = async (req, res) => {
    const cartItems = await CartItem.find()
        .populate('product', ['name','unit'])
    return res.status(200).send(cartItems);
}

module.exports.updateCartItem = async (req, res) => {
    const { _id, qty } = _.pick(req.body, ["qty", "_id"]);
    await CartItem.updateOne({ _id: _id}, { qty: qty });
    return res.status(200).send("Item updated!!");
}

module.exports.deleteCartItemById = async (req, res) => {
    const _id = req.params.id;
    await CartItem.deleteOne({ _id: _id});
    return res.status(200).send("Deleted!");
}

module.exports.deleteCartItem = async (req, res) => {
    await CartItem.deleteMany();
    return res.status(200).send("Deleted!");
}

module.exports.createSellDetails = async (req, res) => {
    let { date,items,qty,price,total,sum } = _.pick(req.body, ["date","items","qty","price","total","sum"]);
    let sellDetails = new SellDetails({ date: date, items:items,qty:qty,price:price,total:total,sum:sum });
    const result = await sellDetails.save();
    res.status(201).send({
        data: result,
    });
}


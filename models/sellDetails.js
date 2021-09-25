const { Schema, model } = require('mongoose');

const SellDetailsSchema = Schema({
    date:Date,
    items:String,
    qty:Number,
    price:Number,
    total:Number,
    sum:Number
}, { timestamps: true });

module.exports.SellDetailsSchema = SellDetailsSchema;
module.exports.SellDetails = model("SellDetails", SellDetailsSchema);
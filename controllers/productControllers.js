const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Product, validate } = require('../models/product');

module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("Something went wrong!");
        const { error } = validate(_.pick(fields, ["name","category","price", "quantity","unit"]));
        if (error) return res.status(400).send(error.details[0].message);
        const product = new Product(fields);

        if (files.photo) {
            fs.readFile(files.photo.path, (err, data) => {
                if (err) return res.status(400).send("Problem in file data!");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) res.status(500).send("Internal Server error!");
                    else return res.status(201).send({
                        message: "Product Added Successfully!",
                        data: _.pick(result, ["name","category","price", "quantity","unit"])
                    })
                })
            })
        } else {
            return res.status(400).send("No image provided!");
        }
    })
}

module.exports.getProducts = async (req, res) => {
    const products = await Product.find()
        .select({ photo: 0 })
        .sort({ createdAt: -1 })
    return res.status(200).send(products);
}

module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 1, _id: 0 })
    res.set('Content-Type', product.photo.contentType)
    return res.status(200).send(product.photo.data);
}






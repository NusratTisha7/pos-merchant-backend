const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Category, validate } = require('../models/category');

module.exports.createCategory = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("Something went wrong!");
        const { error } = validate(_.pick(fields, ["name"]));
        if (error) return res.status(400).send(error.details[0].message);

        const category = new Category(fields);

        if (files.photo) {
            fs.readFile(files.photo.path, (err, data) => {
                if (err) return res.status(400).send("Problem in file data!");
                category.photo.data = data;
                category.photo.contentType = files.photo.type;
                category.save((err, result) => {
                    if (err) res.status(500).send("Internal Server error!");
                    else return res.status(201).send({
                        message: "Category Created Successfully!",
                        data: _.pick(result, ["name"])
                    })
                })
            })
        } else {
            return res.status(400).send("No image provided!");
        }
    })
}

module.exports.getCategory = async (req, res) => {
    const categories = await Category.find()
        .select({ photo: 0 })
        .sort({ createdAt: -1 })
    return res.status(200).send(categories)
}

module.exports.getCategoryPhoto = async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId)
        .select({ photo: 1, _id: 0 })
    res.set('Content-Type', category.photo.contentType)
    return res.status(200).send(category.photo.data);
}

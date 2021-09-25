const router = require('express').Router();
const {
    createProduct,
    getProducts,
    getPhoto,
} = require('../controllers/productControllers');

router.route('/')
    .post(createProduct)
    .get(getProducts)

router.route('/photo/:id')
    .get(getPhoto)
    
module.exports = router;
const router = require('express').Router();
const { 
    createCategory, 
    getCategory,
    getCategoryPhoto
} = require('../controllers/categoryControllers.js');

router.route('/')
    .post(createCategory)
    .get(getCategory);

router.route('/photo/:id')
    .get(getCategoryPhoto)

module.exports = router;
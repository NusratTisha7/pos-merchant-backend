const router = require('express').Router();
const {
    createCartItem,
    createSellDetails,
    getCartItem,
    updateCartItem,
    deleteCartItem,
    deleteCartItemById
} = require('../controllers/cartControllers');

router.route('/')
    .post(createCartItem)
    .get(getCartItem)
    .put(updateCartItem)
    .delete(deleteCartItem);
router.route('/:id')
    .delete(deleteCartItemById);
router.route('/sell-details')
    .post(createSellDetails)

module.exports = router;
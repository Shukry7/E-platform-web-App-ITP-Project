// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cart-controllers'); // Update the path to your Cart controller

router.post('/add-to-cart', cartController.createCart);
router.get('/', cartController.listCart);
router.get('/cart/', cartController.listCartByUId);
router.put('/cart/:userId/:productId', cartController.updateCart);
router.delete('/:productId', cartController.deleteCart);

module.exports = router;



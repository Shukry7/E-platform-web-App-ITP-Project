// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cart-controllers'); 

router.post('/cart/new', cartController.createCart);
router.get('/', cartController.listCart);
router.get('/cart/', cartController.listCartByUId);
router.put('/cart/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);


module.exports = router;



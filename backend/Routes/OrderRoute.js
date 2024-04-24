const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order-controllers');

// POST route for handling payment success
router.post('/new', orderController.createOrder);
router.get('/', orderController.listOrder);
//
module.exports = router;
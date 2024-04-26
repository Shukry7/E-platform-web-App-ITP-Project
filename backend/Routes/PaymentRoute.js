const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/payment-controller');

router.post('/submit', paymentController.submitPayment);

module.exports = router;
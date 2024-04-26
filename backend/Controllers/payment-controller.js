const Payment = require('../Models/PaymentModel');

exports.submitPayment = async (req, res, next) => {
  try {
    const { subtotal, shippingFee, total, card_id, user_id ,method} = req.body;
    const currentDate = new Date();
  const localTime = new Date(currentDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
    const payment = new Payment({
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: total,
      card_id: card_id,
      user_id: user_id,
      submissionDate:localTime,
      Method: method
    });
    const savedPayment = Payment.create(payment);
    res.json(savedPayment);
  } catch (error) {
    next(error);
  }
};
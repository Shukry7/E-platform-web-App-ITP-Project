const mongoose = require('mongoose');

const OnlinePay = new mongoose.Schema({
  uid:String,
  id: String,
  firstname: String,
  lastname: String,
  cvv: String,
  category: String,
  expiredate: String,
  number: String
});

module.exports = mongoose.model('Online', OnlinePay);
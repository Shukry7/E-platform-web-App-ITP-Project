
const OffPay = require("../Models/OfflinePaymentModel");

const CreateOffPay = async (req, res, next) => {


  
  let path = "uploads/images/No-Image-Placeholder.png";
  if (req.file && req.file.path) path = req.file.path;

  const newOffPay = {

    UID: 1,
    image: path,
  };
  
  const offpay = await OffPay.create(newOffPay);
  return res.status(201).send(offpay);
};

exports.CreateOffPay = CreateOffPay;

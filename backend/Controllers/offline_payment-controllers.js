const Image = require('../Models/OfflinePaymentModel');

exports.uploadImage = (req, res) => {
  let newImage = new Image();
  newImage.filename = req.file.filename;
  newImage.contentType = req.file.mimetype;
  newImage.imageBase64 = req.file.buffer.toString('base64');
  newImage.save((err) => {
    if (err) {
      return res.status(400).json({ message: 'Error saving image to database.' });
    }
    res.json({ message: 'Image uploaded successfully', file: req.file });
  });
};


const Notification = require("../Models/Notification");

const createNotification = async (req, res, next) => {
  
const { product} = req.body;

  const newNotification = {
    Product: product,
    read: "Pending"
  };

  const notification = await Notification.create(newNotification);
  return res.status(201).send(notification);
};

const listNotification = async (req, res) => {

  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    return res.status(200).json(notification);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


const readNotificationById = async (req, res) => {

    try {
        const { id } = req.params;
    
        const readNotification = {
            read: "Yes"
          };
    
        const result = await Notification.findByIdAndUpdate(id, readNotification);
    
        if (!result) {
          return res.status(404).send({ message: "Notification Not Find !" });
        }
    
        return res.status(200).send({ message: "Notification read Successfully!" });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
};



const DeleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Notification Not Find !" });
    }

    return res.status(200).send({ message: "Notification Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createNotification = createNotification;
exports.listNotification = listNotification;
exports.readNotificationById = readNotificationById;
exports.DeleteNotification = DeleteNotification;

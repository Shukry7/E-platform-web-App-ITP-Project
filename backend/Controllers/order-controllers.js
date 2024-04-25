const Order = require("../Models/OrderModel");

createOrder = async (req, res) => {
  try {
    const { cartitem, uid } = req.body;

    const latestOrder = await Order.find().sort({ _id: -1 }).limit(1);
    let id;
    console.log(uid);
    if (latestOrder.length !== 0) {
      const latestId = parseInt(latestOrder[0].orderId.slice(1));
      id = "O" + String(latestId + 1).padStart(4, "0");
    } else {
      id = "O0001";
    }

    const items = cartitem.map((item) => {
      return {
        productId: item.product._id,
        quantity: item.quantity,
      };
    });
    console.log(items);

    const newOrder = {
      orderId: id,
      userId: uid,
      CartItems: items,
    };

    const order = await Order.create(newOrder);

    // Respond with a success message
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }

};

const listOrder = async (req, res) => {
  try {
    
    const order = await Order.find({}).populate("userId").populate("CartItems.productId");

    return res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


exports.createOrder = createOrder;
exports.listOrder = listOrder;

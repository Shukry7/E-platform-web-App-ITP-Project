const Order = require("../Models/OrderModel");


createOrder = async (req, res) => {
  try {
    

    // Assuming you receive cart items in the request body
    const { cartitem,uid } = req.body;

    const latestProduct = await Product.find().sort({ _id: -1 }).limit(1);
    let id;

    if (latestProduct.length !== 0) {
      const latestId = parseInt(latestProduct[0].ID.slice(1));
      id = "P" + String(latestId + 1).padStart(4, "0");
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

    // Save the order to
    const order = await Order.create(newOrder);

    // Respond with a success message
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createOrder = createOrder;

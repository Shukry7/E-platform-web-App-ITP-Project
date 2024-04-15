

// cartController.js

const Cart = require('../Models/CartModel'); // Path to your Cart model
const HttpError = require("../Models/http-error");

// Create a new cart
const createCart = async (req, res) => {
  const { user, product, price, quantity } = req.body;

  const newCart = {
    user: user,
    product: product,
    price: price,
    quantity: quantity
  };

  try {
    const cart = await Cart.create(newCart);
    return res.status(201).send(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// List all carts
const listCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// List cart by user ID
const listCartByUId = async (req, res) => {
  const hardcodedUserId = 'jdfskje';


  try {
    
    const cart = await Cart.find({user:hardcodedUserId});
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Update a cart
const updateCart = async (req, res) => {
  const { user, product } = req.params; // Assuming you have userId and productId in the URL

  try {
    // Find the cart item based on the user and product
    const cartItem = await Cart.findOne({ user: user, product: product });

    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found!" });
    }

    // Update the cart item with new info from req.body
    const updatedCartItem = await Cart.findByIdAndUpdate(cartItem._id, req.body, { new: true });

    return res.status(200).send({ message: "Cart updated successfully!", updatedCartItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


// Delete a cart
const deleteCart = async (req, res) => {
  const { product } = req.params;

  try {
    const result = await Cart.findByIdAndDelete(product);
    if (!result) {
      return res.status(404).send({ message: 'Cart Not Found !' });
    }
    return res.status(200).send({ message: 'Item Deleted Successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createCart = createCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.listCartByUId = listCartByUId;
exports.listCart = listCart;

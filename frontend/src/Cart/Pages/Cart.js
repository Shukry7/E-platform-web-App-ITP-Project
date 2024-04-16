// components/Cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalComponent from "../../Payment/Pages/Components/PaymentOption";
import { Link } from "react-router-dom";
import Button from "../../Shared/Components/FormElements/Button";
import "../../Cart/Pages/Components/Cart.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Fetch cart items when component mounts
    axios
      .get(`http://localhost:5000/cart/cart`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart", error);
      });
  }, []);

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:5000/cart/${itemId}`)
      .then((response) => {
        // Remove item from state
        setCart(cart.filter((item) => item._id !== itemId));
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  const handleQuantityUpdate = (itemId, newQuantity) => {
    axios
      .put(`http://localhost:5000/cart/${itemId}`, { quantity: newQuantity })
      .then((response) => {
        // Update the state or do something else with the response
      })
      .catch((error) => {
        console.error("Error updating quantity", error);
      });
  };


  return (
    <div class="bg-gray-100 h-screen py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div class="flex flex-col md:flex-row gap-1">
          <div class="md:min-w-3/4">
            <div class="bg-white rounded-lg shadow-md p-4 mb-3">
              <table class="w-max">
                <thead>
                  <tr>
                    <th class="text-left font-semibold px-6 py-4">Product</th>
                    <th class="text-left font-semibold px-6 py-4">Price</th>
                    <th class="text-left font-semibold px-6 py-4">Quantity</th>
                    <th class="text-left font-semibold px-6 py-4">Total</th>
                    <th class="text-left font-semibold px-6 py-4">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td class="py-4">
                        <div class="flex items-center">
                          <span class="font-semibold">Product name</span>
                        </div>
                      </td>
                      <td class="px-6 py-4">${item.price}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <button class="border rounded-md py-2 px-4 mr-2" onClick={() => handleQuantityUpdate(item.product, item.quantity - 1)}>
                            -
                          </button>
                          <span class="text-center w-8">{item.quantity}</span>
                          <button class="border rounded-md py-2 px-4 ml-2"  onClick={() => handleQuantityUpdate(item.product, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td class="px-6 py-4">${item.quantity * item.price}</td>
                      <td class="px-6 py-4"><button onClick={() => handleDelete(item.id)}>X</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="md:w-1/4" className="summary">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-semibold mb-4">Summary</h2>
              <div class="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$19.99</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$1.99</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr class="my-2" />
              <div class="flex justify-between mb-2">
                <span class="font-semibold">Total</span>
                <span class="font-semibold">$21.98</span>
              </div>
              <button
                class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                onClick={openModal}
              >
                Checkout
              </button>
              <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <h2 className="modal-title">Choose your payment options...</h2>
                <p className="modal-text">
                  Choose your desired payment option !!
                </p>
                <div className="modal-button">
                  <Button to="../CC/new">Online</Button>
                  <Button to="../CC/new" className="modal-button">
                    Offline
                  </Button>
                </div>
              </ModalComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

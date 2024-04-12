// components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from '../../Payment/Pages/Components/PaymentOption';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Components/FormElements/Button';
import '../../Cart/Pages/Components/Cart.css'


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
    axios.get(`http://localhost:5000/cart/cart`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart', error);
      });
  }, []);

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:5000/cart/${itemId}`)
      .then(response => {
        // Remove item from state
        setCart(cart.filter(item => item._id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting item', error);
      });
  };

  

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <h2>{item.user}</h2>
          <p>{item.product}</p>
          <p>{item.quantity} x ${item.price} = ${item.quantity * item.price}</p>
          <button onClick={() => handleDelete(item._id)} className="cart-button">Remove from cart</button>
        </div>
      ))}
      <button onClick={openModal} className="cart-button">Open Modal</button>
      <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
  <h2 className="modal-title">Choose your payment options...</h2>
  <p className="modal-text">Choose your desired payment option !!</p>
  <div className="modal-button">
    <Button to="../CC/new" >Online</Button>
     <Button to="../CC/new" className="modal-button">Offline</Button>
  </div>
</ModalComponent>


    </div>
  );
  



  

  
  
};

export default CartPage;

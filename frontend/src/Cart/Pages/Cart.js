// components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const userId="jdfskje"
const CartPage = () => {
  const [cart, setCart] = useState([]);

    

  useEffect(() => {
    // Fetch cart items when component mounts
    axios.get(`http://localhost:5000/cart/cart/${userId}`)
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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Your Cart</h1>
      {cart.map(item => (
        <div key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
          <h2>{item.user}</h2>
          <p>{item.product}</p>
          <p>{item.quantity} x ${item.price} = ${item.quantity * item.price}</p>

          
          <button onClick={() => handleDelete(item._id)} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Remove from cart</button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;

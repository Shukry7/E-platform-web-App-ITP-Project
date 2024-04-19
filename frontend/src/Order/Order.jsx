import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    // Fetch cart items from the server
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/orders', {
        userId: 'user123', // Replace with actual user ID
        cartItems: cartItems,
      });
      console.log('Order placed successfully:', response.data);
      setIsOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isLoading ? (
        <p>Loading cart items...</p>
      ) : isOrderPlaced ? (
        <p>Order placed successfully! Thank you for your purchase.</p>
      ) : (
        <div>
          <h2>Cart Summary</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <span>{item.productName}</span> {/* Assuming productName is available */}
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price}</span> {/* Assuming price is available */}
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowCart.css'

const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Retrieve userId from session storage or context
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('Please log in to view your cart.');
      navigate('/login');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/cart/${userId}`);
        setCartItems(response.data);

        // Calculate and set total price
        const total = response.data.reduce((sum, item) => sum + item.qty * item.price, 0);
        setTotalPrice(total.toFixed(2));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId, navigate]);

  const handleConfirmOrder = async () => {
    if (!userId) {
      alert('Please log in to confirm your order.');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5500/order', { userId });
      alert('Order confirmed successfully!');
      navigate('/my-order');
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order. Please try again.');
    }
  };

  useEffect(() => {
    // Calculate total price whenever cartItems changes
    const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
    setTotalPrice(total.toFixed(2)); // Set total price with two decimal points
  }, [cartItems]); // Add cartItems as a dependency to this useEffect

  const handleUpdateQuantity = async (itemId, newQty) => {
    if (newQty <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    try {
      // eslint-disable-next-line
      const response = await axios.put('http://localhost:5500/cart', {
        userId,
        itemId,
        qty: newQty
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === itemId ? { ...item, qty: newQty } : item
        )
      );

      alert('Cart updated successfully!');
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart. Please try again.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete('http://localhost:5500/cart', {
        data: { userId, itemId }
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));

      const total = cartItems
        .filter((item) => item.itemId !== itemId)
        .reduce((sum, item) => sum + item.qty * item.price, 0);
      setTotalPrice(total.toFixed(2));

      alert('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  return (
    <div className="row">
      <div className="col-sm"></div>
      <div className="col-sm-8">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.itemId} className="cart-item">
                <img src={`/images/${item.photo}`} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>£{item.price} x {item.qty}</p>
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleUpdateQuantity(item.itemId, item.qty - 1)}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleUpdateQuantity(item.itemId, item.qty + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.itemId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="total-price">
              <h3>Total £{totalPrice}</h3>
            </div>
            <button className="btn btn-primary" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </>
        )}
      </div>
      <div className="col-sm"></div>
    </div>
  );
};

export default ShowCart;

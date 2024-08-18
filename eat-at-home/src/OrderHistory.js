import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './OrderHistory.css';  // Import the CSS file

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/order-history/${userId}`);
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orderHistory.map((order) => (
            <div key={order.orderNumber} className="order-item">
              <h3>Order Number: {order.orderNumber}</h3>
              <p>Order Date: {format(new Date(order.orderDate), 'yyyy-MM-dd')}</p>
              <p>Total Items: {order.totalItems}</p>
              <p className="total-price">Total Price: £{order.totalPrice}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

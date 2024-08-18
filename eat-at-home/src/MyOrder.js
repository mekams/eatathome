// Redirect the webpage to payment gateway after confirming the order

import React, { useEffect } from 'react';
import './MyOrder.css'

const MyOrder = () => {
  useEffect(() => {
    // Redirect to payment.html after 3 seconds (3000 ms)
    const timer = setTimeout(() => {
      window.location.href = '/payment.html';
    }, 3200);

    // Cleanup the timer if the component is unmounted before the redirect
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='text-center'>
      <h2>Order Confirmation</h2>
      <p>The order has been sent. You will be redirected to the payment page shortly.</p>
    </div>
  );
};

export default MyOrder;

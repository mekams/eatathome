const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Cart = require('../models/Cart');

exports.addOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    // Create a new order
    const order = new Order({ userId });
    const orderResult = await order.save();
    // Retrieve cart items that are not ordered yet
    const cartItems = await Cart.find({ userId, ordered: false });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart to order' });
    }
    // Track whether all updates are successful
    let allUpdatesSuccessful = true;
    // For each cart item, create an order detail and mark the cart item as ordered
    for (let item of cartItems) {
      const orderDetail = new OrderDetail({
        orderId: orderResult._id,
        itemId: item.itemId,
        qty: item.qty
      });

      // Attempt to save the OrderDetail
      const savedOrderDetail = await orderDetail.save();
      if (!savedOrderDetail) {
        allUpdatesSuccessful = false;
        break; // Exit loop on first failure
      }
      // Attempt to mark the cart item as ordered
      item.ordered = true;
      const updatedCartItem = await item.save();
      if (!updatedCartItem) {
        allUpdatesSuccessful = false;
        break; // Exit loop on first failure
      }
    }
    if (!allUpdatesSuccessful) {
      // Handle partial updates or failures here
      // This could involve manual rollback steps or compensating actions
      return res.status(500).json({ message: 'Error processing order, some items may not have been updated correctly' });
    }
    // Respond with the order ID and success message
    res.status(201).json({ orderId: orderResult._id, message: 'Order placed' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.toString() });
  }
};



exports.OrderHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch orders for the user
    const orders = await Order.find({ userId }).sort({ date: -1 }); // Sort by date descending

    // If no orders found
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Array to hold order history
    const orderHistory = [];

    for (let order of orders) {
      // Fetch order details for each order
      const orderDetails = await OrderDetail.find({ orderId: order._id }).populate('itemId');
      
      // Calculate total items and total price for the order
      const totalItems = orderDetails.reduce((sum, detail) => sum + detail.qty, 0);
      const totalPrice = orderDetails.reduce((sum, detail) => sum + detail.qty * detail.itemId.price, 0);

      // Push the order history data
      orderHistory.push({
        orderNumber: order._id,
        orderDate: order.date,
        totalItems,
        totalPrice: totalPrice.toFixed(2),
      });
    }

    // Respond with the order history
    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order history', error: error.toString() });
  }
};

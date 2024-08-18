const Cart = require('../models/Cart');
const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
  const { userId, itemId, qty } = req.body;

  try {
    // Create a new cart item
    const cartItem = new Cart({
      userId,
      itemId,
      qty
      // ordered is false by default as defined in the model
    });

    // Save the cart item to the database
    const result = await cartItem.save();

    // Respond with the cart item ID and success message
    res.status(201).json({ cartId: result._id, message: 'Item added to cart' });
  } catch (error) {
    // Handle errors, like missing fields or invalid IDs
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

exports.showCart = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId); // Correctly instantiate ObjectId

  try {
      const cartItems = await Cart.aggregate([
          { $match: { userId: userId, ordered: false } }, // Match user's cart items that haven't been ordered
          { $lookup: {
              from: 'items', // The collection to join
              localField: 'itemId', // Field from the Cart collection
              foreignField: '_id', // Field from the Items collection
              as: 'itemDetails' // Array of matching items
          }},
          { $unwind: '$itemDetails' }, // Deconstructs the array field from the joined documents
          { $project: {
              userId: 1,
              itemId: 1,
              name: '$itemDetails.name',
              qty: 1,
              price: '$itemDetails.price',
              photo: '$itemDetails.photo'
          }}
      ]);

      if (!cartItems.length) {
          return res.status(404).json({ message: 'No items in your cart' });
      }

      res.status(200).json(cartItems);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
  }
};




exports.updateCart = async (req, res) => {
  const { userId, itemId, qty } = req.body;

  try {
    // Validate that the quantity is positive
    if (qty <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    // Find the cart item for the user and item
    const cartItem = await Cart.findOneAndUpdate(
      { userId: userId, itemId: itemId, ordered: false },
      { $set: { qty: qty } },
      { new: true } // Return the updated document
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Cart updated successfully', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};


exports.deleteCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find the cart item for the user and item and remove it
    const cartItem = await Cart.findOneAndDelete({
      userId: userId,
      itemId: itemId,
      ordered: false
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};

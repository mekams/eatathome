const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Item = require('./models/Item');
const User = require('./models/User');


// Controllers
const userController = require('./controllers/userController');
const itemController = require('./controllers/itemController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');

// Initialize the app
const app = express();
// const PORT = 5500;

//environment variables module
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5500

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or specify your frontend origin instead of '*'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors());


// --------------Comment the below code when running database on MongoDB cluster---------------------------------------------------

// Connect to MongoDB atlas cluster
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB...');
}).catch(err => {
  console.error('Could not connect to MongoDB...', err);
});

// ----------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------Remove the comment from below code when you want to run MongoDb on local database-----------------

// // Connect to MongoDB locally on pc
// mongoose.connect('mongodb://127.0.0.1:27017/eatathome', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB...');
//   seedDatabase();  // Call seedDatabase when the server starts
// }).catch(err => {
//   console.error('Could not connect to MongoDB...', err);
// });

// // Data seeding function
// async function seedDatabase() {
//   try {
//     // Clear existing data
//     await User.deleteMany({});
//     await Item.deleteMany({});
//     console.log('Previous data deleted');

//     // Read data from JSON files
//     const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/users.json'), 'utf-8'));
//     const itemsData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/items.json'), 'utf-8'));

//     // Insert new data
//     await User.insertMany(usersData);
//     await Item.insertMany(itemsData);
//     console.log('New data inserted from JSON files');

//   } catch (err) {
//     console.error('Error seeding database:', err);
//   }
// }

// --------------------------------------------------------------------------------------------------------------------------------


// Routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/items', itemController.showItems);
app.get('/item/:id', itemController.showItem);
app.get('/items/:category', itemController.getItemsByCategory);
app.post('/cart', cartController.addToCart);
app.get('/cart/:userId', cartController.showCart);
app.put('/cart', cartController.updateCart); // Route for updating the cart
app.delete('/cart', cartController.deleteCart); // Route for deleting a cart item
app.post('/order', orderController.addOrder);
app.put('/update-password', userController.updatePassword); // Route for changing Password (forget Password)
app.get('/order-history/:userId', orderController.OrderHistory);  // Route for order history



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

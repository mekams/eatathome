# <h1>Readme: Eat@thome</h1>

## `Please follow the details mentioned below to run the project build using React:`
- Download and install node JS and Visual Studio code editor to your computer  (Link: https://nodejs.org/en  and https://code.visualstudio.com/download )
- Open the folder in the Visual Studio code editor. In the Visual Studio editor :


# <h2>Steps to start the project: Frontend </h2>
- open the folder and navigate directory to eat-at-home and then follow the steps as below :

### `npm install` 
- All dependencies to this project will be installed with the help of a file named "package. Json"

### `npm start`
- To start the project and view it.

# <h2>Steps to start the project: Backend </h2>
- open the folder and navigate directory to eatathome-api and then follow the steps as below :

### `npm install` 
- All dependencies to this project will be installed with the help of a file named "package. Json"

### `node ./index.js`
- To start the MongoDb database and connect to cluster.

**Note** : I have also given a way to connect MongoDb to a local database but for that you will be required to uncomment and comment the codes.
You can view it in eatathome-api folder > filename : index.js.
I have given instruction there itself which you can follow and perform the action to get results.

## `My GitHub Repo link`
*  https://github.com/mekams/eatathome 



## `Introduction`
**Eatathome is an online platform where a client can order pizza, burgers or bread and place the order which will be delivered to your doorstep in minutes.**

- The user can remove or update an item in the cart.- User can change the password.

- When the user clicks on "Confirm Order," they are taken to the (dummy) payment page, and the order is then saved.

- The user can view their order history, which includes the order number, order date, total number of items, and total prices.

- If user forget passord, link is present in login page to change the password.

- Completely responsive Design and clean User Interface.

### `Folder Structure: Frontend`
```
└── 📁eat-at-home
    └── 📁public
        └── 📁images
            └── Arabic salad2_big.jpg
            └── bonless wing_big.jpg
            └── Caesar salad2_big.jpg
            └── cart.png
            └── Cheese Sandwitch.jpg
            └── Chicken Alfredo2_big.jpg
            └── Chicken sandwich2_big.jpg
            └── Corn Sandwitch.jpg
            └── Diet_Pepsi_big.jpg
            └── Dip_big.jpg
            └── Double Cheese Margherita.jpg
            └── french fries2_big.jpg
            └── Greek salad2_big.jpg
            └── hotdog sandwich2_big.jpg
            └── Margarita2_big.jpg
            └── Mexican Green Wave.jpg
            └── mtnDew_big.jpg
            └── Pepperoni lovers2_big.jpg
            └── Pepsi-min_636021950800177962.jpg
            └── Philly steak sandwich2_big.jpg
            └── Pizza With Mushroom.jpg
            └── Plain Bread.jpg
            └── plain Nutella2_big.jpg
            └── Seafood Pizza.jpg
            └── Thin Cheese Pizza.jpg
            └── Thin Crust Pizza.jpg
            └── Tuna salad2_big.jpg
            └── turkey sandwich2_big.jpg
            └── Veg Sandwitch.jpg
            └── Vegetarian Pizza.jpg
            └── Water-min_636021951390013962.jpg
            └── wedges2_big.jpg
        └── favicon.ico
        └── index.html
        └── logo192.png
        └── logo512.png
        └── manifest.json
        └── payment.css
        └── payment.html
        └── robots.txt
    └── 📁src
        └── AboutUs.js
        └── App.css
        └── App.js
        └── App.test.js
        └── AuthContext.js
        └── ChangePassword.js
        └── ContactUs.js
        └── Home.css
        └── Home.js
        └── index.css
        └── index.js
        └── ItemDetails.js
        └── Login.js
        └── logo.svg
        └── MyOrder.css
        └── MyOrder.js
        └── OrderHistory.css
        └── OrderHistory.js
        └── reportWebVitals.js
        └── setupTests.js
        └── ShowCart.css
        └── ShowCart.js
        └── Signup.js
    └── package-lock.json
    └── package.json
    └── README.md
```
### `Folder Structure: Backend`
```
└── 📁eatathome-api
    └── 📁controllers
        └── cartController.js
        └── itemController.js
        └── orderController.js
        └── userController.js
    └── 📁data
        └── items.json
        └── users.json
    └── 📁models
        └── Cart.js
        └── Item.js
        └── Order.js
        └── OrderDetail.js
        └── User.js
    └── .env
    └── index.js
    └── package-lock.json
    └── package.json
```
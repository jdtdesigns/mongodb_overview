const express = require('express');
const session = require('express-session');

const app = express();

const api_routes = require('./controllers');

const PORT = process.env.PORT || 3333;

// Load environment variables
require('dotenv').config();

// Import db connection
const db = require('./config/connection');

// Allow json to be sent by client
app.use(express.json());

// Initialize Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // Cause the cookie to expire in 3 minutes
    maxAge: 3 * 60 * 1000,
    // Do not allow cookies to be accessed through client side JS
    httpOnly: true
  }
}));

// Load our routes - localhost:3333/api/shops
app.use('/', api_routes);

// 404 Catch All for any unknown routes
app.get('*', (req, res) => {
  res.status(404).send({
    message: 'That route is incorrect',
    error: 404
  })
});

db.on('open', () => {
  console.log('db connected');
  // Start the server
  app.listen(PORT, () => console.log('Server started on %s', PORT));
});


console.log('server');
















// const shopSchema = new Schema({
//   name: String,
//   location: String,
//   is_chain: Boolean,
//   coffees: [{
//     name: String,
//     strength: String
//   }]
// });

// const Shop = model('Shop', shopSchema);

// Shop.create({
//   name: 'Starbucks',
//   location: 'Atlanta',
//   is_chain: true
// }).then(new_shop => {
//   console.log(new_shop);
// });

// Shop.find()
//   .then(shops => console.log(shops));

// Shop.findOne({
//   _id: '653a89ff9cbdc01d40b3d146'
// }).then(shop => console.log(shop));

// Shop.findByIdAndUpdate('653a89ff9cbdc01d40b3d146', {
//   name: 'Starbucks'
// }, {
//   new: true
// }).then(shop => console.log(shop));

// Shop.findOneAndUpdate({
//   name: 'Starbucks'
// }, {
//   name: 'Scooters'
// }, {
//   new: true
// }).then(shop => console.log(shop));

// Shop.insertMany([
//   {
//     name: 'Starbucks',
//     location: 'Atlanta'
//   },
//   {
//     name: 'Dunkin',
//     location: 'Atlanta'
//   },
//   {
//     name: 'Cafe Mez',
//     location: 'Atlanta'
//   }
// ]).then(shops => console.log(shops));

// Shop.findByIdAndUpdate('653a95f8bf1f6fb9c323d408', {
//   $push: {
//     coffees: {
//       name: 'cold brew',
//       strength: 'med'
//     }
//   }
// }, { new: true }).then(shop => console.log(shop))



// Shop.deleteOne({ name: 'Starbucks' })
//   .then(shops => console.log('deleted'));
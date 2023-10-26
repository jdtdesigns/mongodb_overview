const { connect, Schema, model } = require('mongoose');

const PORT = process.env.port || 3333;

connect('mongodb://127.0.0.1:27017/coffee_shop_db');

const shopSchema = new Schema({
  name: String,
  location: String,
  is_chain: Boolean,
  coffees: [{
    name: String,
    strength: String
  }]
});

const Shop = model('Shop', shopSchema);

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

Shop.findByIdAndUpdate('653a95f8bf1f6fb9c323d408', {
  $push: {
    coffees: {
      name: 'cold brew',
      strength: 'med'
    }
  }
}, { new: true }).then(shop => console.log(shop))



// Shop.deleteOne({ name: 'Starbucks' })
//   .then(shops => console.log('deleted'));
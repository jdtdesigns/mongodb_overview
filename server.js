

const PORT = process.env.port || 3333;

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const db_name = 'fruits_db';

client.connect()
  .then(() => {
    const db = client.db(db_name);

    const fruits = db.collection('fruits');

    // fruits.insertOne({
    //   name: 'Apple'
    // }).then((result) => {
    //   console.log(result);
    // });


    // fruits.find({}).toArray()
    //   .then(fruits => console.log(fruits));

    // fruits.updateOne(
    //   { _id: new ObjectId('653a76e136030b3a87d24bc1') },
    //   { $set: { name: 'Grape' } }
    // ).then((result) => {
    //   console.log(result);
    // });

    // fruits.insertMany([
    //   {
    //     name: 'Banana'
    //   },
    //   {
    //     name: 'Kiwi'
    //   },
    //   {
    //     name: 'Orange'
    //   },
    //   {
    //     name: 'Watermelon'
    //   }
    // ]).then(() => {
    //   console.log('insert complete');
    // });

    // fruits.deleteOne({
    //   _id: new ObjectId('653a7ea97923a3822ea8287e')
    // }).then(() => console.log('fruit deleted'));

    // shops
    // fruits.updateOne({ _id: new ObjectId('653a7ea97923a3822ea8287d') }, {
    //   $push: {
    //     shops: {
    //       name: 'Shop One',
    //       location: 'Atlanta'
    //     }
    //   }
    // }).then(() => console.log('updated'));

    fruits.find()
      // .skip(1)
      // .limit(1)
      // .sort({ name: -1 })
      // .forEach(fruit => {
      //   console.log('fruit', fruit)
      // })
      // .count()
      // .tailable({ awaitData: true })

      .then(result => console.log(result))
    // .toArray()
    // .then(fruits => console.log(fruits));
  });
const router = require('express').Router();

const Shop = require('../models/Shop');

// Get All Shops
router.get('/shops', async (req, res) => {
  const shops = await Shop.find();

  res.json(shops);
});

// Get One Shop
router.get('/shop/:shop_id', async (req, res) => {
  const shop_id = req.params.shop_id;

  const shop = await Shop.findById(shop_id);

  res.json(shop);
});

// Create a Shop
router.post('/shops', async (req, res) => {
  try {
    const shopData = req.body;
    const newShop = await Shop.create(shopData)
    res.json(newShop);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Update a Shop
router.put('/shop/edit', async (req, res) => {
  const { shop_id, name, location } = req.body;

  try {
    const updated_shop = await Shop.findByIdAndUpdate(shop_id, {
      name: name,
      location: location
    }, { new: true });

    res.json(updated_shop);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add Coffee to Shop
router.put('/shop/:shop_id', async (req, res) => {
  const shop_id = req.params.shop_id;
  const { name, strength } = req.body;

  try {
    const updated_shop = await Shop.findByIdAndUpdate(shop_id, {
      $push: {
        coffees: {
          name: name,
          strength: strength
        }
      }
    }, { new: true });

    res.json(updated_shop);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
});

// Delete a Shop
router.delete('/shop/:shop_id', async (req, res) => {
  try {
    const shop_id = req.params.shop_id;
    const shop = await Shop.findByIdAndDelete(shop_id);

    if (!shop) {
      return res.status(404).json({ error: 'sad trombone sound' });
    }

    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
const router = require('express').Router();

const Shop = require('../models/Shop');

// Get All Shops
router.get('/shops', async (req, res) => {
  const shops = await Shop.find();

  res.json(shops);
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

// Add Coffee to Shop
router.put('/shop/:shop_id', async (req, res) => {
  const shop_id = req.params.shop_id;
  const { name, strength } = req.body;

  const updated_shop = await Shop.findByIdAndUpdate(shop_id, {
    $push: {
      coffees: {
        name: name,
        strength: strength
      }
    }
  }, { new: true });

  res.json(updated_shop);
});

module.exports = router;
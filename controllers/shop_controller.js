const Shop = require('../models/Shop');

module.exports = {
  async getAll(req, res) {
    const shops = await Shop.find();

    res.json(shops);
  },

  async create(req, res) {
    try {
      const shopData = req.body;
      const newShop = await Shop.create(shopData)
      res.json(newShop);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
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
  }
}
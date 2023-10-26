const router = require('express').Router();
const shop_controller = require('../controllers/shop_controller');

// Get All Shops
router.get('/shops', shop_controller.getAll);

// Create a Shop
router.post('/shops', shop_controller.create);

// Add Coffee to Shop
router.put('/shop/:shop_id', shop_controller.update);

module.exports = router;
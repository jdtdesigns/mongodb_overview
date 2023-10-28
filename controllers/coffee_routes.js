const router = require('express').Router();

const Coffee = require('../models/Coffee');

// Get All Coffees
router.get('/coffees', async (req, res) => {
  const coffees = await Coffee.find();

  res.json(coffees);
});

// Create Coffee
router.post('/coffees', async (req, res) => {
  const coffee = await Coffee.create(req.body);

  res.json(coffee);
});

module.exports = router;
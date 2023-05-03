const express = require('express');
const Car = require('../models/Car');

const router = express.Router();

router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.render('cars/index', { cars });
});

router.get('/new', (req, res) => {
  res.render('cars/new');
});

router.post('/', async (req, res) => {
  try {
    const { platenumber, make, model } = req.body;
    const car = new Car({ platenumber, make, model, available: true });
    await car.save();
    res.redirect('/cars');
  } catch (error) {
    res.render('cars/new', { error: 'Error creating car' });
  }
});

module.exports = router;
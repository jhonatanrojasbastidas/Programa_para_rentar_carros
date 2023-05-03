const express = require('express');
const Rent = require('../models/Rent');
const Car = require('../models/Car');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  const rents = await Rent.find();
  res.render('rents/index', { rents });
});

router.get('/new', async (req, res) => {
  const cars = await Car.find({ available: true });
  const users = await User.find();
  res.render('rents/new', { cars, users });
});

router.post('/', async (req, res) => {
  try {
    const { rentnumber, username, platenumber, rentdate, returndate } = req.body;
    const car = await Car.findOneAndUpdate({ platenumber, available: true }, { available: false });
    if (!car) {
      throw new Error('Car not available');
    }
    const rent = new Rent({ rentnumber, username, platenumber, rentdate, returndate, returned: false });
    await rent.save();
    res.redirect('/rents');
  } catch (error) {
    res.render('rents/new', { error: error.message });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  platenumber: { type: String, unique: true },
  make: String,
  model: String,
  available: Boolean
});

const car = mongoose.model('Car', carSchema);

module.exports = car;

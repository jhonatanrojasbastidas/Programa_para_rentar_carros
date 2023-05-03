const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  rentnumber: { type: String, unique: true },
  username: String,
  platenumber: String,
  rentdate: Date,
  returndate: Date,
  returned: Boolean
});

const rent = mongoose.model('Rent', rentSchema);

module.exports = rent;

const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
  color: String,
  x: Number,
  y: Number
});

const Grid = mongoose.model('Grid', gridSchema);

module.exports = Grid;

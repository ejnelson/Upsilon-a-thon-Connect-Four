const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
  username: String
});

const Players = mongoose.model('Players', playersSchema);

module.exports = Players;

const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match: String
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;

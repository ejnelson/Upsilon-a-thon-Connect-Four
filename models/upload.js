var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
  created: { type: Date},
  file: Object,//technically this should be another schema... extra credit to create it!
  message: { type: String}
  //var2: Number
});

module.exports = mongoose.model('Upload', UploadSchema);

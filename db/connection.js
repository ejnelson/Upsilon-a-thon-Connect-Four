const mongoose = require('mongoose');

exports.connect = function () {
  mongoose.connect('mongodb://localhost/primeproject');//need to change to be able to host on heroku

  mongoose.connection.on('error', function(error){
    console.log('error connecting', error);
  });

  mongoose.connection.once('open', function(){
    console.log('connected to mongo');
  });
};

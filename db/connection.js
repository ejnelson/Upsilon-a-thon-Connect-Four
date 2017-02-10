const mongoose = require('mongoose');

exports.connect = function () {
  mongoose.connect('mongodb://localhost/primeproject');

  mongoose.connection.on('error', function(error){
    console.log('error connecting', error);
  });

  mongoose.connection.once('open', function(){
    console.log('connected to mongo');
  });
};

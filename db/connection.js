const mongoose = require('mongoose');

exports.connect = function () {
    // mongoose.connect(process.env.MONGODB_URI); //CHANGE THIS BOB.... I
    mongoose.connect('mongodb://localhost:27017/connect-four');

  mongoose.connection.on('error', function(error){
    console.log('error connecting', error);
  });

  mongoose.connection.once('open', function(){
    console.log('connected to mongo');
  });
};

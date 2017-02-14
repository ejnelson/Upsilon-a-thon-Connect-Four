

//express set up
var express = require('express');
var app=express();
//express set up

//sockets set up

var http = require('http').Server(app);
// var server = require('http').Server(app);
var io = require('socket.io')(http);
//sockets set up




var path = require('path');


// var pg = require("pg");

// require('./auth/setup'); //comment back in after socket test



// connection.connect();//connect to mongodb  //comment back in after socket test


// app.use(passport.initialize()); //comment back in after socket test
// app.use(passport.session());

app.use(express.static('public'));









app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

io.on('connection', function(socket){
  console.log('io ready',socket.id);
});












http.listen(3000, function(){
  console.log('listening on *:3000');
});
// app.listen(process.env.PORT || 3001);

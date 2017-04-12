


//express set up
var express = require('express');
var app=express();
//express set up

//sockets set up

var http = require('http').Server(app);
// var server = require('http').Server(app);
var io = require('socket.io')(http);
//sockets set up

var connection = require('./db/connection');
var session=require('express-session');

var path = require('path');
var bodyParser = require('body-parser');




connection.connect();//connect to mongodb


app.use(bodyParser.json());
app.use(express.static('public'));















  // var gameStart=false;
io.on('connection', function(socket){
  var srvSockets = io.sockets.sockets;
  console.log('connections to sockets',Object.keys(srvSockets).length);
  io.emit('amountOfUsers',Object.keys(srvSockets).length);


  socket.on('token drop',function(tokenObject){







    var latestObject={
                      winner:
                      token:
                      }
    io.emit('latest',latestObject);
  });

});







 app.get('/', function(req, res){
   res.sendFile(__dirname + '/public/views/index.html');
 });

 app.get('/*', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
 });


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
// app.listen(process.env.PORT || 3000);

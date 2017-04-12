


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
                      winner:win,
                      token:tokenobjectthing
                      }
    io.emit('latest',latestObject);
  });

});


var checkY = function (latestObject, grid) {
  var xArray = []; // array that holds any coordinates with matching x value
  var tokenToSend = {}; // object to send back
  var highestY = 0; // used to find the current highest Y value

  console.log("latest token dropped is ", latestObject);
  if (grid) {
    console.log("grid received", grid);
  }
  grid.forEach(function(coord) {
    if (latestObject.x == coord.x) {
      xArray.push(coord)
    }
  });
  xArray.forEach(function(xMatch) {
    if (xMatch.y > highestY) {
      highestY = xMatch.y;
    }
  });
  tokenToSend.y = highestY + 1;
  tokenToSend.x = latestObject.x;
  tokenToSend.color = latestObject.color;
  console.log("token to send is ", tokenToSend);
  socket.emit("latest token dropped", tokenToSend);
}







 app.get('/', function(req, res){
   res.sendFile(__dirname + '/public/views/index.html');
 });

 app.get('/*', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
 });

 var getGrid = function(){
   Grid.find({}, function(err, grid){
     if(err){
       res.sendStatus(500);
       return;
     }
     console.log(grid);
     return grid;
   });
 };

 var updateGrid = function(newToken){
   var grid = new Grid(newToken);
   grid.save(function(err){
     if(err){
       console.log(err);
       res.sendStatus(500);
       return;
     }
     console.log('created');
   });
 }

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
// app.listen(process.env.PORT || 3000);

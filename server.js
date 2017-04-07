


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

  var room = socket.handshake['query']['r_var'];

  socket.join(room);
  io.to(room).emit('getUsers');
  console.log('user joined room #'+room);


  socket.on('currentUsers',function(users){
    io.to(room).emit('currentUsers',users);
  });

  socket.on('leaveGame',function(user){
    io.to(room).emit('leaveGame',user);
  });

  socket.on('user join',function(user){
      io.to(room).emit('user join',user);
    // }
  });

  socket.on('ready',function(user){
    io.to(room).emit('user ready',user);
  });

  socket.on('not ready',function(user){
    io.to(room).emit('user not ready',user);
  });

  socket.on('click',function(player){
    io.to(room).emit('click',player);
  });

  socket.on('disconnect', function() {
    socket.leave(room);
    socket.disconnect();
    socket.disconnect(true);
    console.log('user disconnected');
  });

  socket.on('new convo',function(convo){
    io.to('inbox').emit('new convo',convo);
  });

  socket.on('chat message', function(msgObject){

    io.to(room).emit('chat message', msgObject);
    // upload.single(msgObject);
    Room.update(
      {_id:msgObject.roomId},
      {$push:{messages:{
        text:msgObject.text,
        sender:msgObject.sender,
        date:new Date(),
        pic:msgObject.pic,
        gif:msgObject.gif
      }}},
    function(err){
      if (err) {
        res.sendStatus(500);
        return;
      }

    });
  socket.on('force disconnect', function(){
      console.log('please disconnect me from',room);
      socket.leave(room);
    });
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

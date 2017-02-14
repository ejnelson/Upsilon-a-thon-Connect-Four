

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
var passport=require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/private/router');
var newRoom = require('./routes/private/newRoom');
var roomData = require('./routes/private/roomData');
var getContacts = require('./routes/private/getContacts');
var getProfileInfo = require('./routes/private/getProfileInfo');
var login = require('./routes/login');
var register = require('./routes/register');
// var pg = require("pg");

require('./auth/setup');



connection.connect();//connect to mongodb

var sessionConfig={
  secret:process.env.SECRET||'super secret key goes here',
  key:'user',
  resave:true,
  saveUninitialized:true,
  cookie:{
    maxAge:30*60*1000, //30 minutes
    secure:false
  }
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/router', router);
app.use('/newRoom', newRoom);
app.use('/roomData', roomData);
app.use('/getContacts', getContacts);
app.use('/getProfileInfo', getProfileInfo);
app.use('/login',login);
app.use('/register',register);






app.get('/loginStatus',function(req,res){
  res.send(req.isAuthenticated());
});


//the following routes require authentication
app.use('/private',ensureAuthenticated);

app.get('/private/secretInfo',function(req,res){
  res.send('this is secret');
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.sendStatus(401);
  }
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// io.use(function(socket, next){
//   var joinServerParameters = JSON.parse(socket.handshake.query.joinServerParameters);
// });
//
//
//
// io.on('connection', function(socket){
//   console.log('io ready',socket.id);
//
//   socket.join(joinServerParameters);
//
//   socket.on('chat message', function (msg) {
//     io.to(joinServerParameters).emit('chat message',msg);
//
//     console.log('I received a message by saying ', msg);
//   });
//
//   socket.on('disconnect', function () {
//     io.emit('user disconnected');
//   });
// });

io.on('connection', function(socket){

  var room = socket.handshake['query']['r_var'];


  socket.join(room);
  console.log('user joined room #'+room);

  socket.on('disconnect', function() {
    socket.leave(room);
    socket.disconnect();
    socket.disconnect(true);
    console.log('user disconnected');

  });

  socket.on('chat message', function(msg){
    io.to(room).emit('chat message', msg);
  });
  socket.on('force disconnect', function(){
      console.log('please disconnect me from',room);
      socket.leave(room);
  });
});





http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
// app.listen(process.env.PORT || 3000);

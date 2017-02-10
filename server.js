

//express set up
var express = require('express');
var app=express();
//express set up

//sockets set up
var http = require('http').Server(app);
var server = require('http').Server(app);
var io = require('socket.io')(http);
//sockets set up

var connection = require('./db/connection');
var session=require('express-session');
var passport=require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/private/router');
var login = require('./routes/login');
var register = require('./routes//register');
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


// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
app.listen(process.env.PORT || 3000);

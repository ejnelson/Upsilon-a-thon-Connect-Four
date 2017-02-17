require('dotenv').load();//loads environment variables locally

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

//routes
var getPhotos = require('./routes/private/getPhotos');
// var uploads = require('./routes/private/uploads');
var router = require('./routes/private/router');
var newRoom = require('./routes/private/newRoom');
var roomData = require('./routes/private/roomData');
var getContacts = require('./routes/private/getContacts');
var getProfileInfo = require('./routes/private/getProfileInfo');
var login = require('./routes/login');
var register = require('./routes/register');
// var pg = require("pg");
var Room = require('./models/room');
var fs = require('fs');
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();


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

app.use('/getPhotos', getPhotos);
// app.use('/uploads', uploads);
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




var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,//alternately, if you are not using a .env file you can just use a string for the name of your bucket here, 'your-bucket-name'
    acl: 'public-read',//default is private, set to public-read is so the public can view your pictures
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })

})




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

  socket.on('chat message', function(msgObject){

    io.to(room).emit('chat message', msgObject);
    // upload.single(msgObject);
    Room.update(
      {_id:msgObject.roomId},
      {$push:{messages:{
        text:msgObject.text,
        sender:msgObject.sender,
        date:Date.now(),
        pic:msgObject.pic
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


app.post('/', upload.single('file'), function(req, res) {
  console.log('here is the req.body',req.body);

  var msgObjectTwo={
    date: Date.now(),
    pic: req.file,
    text: req.body.text,
    roomId:req.body.roomId,
    sender:req.user.username
  };
  io.to(req.body.roomId).emit('chat message', msgObjectTwo);
msgObjectTwo=null;
  Room.update(
    {_id:req.body.roomId},
    {$push:{messages:{
      text:req.body.text,
      sender:req.user.username,
      date:Date.now(),
      pic:req.file
    }}},
    function(err){
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        return;
        // res.send(newUpload);
      }
    });
});

//gets all the uploads recorded in the database
app.get('/messages', function (req, res) {
  Upload.find({}, function (err, data) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(data);
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

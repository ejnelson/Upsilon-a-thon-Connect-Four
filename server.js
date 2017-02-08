//express set up
var express = require('express');
var app=express();
//express set up

//sockets set up
var http = require('http').Server(app);
var server = require('http').Server(app);
var io = require('socket.io')(http);
//sockets set up

var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/router');
var pg = require("pg");


app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/router', router);

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

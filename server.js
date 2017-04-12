


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


    var grid=getGrid();
    var tokenToSend=checkY(tokenObject,grid);
    updateGrid(tokenToSend);
    var win=null;
    if(checkForWin(grid,tokenToSend)){
      win=tokenObject.color;
    }

    var latestObject={
                      winner:win,
                      token:tokenToSend
                    };
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
  // socket.emit("latest token dropped", tokenToSend);
  return tokenToSend;
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






  var checkForWin=function(grid,token){
    if(checkHorizontal(grid,token)||checkVertical(grid,token)||checkIncreaseDiag(grid,token)||checkDecreaseDiag(grid,token)){
      return true;
    }else{
      return false;
    }

  };
  var checkHorizontal=function(grid,token){
    var rowMatches=[];
    for(var i=0;i<grid.length;i++){
      if (grid[i].y==token.y&&grid[i].color==token.color){
        rowMatches[grid[i].x]=grid[i].x;
      }
    }
    var left=0;
    for(var i=0;i<4;i++){
      if(rowMatches[token.x+i]>-1){
        left++;
      }else{
        i=5;
      }
    }
    var right=0;
    for(var i=0;i>-4;i--){
      if(rowMatches[token.x+i]>-1){
        right++;
      }else{
        i=-5;
      }
    }
    if(left+right>3){
      return true;
    }else{
      return false;
    }

  };
  var checkVertical=function(grid,token){
    var columnMatches=[];
    for(var i=0; i<grid.length;i++){
      if(grid[i].x==token.x&&grid[i].color==token.color){
        columnMatches[grid[i].y]=grid[i].y;
      }
    }
    var below=0;
    for(var i=0;i>-4;i--){
      if(columnMatches[token.y+i]>-1){
        below++;
      }else{
        i=-5;
      }
    }
    if(below>3){
      return true;
    }else{
      return false;
    }
  };
  var checkIncreaseDiag=function(grid,token){
    var diagMatches=[];
    for(var i=0; i<grid.length;i++){
      if(grid[i].x-token.x==grid[i].y-token.y&&grid[i].color==token.color){
        diagMatches[grid[i].x]=grid[i].x;
      }
    }

    var left=0;
    for(var i=0;i<4;i++){
      if(rowMatches[token.x+i]>-1){
        left++;
      }else{
        i=5;
      }
    }
    var right=0;
    for(var i=0;i>-4;i--){
      if(rowMatches[token.x+i]>-1){
        right++;
      }else{
        i=-5;
      }
    }
    if(left+right>3){
      return true;
    }else{
      return false;
    }






  };
  var checkDecreaseDiag=function(grid,token){
    var diagMatches=[];
    for(var i=0; i<grid.length;i++){
      if(grid[i].x-token.x==token.y-grid[i].y&&grid[i].color==token.color){
        diagMatches[grid[i].x]=grid[i].x;
      }
    }

    var left=0;
    for(var i=0;i<4;i++){
      if(rowMatches[token.x+i]>-1){
        left++;
      }else{
        i=5;
      }
    }
    var right=0;
    for(var i=0;i>-4;i--){
      if(rowMatches[token.x+i]>-1){
        right++;
      }else{
        i=-5;
      }
    }
    if(left+right>3){
      return true;
    }else{
      return false;
    }
  };








http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
// app.listen(process.env.PORT || 3000);

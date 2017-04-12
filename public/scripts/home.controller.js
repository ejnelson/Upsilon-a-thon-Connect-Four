angular.module('connectFour').controller('HomeController', function($http, $scope, $location){
 var ctrl = this;

 console.log('Controller is loaded!');
 var color=null;
 var socket;
 ctrl.myTurn=true;

 ctrl.join=function(){
   $location.path('/gameplay');
   socket = io.connect();
   socket.on('amountOfUsers',function(users){
     if (users==1){
       color='red';
     }else if(users==2){
       color='black';
     }else{
       color=null;
     }
     console.log('my color is',color);
   });
   socket.on('latest',function(latestObject){
     if(latestObject.win){
       if (latestObject.win==color){
         alert('you win');
       }else{
         alert('you lose');
       }
     }
     if(latestObject.token.color==color){
       ctrl.myTurn=true;
     }else{
       ctrl.myTurn=false;
     }
     // ADD logic to update bill and tyler's DOM array

   });
 };

 ctrl.dropToken=function(column){ //function to call to drop a token
   var dropObject={x:column,color:color};
   socket.emit('token drop', dropObject);
 }






 var checkForWin=function(grid,token){
   if(checkHorizontal(grid,token)||checkVertical(grid,token)||checkIncreaseDiag(grid,token)||checkDecreaseDiag(grid,token)){
     return 'winner';
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






 ctrl.dropCoin = function (column) {
   // creates a coin object that can go to the db.
   // var yValue = yValueCalculator(xvalue); // or yValueCalculator (bigArray, xvalue);

   var coinObject = {
     color: color, // TODO does this get the global color?
     x: column,
     y: yValue
   };

  // db.grid.save(coinObject)

  // redraw grid

  // run checkIfFull function

  // return coinObject; //maybe dont need if the above saves it to the db.

 };


 ctrl.drawCoins = function () {
  //  get array from db and draw the grid

  // db.grid.find().pretty().toArray()



 };


 checkIfFull = function () {
   var fullCount = 5; // height of array - 1
  // get array from db = bigArray.
  // max each y and get total

    for (var i = 0; i < bigArray.length; i++) {
      if (bigArray[i].y == fullCount) {
        setFull(bigArray[i].x);
      }
    }

  };


  // initializes the column heights on initialization.
  ctrl.columnZeroFull = false;
  ctrl.columnOneFull = false;
  ctrl.columnTwoFull = false;
  ctrl.columnThreeFull = false;
  ctrl.columnFourFull = false;
  ctrl.columnFiveFull = false;
  ctrl.columnSixFull = false;

  setFull = function (x) {
    if (x == 0) {
      ctrl.columnZeroFull = true;
    } else if (x == 2) {
      ctrl.columnOneFull = true;
    } else if (x == 3) {
      ctrl.columnTwoFull = true;
    } else if (x == 4) {
      ctrl.columnThreeFull = true;
    } else if (x == 5) {
      ctrl.columnFourFull = true;
    } else if (x == 6) {
      ctrl.columnFiveFull = true;
    } else if (x == 7) {
      ctrl.columnSixFull = true;
    };
  };



ctrl.array = [  [ 'red', 'red', 'black', 'blank', 'black', 'red', 'blank'],
                    [ 'blank', 'blank', 'blank', 'blank', 'black', 'blank', 'blank'],
                    [ 'blank', 'blank', 'red', 'blank', 'blank', 'blank', 'blank'],
                    [ 'blank', 'red', 'blank', 'blank', 'blank', 'blank', 'blank'],
                    [ 'blank', 'red', 'blank', 'blank', 'blank', 'blank', 'blank'],
                    [ 'blank', 'black', 'blank', 'blank', 'blank', 'blank', 'blank'] ];



});

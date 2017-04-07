angular.module('connectFour').controller('HomeController', function($http, $scope, $location){
 var ctrl = this;

 console.log('Controller is loaded!');
 var color=null;


 ctrl.join=function(){
   $location.path('/gameplay');
   var socket = io.connect();
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
 };

 socket.on('checkForWin',function(grid){


 });





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



});

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

   return coinObject;
 };








});

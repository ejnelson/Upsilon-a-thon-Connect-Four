angular.module('connectFour').controller('HomeController', function($http, $scope, $location){
 var ctrl = this;

 console.log('Controller is loaded!');
 var color=null;


 ctrl.join=function(){
   $location.path('/inbox');
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



});

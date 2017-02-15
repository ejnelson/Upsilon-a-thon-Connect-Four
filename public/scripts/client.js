var app=angular.module('myApp',['ngRoute','ngAnimate','ngFileUpload']);

app.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl:'views/pages/login.html',
    controller: 'LoginController as loginCtrl'
  }).when('/inbox',{
    templateUrl:'views/pages/inbox.html',
    controller: 'InboxController as inboxCtrl',
    //this resolve section of code prevents users from visiting inbox unless they are logged in
    resolve: {
      _: function ($location,$http) {
            $http.get('/loginStatus').then(function(res){
              console.log('res.data, logged in =',res.data);
              if(res.data){
                console.log('user is logged in');
                return;
              }else {
                console.log('user is not logged in');
                //send them to the login view
                // return false;
                return $location.path('/');
              }
            })
          }
        }
  }).when('/photoView',{
    templateUrl:'views/pages/photoview.html',
    controller:'RoomController as roomCtrl',
    resolve: {
      _: function ($location,$http) {
            $http.get('/loginStatus').then(function(res){
              console.log('res.data, logged in =',res.data);
              if(res.data){
                console.log('user is logged in');
                return;
              }else {
                console.log('user is not logged in');
                //send them to the login view
                // return false;
                return $location.path('/');
              }
            })
          }
        }
  }).when('/register',{
    templateUrl:'views/pages/register.html',
    controller:'RegisterController as regCtrl',
    resolve: {
      _: function ($location,$http) {
            $http.get('/loginStatus').then(function(res){
              console.log('res.data, logged in =',res.data);
              if(res.data){
                console.log('user is logged in');
                return;
              }else {
                console.log('user is not logged in');
                //send them to the login view
                // return false;
                return $location.path('/');
              }
            })
          }
        }
  }).when('/newContact',{
    templateUrl:'views/pages/newContact.html',
    controller:'InboxController as inboxCtrl'
  }).when('/newConvo',{
    templateUrl:'views/pages/newConvo.html',
    controller:'InboxController as inboxCtrl'
  }).when('/editProfile',{
    templateUrl:'views/pages/editProfile.html',
    controller:'InboxController as inboxCtrl'
  }).when('/roomView',{
    templateUrl:'views/pages/roomView.html',
    controller:'RoomController as roomCtrl',
    resolve: {
      _: function ($location,$http) {
            $http.get('/loginStatus').then(function(res){
              console.log('res.data, logged in =',res.data);
              if(res.data){
                console.log('user is logged in');
                return;
              }else {
                console.log('user is not logged in');
                //send them to the login view
                // return false;
                return $location.path('/');
              }
            })
          }
        }
  });
  $locationProvider.html5Mode(true);




});

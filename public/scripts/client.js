var app=angular.module('myApp',['ngRoute','ngAnimate']);

app.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl:'views/pages/login.html',
    controller: 'LoginController as loginCtrl'
  }).when('/inbox',{
    templateUrl:'views/pages/inbox.html',
    controller: 'InboxController as inboxCtrl'
  }).when('/photoview',{
    templateUrl:'views/pages/photoview.html',
    controller:'PhotoController as photoCtrl'
  });
  $locationProvider.html5Mode(true);
});



angular
  .module('connectFour', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.when("/", {
        templateUrl: "views/join.html",
        controller: "HomeController as home"
      }).when("/gameplay", {
        templateUrl: "views/gameplay.html",
        controller: "HomeController as home"
      }).when("/gameover", {
        templateUrl: "views/gameover.html",
        controller: "HomeController as home"
      });
      $locationProvider.html5Mode(true);
    }
]);

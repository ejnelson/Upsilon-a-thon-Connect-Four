

angular
  .module("connectFour")
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "views/index.html",
        controller: "HomeController as home",
      });

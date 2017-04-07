

angular
  .module('connectFour')
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/", {
        templateUrl: "views/join.html",
        controller: "HomeController as home",
      })
      .when("/game", {
        templateUrl: "views/game.html",
        controller: "HomeController as home",
      });
});



angular
  .module('connectFour')
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/", {
        templateUrl: "views/join.html",
        controller: "HomeController as home",
      })
      .when("/gameplay", {
        templateUrl: "views/gameplay.html",
        controller: "HomeController as home",
      })
      .when("/gameover", {
        templateUrl: "views/gameover.html",
        controller: "HomeController as home",
      });
});

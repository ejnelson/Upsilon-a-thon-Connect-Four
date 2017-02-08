angular.module("myApp").controller("LoginController", ['$location',
  function($location) {
    console.log('login controller loaded')
    var vm=this;
    vm.login = function () {
      $location.path('/inbox');
      console.log('logged in');
    }
  }
]);

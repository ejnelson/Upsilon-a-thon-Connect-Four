angular.module("myApp").controller("LoginController", ['$location','$http',
  function($location,$http) {
    console.log('login controller loaded')
    var vm=this;

    vm.login = function() {
      console.log('logging in');
      $http.post('/login', {
        username: vm.username,
        password: vm.password
      }).then(function(response){
        console.log('now lets go to the inbox');
        $location.path('/inbox');

      }, function(error) {
        console.log('error loggin in', error);
      });
    };



  }
]);

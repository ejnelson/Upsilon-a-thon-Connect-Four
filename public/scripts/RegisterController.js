angular.module("myApp").controller("RegisterController", ['$location','$http',
  function($location,$http) {
    console.log('register controller loaded')
    var vm=this;

    vm.register = function() {
        console.log('registering');
        $http.post('/register', {
          username: vm.username,
          password: vm.password
        }).then(function(response){
          console.log(response);
          $location.path('/inbox');
        }, function(error) {
          console.log('error loggin in', error);
        });
      };


  }
]);

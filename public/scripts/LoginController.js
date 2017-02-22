angular.module("myApp").controller("LoginController", [
  '$location','$http','usernameStoreService','themeService','notificationService',
  function($location,$http,usernameStoreService,themeService,notificationService) {
    console.log('login controller loaded')
    var vm=this;

    notificationService.askForPermision();
    
    vm.login = function() {


      console.log('logging in');
      usernameStoreService.storeUsername(vm.username);
      $http.post('/login', {
        username: vm.username,
        password: vm.password
      }).then(function(response){
        console.log('now lets go to the inbox');
        $location.path('/inbox');

      }, function(error) {
        // alertify.alert('Wrong username or password');
        alertify.alert('Wrong username or password');

        console.log('error loggin in', error);
      });
    };


    vm.forgot=function(){
      alertify.alert('TOO BAD');
    }


  }
]);

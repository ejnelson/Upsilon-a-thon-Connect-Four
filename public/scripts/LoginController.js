angular.module("myApp").controller("LoginController", [
  '$location','$http','usernameStoreService','themeService','notificationService',
  function($location,$http,usernameStoreService,themeService,notificationService) {
    console.log('login controller loaded')
    var vm=this;

    // Notification.permission === "granted";
        // If it's okay let's create a notification
      //   notificationService.askForPermision();
      // }
    // notificationService.askForPermision();

    vm.login = function($event) {
      $event.preventDefault();
      // $event.stopPropagation();
// alertify.alert('log in');


      console.log('logging in');
      usernameStoreService.storeUsername(vm.username);
      $http.post('/login', {
        username: vm.username,
        password: vm.password
      }).then(function(response){
        console.log('now lets go to the inbox');
        $location.path('/inbox');

      }, function(error) {
        alertify.alert('Wrong username or password');

        console.log('error loggin in', error);
      });

    };


    vm.forgot=function($event){
      $event.preventDefault();
      alertify.alert('TOO BAD');
    }


  }
]);

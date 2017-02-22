angular.module('myApp').service('notificationService', function ($http,$location) {

  this.askForPermision=function(){
    Notification.requestPermission().then(function(result) {
      console.log(result);
    });
  }
});

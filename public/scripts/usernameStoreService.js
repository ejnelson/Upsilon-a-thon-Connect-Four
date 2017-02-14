angular.module('myApp').service('usernameStoreService', function ($http,$location) {
  var userWhoIsLoggedIn
      console.log('username store service loaded');

    this.storeUsername=function(username){
      userWhoIsLoggedIn=username;
      console.log('user who is logged in: ',userWhoIsLoggedIn)
    }
    this.returnUsername=function(){
      return new Promise(function(resolve,reject){
        resolve(userWhoIsLoggedIn);
      });
    }
});

angular.module("myApp").controller("PhotoController", ['$location','$http','$scope','roomViewService','usernameStoreService',
  function($location,$http,$scope,roomViewService,usernameStoreService) {
    console.log('photo controller loaded');
    var vm=this;
    vm.messages=[];
    vm.backToRoom=function(){
      $location.path('/roomView');
    }
    roomViewService.findRoomData().then(function(res){
        console.log('this is the id of the room we want',res._id);
      $http({
        method: 'GET',
        url: '/getPhotos/'+res._id}
      ).then(function(resp){
          console.log('returned from data search with',resp);
          vm.messages=resp.data.messages;
        }).catch(function(err){
          console.log("error getting contacts",err);
        });

    });




  }
]);

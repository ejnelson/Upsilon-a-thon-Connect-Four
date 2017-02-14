angular.module('myApp').service('roomViewService', function ($http,$location) {
      console.log('roomView store service loaded');
      var roomId=null;

    this.findRoomData=function(){
      console.log(roomId);
      return $http({
        method: 'GET',
        url: '/roomData/'+roomId}
        ).then(function(res){
          console.log('returned from data search with',res);
          return res.data;
          // vm.convoList=res.data;
        }).catch(function(err){
          console.log("error getting contacts",err);
        });


    }

      this.setRoomId=function(id){
        roomId=id;
      }
    // this.storeUsername=function(username){
    //   userWhoIsLoggedIn=username;
    //   console.log('user who is logged in: ',userWhoIsLoggedIn)
    // }
    // this.returnUsername=function(){
    //   return new Promise(function(resolve,reject){
    //     resolve(userWhoIsLoggedIn);
    //   });
    // }



});

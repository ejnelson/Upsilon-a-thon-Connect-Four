angular.module('myApp').service('getRoomPicsService', function ($http,$location) {
      console.log('get Room Pics store service loaded');
      var roomId=null;

      this.getRoomPics=function(roomUsersArray){

        return $http({
          method: 'GET',
          url: '/getContacts/getRoomPics',
          params: {
             roomUsers: JSON.stringify(roomUsersArray)
            // contacts: contactsArray
          }}
          ).then(function(res){
            console.log('returned from data search with',res);
            return res.data;
          }).catch(function(err){
            console.log("error getting contacts",err);
          });
      };




});

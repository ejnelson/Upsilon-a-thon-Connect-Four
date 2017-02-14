angular.module('myApp').service('editProfileService', function ($http,$location) {

      console.log('edit Profile service loaded');
      //some way to send a post request to our server
      // this.getPeople=function(){
      //   console.log('get people');
      //   return $http.get('/person').then(function(res){
      //     console.log(res);
      //     return res.data;
      //   }).catch(function(err){
      //     console.log("error getting people",err);
      //   });
      // };
      //
      // this.addPerson=function(first,last,home,movie){
      //   var data={firstName:first,lastName:last,homeTown:home,favMovie:movie};
      //   console.log('get people');
      //   $http.post('/person',data).then(function(res){
      //     console.log('successful add');
      //   }).catch(function(err){
      //     console.log("error adding people",err);
      //   });
      // };

      this.getProfile=function(){
        return $http.get('/getProfileInfo').then(function(res){
              return res;
              console.log(vm.userprofile);
          }).catch(function(err){
            console.log("error getting people",err);
          });

      };

      this.updateProfile=function (first,last,email,bio){
          var data={
            firstName:first,
            lastName:last,
            email:email,
            bio:bio
          }
        return $http.put('/getProfileInfo',data).then(function(res){
          console.log('return from user check',res);
          return res.data;
        }).catch(function(err){
          console.log("error changing person",err);
        });
      }
      // this.deletePerson=function(id){
      //   console.log('Delete person');
      //   $http.delete('/person/'+id).then(function(res){
      //     console.log(res);
      //   }).catch(function(err){
      //     console.log("error deleting person",err);
      //   });
      // };

});

angular.module("myApp").controller("InboxController", ['$location','$http','addContactService','getContactService','editProfileService','usernameStoreService','roomViewService',
  function($location,$http,addContactService,getContactService,editProfileService,usernameStoreService,roomViewService) {
    console.log('Inbox controller loaded');
    var vm=this;
    vm.userUsername='';
    // vm.convoList=[
    //   {imgUrl:"/images/ollie.jpg",roomPeople:"Ollie",messagePreview:"hello I'm Ollie"},
    //   {imgUrl:"/images/erikface.jpeg",roomPeople:"Erik one",messagePreview:"hello I'm erik 1"},
    //   {imgUrl:"/images/erik-headshot.jpg",roomPeople:"Erik two",messagePreview:"hello I'm erik 2"},
    // ]

    vm.findRooms=function(){
      usernameStoreService.returnUsername().then(function(res){
        vm.userUsername=res;
        console.log('here is my username',res);
        $http({
          method: 'GET',
          url: '/newRoom'}
          ).then(function(res){
            // console.log('returned from data search with',res);
            // res.data;
            vm.convoList=res.data;
          }).catch(function(err){
            console.log("error getting contacts",err);
          });

      }) ;
    };

    vm.goToRoomView=function(id){
      console.log('this is the room we are going to',id)
      roomViewService.setRoomId(id);
      $location.path('/roomView');
    }
    // vm.goToPhotoView=function(id){
    //   console.log('this is the room we are going to',id)
    //   roomViewService.setRoomId(id);
    //   $location.path('/photoView');
    // }

    // vm.contactList=[
    //   {imgUrl:"/images/ollie.jpg",username:"Ollie"},
    //   {imgUrl:"/images/erikface.jpeg",username:"Erik one"},
    //   {imgUrl:"/images/erik-headshot.jpg",username:"Erik two"},
    // ]
    vm.addConvo=function(){
      $location.path('/newConvo');

    }
    vm.initAddConvo=function(){
      getContactService.getContacts().then(function(response){
        console.log('response from getting contacts',response);
        getContactService.getContactsData(response.contacts).then(function(res){
          vm.contactList=res;
          console.log('contact service came back with',res);
        });

      }, function(error) {
        console.log('getting contacts resulted in this error:', error);
      })
    }

    vm.contactsToAddList=[];
    vm.contactsIds=[];
    vm.contactsUsernames=[];
    vm.addUserToAddList=function(contact){
      console.log('awesome add this person');
      vm.contactsToAddList.push(contact);
    }

    vm.createNewRoom=function(){
      vm.contactsToAddList.forEach(function(contact){
        vm.contactsIds.push(contact._id);
        vm.contactsUsernames.push(contact.username);
      });
      usernameStoreService.returnUsername().then(function(username){
        vm.contactsUsernames.push(username);

        console.log('adding to room'+vm.contactsIds+' me');
        $http.post('/newRoom', {
          users: vm.contactsIds,
          usernames:vm.contactsUsernames
        }).then(function(response){
          console.log(response);
          // $location.path('/inbox'); //replace with path to new Room!!!!
          //   alertify.alert('Thanks for registering, here is your inbox.');
        }, function(error) {
          console.log('error registering in', error);
          alertify.alert('ERROR: could not create room');
        });
      });
    }








    vm.addContact=function(){
      $location.path('/newContact');

    }

    vm.newContactToDB=function(){
      addContactService.addContact(vm.newContactInput);
      $location.path('/inbox');
    }
    vm.backToInbox=function(){
      $location.path('/inbox');
    }

    vm.editProfile=function(){
      $location.path('/editProfile');
      // editProfileService.getProfile().then(function(res){
      //   vm.userProfile=res.data[0];
      //   console.log(vm.userProfile);
      //   console.log(vm.userProfile.username);
      // }).catch(function(err){
      //   console.log('error getting profile',err);
      // });

    }

    vm.editInit=function(){
      editProfileService.getProfile().then(function(res){
        vm.userProfile=res.data[0];
        console.log(vm.userProfile);
        console.log(vm.userProfile.username);
        vm.editFirstName=res.data[0].firstName;
        vm.editLastName=res.data[0].lastName;
        vm.editEmail=res.data[0].email;
        vm.editBio=res.data[0].bio;
      }).catch(function(err){
        console.log('error getting profile',err);
      });

    }

    vm.submitNewProfile=function(){
      console.log(vm.editFirstName,vm.editLastName,vm.editEmail,vm.editBio);

      editProfileService.updateProfile(vm.editFirstName,vm.editLastName,vm.editEmail,vm.editBio)
      .then(function(res){
        console.log('result',res);
        $location.path('/inbox');
        alertify.alert('Profile edited successfully');
      }).catch(function(err){
        console.log('error',err);
      });
    }
    vm.cancelNewProfile=function(){
      console.log('cancel');
      $location.path('/inbox');
    }


  }
]);

angular.module("myApp").controller("InboxController", ['$location','$http','addContactService','getContactService','editProfileService','usernameStoreService','roomViewService','Upload','themeService',
  function($location,$http,addContactService,getContactService,editProfileService,usernameStoreService,roomViewService,Upload,themeService) {
    console.log('Inbox controller loaded');
    var vm=this;
    vm.userUsername='';

        themeService.getTheme();
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
          url: '/profilePic'}
          ).then(function(res){
            console.log('this should be the profile url',res.data.imgUrl);
            vm.profilePic=res.data.imgUrl;
          }).catch(function(err){
            console.log("error getting contacts",err);
          });
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
    vm.goToPhotoView=function(id){
      console.log('this is the room we are going to',id)
      roomViewService.setRoomId(id);
      $location.path('/photoView');
    }
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
          vm.goToRoomView(response.data._id);

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
        vm.pic=res.data[0].imgUrl;
      }).catch(function(err){
        console.log('error getting profile',err);
      });

    }

    vm.submitNewProfile=function(){
      console.log(vm.editFirstName,vm.editLastName,vm.editEmail,vm.editBio,vm.editTheme);
        if(vm.file){
          Upload.upload({
              url: '/uploads',
              data: {file: vm.file,
                     firstName:vm.editFirstName,
                     lastName:vm.editLastName,
                     email: vm.editEmail,
                     bio: vm.editBio,
                     theme:vm.editTheme}
          }).then(function (resp) {
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.config.data);
              vm.file=null;
              $location.path('/inbox');
              alertify.alert('Profile edited successfully');
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              vm.file=null;
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        }else{
          $http.put('/uploads',{
                     file: null,
                     firstName:vm.editFirstName,
                     lastName:vm.editLastName,
                     email: vm.editEmail,
                     bio: vm.editBio,
                     theme:vm.editTheme
          }).then(function (resp) {
              vm.file=null;
              $location.path('/inbox');
              alertify.alert('Profile edited successfully');
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              vm.file=null;

          });
        }

      // editProfileService.updateProfile(vm.editFirstName,vm.editLastName,vm.editEmail,vm.editBio)
      // .then(function(res){
      //   console.log('result',res);
      //   $location.path('/inbox');
      //   alertify.alert('Profile edited successfully');
      // }).catch(function(err){
      //   console.log('error',err);
      // });
    }
    vm.logOutProfile=function(){
      $http.delete('/login').then(function(response){
        console.log('now lets go to the log in');
        $location.path('/');
        alertify.alert('Logged out, come back soon!');
      }, function(error) {
        // alertify.alert('Wrong username or password');
        alertify.alert('Wrong username or password');

        console.log('error loggin in', error);
      });
    }

    vm.cancelNewProfile=function(){
      console.log('cancel');
      $location.path('/inbox');
    }


  }
]);

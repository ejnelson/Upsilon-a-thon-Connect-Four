angular.module("myApp").controller("InboxController", ['$location','addContactService','getContactService',
  function($location,addContactService,getContactService) {
    console.log('Inbox controller loaded');
    var vm=this;

    vm.convoList=[
      {imgUrl:"/images/ollie.jpg",roomPeople:"Ollie",messagePreview:"hello I'm Ollie"},
      {imgUrl:"/images/erikface.jpeg",roomPeople:"Erik one",messagePreview:"hello I'm erik 1"},
      {imgUrl:"/images/erik-headshot.jpg",roomPeople:"Erik two",messagePreview:"hello I'm erik 2"},
    ]
    // vm.contactList=[
    //   {imgUrl:"/images/ollie.jpg",username:"Ollie"},
    //   {imgUrl:"/images/erikface.jpeg",username:"Erik one"},
    //   {imgUrl:"/images/erik-headshot.jpg",username:"Erik two"},
    // ]
    vm.addConvo=function(){
      $location.path('/newConvo');
      getContactService.getContacts().then(function(response){
        console.log('response from getting contacts',response);
        getContactService.getContactsData(response.contacts).then(function(res){
          vm.contactList=res.contacts;
        });

      }, function(error) {
        console.log('getting contacts resulted in this error:', error);
      })
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
  }
]);

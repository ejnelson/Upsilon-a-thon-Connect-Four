angular.module("myApp").controller("InboxController", ['$location','$html','addContactService'
  function($location,$html,addContactService) {
    console.log('Inbox controller loaded');
    var vm=this;

    vm.convoList=[
      {imgUrl:"/images/ollie.jpg",roomPeople:"Ollie",messagePreview:"hello I'm Ollie"},
      {imgUrl:"/images/erikface.jpeg",roomPeople:"Erik one",messagePreview:"hello I'm erik 1"},
      {imgUrl:"/images/erik-headshot.jpg",roomPeople:"Erik two",messagePreview:"hello I'm erik 2"},
    ]
    vm.addConvo=function(){
      $location.path('/newConvo');
    }
    vm.addContact=function(){
      $location.path('/newContact');
    }

    vm.newContactToDB=function(){
      $location.path('/inbox');

        // console.log('change '+first+' '+last+' '+id);
        // addContactService.addContact(vm.newContactInput);

    }
  }
]);

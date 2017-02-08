angular.module("myApp").controller("InboxController", [
  function() {
    console.log('Inbox controller loaded');
    var vm=this;
    vm.convoList=[
      {imgUrl:"/images/ollie.jpg",roomPeople:"Ollie",messagePreview:"hello I'm Ollie"},
      {imgUrl:"/images/erikface.jpeg",roomPeople:"Erik one",messagePreview:"hello I'm erik 1"},
      {imgUrl:"/images/erik-headshot.jpg",roomPeople:"Erik two",messagePreview:"hello I'm erik 2"},
    ]


  }
]);

angular.module("myApp").controller("RoomController", ['$location','$http','$scope','roomViewService','usernameStoreService','uploadService','Upload','$document','$timeout',
  function($location,$http,$scope,roomViewService,usernameStoreService,uploadService,Upload,$document,$timeout) {
    console.log('Room controller loaded');
    var vm=this;
    var currentSocket=null;

    vm.photoView=function(){
      $location.path('/photoView');
    }
    //getting username for getting messages aligned right
    usernameStoreService.returnUsername().then(function(user){
      vm.roomUser=user;
    })

    vm.getMessages=function(){

      roomViewService.findRoomData().then(function(res){
        vm.messages=res.messages;
        console.log('this is the id of the room we want',res._id);

        let socket_connect = function (room) {
          console.log('sockets is connecting to',room);
          return io({
              query: 'r_var='+room,
              'forceNew': true
              // reconnection: true,
              // reconnectionDelay: 1000,
              // reconnectionDelayMax : 5000,
              // reconnectionAttempts: Infinity,
              // 'reconnection limit': 3000,
              // 'max reconnection attempts': Number.MAX_VALUE,
              // 'connect timeout':7000
          });
        }

        let roomId = res._id;
         let socket      = socket_connect(res._id);

        // currentSocket=socket;
        // socket.emit('chat message', 'hello room #'+roomId);
        socket.on('chat message', function(oneMessage){
           vm.messages.push(oneMessage);
           console.log(vm.messages);
           console.log(oneMessage);
           $scope.$apply();
       });
       vm.backToInbox=function(){
         socket.emit('force disconnect')
         socket.disconnect();
         console.log('disconnected');
         $location.path('/inbox');
       }


       vm.send=function($event,msg){
         $event.preventDefault();
         usernameStoreService.returnUsername().then(function(userRes){
           roomViewService.returnRoomId().then(function(roomIdRes){



            // upload on file select or drop
            vm.upload = function (file) {
              console.log('this is the message being sent',msg);
                Upload.upload({
                    url: '/',
                    data: {file: file,
                           roomId:roomIdRes,
                           date:new Date(),
                           sender: userRes,
                           text: msg}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.config.data);
                    vm.file=null;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    vm.file=null;
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }


                if (vm.file) {
                 vm.upload(vm.file);
               }else{


                 var messageObject={
                   roomId:roomIdRes,
                   text:msg,
                   date:new Date(),
                   sender: userRes,
                   pic:null
                 }
                 console.log(messageObject);
                 socket.emit('chat message', messageObject);
               }
           });
         });

        //  var data={message:vm.message};
        //  vm.messages.push(vm.message);

         vm.message='';
         console.log(vm.messages);
       }//end of send
     });//end of then promise
   }// end of getmessages function

  }
]);

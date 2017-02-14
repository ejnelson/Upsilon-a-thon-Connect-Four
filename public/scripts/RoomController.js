angular.module("myApp").controller("RoomController", ['$location','$http','$scope','roomViewService',
  function($location,$http,$scope,roomViewService) {
    console.log('Room controller loaded');
    var vm=this;
    var currentSocket=null;
    // vm.messages=['hello','my','name','is','erik'];





    vm.backToInbox=function(){
      currentSocket.disconnect();
      currentSocket.emit('forceDisconnect');

      console.log('disconnected');
      $location.path('/inbox');
    }
    vm.getMessages=function(){
      roomViewService.findRoomData().then(function(res){
        vm.messages=res.messages;
        console.log('this is the id of the room we want',res._id);
        // var socket = io.connect({query:'r_var='+res._id});


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
        socket.emit('chat message', 'hello room #'+roomId);
        socket.on('chat message', function(oneMessage){
           vm.messages.push(oneMessage);
           console.log(vm.messages);
           $scope.$apply();
       });
       vm.backToInbox=function(){
         socket.emit('force disconnect')
         socket.disconnect();
         console.log('disconnected');
         $location.path('/inbox');
       }

       vm.send=function($event){

         $event.preventDefault();
         console.log(vm.message);
         socket.emit('chat message', vm.message);
        //  var data={message:vm.message};
        //  vm.messages.push(vm.message);
         vm.message='';
           console.log(vm.messages);
       }





        // var socket = io.connect('/');
        // var socket = io.connect('/' , {query: 'joinServerParameters=' + JSON.stringify(res._id)  });
        // // socket.emit('connectToRoom', res._id);
        // vm.send=function($event){
        //   $event.preventDefault();
        //
        //
        //   console.log(vm.message);
        //   vm.messages.push(vm.message);
        //   socket.emit('chat message', vm.message);
        //  //  var data={message:vm.message};
        //  //  vm.messages.push(vm.message);
        //   vm.message='';
        //   console.log(vm.messages);
        // }
        // socket.on('chat message', function(oneMessage){
        //   vm.messages.push(oneMessage);
        //   console.log(vm.messages);
        //   $scope.$apply();
        // };
      });
    // }

    // var socket_connect = function (room) {
    //   return io('localhost:3000', {
    //       query: 'r_var='+room
    //   });
    // }
    //
    // var random_room = Math.floor((Math.random() * 2) + 1);
    // var socket      = socket_connect(random_room);
    //
    // socket.emit('chat message', 'hello room #'+random_room);

// var socket = io.connect();

    // vm.joinRoom=function(userId){  //same as vm.getMessages===runs on page load
    //   console.log(userId);
    //    vm.first=0; //kills overlay
    //

    //
    //   socket.on('chat message', function(oneMessage){
    //     vm.messages.push(oneMessage);
    //     console.log(vm.messages);
    //     $scope.$apply();
    //   });
    }

  }
]);

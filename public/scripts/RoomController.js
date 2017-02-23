angular.module("myApp").controller("RoomController", ['$location','$http','$scope','roomViewService','usernameStoreService','uploadService','Upload','$document','$timeout','editProfileService','getRoomPicsService','giphyService',
  function($location,$http,$scope,roomViewService,usernameStoreService,uploadService,Upload,$document,$timeout,editProfileService,getRoomPicsService,giphyService) {
    console.log('Room controller loaded');
    var vm=this;
    var currentSocket=null;
    var div=document.getElementById("chatMessages");
    vm.gifToSend=null;


    vm.onEnd = function(){
                    $timeout(function(){
                      div.scrollTop=div.scrollHeight;
                        // alert('all done');
                    }, 2);
                };

    vm.photoView=function(){
      $location.path('/photoView');
    }
    //getting username for getting messages aligned right

    editProfileService.getProfile().then(function(user){

      vm.roomUser=user.data[0];
      console.log('this is the room user',vm.roomUser);
    });



    vm.getMessages=function(){

      roomViewService.findRoomData().then(function(res){
        console.log('users in room',res.users)
        vm.messages=res.messages;
          getRoomPicsService.getRoomPics(res.usernames).then(function(resp){
            console.log('here are the room users',resp);
              vm.messages.forEach(function(message){
                var userArray=[]
                resp.forEach(function(user){
                  userArray.push(user.username);
                });
                // console.log('sender',message.sender);
                var userIndex=userArray.indexOf(message.sender);
                // console.log('user',resp[userIndex]);
                if(resp[userIndex]){
                  message.userPic=resp[userIndex].imgUrl;
                  // console.log('userPic',message.userPic);
                  $scope.apply;
                }
              });


            vm.onEnd();
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

               var userArray=[]
               resp.forEach(function(user){
                 userArray.push(user.username);
               });
               var userIndex=userArray.indexOf(oneMessage.sender);
               if(resp[userIndex]){
                 oneMessage.userPic=resp[userIndex].imgUrl;
               }
               vm.messages.push(oneMessage);

               console.log(vm.messages);
               console.log(oneMessage.sender);
               console.log(vm.roomUser.username);


              $scope.$apply();



               vm.onEnd();
               if (Notification.permission === "granted"&&oneMessage.sender!=vm.roomUser.username) {
                   // If it's okay let's create a notification
                   var notification = new Notification(oneMessage.sender,{body:oneMessage.text,icon:'/images/blackbulletstransparent.png'});
                 }
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
                            //  date:new Date(),
                             gif:vm.gifToSend,
                             sender: userRes,
                             text: msg}
                  }).then(function (resp) {
                      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.config.data);
                      vm.file=null;
                      vm.gifToSend='';
                  }, function (resp) {
                      console.log('Error status: ' + resp.status);
                  }, function (evt) {
                      vm.file=null;
                      vm.gifToSend='';
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
                    //  date:new Date(),
                     sender: userRes,
                     pic:null,
                     gif:vm.gifToSend
                   }
                   console.log(messageObject);
                   socket.emit('chat message', messageObject);
                   vm.gifToSend='';
                 }
             });
           });

          //  var data={message:vm.message};
          //  vm.messages.push(vm.message);

           vm.message='';
           console.log(vm.messages);
         }//end of send


           vm.profileInfo=function(sender){
             console.log('getting profile info',sender);
             $http.get('/getSenderInfo/'+sender).then(function(res){
                   console.log(res);
                   vm.show=true;
                   vm.senderPic=res.data[0].imgUrl;
                   vm.senderUsername=res.data[0].username;
                   vm.senderFirstName=res.data[0].firstName;
                   vm.senderLastName=res.data[0].lastName;
                   vm.senderEmail=res.data[0].email;
                   vm.senderBio=res.data[0].bio;
               }).catch(function(err){
                 console.log("error getting people",err);
               });



           }

           vm.hideSenderStuff=function(){
              vm.show=false;
           }


           vm.showGifStuff=function($event){
             $event.preventDefault();
             vm.gifShow=true;
           }

            vm.searchForGif=function($event){
              $event.preventDefault();
              giphyService.searchingForGif(vm.gifSearchInput).then(function(resp){
                console.log(resp);
                vm.gifList=resp;
              });
            }

            vm.addGif=function(gifUrl){
              vm.gifToSend=gifUrl;
              vm.gifShow=false;
              console.log('gif to send',vm.gifToSend);
            }

            vm.cancelGifSearch=function($event){
              $event.preventDefault();
              vm.gifShow=false;
            }



       }).then(function(){
         div.scrollTop=9999999999;
        //  console.log('fired scroll stuff', div.scrollTop, div.scrollHeight );
       });//end of then promise

    }).then(function(){
      div.scrollTop=9999999999;
     //  console.log('fired scroll stuff', div.scrollTop, div.scrollHeight );
    });//end of then promise from get room users
   }// end of getmessages function

  }
]);

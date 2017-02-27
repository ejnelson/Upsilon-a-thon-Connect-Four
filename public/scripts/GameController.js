angular.module("myApp").controller("GameController", ['$location','$http','addContactService','getContactService','editProfileService','usernameStoreService','roomViewService','Upload','themeService','$scope',
  function($location,$http,addContactService,getContactService,editProfileService,usernameStoreService,roomViewService,Upload,themeService,$scope) {
    console.log('game controller loaded');

    var vm=this;
    vm.playerList=new Array;
    vm.user=null;
    vm.gameStart=false;
    vm.countDownShow=false;
    vm.gameOver=false;


    usernameStoreService.returnUsername().then(function(user){
      console.log('user that needs to join',user);
      vm.user=user;


    roomViewService.findRoomData().then(function(res){

      let socket_connect = function (room) {
        console.log('sockets is connecting to',room);
        return io({
            query: 'r_var='+room,
            'forceNew': true
        });
      }

      let roomId = res._id+'game';//will be res._id;
       let socket      = socket_connect(roomId);


      socket.on('getUsers',function(){
        if(vm.gameStart==false&&vm.countDownShow==false){
          if(vm.playerList.length==0){
            socket.emit('user join', vm.user);
          }
        }
      });

      socket.on('currentUsers',function(userList){

          angular.merge(vm.playerList,userList);
          console.log('user list',userList);
          console.log('vm.playerlist',vm.playerList);
          $scope.$apply();
          players=vm.playerList.length;

          for (var i=0;i<vm.playerList.length;i++) {
              ready[vm.playerList[i]]=false;
               scores[vm.playerList[i]]=0;

          }

          $scope.$apply();

      });
      // currentSocket=socket;
      // socket.emit('chat message', 'hello room #'+roomId);
      var scores={};
      var players=null;
      var ready={};
      socket.on('user join', function(user){
        console.log('userjoined',user);

             vm.playerList.push(user);
             players=vm.playerList.length;
             console.log(vm.playerList);
             $scope.$apply();
             for (var i=0;i<vm.playerList.length;i++) {
                ready[vm.playerList[i]]=false;
                 scores[vm.playerList[i]]=0;

             }
             if(vm.playerList[vm.playerList.length-1]!=vm.user){
               console.log('sending list',vm.playerList);
               socket.emit('currentUsers',vm.playerList);
             }

      });
      socket.on('leaveGame',function(user){
        var index=vm.playerList.indexOf(user);
        vm.playerList.splice(index,1);
      });

      vm.click=function(player){

        if(vm.gameStart){
          socket.emit('click',player);
        }else{
          if(player==vm.user){
            if(ready[player]==true){
              ready[player]=false;
              socket.emit('not ready',vm.user);
            }else{
            socket.emit('ready',vm.user);
            ready[player]=true;
            }
          }
        }
      }
      vm.countDown=function(){
        vm.countDownShow=true;
        vm.timeint=5;
        $scope.$apply();
        var time=setInterval(function(){
          console.log('timer');
          vm.timeint--;
          $scope.$apply();
          if(vm.timeint<=0){
            clearInterval(time);
            vm.countDownShow=false;
            $scope.$apply();
          }
        },1000);
        vm.gameStart=true;
        rateIncreaser();
      }
      var myVar;
      function rateIncreaser() {
          myVar = setInterval(increaseRate, 1000);
      }
      var gameChangeRate=0
      var increaseRate=function(){
        gameChangeRate=gameChangeRate+0.5;
        console.log('gameCHangeRate',gameChangeRate);
      };

      var countReady=0;
      socket.on('user ready',function(player){
        ready[player]=true;
        $scope.$apply();
        countReady++;
        if(countReady>=vm.playerList.length&&vm.playerList.length>1){
          vm.countDown();
        }
      });
      socket.on('user not ready',function(player){
        ready[player]=false;
        $scope.$apply();
        countReady--;
      });





      socket.on('click',function(player){

        for (var key in scores) {
          if (scores.hasOwnProperty(key)) {
            console.log(key + " -> " + scores[key]);
            scores[key]=scores[key]-(gameChangeRate/(players-1));
          }
        }

        scores[player]=scores[player]+(gameChangeRate/(players-1))+gameChangeRate;
        $scope.$apply();

        for(var playerScore in scores){
          console.log('playerscore',scores[playerScore]);
          if(scores[playerScore]>(100-(100/players))){
            vm.gameOver=true;
            vm.winner=playerScore;
            clearInterval(myVar);
            $scope.$apply();
          }
        }
      });
      vm.playAgain=function(){
        vm.gameStart=false;
        vm.countDownShow=false;
        vm.gameOver=false;
        for(var player in ready){
          ready[player]=false;
        };
        for(var player in scores){
          scores[player]=0;
        }
        countReady=0;
        gameChangeRate=0;
        clearInterval(myVar);
      };
      vm.playerStyle=function(player){
        if(scores[player]){
          var calculate=scores[player]+(100/(players));
        }else{
          var calculate=(100/(players));
        }
        if(ready[player]){
          var bg='green';
        }else{
          var bg='yellow';
        }
        return {backgroundColor:bg, height: calculate+"%"};
      }
      vm.goToConvo=function(){
        if(vm.gameStart==false&&vm.countDownShow==false){
          socket.emit('leaveGame',vm.user);
          $location.path('/roomView');
          clearInterval(myVar);
        }
      }


    });//end roomview service lookup

  });//end userprofile search

}]);

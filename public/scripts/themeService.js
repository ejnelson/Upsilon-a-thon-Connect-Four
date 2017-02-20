angular.module('myApp').service('themeService', function ($http,$location) {




  this.getTheme=function(){
    $http.get('/getProfileInfo').then(function(res){
          var theme=res.data[0].theme;
          console.log('theme',res.data[0].theme);
          switch(theme){
            case "Default":
                var main= '#1f0077';
                var dark='#1a0055';
                break;
            case 'Go':
                var main='rgb(24, 142, 0)';
                var dark='rgb(20, 85, 0)';
                break;
            case 'Blood':
                var main='red';
                var dark='rgb(97, 1, 1)';
                break;
            case "Darkness":
                var main='black';
                var dark='rgb(46, 46, 46)';
                break;
            case '50 shades':
                var main='grey';
                var dark='rgb(47, 47, 47)';
                break;
            case 'Dabadee-Dabadie':
                var main='blue';
                var dark='darkBlue';
                break;
          }





          var sheet = document.createElement('style')
          sheet.innerHTML =
          "header{background-color:"+main+"}"+
          ".newContactMain{background-color:"+main+";}"+
          "#searchForContact{background-color:"+main+";}"+
          "#editProfile{background-color:"+main+";}"+
          "#messageSend{background-color:"+main+";}"+
          ".loginMain{background-color:"+main+";}"+
          "#roomPicPlaceholder{color:"+main+";}"+
          "#senderProfileText{background-color:"+main+";}"+


          "#loginSubmit{background-color:"+dark+"}"+
          "#regSubmit{background-color:"+dark+";}"+
          ".profileEditButton{background-color:"+dark+"}";
          document.body.appendChild(sheet);
        }).catch(function(err){
          console.log("error getting people",err);
        });
  };

});

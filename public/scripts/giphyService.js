angular.module('myApp').service('giphyService', function ($http,$location) {

      console.log('giphy service loaded');
      var api='http://api.giphy.com/v1/gifs';

      this.searchingForGif=function(search){
      // vm.searchGifFunction=function(){
        console.log('search clicked', search);
        return $http({
          url:api+'/search',
          type:'GET',
          params:{
                  api_key:'dc6zaTOxFJmzC',
                  q: search
                }
        }).then(function(res){
            console.log(res.data.data);
              return res.data.data;
            console.log(res);
          }).catch(function(err){
            console.log('error');
          });
      }


});

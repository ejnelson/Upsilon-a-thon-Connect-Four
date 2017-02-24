angular.module("myApp").controller("GameController", ['$location','$http','addContactService','getContactService','editProfileService','usernameStoreService','roomViewService','Upload','themeService','$scope',
  function($location,$http,addContactService,getContactService,editProfileService,usernameStoreService,roomViewService,Upload,themeService,$scope) {
    console.log('game controller loaded');
    var vm=this;


    var vm=this;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 75;
    var paddleWidth = 10;
    var paddleOneX = 0;
    var paddleTwoX = canvas.width-10;
    var paddleOneY = canvas.height/2;
    var paddleTwoY = canvas.height/2;
    var rightup = false;
    var leftup = false;
    var rightdown = false;
    var leftdown = false;

    var score1 = 0;
    var score2 = 0;

    document.getElementById("myCanvas").addEventListener("onmousedown", mouseDownHandler, false);
    document.getElementById("myCanvas").addEventListener("onmouseup", mouseUpHandler, false);
    //document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("ontouchstart", mouseDownHandler, false);
    document.addEventListener("ontouchend", mouseUpHandler, false);
    function mouseDownHandler() {
console.log('click');
            leftup = true;

    }
    function mouseUpHandler() {

          leftup = false;

    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    //document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if(e.keyCode == 38) {
            rightup = true;
        }
        else if(e.keyCode == 87) {
            leftup = true;
        }
        else if(e.keyCode == 40) {
            rightdown = true;
        }
        else if(e.keyCode == 83) {
            leftdown = true;
        }
    }
    function keyUpHandler(e) {
      if(e.keyCode == 38) {
          rightup = false;
      }
      else if(e.keyCode == 87) {
          leftup = false;
      }
      else if(e.keyCode == 40) {
          rightdown = false;
      }
      else if(e.keyCode == 83) {
          leftdown = false;
    }
    }
    //function mouseMoveHandler(e) {
    //    var relativeX = e.clientX - canvas.offsetLeft;
    //    if(relativeX > 0 && relativeX < canvas.width) {
    //        paddleX = relativeX - paddleWidth/2;
    //    }
    //}


    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddleOne() {
        ctx.beginPath();
        ctx.rect(paddleOneX, paddleOneY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddleTwo() {
        ctx.beginPath();
        ctx.rect(paddleTwoX, paddleTwoY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawScore1() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score1, 8, 20);
    }
    function drawScore2() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score2, canvas.width-65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddleOne();
        drawPaddleTwo();
        drawScore1();
        drawScore2();

        if(y + dy > canvas.height || y + dy < 0) {
            dy = -dy;
        }
        if(y + dy < paddleWidth) {
            dy = -dy;
        }
        else if(x + dx > canvas.width-paddleWidth || x + dx < paddleWidth) {
            if(x<canvas.width/2){
                if(y > paddleOneY && y < paddleOneY + paddleHeight) {
                  dx = -dx;
                }
                else {
                    score2++;


                          x = canvas.width/2;
                          y = canvas.height-30;
                          dx = 3;
                          dy = -3;
                          paddleOneY = canvas.height/2;
                          paddleTwoY = canvas.height/2;

                    }
            }else{
              if(y > paddleTwoY && y < paddleTwoY + paddleHeight) {
                dx = -dx;
              }
              else {
                score1++;


                      x = canvas.width/2;
                      y = canvas.height-30;
                      dx = 3;
                      dy = -3;
                      paddleOneY = canvas.height/2;
                      paddleTwoY = canvas.height/2;
                  }

            }
        }

        if(rightup && paddleOneY < canvas.height-paddleHeight) {
            paddleTwoY -= 7;
        }
        else if(rightdown && paddleOneY > 0) {
            paddleTwoY += 7;
        }
        if(leftup && paddleTwoY < canvas.height-paddleHeight) {
            paddleOneY -= 7;
        }
        else if(leftdown && paddleTwoY > 0) {
            paddleOneY += 7;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    draw();

}]);

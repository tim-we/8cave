function fullScreen8cave() {
  if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
    var gameframe = document.getElementById("game_frame");
    
    // go full-screen
    if (gameframe.requestFullscreen) {
        gameframe.requestFullscreen();
    } else if (gameframe.webkitRequestFullscreen) {
        gameframe.webkitRequestFullscreen();
    } else if (gameframe.mozRequestFullScreen) {
        gameframe.mozRequestFullScreen();
    } else if (gameframe.msRequestFullscreen) {
        gameframe.msRequestFullscreen();
    }
  }
  else {
    alert('Sorry but your device does not support the fullscreen mode :/');
  }
}

function FShandler() {
  var gameframe = document.getElementById("game_frame");

  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {   
    //css fix:
    gameframe.setAttribute("class","fullscreenFIX");
  }
  else { //document.fullscreenElement==null
    gameframe.setAttribute("class",""); 
  }
}

document.addEventListener("fullscreenchange", FShandler);
document.addEventListener("webkitfullscreenchange", FShandler);
document.addEventListener("mozfullscreenchange", FShandler);
document.addEventListener("MSFullscreenChange", FShandler);

var AP_highscore = false;

function highscore() {
  var gameframe = document.getElementById("game_frame");
  var hsframe = document.getElementById("hs_frame");
  
  if(!AP_highscore) {
    gameframe.style.display = "none";
    hsframe.style.display = "block";
  }
  else {
    gameframe.style.display = "block";
    hsframe.style.display = "none";
  }
  
  AP_highscore = !AP_highscore;
}
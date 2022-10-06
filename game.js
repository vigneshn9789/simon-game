 var gamePattern =[];
var buttonColors=["red","blue","green","yellow"]; 
var userClickedPattern = [];
var started=false;
var level= 0;

$("#level-title").click(function () {
  
if (!started) {
  $("#level-title").text("level " + level);
  nextSequence();
  started=true;
}
});

$(".btn").click(function() {
 
  var userChosenColour = $(this).attr("id");

  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour); 
  animatePress(userChosenColour);
 
  checkAnswer(userClickedPattern.length-1);


});   

function nextSequence(){
 userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber= Math.floor(Math.random()*4);
 
 var randomChosencolor = ( buttonColors[randomNumber] );
 gamePattern.push(randomChosencolor);
 $('#' + randomChosencolor).fadeOut(100).fadeIn(100);

playSound(randomChosencolor);


}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
    console.log("success");

     if (gamePattern.length===userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      },1000); 

     }

  } else {
    console.log("restart");
   
    var wromg= new Audio("sounds/wrong.mp3");
    wromg.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
  
    $("#level-title").text("Game Over, Press To Restart");
    startOver();
  }
}

function startOver() {
  level=0;
  gamePattern=[];
  started=false;
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){

$("#" + currentColour).addClass("pressed");
setTimeout( function() {
   $("#" + currentColour).removeClass("pressed");
   }, 100);

 }




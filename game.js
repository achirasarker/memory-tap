var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress
var started = false;
//Create a new variable called level and start at level 0
var level = 0;


//if game hasnt started yet, then it will start at 1st keypress on doucment
$(document).keypress(function() {
  if (!started) {                                    
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {                          
  var userChosenColour = $(this).attr("id");   
  //add that id of clicked button to end of userclickedpattern array
  userClickedPattern.push(userChosenColour);           

  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  //pass in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length - 1);           
});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { 
    console.log("success");

    //If the user got the most recent answer right, then check that they have finished their sequence with another if statement
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
            nextSequence();                            
        }, 1000);
      } 
   } else {
    console.log("wrong");
    //plays wrong sound if wrong answer
    playSound("wrong");                                

    $("body").addClass("game-over");                   
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();                                        
  }
}


function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];                              
  
  //increase the level by 1 every time nextSequence() is called
  level++;         
  // update the h1 with this change in the value of level
  $("#level-title").text("Level " + level);             

  var randomNumber = Math.floor(Math.random() * 4);     
  var randomChosenColour = buttonColours[randomNumber]; 
  //add newcolour to end of gamepattern array
  gamePattern.push(randomChosenColour);                 

  //animate button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
  playSound(randomChosenColour);                                                 
}

//plays sound of clicked buttons
function playSound(name) {                             
  var sound = new Audio("sounds/" + name + ".mp3")
  sound.play();
}

function animatePress(currentColour) {   
  //remove the animated class after 100 milliseconds
  var self = $("#" + currentColour);
  self.addClass("pressed");
  setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
}

 //reset the values of level, gamePattern and started variables
function startOver() {                                 
  level = 0;
  gamePattern = [];
  started = false;
}

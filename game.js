var colors = ["green", "red", "blue", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var gamePattern = [];

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomIndex = Math.floor(Math.random() * 4);
  var randomChosenColor = colors[randomIndex];
  gamePattern.push(randomChosenColor);

  press(randomChosenColor);
  playSound(randomChosenColor);
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);

    startOver();
  }
}

function press(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 200);
}
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  var userChosencolor = $(this).attr("id");
  userClickedPattern.push(userChosencolor);

  playSound(userChosencolor);
  press(userChosencolor);

  checkAnswer(userClickedPattern.length - 1);
});

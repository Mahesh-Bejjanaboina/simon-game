var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userClickedColor = $(this).attr("id");
  userClickedPattern.push(userClickedColor);

  playSound(userClickedColor);
  animatePressed(userClickedColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // 0,1,2,3
  var randomChoosenColor = buttonColors[randomNumber]; // red,blue,green,yellow
  level++;
  $("#level-title").text("Level " + level);
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColor);
  userClickedPattern.length = 0;
  console.log(gamePattern);
}

function playSound(name) {
  if (name == "red") {
    var red = new Audio("sounds/red.mp3");
    red.play();
  } else if (name == "green") {
    var green = new Audio("sounds/green.mp3");
    green.play();
  } else if (name == "blue") {
    var blue = new Audio("sounds/blue.mp3");
    blue.play();
  } else if (name == "yellow") {
    var yellow = new Audio("sounds/yellow.mp3");
    yellow.play();
  }
}

function animatePressed(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 50);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      nextSequence();
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press any key Restart");
    startOver();
  }
}
function startOver() {
  userClickedPattern.length = 0;
  gamePattern.length = 0;
  level = 0;
  started = false;
}

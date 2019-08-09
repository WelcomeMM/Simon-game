//jshint esversion:6


var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

//creat a start condition
$(document).keypress(function () {
    if (!start) {
        document.querySelector("#level-title").innerText = `Level ${level}`;
        nextSequence();
        start = true;

    }
});

//difine the game sequence and play the appropriate sound
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor( Math.random() * 4);
    // return randomNumber;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playSound (randomChosenColour);
}

//check the user down button and play the appropiate sound
$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);

});


function playSound (name) {

    var sound  = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    // document.querySelector("#" + currentColour).classList.add("pressed");
    $("#" + currentColour).addClass("pressed");

    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed", 100);
    });

} 

function checkAnswer (currentlevel) {
    // comparing the last index of the two array
    if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (nextSequence,1000);


            
        }
    } else {
        console.log("wrong");
        const wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over"); //adding flash effect if the user get wrong
        setTimeout( function () { $("body").removeClass("game-over");}, 250);

        $("h1").text(`Game Over at level ${level}, Press Any Key to Restart`);    

        startOver();

    }

    console.log(userClickedPattern);
    console.log(gamePattern);
}


function startOver() {
    gamePattern = [];
    level = 0;
    start = false;
}
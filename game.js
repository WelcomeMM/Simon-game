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
})


//difine the game sequence and play the appropriate sound
function nextSequence() {
    level++;
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

})


function playSound (name) {

    var sound  = new Audio("sounds/" + name + ".mp3");
    sound.play();

}

function animatePress(currentColour) {
    // document.querySelector("#" + currentColour).classList.add("pressed");
    $("#" + currentColour).addClass("pressed");

    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed", 100);
    })

} 

function checkAnswer (currentlevel) {
    //comparing the last index of the two array
    // if (userClickedPattern[currentlevel] === gamePattern[gamePattern.length - 1]) {
    //     console.log("success");
    // } else {
    //     console.log("wrong");
    // }

    var a = false;

    for (i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {      
            a = true;
        } 
        
    }   

    if (a === false) {
        setTimeout(nextSequence, 1000);
        console.log("success");
    } else {
        console.log("wrong");
    }

    console.log(userClickedPattern);
    console.log(gamePattern);
}


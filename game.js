let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let gameStart = false;
let level = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4); 
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash animation
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    
    // Play audio
    playSound(randomChosenColour);

    // Change level label
    level++;
    $("h1").text("Level " + level);

    // Reset user pattern
    userPattern = [];
}

function playSound(colour) {
    let audio = null;
    switch (colour) {
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            break;
        case "green":
            audio = new Audio("sounds/green.mp3");
            break;
        case "red":
            audio = new Audio("sounds/red.mp3");
            break;
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            break;
        default:
            break;
    }
    audio.play();
}

function animatePress(colour) {
    switch (colour) {
        case "blue":
            $("#blue").addClass("pressed");
            setTimeout(() => {
                $("#blue").removeClass("pressed");
            }, 100)
            break;
        case "green":
            $("#green").addClass("pressed");
            setTimeout(() => {
                $("#green").removeClass("pressed");
            }, 100)
            break;
        case "red":
            $("#red").addClass("pressed");
            setTimeout(() => {
                $("#red").removeClass("pressed");
            }, 100)
            break;
        case "yellow":
            $("#yellow").addClass("pressed");
            setTimeout(() => {
                $("#yellow").removeClass("pressed");
            }, 100)
            break;
        default:
            break;
    }
}

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log('wrong');

        gameStart = false;
        level = 0;
        gamePattern = [];
        userPattern = [];

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
}

$(document).keydown(() => {
    if (!gameStart) {
        gameStart = true;
        nextSequence();
    }
})

$(".btn").click((e) => {
    let userChosenColour = e.target.id;
    userPattern.push(userChosenColour);
    console.log(userPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length - 1);
})
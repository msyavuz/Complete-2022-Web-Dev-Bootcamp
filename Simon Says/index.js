const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

$("body").on("keydown", () => {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click((e) => {
    const userColor = $(e.currentTarget).attr("id");
    userPattern.push(userColor);
    checkAnswer(userPattern.length - 1);
    playSound(userColor);
    animatePress(userColor);
});

function animatePress(currentColor) {
    const button = $(`#${currentColor}`);
    button.addClass("pressed");
    setTimeout(() => {
        button.removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userPattern[currentLevel]) {
        console.log("success");
        if (userPattern.length == gamePattern.length) {
            console.log("finished");
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

var buttonColors = ["blue", "green", "yellow", "red"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = true;
var level = 0;

$ ( ".btn" ).click ( handleButtonClick );

$ ( document ).keypress ( function () {
    if (startGame) {
        nextSequence ();
        $ ( "#level-title" ).text ( "level " + level );
        startGame = false;
    }
} );

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log ( "success" );
        return true;
    } else {
        console.log ( "wrong" );
        return false;
    }
}

function startOver () {
    startGame = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function handleButtonClick () {
    if (!startGame) {
        var userChosenColor = $ ( this ).attr ( "id" );
        userClickedPattern.push ( userChosenColor );
        animatePress ( userChosenColor );
        playButtonAudio ( userChosenColor );
        if (checkAnswer ( userClickedPattern.length - 1 )) {
            if (userClickedPattern.length === gamePattern.length) {
                //next level
                setTimeout ( nextSequence, 1000 );
                userClickedPattern = [];
            }
        } else {
            playButtonAudio ( "wrong" );
            $ ( "body" ).addClass ( "game-over" );
            setTimeout ( function () {
                $ ( "body" ).removeClass ( "game-over" );
            }, 200 );
            $ ( "#level-title" ).text ( "Game Over, Press Any Key to Restart" );
            startOver ();
        }
    }
}

function flashButton (randomChosenColor) {
    $ ( "#" + randomChosenColor )
        .fadeIn ( 250 )
        .fadeOut ( 250 )
        .fadeIn ( 250 );
}

function playButtonAudio (randomChosenColor) {
    var audio = new Audio ( "sounds/" + randomChosenColor + ".mp3" );
    var test = audio.play ();
}

function animatePress (currentColor) {
    $ ( "." + currentColor ).addClass ( "pressed" );
    setTimeout ( function () {
        $ ( "." + currentColor ).removeClass ( "pressed" );
    }, 100 );
}

function nextSequence () {
    var randomNumber = Math.floor ( Math.random () * 4 );
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push ( randomChosenColor );

    flashButton ( randomChosenColor );
    playButtonAudio ( randomChosenColor );
    $ ( "#level-title" ).text ( "level " + ++level );
}
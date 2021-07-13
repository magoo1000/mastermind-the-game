var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
var round = 0;
var choice = '';
var compAnswer = ['none', 'none', 'none', 'none'];
var userAnswer = ['none', 'none', 'none', 'none'];

// hides display
function hide(id) { document.getElementById(id).style.display = 'none' }

// reveals display
function reveal(id) { document.getElementById(id).style.display = 'block' }

// changes background color
function changeBack(id, alteration) { document.getElementById(id).style.background = alteration }

// changes scale
function changeScale(id, alteration) { document.getElementById(id).style.transform = 'scale(' + alteration + ')' }

// adds blur
function addBlur(id) { document.getElementById(id).style.filter = 'blur(5px) brightness(.3)' }

// takes away blur
function minusBlur(id) { document.getElementById(id).style.filter = 'none' }

// shows about page
function homeAbout() {
    reveal('aboutTheGame');
}

function gameAbout() {
    hide('gameBody');
    reveal('backToGame');
    reveal('aboutTheGame');
}

function backToGame() {
    hide('aboutTheGame');
    hide('backToGame');
    reveal('gameBody');
}

// returns to home page
function backToHomepage() {
    reveal('homePage');
    hide('aboutTheGame');
    hide('gameBody');
}

// chooses to verse another player
function playerGame() {
    for (var i = 0; i < 4; i++) { 
        changeBack('playerCode' + i, 'none');
    }
    reveal('gameBody');
    reveal('playerCode');
    reveal('choices');
    hide('code');
    hide('guesses');
    hide('homePage');
    hide('submit');
}

// creates code to guess from player
function playerCodeCreated() {
    for (var i = 0; i < 4; i++) {
        compAnswer[i] = document.getElementById('playerCode' + i).style.background
        changeBack('code' + i, compAnswer[i]);
    }
    if (compAnswer.includes('none')) {
        for (var i = 0; i < 4; i++) {
            if (document.getElementById('playerCode' + i).style.background == 'none') {
                document.getElementById("playerCode" + i).animate([
                    { transform: 'scale(1.2)' }
                ], {
                    duration: 75,
                    iterations: 1
                });
            }
        }
        return;
    };
    reveal('guesses');
    reveal('submit');
    hide('playerCode');
}

// chooses to verse a computer
function computerGame() {
    reveal('gameBody');
    reveal('guesses');
    reveal('choices');
    reveal('submit');
    hide('homePage');
    hide('playerCode');
    hide('code');
    createCode();
}

// creates random color of array
function randomCol() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// creates code to guess
function createCode() {
    for (var i = 0; i < 4; i++) {
        compAnswer[i] = randomCol();
        changeBack('code' + i, compAnswer[i]);
        changeBack('choice' + i, 'none');
    }
}

// designates a dot you are choosing to color
function chooseDot(id) {
    choice = id;
    changeScale(id, 1.2);
}

// fills in choice with designated color
function chooseCol(color) {
    changeBack(choice, color);
    for (var i = 0; i < 4; i++) {
        if (choice == 'choice' + i) { userAnswer[i] = color };
    }
}

// gives full feedback
function submission() {
    if (userAnswer.includes('none')) {
        for (var i = 0; i < 4; i++) {
            if (document.getElementById('choice' + i).style.background == 'none') {
                document.getElementById('choice' + i).animate([
                    { transform: 'scale(1.2)' }
                ], {
                    duration: 75,
                    iterations: 1
                });
            }
        }
        return;
    };
    if (userAnswer.toString() == compAnswer.toString()) {
        document.getElementById('outcome').innerHTML = 'You Win!';
        addBlur('leftSide');
        addBlur('attempts');
        reveal('finalResult');
        reveal('code');
        hide('choices');
        hide('submit');
    }
    if (round == 9 && userAnswer.toString() !== compAnswer.toString()) {
        document.getElementById('outcome').innerHTML = 'You Lose';
        addBlur('leftSide');
        addBlur('attempts');
        reveal('finalResult');
        reveal('code');
        hide('choices');
        hide('submit');
    }

    var blackDots = 0;
    var whiteDots = 0;
    var checkedUser = [0, 0, 0, 0];
    var checkedComp = [0, 0, 0, 0];

    // calculates black dots
    for (var i = 0; i < userAnswer.length; i++) {
        if (compAnswer[i] == userAnswer[i]) {
            blackDots += 1;
            checkedComp[i] = 1;
            checkedUser[i] = 1;
        }
    }

    // calculates white dots
    for (var userIndex = 0; userIndex < userAnswer.length; userIndex++) {
        for (var compIndex = 0; compIndex < userAnswer.length; compIndex++) {
            if (checkedComp[compIndex] == 1 || checkedUser[userIndex] == 1) {
                continue;
            } else if (userAnswer[userIndex] == compAnswer[compIndex]) {
                whiteDots += 1;
                checkedUser[userIndex] = 1;
                checkedComp[compIndex] = 1;
            }
        }
    }

    // adds black dots to beginning of feedback
    for (var i = 0; i < blackDots; i++) { changeBack('feedback' + round + i, 'black') };

    // adds white dots to end of black dots
    for (var i = blackDots; i < blackDots + whiteDots; i++) { changeBack('feedback' + round + i, 'white') };

    // iterate through successive attemptDot
    for (var i = 0; i < userAnswer.length; i++) { changeBack('attemptDot' + round + i, userAnswer[i]) };
    round ++;
}

// restarts all input
function restart() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 4; j++) {
            changeBack('attemptDot' + i + j, 'none');
            changeBack('feedback' + i + j, 'none');
            changeBack('choice' + j, 'none');
        }
    }
    for (var i = 0; i < 4; i++) { userAnswer[i] = 'none' };
    round = 0;
    reveal('homePage');
    hide('gameBody');
    hide('code');
    hide('finalResult');
}

// closes window or warning when clicked outside of it
window.addEventListener('mouseup',function(event){
    for (var i = 0; i < 4; i++) {
        changeScale('choice' + i, 1);
        changeScale('playerCode' + i, 1);
    }
    hide('finalResult');
    hide('warning');
    minusBlur('leftSide');
    minusBlur('attempts');
});
let startButton = document.querySelector('.start-btn');
let allButtons = document.querySelectorAll('.btn');

let heading2 = document.querySelector('.heading2');

let gameColorCollection = [];
let userColorCollection = [];

let level = 0;
let enableUserButtons = false;

let allButtonsColor = ['red', 'yellow', 'green', 'purple'];


/********************* START : Code For Start Button Action *********************************/

// Start button is clicked

startButton.addEventListener('click', startOfGame);

function startOfGame() {
    userColorCollection =[];
    enableUserButtons = true;
        
    // Call Below Function to apply transform property on start button
    if (level === 0) {
        transformStartButton();    }
    level++;
    let randomBtn = Math.floor(Math.random() * 4);
    let randomColor = allButtonsColor[randomBtn];

    // call the flash function 
    buttonFlash(randomColor);

    // Store the color in the gameColorCollection array
    gameColorCollection.push(randomColor);

    // show the level using h2 heading
    heading2.innerHTML = `Level : ${level}`

    // The Start Button Will be disable until game Over
        startButton.setAttribute('disabled', true);
}

// button flash when user click on the start button and flashes to white color
function buttonFlash(randomColor) {
    let flashButton = document.querySelector(`.${randomColor}`);
    flashButton.classList.add('flash-btn');
    setTimeout(function () {
        flashButton.classList.remove('flash-btn');
    }, 220);
}


// function for transforming start button
function transformStartButton() {
    startButton.classList.add('transform-start-button');
    setTimeout(function () {
        startButton.classList.remove('transform-start-button');
    }, 200);
}

/********************** END : Strat button code ends here  ************************************* */

/********************** START : User Button Code Is Here  ***************************************/

// get EventListener For All Buttons
for (const btn of allButtons) {
    btn.addEventListener('click', userButton);
}

// EventListner Function
function userButton() {
    if (enableUserButtons === true) {
        let btn = this;
        userButtonFlash(btn);

        // push color in userColorCollection array
        let userColor = btn.getAttribute('id');
        userColorCollection.push(userColor);

        // Check The Sequence Of The Both Buttons (We Have to check the both seques after clicking)
        checkAns(userColorCollection.length - 1);
    }
}

// button flash when user click on the any of the four buttons and flashes to black color
function userButtonFlash(btn) {
    btn.classList.add('user-flash-button');
    setTimeout(function () {
        btn.classList.remove('user-flash-button');
    }, 220)
}

/*********************END : User Button Code Ends Here  *************************************/


/********************** START : Button Sequence Tracking Start Here ***************************************/

function checkAns(index) {
    console.log("Game Color Collection : ", gameColorCollection)
    console.log("user Color Collection : ", userColorCollection)
    if (gameColorCollection[index] === userColorCollection[index]) {
        
        if (gameColorCollection.length == userColorCollection.length) {
            setTimeout(startOfGame, 1000);
            console.log("Same Value");
        } 
    } else {
        heading2.innerHTML = `Game Over..! Your Score Was <b> ${level} </b> <br> Press Start Button To Play Again`;
        startButton.setAttribute('disabled', false);
        resetGame();
        console.log("Game Over");
    }
}

function resetGame() {
    console.log("This is reset");
    level = 0;
    enableUserButtons = false;
    gameColorCollection = [];
    userColorCollection = [];

}

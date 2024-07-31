// DOM elements
const playerRoundScore   = document.getElementById('player-round-score');
const playerTotalScore   = document.getElementById('player-total-score');
const computerRoundScore = document.getElementById('computer-round-score');
const computerTotalScore = document.getElementById('computer-total-score');
const resultMessage      = document.getElementById('result-message');
const rollDiceButton     = document.getElementById('roll-dice-button');
const newGameButton      = document.getElementById('new-game-button');

// Dice image DOM elements
const playerDie1Img   = document.getElementById('player-die1');
const playerDie2Img   = document.getElementById('player-die2');
const computerDie1Img = document.getElementById('computer-die1');
const computerDie2Img = document.getElementById('computer-die2');

// Initialize dice objects with default values
const playerDie1   = new Dice('blue', 1);
const playerDie2   = new Dice('blue', 6);
const computerDie1 = new Dice('red', 1);
const computerDie2 = new Dice('red', 6);

// Game variables and constants
let playerScore         = 0;
let computerScore       = 0;
let round               = 0;
const scoreMultiplier   = 2;
const maxRounds         = 3;
const diceAnimInterval  = 150;
const numDiceAnimFrames = 5;

// Function to calculate the score for a given pair of dice
function calculateScore(die1, die2) {
    if (die1 === minDiceValue || die2 === minDiceValue) {
        return 0;
    } else if (die1 === die2) {
        return (die1 + die2) * scoreMultiplier;
    } else {
        return die1 + die2;
    }
}

// Function to check if the game is over and display the winner
function checkWinner() {
    if (round === maxRounds) {
        if (playerScore > computerScore) {
            resultMessage.textContent = 'Player Wins!';
        } else if (playerScore < computerScore) {
            resultMessage.textContent = 'Computer Wins!';
        } else {
            resultMessage.textContent = 'It\'s a Tie!';
        }
        rollDiceButton.disabled = true;
    }
}

// Function to update the UI with the current dice images and scores
function updateUI() {
    // Get the current dice values
    const playerDie1Value   = playerDie1.value;
    const playerDie2Value   = playerDie2.value;
    const computerDie1Value = computerDie1.value;
    const computerDie2Value = computerDie2.value;

    // Update the player dice images
    playerDie1Img.src = playerDie1.getImagePath();
    playerDie1Img.alt = playerDie1.getImageAlt();
    playerDie2Img.src = playerDie2.getImagePath();
    playerDie2Img.alt = playerDie2.getImageAlt();

    // Update the computer dice images
    computerDie1Img.src = computerDie1.getImagePath();
    computerDie1Img.alt = computerDie1.getImageAlt();
    computerDie2Img.src = computerDie2.getImagePath();
    computerDie2Img.alt = computerDie2.getImageAlt();

    //Update the player and computer scores
    playerRoundScore.textContent   = calculateScore(playerDie1Value, playerDie2Value);
    playerTotalScore.textContent   = playerScore;
    computerRoundScore.textContent = calculateScore(computerDie1Value, computerDie2Value);
    computerTotalScore.textContent = computerScore;
}

// Event listener for the rolling the dice
rollDiceButton.addEventListener('click', () => {
    let currentAnimFrame    = 1; // Reset currentAnimFrame to 1 at the start of each roll

    // Dice animation
    const animationInterval = setInterval(function() {
        playerDie1Img.src   = playerDie1.getFrameImagePath(currentAnimFrame);
        playerDie2Img.src   = playerDie2.getFrameImagePath(currentAnimFrame);
        computerDie1Img.src = computerDie1.getFrameImagePath(currentAnimFrame);
        computerDie2Img.src = computerDie2.getFrameImagePath(currentAnimFrame);

        currentAnimFrame++;
        if (currentAnimFrame > numDiceAnimFrames) {
            clearInterval(animationInterval);

            // Actual dice roll and score update
            playerDie1.roll();
            playerDie2.roll();
            computerDie1.roll();
            computerDie2.roll();

            const playerRoundScoreValue   = calculateScore(playerDie1.value, playerDie2.value);
            const computerRoundScoreValue = calculateScore(computerDie1.value, computerDie2.value);

            playerScore   += playerRoundScoreValue;
            computerScore += computerRoundScoreValue;

            round++;

            updateUI();
            checkWinner();
        }
    }, diceAnimInterval);
});

// Event listener for starting a new game
newGameButton.addEventListener('click', () => {
    playerScore   = 0;
    computerScore = 0;
    round         = 0;

    resultMessage.textContent = '';
    rollDiceButton.disabled   = false;

    playerDie1.value   = minDiceValue;
    playerDie2.value   = maxDiceValue;
    computerDie1.value = minDiceValue;
    computerDie2.value = maxDiceValue;

    updateUI();
});

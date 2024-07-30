// DOM elements
const playerRoundScore   = document.getElementById('player-round-score');
const playerTotalScore   = document.getElementById('player-total-score');
const computerRoundScore = document.getElementById('computer-round-score');
const computerTotalScore = document.getElementById('computer-total-score');
const resultMessage      = document.getElementById('result-message');
const rollDiceButton     = document.getElementById('roll-dice-button');
const newGameButton      = document.getElementById('new-game-button');

// Dice elements
const playerDie1Img   = document.getElementById('player-die1');
const playerDie2Img   = document.getElementById('player-die2');
const computerDie1Img = document.getElementById('computer-die1');
const computerDie2Img = document.getElementById('computer-die2');

// Constants
const minDiceValue    = 1;
const scoreMultiplier = 2;
const maxRounds       = 3;

// Initialize Dice objects with specific initial values
const playerDie1   = new Dice('blue', 1);
const playerDie2   = new Dice('blue', 6);
const computerDie1 = new Dice('red', 1);
const computerDie2 = new Dice('red', 6);

// Score and round variables
let playerScore   = 0;
let computerScore = 0;
let round         = 0;


function calculateScore(die1, die2) {
    if (die1 === minDiceValue || die2 === minDiceValue) {
        return 0;
    } else if (die1 === die2) {
        return (die1 + die2) * scoreMultiplier;
    } else {
        return die1 + die2;
    }
}

function checkWinner() {
    if (round === maxRounds) {
        if (playerScore > computerScore) {
            resultMessage.textContent = 'Player Wins!';
        } else if (playerScore < computerScore) {
            resultMessage.textContent = 'Computer Wins!';
        } else {
            resultMessage.textContent = 'It\'s a Tie!';
        }
        rollButton.disabled = true;
    }
}

function updateUI() {
    const playerDie1Value = playerDie1.value;
    const playerDie2Value = playerDie2.value;
    const computerDie1Value = computerDie1.value;
    const computerDie2Value = computerDie2.value;

    // Update dice images with color
    playerDie1Img.src = playerDie1.getImagePath();
    playerDie1Img.alt = playerDie1.getImageAlt();
    playerDie2Img.src = playerDie2.getImagePath();
    playerDie2Img.alt = playerDie2.getImageAlt();

    computerDie1Img.src = computerDie1.getImagePath();
    computerDie1Img.alt = computerDie1.getImageAlt();
    computerDie2Img.src = computerDie2.getImagePath();
    computerDie2Img.alt = computerDie2.getImageAlt();

     // Update scores
    playerRoundScore.textContent = calculateScore(playerDie1Value, playerDie2Value);
    playerTotalScore.textContent = playerScore;
    computerRoundScore.textContent = calculateScore(computerDie1Value, computerDie2Value);
    computerTotalScore.textContent = computerScore;
}

rollDiceButton.addEventListener('click', () => {
    playerDie1.roll();
    playerDie2.roll();
    computerDie1.roll();
    computerDie2.roll();

    const playerRoundScoreValue   = calculateScore(playerDie1.value, playerDie2.value);
    const computerRoundScoreValue = calculateScore(computerDie1.value, computerDie2.value);

    playerScore += playerRoundScoreValue;
    computerScore += computerRoundScoreValue;

    round++;

    updateUI();
    checkWinner();
});
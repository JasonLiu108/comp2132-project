// DOM elements
const playerRoundScore   = document.getElementById('player-round-score');
const playerTotalScore   = document.getElementById('player-total-score');
const computerRoundScore = document.getElementById('computer-round-score');
const computerTotalScore = document.getElementById('computer-total-score');
const resultMessage      = document.getElementById('result-message');
const rollButton         = document.getElementById('roll-dice-button');
const resetButton        = document.getElementById('new-game-button');

// Constants
const minDiceValue    = 1;
const scoreMultiplier = 2;

// Initialize Dice objects with specific initial values
const playerDie1   = new Dice('blue', 1);
const playerDie2   = new Dice('blue', 6);
const computerDie1 = new Dice('red', 1);
const computerDie2 = new Dice('red', 6);


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


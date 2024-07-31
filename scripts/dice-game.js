// DOM elements
const playerRoundScore   = document.getElementById('player-round-score');
const playerTotalScore   = document.getElementById('player-total-score');
const computerRoundScore = document.getElementById('computer-round-score');
const computerTotalScore = document.getElementById('computer-total-score');
const rollDiceButton     = document.getElementById('roll-dice-button');
const newGameButton      = document.getElementById('new-game-button');

// Dice image DOM elements
const playerDie1Img   = document.getElementById('player-die1');
const playerDie2Img   = document.getElementById('player-die2');
const computerDie1Img = document.getElementById('computer-die1');
const computerDie2Img = document.getElementById('computer-die2');

// Popup DOM elements
const resultPopup        = document.getElementById('result-popup');
const closePopup         = document.getElementById('close-popup');
const resultMessagePopup = document.getElementById('result-message-popup');

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
    console.log('checkWinner called');
    if (round === maxRounds) {
        if (playerScore > computerScore) {
            resultMessagePopup.textContent = 'Player Wins!';
        } else if (playerScore < computerScore) {
            resultMessagePopup.textContent = 'Computer Wins!';
        } else {
            resultMessagePopup.textContent = 'It\'s a Tie!';
        }
        rollDiceButton.disabled = true;
        resultPopup.style.display = 'flex';
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
    let currentAnimFrame = 1; // Reset currentAnimFrame to 1 at the start of each roll
    rollDiceButton.disabled = true; // Disable the button at the start of the animation

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
            rollDiceButton.disabled = false; // Re-enable the button after the animation completes

            // Call checkWinner only if the maximum number of rounds is reached
            if (round >= maxRounds) {
                checkWinner();
            }
        }
    }, diceAnimInterval);
});

// Event listener for starting a new game
newGameButton.addEventListener('click', () => {
    playerScore   = 0;
    computerScore = 0;
    round         = 0;

    resultMessagePopup.textContent = ''; // Clear result message
    rollDiceButton.disabled   = false;

    playerDie1.value   = minDiceValue;
    playerDie2.value   = maxDiceValue;
    computerDie1.value = minDiceValue;
    computerDie2.value = maxDiceValue;

    updateUI();
});

// Event listener for closing the modal
closePopup.addEventListener('click', () => {
    resultPopup.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === resultPopup) {
        resultPopup.style.display = 'none';
    }
});

// New popup DOM elements
const infoPopup = document.createElement('div');
infoPopup.id = 'info-popup';
infoPopup.innerHTML = `
    <div class="info-popup-content">
        <h2>Game Rules</h2>
        <p>1. Roll the dice and try to get the highest score.</p>
        <p>2. Each round, both player and computer roll two dice.</p>
        <p>3. If any of the two dice comes up as a 1 then the score for that round is 0. eg: if the player rolls a 6 and 1, they get a score of 0.</p>
        <p>4. If both dice are the same, the score is doubled. eg: if the player rolls a 3 and 3, they get a score of 12.</p>
        <p>5. If the roll is any other combination of dice other than the ones mention above, the score is the total value of the two dice.
        eg: player rolls a 3 and 2, player gets a score of 3+2=5.</p>
        <p>6. The total score is calculated based on the dice values.</p>
        <p>7. The player with the highest score at the end of three rounds wins.</p>
        <p>8. A tie is possible, in which case the game is declared a draw.</p>
        <button id="close-info-popup" class="close-button">Close</button>
    </div>
`;
document.body.appendChild(infoPopup);

// Event listener for closing the info popup
document.getElementById('close-info-popup').addEventListener('click', () => {
    infoPopup.style.display = 'none';
});

// Close the info popup when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === infoPopup) {
        infoPopup.style.display = 'none';
    }
});

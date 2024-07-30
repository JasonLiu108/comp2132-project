// DOM elements
const imageDisplay        = document.getElementById('main-image');
const btnStartAnimation   = document.getElementById('start-animation');
const btnStopAnimation    = document.getElementById('stop-animation');
const btnReverseAnimation = document.getElementById('reverse-animation');
const popup               = document.getElementById('popup');
const closePopup          = document.getElementById('close-popup');

// Image animation and popup variables and constants
const imageDirectory = 'product-images/';
const imageExtension = '.jpg';
let   currentImage   = 1;
const minImageRange  = 1;
const maxImageRange  = 34;
const animationSpeed = 100; // Speed in milliseconds
const popupDelay     = 3000; // Delay in milliseconds

// Animation variables
let bikeAnimation;
let animationTimeout;
let isReversing = false;
let isAnimating = false;
let popupTimeout;

// Function to animate the bike
function animateBike() {
    isAnimating = true;

    if (isReversing) {
        currentImage--;
        if (currentImage < minImageRange) {
            currentImage = maxImageRange;
        }
    } else {
        currentImage++;
        if (currentImage > maxImageRange) {
            currentImage = minImageRange;
        }
    }

    imageDisplay.src = `${imageDirectory}bike-${currentImage}${imageExtension}`;
    imageDisplay.alt = `bike-${currentImage}$`;

    // setTimeout to control animation speed
    animationTimeout = setTimeout(() => {
        bikeAnimation = requestAnimationFrame(animateBike);
    }, animationSpeed);
}

// Function to show the popup
const showPopup = () => {
    if (!isAnimating) {
        popup.classList.add('show');
    }
};

// Function to hide the popup
const hidePopup = () => {
    popup.classList.remove('show');
};

// Event listeners
btnStartAnimation.addEventListener('click', function() {
    if (!isAnimating) {
        isReversing = false;
        animateBike();
        clearTimeout(popupTimeout); // Clear the popup timeout to prevent showing the popup
    }
});

btnStopAnimation.addEventListener('click', function() {
    clearTimeout(animationTimeout); // Clear the timeout to stop the animation
    isAnimating = false;
});

btnReverseAnimation.addEventListener('click', function() {
    if (!isAnimating) {
        isReversing = true;
        animateBike();
    }
});

closePopup.addEventListener('click', hidePopup);

// Start the timer to show the popup after a delay if not animating
popupTimeout = setTimeout(showPopup, popupDelay);

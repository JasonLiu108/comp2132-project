const diceImageDirectory = "dice-images/";
const imageExtension     = ".jpg";

const minDiceValue = 1;
const maxDiceValue = 6;

class Dice {
    color;
    value;

    constructor(color, value) {
        this.color = color;
        this.value = value;
    }

    roll() {
        this.value = Math.ceil(Math.random() * maxDiceValue);
        return this.value;
    }

    getImagePath() {
        return `${diceImageDirectory}${this.color}/${this.color}-dice-${this.value}${imageExtension}`;
    }

    getImageAlt() {
        return `${this.color}-dice-${this.value}`;
    }

    getFrameImagePath(frameNumber) {
        return `${diceImageDirectory}${this.color}/${this.color}-frame-${frameNumber}${imageExtension}`;
    }
}

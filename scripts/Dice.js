const imagePath      = "dice-images/";
const imageExtension = ".jpg";

const minDiceValue = 1;
const maxDiceValue = 6;

class Dice {
    #value;
    #color;

    constructor(value, color) {
        this.#value = value;
        this.#color = color;
    }

    roll() {
        this.value = Math.ceil(Math.random() * maxDiceValue);
        return this.value;
    }

    getImagePath() {
        return `dice-images/${this.#color}/${this.#color}-dice-${this.#value}.png`;
    }
}

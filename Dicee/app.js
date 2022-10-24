const header = document.querySelector("h1");

const dices = [
    "./images/dice1.png",
    "./images/dice2.png",
    "./images/dice3.png",
    "./images/dice4.png",
    "./images/dice5.png",
    "./images/dice6.png",
];

const p1roll = Math.floor(Math.random() * 5);
const p2roll = Math.floor(Math.random() * 5);

const p1dice = document.querySelector(".img1");
const p2dice = document.querySelector(".img2");

p1dice.src = dices[p1roll];
p2dice.src = dices[p2roll];

if (p1roll > p2roll) {
    header.textContent = "Player 1 Won!!!  🚩";
} else if (p2roll > p1roll) {
    header.textContent = "🚩  Player 2 Won!!!";
} else {
    header.textContent = "Draw!!!";
}

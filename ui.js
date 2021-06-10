import {CARDS, DIM, daily} from './generate.mjs'
// Check the day
let timestamp = new Date();
let day = Math.floor(timestamp.getTime() / (1000 * 60 * 60 * 24));
// Generate the puzzle on page load
const PUZZLE = daily(day);

const CARDS_SELECTED = new Set();
function onCardClicked(cardNum, cardEl) {
    cardEl.classList.toggle("selected");
}

function binToTup(card) {
    let res = [];
    for (let i = 0; i < Math.ceil(DIM/2); i++)
        res.push((card >> (2 * i)) & 3);
    return res;
}

function createDomCard(card) {

    const SHAPES = [
        "fa-biohazard",
        "fa-dice-d20",
        "fa-tooth",
        "fa-crown"
    ];

    // Convert to a base 4 array
    const attrs = binToTup(card);
    const color = attrs[0];
    const number = attrs[1];
    const shape = attrs[2];

    let cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.addEventListener("click", () => onCardClicked(card, cardEl));

    let cardElInner = document.createElement("div");
    cardElInner.classList.add("card-inner");
    cardEl.appendChild(cardElInner);

    // Set attributes
    cardEl.classList.add(`color-${color}`);

    // Add icons
    for (let n = 0; n <= number; n++) {
        let icon = document.createElement("i");
        icon.classList.add("fas", SHAPES[shape]);

        cardElInner.appendChild(icon);
    }

    return cardEl;
}

function createListeners() {
    document.getElementById("date").textContent =
        timestamp.toLocaleDateString("default", {
            "timeZone": "UTC",
            "day": "numeric",
            "month": "long",
            "year": "numeric"
        })

    document.getElementById("nquads").textContent = PUZZLE.n;

    // Populate the card display
    const card_container = document.getElementById("cards");
    PUZZLE.cards.forEach(c => card_container.appendChild(createDomCard(c)));

}

if (document.readyState === "complete" ||
   (document.readyState !== "loading" && !document.documentElement.doScroll) )
    createListeners();
else
    document.addEventListener("DOMContentLoaded", createListeners);

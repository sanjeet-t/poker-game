"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./card");
class CardSet {
    constructor(suit) {
        this.cards = [];
        this.getCardByValue = (value) => {
            return this.cards.find(card => card.value === value);
        };
        this.getCardByDisplayValue = (displayValue) => {
            return this.cards.find(card => (card.displayValue = displayValue));
        };
        this.suit = suit;
        for (let i = 1; i <= 13; i++) {
            let card = new card_1.Card(this.suit, i);
            this.cards.push(card);
        }
    }
}
exports.CardSet = CardSet;

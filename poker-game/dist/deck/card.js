"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardDisplayMap_1 = require("./cardDisplayMap");
class Card {
    constructor(suit, value) {
        this.assignPlayer = (playerId) => {
            this.playerId = playerId;
        };
        this.suit = suit;
        this.value = value;
        this.displayValue = cardDisplayMap_1.displayMap[`${value}`];
    }
}
exports.Card = Card;

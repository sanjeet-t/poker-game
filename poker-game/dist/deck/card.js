"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker_interface_1 = require("../common/poker.interface");
class Card {
    constructor(suit, value) {
        this.assignPlayer = (playerId) => {
            this.playerId = playerId;
        };
        this.suit = suit;
        this.value = value;
        this.displayValue = poker_interface_1.valueToDisplayMap[`${value}`];
        this.rank = poker_interface_1.valueToRankMap[`${value}`];
    }
}
exports.Card = Card;

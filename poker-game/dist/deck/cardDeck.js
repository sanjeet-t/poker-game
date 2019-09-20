"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardSet_1 = require("./cardSet");
class CardDeck {
    constructor() {
        this.getCardSetBySuit = (suit) => {
            switch (suit) {
                case 'hearts':
                    return this.hearts;
                case 'diamonds':
                    return this.diamonds;
                case 'spades':
                    return this.spades;
                case 'clubs':
                    return this.clubs;
                default:
                    return null;
            }
        };
        this.validatePlayerHands = () => {
            // to-do
            return true;
        };
        this.checkFlush = (cards) => {
            const allHearts = cards.every(card => card.suit === 'hearts');
            const allDiamonds = cards.every(card => card.suit === 'diamonds');
            const allSpades = cards.every(card => card.suit === 'spades');
            const allClubs = cards.every(card => card.suit === 'clubs');
            return allHearts || allDiamonds || allClubs || allSpades;
        };
        this.hearts = new cardSet_1.CardSet('hearts');
        this.diamonds = new cardSet_1.CardSet('diamonds');
        this.spades = new cardSet_1.CardSet('spades');
        this.clubs = new cardSet_1.CardSet('clubs');
    }
    checkThreeOfaKind(displayValueCounts) {
        const keys = Object.keys(displayValueCounts);
        const threeOfaKind = keys.filter(key => displayValueCounts[key] >= 3);
        return threeOfaKind;
    }
    checkOnePair(cards) {
        const pairHearts = cards.filter(card => card.suit === 'hearts').length >= 2;
        const pairDiamonds = cards.filter(card => card.suit === 'diamonds').length >= 2;
        const pairSpades = cards.filter(card => card.suit === 'spades').length >= 2;
        const pairClubs = cards.filter(card => card.suit === 'clubs').length >= 2;
        return pairHearts || pairDiamonds || pairSpades || pairClubs;
    }
    checkHighCard() {
        return null;
    }
}
exports.CardDeck = CardDeck;

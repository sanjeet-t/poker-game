"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker_interface_1 = require("../common/poker.interface");
class Player {
    constructor(id) {
        this.cards = [];
        this.displayValueCounts = {};
        this.suitCounts = {};
        this.setPokerHand = (cardDeck) => {
            // sort the cards by rank
            this.cards.sort((a, b) => a.rank - b.rank);
            this.checkFlush();
            this.checkThreeOfaKind();
            this.checkOnePair();
            this.getHighCard();
        };
        this.id = id;
        this.pokerHand = {
            flush: false,
            'threepair-rank': 0,
            'onepair-rank': 0,
            'highcard-rank': 0
        };
    }
    addCard(cardFromInput, cardDeck) {
        let cardSet = cardDeck.getCardSetBySuit(cardFromInput.suit);
        let cardFromDeck = cardSet.getCardByDisplayValue(cardFromInput.displayValue);
        this.cards.push(cardFromDeck);
        // count the numbers
        if (cardFromDeck.displayValue in this.displayValueCounts) {
            this.displayValueCounts[cardFromDeck.displayValue]++;
        }
        else {
            this.displayValueCounts[cardFromDeck.displayValue] = 1;
        }
        // count the suits
        if (cardFromDeck.suit in this.suitCounts) {
            this.suitCounts[cardFromDeck.suit]++;
        }
        else {
            this.suitCounts[cardFromDeck.suit] = 1;
        }
    }
    checkFlush() {
        const allHearts = this.cards.every(card => card.suit === 'hearts');
        const allDiamonds = this.cards.every(card => card.suit === 'diamonds');
        const allSpades = this.cards.every(card => card.suit === 'spades');
        const allClubs = this.cards.every(card => card.suit === 'clubs');
        this.pokerHand.flush = allHearts || allDiamonds || allClubs || allSpades;
    }
    checkThreeOfaKind() {
        const keys = Object.keys(this.displayValueCounts);
        const threeOfaKindKey = keys.find(key => this.displayValueCounts[key] === 3);
        if (threeOfaKindKey) {
            this.pokerHand['threepair-rank'] = poker_interface_1.displayToRankMap[`${threeOfaKindKey}`];
        }
    }
    checkOnePair() {
        const keys = Object.keys(this.displayValueCounts);
        const onePairKey = keys.find(key => this.displayValueCounts[key] === 2);
        if (onePairKey) {
            this.pokerHand['onepair-rank'] = poker_interface_1.displayToRankMap[`${onePairKey}`];
        }
    }
    getHighCard() {
        let highestRank = Infinity;
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            if (card.rank < highestRank) {
                highestRank = card.rank;
            }
        }
        this.pokerHand['highcard-rank'] = highestRank;
    }
    getPokerHand() {
        return this.pokerHand;
    }
}
exports.Player = Player;

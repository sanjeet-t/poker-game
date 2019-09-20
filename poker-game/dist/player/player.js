"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id) {
        this.cards = [];
        this.pokerHand = {
            flush: false,
            threeofakind: false,
            onepair: false,
            highcard: false
        };
        this.displayValueCounts = {};
        this.suitCounts = {};
        this.getPokerHand = (cardDeck) => {
            // Flush
            const isflush = cardDeck.checkFlush(this.cards);
            this.pokerHand.flush = isflush;
            // 3 of a kind
            const isThreeOfaKind = cardDeck.checkThreeOfaKind(this.displayValueCounts);
            this.pokerHand.threeofakind = isThreeOfaKind;
            // One pair
            const isOnepair = cardDeck.checkOnePair(this.cards);
            this.pokerHand.onepair = isOnepair;
            // High Card
            // const isHighCard = cardDeck.checkHighCard();
        };
        this.id = id;
    }
    addCard(suit, displayValue, cardDeck) {
        let cardSet = cardDeck.getCardSetBySuit(suit);
        let card = cardSet.getCardByDisplayValue(displayValue);
        console.log(card);
        card.assignPlayer(this.id);
        this.cards.push(card);
        // count the numbers
        if (card.displayValue in this.displayValueCounts) {
            this.displayValueCounts[card.displayValue]++;
        }
        else {
            this.displayValueCounts[card.displayValue] = 1;
        }
        // count the suits
        if (card.suit in this.suitCounts) {
            this.suitCounts[card.suit]++;
        }
        else {
            this.suitCounts[card.suit] = 1;
        }
    }
}
exports.Player = Player;

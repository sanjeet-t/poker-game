"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const cardDeck_1 = require("./deck/cardDeck");
const player_1 = require("./player/player");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawdata = yield readFile('inputs/testcase1.json');
        const { data } = JSON.parse(rawdata);
        const players = [];
        const cardDeck = new cardDeck_1.CardDeck();
        data.forEach((playerData) => {
            const { player: playerId, cards } = playerData;
            const cardPlayer = new player_1.Player(playerId);
            cards.forEach((card) => {
                cardPlayer.addCard(card.suit, card.displayValue, cardDeck);
            });
            players.push(cardPlayer);
        });
        const validHands = cardDeck.validatePlayerHands();
        if (!validHands) {
            throw `Invalid configuration in player hands`;
        }
        players.forEach(player => {
            player.getPokerHand(cardDeck);
        });
        // console.log(players[0]);
        // console.log(JSON.stringify(cardDeck));
        // card are valid, decide a winner
    }
    catch (e) {
        console.error(`Cannot read file : ${e}`);
    }
});
main();

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

import { CardDeck } from './deck/cardDeck';
import { Player } from './player/player';

const main = async () => {
  try {
    const rawdata = await readFile('inputs/testcase4.json');
    const { data } = JSON.parse(rawdata);
    const players: Player[] = [];

    const cardDeck = new CardDeck();
    data.forEach((playerData: any) => {
      const { player: playerId, cards } = playerData;
      const cardPlayer = new Player(playerId);
      cards.forEach((card: any, i: number) => {
        cardPlayer.addCard(card, cardDeck);
      });
      players.push(cardPlayer);
    });

    const validHands = cardDeck.validatePlayerHands();
    if (!validHands) {
      throw `Invalid configuration in player hands`;
    }

    players.forEach(player => {
      player.setPokerHand(cardDeck);
    });

    // card are valid, decide a winner
    cardDeck.decideWinner(players);
  } catch (e) {
    console.error(`Cannot read file : ${e}`);
  }
};

main();

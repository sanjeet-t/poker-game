import { CardSet } from './cardSet';
import { Card } from './card';
import { Player } from '../player/player';
import { IPokerHand } from '../common/poker.interface';

export class CardDeck {
  hearts: CardSet;
  diamonds: CardSet;
  spades: CardSet;
  clubs: CardSet;

  constructor() {
    this.hearts = new CardSet('hearts');
    this.diamonds = new CardSet('diamonds');
    this.spades = new CardSet('spades');
    this.clubs = new CardSet('clubs');
  }

  getCardSetBySuit = (suit: string) => {
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

  // to-do - need to check if players have valid card combinations
  validatePlayerHands = () => {
    return true;
  };

  decideWinner(players: Player[]) {
    // flush
    const hasFlushPlayer = players.find(player => {
      const pokerHand = player.getPokerHand() as IPokerHand;
      return pokerHand.flush === true;
    });

    if (hasFlushPlayer) {
      console.log(`${hasFlushPlayer.id} is the winner with a Flush`);
      return;
    }

    // 3 of a kind - handle ties
    let winners;
    winners = players.filter(player => {
      const pokerHand = player.getPokerHand() as IPokerHand;
      return pokerHand['threepair-rank'] !== 0;
    });

    if (winners.length > 0) {
      if (winners.length > 1) {
        return this.manageTies(winners, 'threepair-rank', 'Three-of-a-kind');
      } else {
        console.log(winners[0].id + ' is the winner with Three-of-a-kind');
        return;
      }
    }

    // one pair
    winners = players.filter(player => {
      const pokerHand = player.getPokerHand() as IPokerHand;
      return pokerHand['onepair-rank'] !== 0;
    });

    if (winners.length > 0) {
      if (winners.length > 1) {
        return this.manageTies(winners, 'onepair-rank', 'One-pair');
      } else {
        console.log(winners[0].id + ' is the winner with One-pair');
        return;
      }
    }

    // high card
    let winner;
    let winningCardRank = Infinity;
    for (let i = 0; i < players.length; i++) {
      const pokerHand = players[i].getPokerHand();
      const highestCardRank = pokerHand['highcard-rank'];
      if (highestCardRank < winningCardRank) {
        winningCardRank = highestCardRank;
        winner = players[i];
      }
    }

    if (winner) {
      console.log(`${winner.id} is the winner with a Highest Card`);
      return;
    }

    console.log(`Can't find winner`);
  }

  manageTies(winners: Player[], key: string, pairType: string) {
    console.error(`---Need to break ties---`);
    console.log(`Tie for ${key}`);
    //  grab the top ranked card
    let topRank = Infinity;
    let tieBreakerWinners = [];
    for (let i = 0; i < winners.length; i++) {
      let winner = winners[i];
      let pokerHand = winner.getPokerHand();
      let rank = pokerHand[`${key}`];
      if (rank < topRank) {
        topRank = rank;
        tieBreakerWinners = []; // reset
        tieBreakerWinners.push(winner);
      } else if (rank === topRank) {
        tieBreakerWinners.push(winner);
      }
    }

    if (tieBreakerWinners.length === 1) {
      console.log(`${tieBreakerWinners[0].id} is the winner with ${pairType}`);
      return;
    }

    // there is still a tie with 2 players

    // remove the paired cards
    tieBreakerWinners.forEach(winner => {
      winner.cards = winner.cards
        .filter(card => card.rank !== topRank)
        .sort((a, b) => a.rank - b.rank);
    });

    // check if high card is same
    let highestRank = tieBreakerWinners[0].pokerHand['highcard-rank'];
    if (highestRank === tieBreakerWinners[1].pokerHand['highcard-rank']) {
      // high card is same, filter it out
      console.log(`Tie for same highest card`);
      tieBreakerWinners.forEach(winner => {
        winner.cards = winner.cards
          .filter(card => card.rank !== highestRank)
          .sort((a, b) => a.rank - b.rank);
      });
    } else {
      // return the winner with higher rank
      tieBreakerWinners.sort((a, b) => a.cards[0].rank - b.cards[0].rank);
      console.log(`${tieBreakerWinners[0].id} is the winner with ${pairType}`);
      return;
    }

    // check if 2nd-highest card is same
    let secondHighestRank = tieBreakerWinners[0].cards[0].rank;
    if (secondHighestRank === tieBreakerWinners[1].cards[0].rank) {
      // 2nd high card is same, filter it out
      console.log(`Tie for 2nd highest card`);
      tieBreakerWinners.forEach(winner => {
        winner.cards = winner.cards
          .filter(card => card.rank !== secondHighestRank)
          .sort((a, b) => a.rank - b.rank);
      });
    } else {
      // return the winner with 2nd higher rank
      tieBreakerWinners.sort((a, b) => a.cards[0].rank - b.cards[0].rank);
      console.log(`${tieBreakerWinners[0].id} is the winner with ${pairType}`);
      return;
    }

    // return the card with the 3rd highest rank
    console.log(`Tie for 3nd highest card`);
    tieBreakerWinners.sort((a, b) => a.cards[0].rank - b.cards[0].rank);
    console.log(`${tieBreakerWinners[0].id} is the winner with ${pairType}`);

    return;
  }
}

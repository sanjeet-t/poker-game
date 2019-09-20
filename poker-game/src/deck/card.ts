import { valueToDisplayMap, valueToRankMap } from '../common/poker.interface';

export class Card {
  suit: string;
  value: number;
  displayValue: string;
  rank: number;
  playerId?: string;

  constructor(suit: string, value: number) {
    this.suit = suit;
    this.value = value;
    this.displayValue = valueToDisplayMap[`${value}`];
    this.rank = valueToRankMap[`${value}`];
  }

  assignPlayer = (playerId: string) => {
    this.playerId = playerId;
  };
}

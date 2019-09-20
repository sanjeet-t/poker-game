import { Card } from './card';

export class CardSet {
  cards: Card[] = [];
  suit: string;

  constructor(suit: string) {
    this.suit = suit;
    for (let i = 1; i <= 13; i++) {
      let card = new Card(this.suit, i);
      this.cards.push(card);
    }
  }

  getCardByValue(value: number) {
    return this.cards.find(card => card.value === value);
  }

  getCardByDisplayValue(displayValue: string) {
    return this.cards.find(card => card.displayValue === displayValue);
  }
}

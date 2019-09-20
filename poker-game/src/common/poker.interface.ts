import { Card } from '../deck/card';
interface IKeyToValueMap {
  [key: string]: any;
}

export const valueToDisplayMap: IKeyToValueMap = {
  '1': 'A',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '11': 'J',
  '12': 'Q',
  '13': 'K'
};

export const displayToRankMap: IKeyToValueMap = {
  A: 1,
  '2': 13,
  '3': 12,
  '4': 11,
  '5': 10,
  '6': 9,
  '7': 8,
  '8': 7,
  '9': 6,
  '10': 5,
  J: 4,
  Q: 3,
  K: 2
};

export const valueToRankMap: IKeyToValueMap = {
  '1': 1,
  '2': 13,
  '3': 12,
  '4': 11,
  '5': 10,
  '6': 9,
  '7': 8,
  '8': 7,
  '9': 6,
  '10': 5,
  '11': 4,
  '12': 3,
  '13': 2
};

export interface IPokerHand {
  flush: boolean;
  'threepair-rank': number;
  'onepair-rank': number;
  'highcard-rank': number;
}

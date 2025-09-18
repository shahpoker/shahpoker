// FILE: shahpoker/libs/game-logic/src/card.ts

export enum Suit {
  CLUBS = '♣',
  DIAMONDS = '♦',
  HEARTS = '♥',
  SPADES = '♠',
}

export enum Rank {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = 'T',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A',
}

export class Card {
  public readonly suit: Suit;
  public readonly rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }

  // برای نمایش کارت به صورت رشته، مثلا 'A♠'
  toString(): string {
    return `${this.rank}${this.suit}`;
  }

  // مقدار عددی کارت برای مقایسه (سرباز=11, بی‌بی=12, شاه=13, آس=14)
  get value(): number {
    switch (this.rank) {
      case Rank.JACK: return 11;
      case Rank.QUEEN: return 12;
      case Rank.KING: return 13;
      case Rank.ACE: return 14;
      case Rank.TEN: return 10;
      default: return parseInt(this.rank, 10);
    }
  }
}

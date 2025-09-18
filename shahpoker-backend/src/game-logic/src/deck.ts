// FILE: shahpoker/libs/game-logic/src/deck.ts

import { Card, Suit, Rank } from './card';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.buildDeck();
  }

  private buildDeck(): void {
    this.cards = [];
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  // بُر زدن کارت‌ها با الگوریتم فیشر-یتس
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // یک کارت از بالای دسته می‌دهد
  deal(): Card | undefined {
    return this.cards.pop();
  }

  // برگرداندن دسته کارت به حالت اولیه
  reset(): void {
    this.buildDeck();
    this.shuffle();
  }

  get remaining(): number {
    return this.cards.length;
  }
}

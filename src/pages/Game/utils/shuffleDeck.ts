import { DECK_POSITION } from '../constants/gameConfig';
import type { Card } from '../types/Card';

export function shuffleDeck(): Card[] {
  const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        id: `${suit}-${rank}`,
        suit: suit,
        rank: rank,
        position: DECK_POSITION,
        rotation: { x: 0, y: 0, z: 0 },
        owner: 0,
        isFlipped: false,
        inDeck: true
      });
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

import { Card, Suit, Rank } from "./types";

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck(): Card[] {
    return SUITS.flatMap((suit) =>
        RANKS.map((rank) => ({
            id: `${rank}-${suit}`,
            suit,
            rank,
            faceUp: false,
        }))
    );
};


import { Card, Suit, Rank } from "../../types/deck-types";

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

export function shuffleDeck(deck: Card[]): Card[] {
    const shuffled = [...deck];

    for (let i = shuffled.length; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // selects a random index from 0 to i
        [shuffled[i - 1], shuffled[j]] = [shuffled[j], shuffled[i - 1]];
    }
    return shuffled;
}


import { SolitaireState } from "@/app/types/solitaire";
import type { Card } from "../../../types/deck-types";
import { createDeck, shuffleDeck } from "../../card-deck/deck";


export function initializeGame(): SolitaireState {
    const stock = shuffleDeck(createDeck());
    const tableau: Card[][] = [[], [], [], [], [], [], []];

    for (let column = 0; column < 7; column++) {
        const columnCards: Card[] = stock.splice(0, column + 1); // forms subarray taking bottom n cards from stock
        columnCards[columnCards.length - 1].faceUp = true;
        tableau[column] = columnCards;
    }

    console.log(stock);

    return {
        stock: stock,
        waste: [],
        foundations: [[], [], [], []],
        tableau: tableau,
    }
}

export function dealWaste(currentState: SolitaireState) {
    const stock = currentState.stock;
    const waste = currentState.waste;

    if (stock.length == 0) {
        return {
            ...currentState,
            stock: [...waste].reverse().map(card => ({ ...card, faceUp: false })),
            waste: [],
        }
    }

    let newWaste: Card[] = stock.splice(0, 3);
    newWaste.forEach((card) => card.faceUp = true);

    return {
        ...currentState,
        waste: [...currentState.waste, ...newWaste],
        stock: [...currentState.stock]
    };
}
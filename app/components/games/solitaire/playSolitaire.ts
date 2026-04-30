import { SolitaireState } from "@/app/types/solitaire";
import type { Card } from "../../../types/deck-types";
import { createDeck, shuffleDeck } from "../../card-deck/deck";

// TODO: Break some of the state checking logic up & replace with helper functions to simplify code.

export function initializeGame(): SolitaireState {
    const stock = shuffleDeck(createDeck());
    const tableau: Card[][] = [[], [], [], [], [], [], []];

    for (let column = 0; column < 7; column++) {
        const columnCards: Card[] = stock.splice(0, column + 1); // forms subarray taking bottom n cards from stock
        columnCards[columnCards.length - 1].faceUp = true;
        tableau[column] = columnCards;
    }

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

    // if no cards in draw (stock) pile, flip cards from discard (waste) pile
    if (stock.length === 0) {
        const newStock = [...waste.map(card => ({ ...card, faceUp: false }))];
        return {
            ...currentState,
            stock: newStock,
            waste: [],
        }
    }

    const newStock = [...currentState.stock];
    const dealt = newStock.splice(0, 3).map(card => ({ ...card, faceUp: true }));

    return {
        ...currentState,
        waste: [...currentState.waste, ...dealt],
        stock: newStock,
    };
}

export function handleCardDrop(
    currentState: SolitaireState,
    card: Card,
    originZoneId: string,
    targetZoneId: string
) {
    // data zone finding function in general-functions.ts
    const nextTableau = [...currentState.tableau.map(col => [...col])];
    let nextWaste = [...currentState.waste];
    const nextFoundations = [...currentState.foundations.map(foundation => [...foundation])];

    let cardsToMove: Card[] = [card];

    // origin zones //
    if (originZoneId === 'waste') {
        const cardIndex = nextWaste.findIndex(c => c.id === card.id);
        nextWaste.splice(cardIndex, 1);

    } else if (originZoneId.startsWith('tableau-')) {
        const originColumnIndex = parseInt(originZoneId.split('-')[1]);
        const dragIndex = nextTableau[originColumnIndex].findIndex(c => c.id === card.id);
        cardsToMove = nextTableau[originColumnIndex].splice(dragIndex);
        flipTopCard(nextTableau[originColumnIndex]);
    }

    // target zones //
    if (targetZoneId.startsWith('tableau-')) {
        const targetColumnIndex = parseInt(targetZoneId.split('-')[1]);
        const targetCard = nextTableau[targetColumnIndex].at(-1);

        if (!validTableauCheck(card, targetCard)) return currentState;
        nextTableau[targetColumnIndex].push(...cardsToMove);

    } else if (targetZoneId.startsWith('foundation-')) {
        const targetFoundationIndex = parseInt(targetZoneId.split('-')[1]);
        const targetCard = nextFoundations[targetFoundationIndex].at(-1);

        if (!validFoundationCheck(card, targetCard)) return currentState;
        nextFoundations[targetFoundationIndex].push(card);
    } else {
        return currentState;
    }

    return {
        ...currentState,
        waste: nextWaste,
        tableau: nextTableau,
        foundations: nextFoundations,
    }
}

/// Assisted Drops /// 

// auto-move upon clicking valid card
export function smartClick(currentState: SolitaireState, card: Card, originZoneId: string) {
    for (let i = 0; i < 4; i++) {
        const targetCard = currentState.foundations[i].at(-1);
        if (validFoundationCheck(card, targetCard)) {
            return handleCardDrop(currentState, card, originZoneId, `foundation-${i}`)
        }
    }

    for (let i = 0; i < 7; i++) {
        const targetCard = currentState.tableau[i].at(-1);
        if (validTableauCheck(card, targetCard)) {
            return handleCardDrop(currentState, card, originZoneId, `tableau-${i}`)
        }
    }

    return currentState;
}

/// helper functions ///
function validTableauCheck(draggedCard: Card, targetCard?: Card): boolean {
    if (!targetCard) {
        return draggedCard.rank == 'K';
    }
    const isDifferentColor = draggedCard.color !== targetCard.color;
    const isOneRankLower = checkNextRank('descending', draggedCard.rank, targetCard.rank);

    const isValid = isDifferentColor && isOneRankLower;
    console.log(isValid);
    return isValid;
}

function validFoundationCheck(draggedCard: Card, targetCard?: Card): boolean {
    if (!targetCard) {
        return draggedCard.rank == 'A';
    }
    const isSameSuit = draggedCard.suit === targetCard.suit;
    const isOneRankLower = checkNextRank('ascending', draggedCard.rank, targetCard.rank);

    const isValid = isSameSuit && isOneRankLower;
    console.log(isValid);
    return isValid;
}

function checkNextRank(mode: 'descending' | 'ascending', rank1: Card["rank"], rank2: Card["rank"]): boolean {
    const rankOrder: Card["rank"][] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const index1 = rankOrder.indexOf(rank1);
    const index2 = rankOrder.indexOf(rank2);
    return mode === 'descending' ? index1 === index2 - 1 : index1 === index2 + 1;
}

/// Small general mechanics ///

function flipTopCard(column: Card[]): void {
    const topCard = column[column.length - 1];
    if (topCard) topCard.faceUp = true;
}
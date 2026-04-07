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
            stock: [...waste].map(card => ({ ...card, faceUp: false })),
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

export function handleCardDrop(
    currentState: SolitaireState,
    card: Card,
    originZoneId: string,
    targetZoneId: string
) {
    if (targetZoneId.startsWith('tableau')) {
        const targetColumnIndex = parseInt(targetZoneId.split('-')[1]);
        const nextTableau = [...currentState.tableau.map(col => [...col])];
        let nextWaste = [...currentState.waste];

        if (originZoneId === 'waste') {
            nextWaste = nextWaste.filter(c => c.id !== card.id);
        } else if (originZoneId.startsWith('tableau-')) {
            const originColumnIndex = parseInt(originZoneId.split('-')[1]);
            const nextOriginTableauCard = nextTableau[originColumnIndex][nextTableau[originColumnIndex].length - 1];
            if (nextOriginTableauCard) {
                nextOriginTableauCard.faceUp = true;
            }
            nextTableau[originColumnIndex] = nextTableau[originColumnIndex].filter(c => c.id !== card.id);
        }

        nextTableau[targetColumnIndex].push(card);
        console.log("added to tableau");
        return {
            ...currentState,
            waste: nextWaste,
            tableau: nextTableau
        };

    } else if (targetZoneId.startsWith('foundation')) {
        const targetFoundationIndex = parseInt(targetZoneId.split('-')[1]);
        const nextFoundations = [...currentState.foundations.map(foundation => [...foundation])];
        let nextWaste = [...currentState.waste];
        let nextTableau = [...currentState.tableau.map(col => [...col])];

        if (originZoneId === 'waste') {
            nextWaste = nextWaste.filter(c => c.id !== card.id);
        } else if (originZoneId.startsWith('tableau-')) {
            const originColumnIndex = parseInt(originZoneId.split('-')[1]);
            nextTableau[originColumnIndex] = nextTableau[originColumnIndex].filter(c => c.id !== card.id);
        }

        nextFoundations[targetFoundationIndex].push(card);
        return {
            ...currentState,
            waste: nextWaste,
            foundations: nextFoundations,
            tableau: nextTableau
        };
    }

    return currentState;
}

export function validTableauCheck(draggedCard: Card, targetCard?: Card): boolean {
    if (!targetCard) {
        return draggedCard.rank == 'K';
    }
    const isDifferentColor = draggedCard.color !== targetCard.color;
    const isOneRankLower = checkNextRank('descending', draggedCard.rank, targetCard.rank);

    const isValid = isDifferentColor && isOneRankLower;
    console.log(isValid);
    return isValid;
}

export function validFoundationCheck(draggedCard: Card, targetCard?: Card): boolean {
    if (!targetCard) {
        return draggedCard.rank == 'A';
    }
    const isSameSuit = draggedCard.suit === targetCard.suit;
    const isOneRankLower = checkNextRank('ascending', draggedCard.rank, targetCard.rank);

    const isValid = isSameSuit && isOneRankLower;
    console.log(isValid);
    return isValid;
}

/// helper functions ///

export function checkNextRank(mode: 'descending' | 'ascending', rank1: Card["rank"], rank2: Card["rank"]): boolean {
    const rankOrder: Card["rank"][] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const index1 = rankOrder.indexOf(rank1);
    const index2 = rankOrder.indexOf(rank2);
    return mode === 'descending' ? index1 === index2 - 1 : index1 === index2 + 1;
}
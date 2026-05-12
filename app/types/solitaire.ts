import type { Card } from "./deck-types";

export type SolitaireState = {
    stock: Card[];
    waste: Card[];
    foundations: Card[][];
    tableau: Card[][];
    score: number;
    moves: number;
    timesReshuffled: number;
}

export type SolitaireActions = {
    start: (count: 1 | 3) => void;
    abandon: () => void;
    undo: () => void;
    draw: () => void;
}

export type solitaireStats = {
    score: number;
    moves: number;
    gameId: number;
}

interface InfoMenuProps {
    actions: SolitaireActions;
    stats: solitaireStats;
    canUndo: boolean;
    gameWinTimerStop: boolean;
}
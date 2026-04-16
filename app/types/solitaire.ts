import type { Card } from "./deck-types";

export type SolitaireState = {
    stock: Card[];
    waste: Card[];
    discard: Card[]
    foundations: Card[][];
    tableau: Card[][];
}
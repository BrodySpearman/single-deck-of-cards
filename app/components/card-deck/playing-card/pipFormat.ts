// Ill admit this section was generated
// I'm not a css wizard but I'm also sure theres a better way to do this(?)

type Pip = { row: number; col: number; flip?: boolean; };


export const PIP_LAYOUTS: Record<string, Pip[]> = {
    'A': [{ row: 4, col: 2 }],
    '2': [
        { row: 1, col: 2 },
        { row: 7, col: 2, flip: true }
    ],
    '3': [
        { row: 1, col: 2 },
        { row: 4, col: 2 },
        { row: 7, col: 2, flip: true }
    ],
    '4': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
    '5': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 4, col: 2 },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
    '6': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 4, col: 1 }, { row: 4, col: 3 },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
    '7': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 2, col: 2 },
        { row: 4, col: 1 }, { row: 4, col: 3 },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
    '8': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 2, col: 2 },
        { row: 4, col: 1 }, { row: 4, col: 3 },
        { row: 6, col: 2, flip: true },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
    '9': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 3, col: 1 }, { row: 3, col: 3 },
        { row: 4, col: 2 },
        { row: 5, col: 1, flip: true }, { row: 5, col: 3, flip: true },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
    '10': [
        { row: 1, col: 1 }, { row: 1, col: 3 },
        { row: 2, col: 2 },
        { row: 3, col: 1 }, { row: 3, col: 3 },
        { row: 5, col: 1, flip: true }, { row: 5, col: 3, flip: true },
        { row: 6, col: 2, flip: true },
        { row: 7, col: 1, flip: true }, { row: 7, col: 3, flip: true }
    ],
};
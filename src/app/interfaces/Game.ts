export interface Game {
    board: string[];
    isP1Turn: boolean;
    p1: string;
    p2: string;
}

export function newGame(p1: string): Game {
    return ({
        board: ["", "", "", "", "", "", "", "", ""],
        isP1Turn: true,
        p1: p1,
        p2: ""
    });
}
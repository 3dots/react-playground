

export const BOARD_DIMENSION_ROWS = 3;
export const BOARD_DIMENSION_COLUMNS = 3;

export class GameBoardData {

    rows: GameBoardDataLine[];
    playerTurn: number;

    public constructor(rows?: GameBoardDataLine[], playerTurn?: number) {
        if (rows && rows.length !== BOARD_DIMENSION_ROWS) throw new Error(`Expected ${BOARD_DIMENSION_ROWS} elements in array.`);
        if (!rows) {
            rows = [];
            for (let i = 0; i < BOARD_DIMENSION_ROWS; i++) rows.push(new GameBoardDataLine());
        }
        this.rows = rows;
        this.playerTurn = playerTurn ?? 0;
    }
}

export class GameBoardDataLine {
    columns: EnTicToeState[];

    public constructor(columns?: EnTicToeState[]) {
        if (columns && columns.length !== BOARD_DIMENSION_COLUMNS) throw new Error(`Expected ${BOARD_DIMENSION_COLUMNS} elements in array.`);
        if (!columns) {
            columns = [];
            for (let i = 0; i < BOARD_DIMENSION_COLUMNS; i++) columns.push(EnTicToeState.NotSelected);
        }
        this.columns = columns;
    }
}

export enum EnTicToeState {
    NotSelected = "",
    Player1 = "X",
    Player2 = "O"
}
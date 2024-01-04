

export const BOARD_DIMENSION_ROWS = 3;
export const BOARD_DIMENSION_COLUMNS = 3;
const WIN_CONDITION_COUNT = 3;

export class GameBoardData {
    rows: GameBoardDataLine[];
    activePlayer: EnTicToeState;
    logEntries: GameLogEntry[];
    isGameOver: boolean;

    public constructor(rows?: GameBoardDataLine[], activePlayer?: EnTicToeState, logEntries?: GameLogEntry[]) {
        this.rows = this.setRows(rows);
        this.activePlayer = activePlayer ?? EnTicToeState.Player1;
        this.logEntries = logEntries ?? [];
        this.isGameOver = this.determineGameOver();
    }

    private setRows(rows?: GameBoardDataLine[]) : GameBoardDataLine[] {
        if (rows && rows.length !== BOARD_DIMENSION_ROWS) throw new Error(`Expected ${BOARD_DIMENSION_ROWS} elements in array.`);
        if (!rows) {
            rows = [];
            for (let i = 0; i < BOARD_DIMENSION_ROWS; i++) rows.push(new GameBoardDataLine());
        }
        return rows;
    }

    private determineGameOver(): boolean {
        let winCompute = new WinStateCompute();

        //horizontal
        for(let rowIndex = 0; rowIndex < BOARD_DIMENSION_ROWS; rowIndex++) {
            for(let columnIndex = 0; columnIndex < BOARD_DIMENSION_COLUMNS; columnIndex++) {
                winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
                if (winCompute.isWin()) return true;
            }
            winCompute.reset();
        }
        winCompute.reset();

        //vertical
        for(let columnIndex = 0; columnIndex < BOARD_DIMENSION_COLUMNS; columnIndex++) {
            for(let rowIndex = 0; rowIndex < BOARD_DIMENSION_ROWS; rowIndex++) {
                winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
                if (winCompute.isWin()) return true;
            }

            winCompute.reset();
        }
        winCompute.reset();

        //diagonal left to right
        let rowStartingIndex = 0;
        let columnStartingIndex = 0;

        let offset = 0;
        let rowIndex = rowStartingIndex;
        let columnIndex = columnStartingIndex;
        while (rowIndex >= 0 && rowIndex < BOARD_DIMENSION_ROWS && columnIndex >= 0 && columnIndex < BOARD_DIMENSION_COLUMNS) {
            winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
            if (winCompute.isWin()) return true;

            offset++;
            rowIndex = rowStartingIndex + offset;
            columnIndex = columnStartingIndex + offset;
        }
        winCompute.reset();

        //diagonal right to left
        rowStartingIndex = 0;
        columnStartingIndex = BOARD_DIMENSION_COLUMNS - 1;

        offset = 0;
        rowIndex = rowStartingIndex;
        columnIndex = columnStartingIndex;
        while (rowIndex >= 0 && rowIndex < BOARD_DIMENSION_ROWS && columnIndex >= 0 && columnIndex < BOARD_DIMENSION_COLUMNS) {
            winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
            if (winCompute.isWin()) return true;

            offset++;
            rowIndex = rowStartingIndex + offset;
            columnIndex = columnStartingIndex - offset;
        }
        winCompute.reset();

        return false;
    }
}

class WinStateCompute {
    curPlayer: EnTicToeState = EnTicToeState.NotSelected;
    winCount: number = 0;


    reset() {
        this.curPlayer = EnTicToeState.NotSelected;
        this.winCount = 0;
    }

    iterate(thisPlayer: EnTicToeState) {
        if (thisPlayer !== this.curPlayer) {
            this.curPlayer = thisPlayer;
            this.winCount = 0;
        }
        if (thisPlayer !== EnTicToeState.NotSelected) {
            this.winCount++;
        }
    }

    isWin() : boolean {
        return this.winCount == WIN_CONDITION_COUNT;
    }
}

export class GameBoardDataLine {
    columns: EnTicToeState[];

    public constructor(columns?: EnTicToeState[]) {
        this.columns = this.setColumns(columns);
    }

    private setColumns(columns?: EnTicToeState[]): EnTicToeState[] {
        if (columns && columns.length !== BOARD_DIMENSION_COLUMNS) throw new Error(`Expected ${BOARD_DIMENSION_COLUMNS} elements in array.`);
        if (!columns) {
            columns = [];
            for (let i = 0; i < BOARD_DIMENSION_COLUMNS; i++) columns.push(EnTicToeState.NotSelected);
        }
        return columns;
    }
}

export enum EnTicToeState {
    NotSelected = "",
    Player1 = "X",
    Player2 = "O"
}

export function playerString(currentPlayer: EnTicToeState) {
    switch(currentPlayer) {
        case EnTicToeState.NotSelected: return "Not selected";
        case EnTicToeState.Player1: return "Player 1";
        case EnTicToeState.Player2: return "Player 2";
    }
}

export class GameLogEntry {
    player: EnTicToeState = EnTicToeState.NotSelected;
    row: number = 0;
    column: number = 0;

    public constructor(init?: Partial<GameLogEntry>) {
        Object.assign(this, init);
    }
}
export const BOARD_DIMENSION_ROWS = 3;
export const BOARD_DIMENSION_COLUMNS = 3;
const WIN_CONDITION_COUNT = 3;

export class GameBoardData {
  rows: GameBoardDataLine[];
  activePlayer: EnTicToeState;
  logEntries: GameLogEntry[];
  winner: EnTicToeState | null;
  player1Name: string;
  player2Name: string;

  public constructor(
    rows?: GameBoardDataLine[],
    activePlayer?: EnTicToeState,
    logEntries?: GameLogEntry[],
    player1Name?: string,
    player2Name?: string
  ) {
    this.rows = this.setRows(rows);
    this.activePlayer = activePlayer ?? EnTicToeState.Player1;
    this.logEntries = logEntries ?? [];
    this.winner = this.determineGameOver();
    this.player1Name = player1Name ?? "Player 1";
    this.player2Name = player2Name ?? "Player 2";
  }

  private setRows(rows?: GameBoardDataLine[]): GameBoardDataLine[] {
    if (rows && rows.length !== BOARD_DIMENSION_ROWS)
      throw new Error(`Expected ${BOARD_DIMENSION_ROWS} elements in array.`);
    if (!rows) {
      rows = [];
      for (let i = 0; i < BOARD_DIMENSION_ROWS; i++)
        rows.push(new GameBoardDataLine());
    }
    return rows;
  }

  private determineGameOver(): EnTicToeState | null {
    let winCompute = new WinStateCompute();

    //horizontal
    for (let rowIndex = 0; rowIndex < BOARD_DIMENSION_ROWS; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < BOARD_DIMENSION_COLUMNS;
        columnIndex++
      ) {
        winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
        if (winCompute.isWin()) return winCompute.curPlayer;
      }
      winCompute.reset();
    }
    winCompute.reset();

    //vertical
    for (
      let columnIndex = 0;
      columnIndex < BOARD_DIMENSION_COLUMNS;
      columnIndex++
    ) {
      for (let rowIndex = 0; rowIndex < BOARD_DIMENSION_ROWS; rowIndex++) {
        winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
        if (winCompute.isWin()) return winCompute.curPlayer;
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
    while (
      rowIndex >= 0 &&
      rowIndex < BOARD_DIMENSION_ROWS &&
      columnIndex >= 0 &&
      columnIndex < BOARD_DIMENSION_COLUMNS
    ) {
      winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
      if (winCompute.isWin()) return winCompute.curPlayer;

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
    while (
      rowIndex >= 0 &&
      rowIndex < BOARD_DIMENSION_ROWS &&
      columnIndex >= 0 &&
      columnIndex < BOARD_DIMENSION_COLUMNS
    ) {
      winCompute.iterate(this.rows[rowIndex].columns[columnIndex]);
      if (winCompute.isWin()) return winCompute.curPlayer;

      offset++;
      rowIndex = rowStartingIndex + offset;
      columnIndex = columnStartingIndex - offset;
    }
    winCompute.reset();

    for (const row of this.rows) {
      for (const column of row.columns) {
        if (column === EnTicToeState.NotSelected) {
          return null;
        }
      }
    }

    //debugger;
    return EnTicToeState.NotSelected;
  }

  playerString(player: EnTicToeState): string {
    return player === EnTicToeState.Player1 ? this.player1Name : this.player2Name;
  }

  activePlayerString(): string {
    return this.playerString(this.activePlayer);
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

  isWin(): boolean {
    let isWin = this.winCount == WIN_CONDITION_COUNT;
    //if (isWin) debugger;
    return isWin;
  }
}

export class GameBoardDataLine {
  columns: EnTicToeState[];

  public constructor(columns?: EnTicToeState[]) {
    this.columns = this.setColumns(columns);
  }

  private setColumns(columns?: EnTicToeState[]): EnTicToeState[] {
    if (columns && columns.length !== BOARD_DIMENSION_COLUMNS)
      throw new Error(`Expected ${BOARD_DIMENSION_COLUMNS} elements in array.`);
    if (!columns) {
      columns = [];
      for (let i = 0; i < BOARD_DIMENSION_COLUMNS; i++)
        columns.push(EnTicToeState.NotSelected);
    }
    return columns;
  }
}

export enum EnTicToeState {
  NotSelected = "",
  Player1 = "X",
  Player2 = "O",
}

export class GameLogEntry {
  player: EnTicToeState = EnTicToeState.NotSelected;
  row: number = 0;
  column: number = 0;

  public constructor(init?: Partial<GameLogEntry>) {
    Object.assign(this, init);
  }
}

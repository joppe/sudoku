import { Cell } from 'app/sudoku/grid/cell/Cell';

export function getCellByCoords(column: number, row: number, cells: Array<Cell>): Cell {
    const index: number = (row * 9) + column;
    const cell: Cell | undefined = cells[index];

    if (cell === undefined) {
        throw new Error(`Cell not found with row: ${row} and column: ${column}`);
    }

    return cell;
}

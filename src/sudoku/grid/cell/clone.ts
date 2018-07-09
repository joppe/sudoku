import { Cell } from 'app/sudoku/grid/cell/Cell';

export function clone(cell: Cell): Cell {
    return {
        column: cell.column,
        possiblities: [...cell.possiblities],
        row: cell.row
    };
}

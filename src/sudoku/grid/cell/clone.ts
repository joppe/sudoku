import { Cell } from 'app/sudoku/grid/cell/Cell';

export function clone(cell: Cell): Cell {
    return {
        col: cell.col,
        possibilities: [...cell.possibilities],
        row: cell.row
    };
}

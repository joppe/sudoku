import { Cell } from 'app/sudoku/grid/cell/Cell';

export function toString(cell: Cell): string {
    return `row: ${cell.row}, col: ${cell.col}, possibilities: ${cell.possibilities.join(', ')}`;
}

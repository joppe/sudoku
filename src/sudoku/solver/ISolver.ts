import { Cell } from 'app/sudoku/grid/cell/Cell';

export interface ISolver {
    solve(cell: Array<Cell>): Array<Cell>;
}

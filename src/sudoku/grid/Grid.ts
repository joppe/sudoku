import { Cell } from 'app/sudoku/grid/cell/Cell';
import { Size } from 'app/sudoku/grid/Size';

export type Grid = {
    cells: Array<Cell>;
    size: Size;
};

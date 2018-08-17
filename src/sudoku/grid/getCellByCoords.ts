import { Cell } from 'app/sudoku/grid/cell/Cell';
import { coordsToIndex } from 'app/sudoku/grid/coordsToIndex';
import { Grid } from 'app/sudoku/grid/Grid';

export function getCellByCoords(grid: Grid, col: number, row: number): Cell {
    if (col < 0 || col >= grid.size.vertical || row < 0 || row >= grid.size.horizontal) {
        throw new Error(`Cell not found with row: ${row} and column: ${col}`);
    }

    return grid.cells[coordsToIndex(col, row, grid.size)];
}

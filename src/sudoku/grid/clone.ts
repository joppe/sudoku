import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone as cloneCell } from 'app/sudoku/grid/cell/clone';
import { Grid } from 'app/sudoku/grid/Grid';

export function clone(grid: Grid): Grid {
    const cells: Array<Cell> = [];

    return {
        size: {
            horizontal: grid.size.horizontal,
            vertical: grid.size.vertical
        },
        cells: grid.cells.map(cloneCell)
    };
}

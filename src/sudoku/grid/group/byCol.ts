import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';
import { Grid } from 'app/sudoku/grid/Grid';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';

export const byCol: GroupStrategy = (grid: Grid, col: number): Grid => {
    if (col < 0 || col >= grid.size.horizontal) {
        throw new Error(`Group by col: Illegal col index ${col}`);
    }

    const cells: Array<Cell> = [];

    for (const row of array.iterator.range(0, grid.size.horizontal - 1, 1)) {
        cells.push(getCellByCoords(grid, col, row));
    }

    return {
        size: {
            horizontal: 1,
            vertical: grid.size.vertical
        },
        cells
    };
};

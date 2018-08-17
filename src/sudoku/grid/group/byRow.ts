import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';
import { Grid } from 'app/sudoku/grid/Grid';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';

export const byRow: GroupStrategy = (grid: Grid, row: number): Grid => {
    if (row < 0 || row >= grid.size.vertical) {
        throw new Error(`Group by row: Illegal row index ${row}`);
    }

    const cells: Array<Cell> = [];

    for (const col of array.iterator.range(0, grid.size.vertical - 1, 1)) {
        cells.push(getCellByCoords(grid, col, row));
    }

    return {
        size: {
            horizontal: grid.size.horizontal,
            vertical: 1
        },
        cells
    };
};

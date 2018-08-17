import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';
import { Grid } from 'app/sudoku/grid/Grid';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';

export const byBlock: GroupStrategy = (grid: Grid, block: number, blockSize: number = 3): Grid => {
    if (grid.size.horizontal !== grid.size.vertical) {
        throw new Error(`Group by block: grid is not symetrical horizontal: ${grid.size.horizontal}, vertical: ${grid.size.vertical}`);
    }

    if (block < 0 || block >= grid.size.horizontal) {
        throw new Error(`Group by block: Illegal block index ${block}`);
    }

    const cells: Array<Cell> = [];
    const start: {col: number; row: number} = {
        col: (block % blockSize) * blockSize,
        row: Math.floor(block / blockSize) * blockSize
    };

    for (const row of array.iterator.range(0, blockSize - 1, 1)) {
        for (const col of array.iterator.range(0, blockSize - 1, 1)) {
            cells.push(getCellByCoords(grid, start.col + col, start.row + row));
        }
    }

    return {
        size: {
            horizontal: blockSize,
            vertical: blockSize
        },
        cells
    };
};

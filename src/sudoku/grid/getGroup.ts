import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';

export function * getGroup(index: number, cells: Array<Cell>): IterableIterator<Cell> {
    const start: {column: number; row: number} = {
        column: index % 3,
        row: Math.floor(index / 3)
    };

    for (const column of array.iterator.range(0, 2, 1)) {
        for (const row of array.iterator.range(0, 2, 1)) {
            yield getCellByCoords(start.column + column, start.row + row, cells);
        }
    }
}

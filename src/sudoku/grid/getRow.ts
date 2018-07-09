import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';

export function * getRow(row: number, cells: Array<Cell>, start: number = 0, end: number = 8): IterableIterator<Cell> {
    for (const column of array.iterator.range(start, end, 1)) {
        yield getCellByCoords(column, row, cells);
    }
}

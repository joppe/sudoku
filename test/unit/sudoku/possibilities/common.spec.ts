import { Cell } from '../../../../src/sudoku/grid/cell/Cell';
import { common } from '../../../../src/sudoku/possibilities/common';

describe('common', (): void => {
    it('return the possibilities that occur more then once in a group', (): void => {
        const cell1: Cell = {
            col: 0,
            possibilities: [2, 7, 9],
            row: 0
        };
        const cell2: Cell = {
            col: 1,
            possibilities: [5, 7],
            row: 0
        };
        const cell3: Cell = {
            col: 2,
            possibilities: [2, 5, 9],
            row: 0
        };

        expect(common([cell1, cell2, cell3])).toEqual([2, 5, 7, 9]);
    });
});

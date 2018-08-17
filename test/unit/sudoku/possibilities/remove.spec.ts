import { Cell } from '../../../../src/sudoku/grid/cell/Cell';
import { remove } from '../../../../src/sudoku/possibilities/remove';

describe('remove', (): void => {
    it('remove the possibilities that match a given array of numbers', (): void => {
        const cell1: Cell = {
            col: 0,
            possibilities: [1, 2, 3],
            row: 0
        };
        const cell2: Cell = {
            col: 1,
            possibilities: [3, 5, 8, 9],
            row: 0
        };
        const cell3: Cell = {
            col: 2,
            possibilities: [8, 7],
            row: 0
        };

        expect(remove([2], cell1.possibilities)).toEqual([1, 3]);
        expect(remove([], cell1.possibilities)).toEqual([1, 2, 3]);
    });
});

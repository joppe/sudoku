import { Cell } from '../../../../../src/sudoku/grid/cell/Cell';
import { complement } from '../../../../../src/sudoku/grid/cell/complement';

describe('complement', (): void => {
    it('return the possibilities that only exist in the first cell', (): void => {
        const cell1: Cell = {
            column: 0,
            possiblities: [1, 2, 3],
            row: 0
        };
        const cell2: Cell = {
            column: 1,
            possiblities: [3, 5, 8, 9],
            row: 0
        };
        const cell3: Cell = {
            column: 2,
            possiblities: [8, 7],
            row: 0
        };

        expect(complement(cell1, cell2, cell3)).toEqual([1, 2]);
        expect(complement(cell2, cell1, cell3)).toEqual([5, 9]);
        expect(complement(cell3, cell1, cell2)).toEqual([7]);
    });
});

import { Cell } from '../../../../src/sudoku/grid/cell/Cell';
import { intersection } from '../../../../src/sudoku/possibilities/intersection';

describe('intersection', (): void => {
    it('return the possibilities that exist in all cells', (): void => {
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
            possibilities: [1, 2, 8, 9],
            row: 0
        };

        expect(intersection([cell1, cell2])).toEqual([3]);
        expect(intersection([cell2, cell3])).toEqual([8, 9]);
        expect(intersection([cell1, cell3])).toEqual([1, 2]);
        expect(intersection([cell1, cell2, cell3])).toEqual([]);
    });
});

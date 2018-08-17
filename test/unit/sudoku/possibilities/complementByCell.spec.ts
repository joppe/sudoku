import { Cell } from '../../../../src/sudoku/grid/cell/Cell';
import { complementByCell } from '../../../../src/sudoku/possibilities/complementByCell';

describe('complementByCell', (): void => {
    it('return the possibilities that only exist in the first cell', (): void => {
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

        expect(complementByCell(cell1, [cell2, cell3])).toEqual([1, 2]);
        expect(complementByCell(cell2, [cell1, cell3])).toEqual([5, 9]);
        expect(complementByCell(cell3, [cell1, cell2])).toEqual([7]);
    });
});

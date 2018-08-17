/* tslint:disable: max-func-body-length */

import { getCellByCoords } from '../../../../src/sudoku/grid/getCellByCoords';
import { Grid } from '../../../../src/sudoku/grid/Grid';
import { byBlock } from '../../../../src/sudoku/grid/group/byBlock';
import { byRow } from '../../../../src/sudoku/grid/group/byRow';
import { AxisSolver } from '../../../../src/sudoku/solver/AxisSolver';
import { Solution } from '../../../../src/sudoku/solver/Solution';

describe('AxisSolver', (): void => {
    let grid: Grid;
    let solver: AxisSolver;

    beforeEach((): void => {
        solver = new AxisSolver();
        grid = {
            size: {
                horizontal: 9,
                vertical: 9
            },
            cells: [
                {
                    col: 0,
                    possibilities: [1, 2, 8],
                    row: 0
                },
                {
                    col: 1,
                    possibilities: [1, 2, 7, 8],
                    row: 0
                },
                {
                    col: 2,
                    possibilities: [9],
                    row: 0
                },
                {
                    col: 3,
                    possibilities: [5],
                    row: 0
                },
                {
                    col: 4,
                    possibilities: [3],
                    row: 0
                },
                {
                    col: 5,
                    possibilities: [2, 8],
                    row: 0
                },
                {
                    col: 6,
                    possibilities: [6],
                    row: 0
                },
                {
                    col: 7,
                    possibilities: [4],
                    row: 0
                },
                {
                    col: 8,
                    possibilities: [1, 7],
                    row: 0
                },
                {
                    col: 0,
                    possibilities: [1, 2, 6, 8],
                    row: 1
                },
                {
                    col: 1,
                    possibilities: [1, 2, 6, 7, 8],
                    row: 1
                },
                {
                    col: 2,
                    possibilities: [3],
                    row: 1
                },
                {
                    col: 3,
                    possibilities: [2, 6, 7],
                    row: 1
                },
                {
                    col: 4,
                    possibilities: [4],
                    row: 1
                },
                {
                    col: 5,
                    possibilities: [2, 6, 8],
                    row: 1
                },
                {
                    col: 6,
                    possibilities: [1, 5, 7],
                    row: 1
                },
                {
                    col: 7,
                    possibilities: [9],
                    row: 1
                },
                {
                    col: 8,
                    possibilities: [1, 5, 7],
                    row: 1
                },
                {
                    col: 0,
                    possibilities: [5],
                    row: 2
                },
                {
                    col: 1,
                    possibilities: [6, 7],
                    row: 2
                },
                {
                    col: 2,
                    possibilities: [4],
                    row: 2
                },
                {
                    col: 3,
                    possibilities: [6, 7],
                    row: 2
                },
                {
                    col: 4,
                    possibilities: [9],
                    row: 2
                },
                {
                    col: 5,
                    possibilities: [1],
                    row: 2
                },
                {
                    col: 6,
                    possibilities: [3],
                    row: 2
                },
                {
                    col: 7,
                    possibilities: [2],
                    row: 2
                },
                {
                    col: 8,
                    possibilities: [8],
                    row: 2
                },
                {
                    col: 0,
                    possibilities: [1, 2, 4],
                    row: 3
                },
                {
                    col: 1,
                    possibilities: [1, 2, 4, 7],
                    row: 3
                },
                {
                    col: 2,
                    possibilities: [5],
                    row: 3
                },
                {
                    col: 3,
                    possibilities: [8],
                    row: 3
                },
                {
                    col: 4,
                    possibilities: [6, 7],
                    row: 3
                },
                {
                    col: 5,
                    possibilities: [3],
                    row: 3
                },
                {
                    col: 6,
                    possibilities: [1, 7],
                    row: 3
                },
                {
                    col: 7,
                    possibilities: [1, 6],
                    row: 3
                },
                {
                    col: 8,
                    possibilities: [9],
                    row: 3
                },
                {
                    col: 0,
                    possibilities: [3],
                    row: 4
                },
                {
                    col: 1,
                    possibilities: [1, 2, 7],
                    row: 4
                },
                {
                    col: 2,
                    possibilities: [6],
                    row: 4
                },
                {
                    col: 3,
                    possibilities: [2, 7, 9],
                    row: 4
                },
                {
                    col: 4,
                    possibilities: [5, 7],
                    row: 4
                },
                {
                    col: 5,
                    possibilities: [2, 5, 9],
                    row: 4
                },
                {
                    col: 6,
                    possibilities: [8],
                    row: 4
                },
                {
                    col: 7,
                    possibilities: [1, 5],
                    row: 4
                },
                {
                    col: 8,
                    possibilities: [4],
                    row: 4
                },
                {
                    col: 0,
                    possibilities: [9],
                    row: 5
                },
                {
                    col: 1,
                    possibilities: [8],
                    row: 5
                },
                {
                    col: 2,
                    possibilities: [7],
                    row: 5
                },
                {
                    col: 3,
                    possibilities: [1],
                    row: 5
                },
                {
                    col: 4,
                    possibilities: [5, 6, 7],
                    row: 5
                },
                {
                    col: 5,
                    possibilities: [4],
                    row: 5
                },
                {
                    col: 6,
                    possibilities: [2],
                    row: 5
                },
                {
                    col: 7,
                    possibilities: [3],
                    row: 5
                },
                {
                    col: 8,
                    possibilities: [5, 6, 7],
                    row: 5
                },
                {
                    col: 0,
                    possibilities: [7],
                    row: 6
                },
                {
                    col: 1,
                    possibilities: [9],
                    row: 6
                },
                {
                    col: 2,
                    possibilities: [1, 8],
                    row: 6
                },
                {
                    col: 3,
                    possibilities: [4],
                    row: 6
                },
                {
                    col: 4,
                    possibilities: [2],
                    row: 6
                },
                {
                    col: 5,
                    possibilities: [5, 6, 8],
                    row: 6
                },
                {
                    col: 6,
                    possibilities: [1, 5],
                    row: 6
                },
                {
                    col: 7,
                    possibilities: [1, 5, 6, 8],
                    row: 6
                },
                {
                    col: 8,
                    possibilities: [3],
                    row: 6
                },
                {
                    col: 0,
                    possibilities: [1, 6, 8],
                    row: 7
                },
                {
                    col: 1,
                    possibilities: [1, 3, 5, 6, 8],
                    row: 7
                },
                {
                    col: 2,
                    possibilities: [1, 8],
                    row: 7
                },
                {
                    col: 3,
                    possibilities: [3, 6, 9],
                    row: 7
                },
                {
                    col: 4,
                    possibilities: [8],
                    row: 7
                },
                {
                    col: 5,
                    possibilities: [5, 6, 8, 9],
                    row: 7
                },
                {
                    col: 6,
                    possibilities: [4],
                    row: 7
                },
                {
                    col: 7,
                    possibilities: [7],
                    row: 7
                },
                {
                    col: 8,
                    possibilities: [2],
                    row: 7
                },
                {
                    col: 0,
                    possibilities: [4, 6, 8],
                    row: 8
                },
                {
                    col: 1,
                    possibilities: [3, 4, 5, 6, 8],
                    row: 8
                },
                {
                    col: 2,
                    possibilities: [2],
                    row: 8
                },
                {
                    col: 3,
                    possibilities: [3, 6],
                    row: 8
                },
                {
                    col: 4,
                    possibilities: [1],
                    row: 8
                },
                {
                    col: 5,
                    possibilities: [7],
                    row: 8
                },
                {
                    col: 6,
                    possibilities: [9],
                    row: 8
                },
                {
                    col: 7,
                    possibilities: [5, 6, 8],
                    row: 8
                },
                {
                    col: 8,
                    possibilities: [5, 6],
                    row: 8
                }
            ]
        };
    });
    /*/
    it('removePossibilities', (): void => {
        expect(getCellByCoords(grid, 0, 0).possibilities).toEqual([1, 2, 8]);

        const solution: Solution = solver.removePossibilities(
            [0, 1],
            [1, 2],
            byRow,
            grid
        );

        expect(getCellByCoords(solution.grid, 0, 0).possibilities).toEqual([8]);
        expect(getCellByCoords(solution.grid, 1, 0).possibilities).toEqual([7, 8]);
        expect(getCellByCoords(solution.grid, 2, 0).possibilities).toEqual([9]);
        expect(getCellByCoords(solution.grid, 3, 0).possibilities).toEqual([5]);
        expect(getCellByCoords(solution.grid, 4, 0).possibilities).toEqual([3]);
        expect(getCellByCoords(solution.grid, 5, 0).possibilities).toEqual([8]);
        expect(getCellByCoords(solution.grid, 6, 0).possibilities).toEqual([6]);
        expect(getCellByCoords(solution.grid, 7, 0).possibilities).toEqual([4]);
        expect(getCellByCoords(solution.grid, 8, 0).possibilities).toEqual([7]);

        expect(getCellByCoords(solution.grid, 0, 1).possibilities).toEqual([6, 8]);
        expect(getCellByCoords(solution.grid, 1, 1).possibilities).toEqual([6, 7, 8]);
        expect(getCellByCoords(solution.grid, 2, 1).possibilities).toEqual([3]);
        expect(getCellByCoords(solution.grid, 3, 1).possibilities).toEqual([6, 7]);
        expect(getCellByCoords(solution.grid, 4, 1).possibilities).toEqual([4]);
        expect(getCellByCoords(solution.grid, 5, 1).possibilities).toEqual([6, 8]);
        expect(getCellByCoords(solution.grid, 6, 1).possibilities).toEqual([5, 7]);
        expect(getCellByCoords(solution.grid, 7, 1).possibilities).toEqual([9]);
        expect(getCellByCoords(solution.grid, 8, 1).possibilities).toEqual([5, 7]);

        expect(getCellByCoords(solution.grid, 0, 2).possibilities).toEqual([5]);
        expect(getCellByCoords(solution.grid, 1, 2).possibilities).toEqual([6, 7]);
        expect(getCellByCoords(solution.grid, 2, 2).possibilities).toEqual([4]);
        expect(getCellByCoords(solution.grid, 3, 2).possibilities).toEqual([6, 7]);
        expect(getCellByCoords(solution.grid, 4, 2).possibilities).toEqual([9]);
        expect(getCellByCoords(solution.grid, 5, 2).possibilities).toEqual([1]);
        expect(getCellByCoords(solution.grid, 6, 2).possibilities).toEqual([3]);
        expect(getCellByCoords(solution.grid, 7, 2).possibilities).toEqual([2]);
        expect(getCellByCoords(solution.grid, 8, 2).possibilities).toEqual([8]);
    });

    it('findPossibilities', (): void => {
        const block: Grid = byBlock(grid, 2);
        const possibilities: Array<number> = solver.findPossibilities(
            block,
            1,
            byRow
        );

        expect(possibilities).toEqual([5]);
    });

    it('getOtherIndexes', (): void => {
        const block: Grid = byBlock(grid, 4);

        expect(solver.getOtherIndexes(
            block,
            5,
            'row'
        )).toEqual([3, 4]);
    });
    /**/
    describe('byAxis', (): void => {
        it('col', (): void => {
            const solution: Solution = solver.byAxis(
                'col',
                grid
            );

            expect(solution.grid.size.vertical).toBe(9);
            expect(solution.grid.size.vertical).toBe(9);
            expect(solution.grid.cells.length).toBe(81);
            // expect(getCellByCoords(solution.grid, 0, 0).possibilities).toEqual([8]);
            // expect(getCellByCoords(solution.grid, 1, 0).possibilities).toEqual([7, 8]);
            // expect(getCellByCoords(solution.grid, 2, 0).possibilities).toEqual([9]);
            // expect(getCellByCoords(solution.grid, 3, 0).possibilities).toEqual([5]);
            // expect(getCellByCoords(solution.grid, 4, 0).possibilities).toEqual([3]);
            // expect(getCellByCoords(solution.grid, 5, 0).possibilities).toEqual([8]);
            // expect(getCellByCoords(solution.grid, 6, 0).possibilities).toEqual([6]);
            // expect(getCellByCoords(solution.grid, 7, 0).possibilities).toEqual([4]);
            // expect(getCellByCoords(solution.grid, 8, 0).possibilities).toEqual([7]);
        });
    });
});

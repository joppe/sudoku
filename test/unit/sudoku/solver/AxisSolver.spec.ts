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
});

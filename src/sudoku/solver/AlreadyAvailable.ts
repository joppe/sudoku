import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone } from 'app/sudoku/grid/clone';
import { coordsToIndex } from 'app/sudoku/grid/coordsToIndex';
import { Grid } from 'app/sudoku/grid/Grid';
import { byBlock } from 'app/sudoku/grid/group/byBlock';
import { byCol } from 'app/sudoku/grid/group/byCol';
import { byRow } from 'app/sudoku/grid/group/byRow';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';
import { remove } from 'app/sudoku/possibilities/remove';
import { ISolver } from 'app/sudoku/solver/ISolver';
import { Solution } from 'app/sudoku/solver/Solution';

/**
 * This solver checks if there is already a solved value in the group.
 * If there is a solved value, that value will be removed from all possibilities of each cell in that group.
 */
export class AlreadyAvailable implements ISolver {
    public solve(grid: Grid): Promise<Solution> {
        window.console.log('AlreadyAvailable Solver');

        return new Promise((resolve: Function, reject: Function): void => {
            const result: Solution = [
                byRow,
                byCol,
                byBlock
            ].reduce(
                (acc: Solution, grouper: GroupStrategy): Solution => {
                    const solution: Solution = this.byGrouper(acc.grid, grouper);

                    return {
                        grid: solution.grid,
                        solved: acc.solved || solution.solved
                    };
                },
                {
                    grid,
                    solved: false
                }
            );

            resolve(result);
        });
    }

    private byGrouper(grid: Grid, grouper: GroupStrategy): Solution {
        const result: Solution = {
            grid: clone(grid),
            solved: false
        };

        // Get for each group the solved values
        for (const groupIndex of array.iterator.range(0, 8, 1)) {
            const solvedValues: Array<number> = [];
            const cells: Array<Cell> = grouper(grid, groupIndex).cells;

            for (const cell of cells) {
                if (cell.possibilities.length === 1) {
                    solvedValues.push(cell.possibilities[0]);
                }
            }

            if (solvedValues.length > 0) {
                for (const cell of cells) {
                    if (cell.possibilities.length === 1) {
                        continue;
                    }

                    const cellIndex: number = coordsToIndex(cell.col, cell.row, result.grid.size);
                    const possibilities: Array<number> = remove(solvedValues, cell.possibilities);

                    if (possibilities.length === result.grid.cells[cellIndex].possibilities.length) {
                        continue;
                    }

                    result.grid.cells[cellIndex].possibilities = remove(solvedValues, cell.possibilities);
                    result.solved = true;
                }
            }
        }

        return result;
    }
}

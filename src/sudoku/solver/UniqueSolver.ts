import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone } from 'app/sudoku/grid/clone';
import { coordsToIndex } from 'app/sudoku/grid/coordsToIndex';
import { Grid } from 'app/sudoku/grid/Grid';
import { byBlock } from 'app/sudoku/grid/group/byBlock';
import { byCol } from 'app/sudoku/grid/group/byCol';
import { byRow } from 'app/sudoku/grid/group/byRow';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';
import { complementByCell } from 'app/sudoku/possibilities/complementByCell';
import { ISolver } from 'app/sudoku/solver/ISolver';
import { Solution } from 'app/sudoku/solver/Solution';

/**
 * This solver checks if a cell has a possibility that is not available in other cells of this row/column/group
 */
export class UniqueSolver implements ISolver {
    public solve(grid: Grid): Promise<Solution> {
        window.console.log('Unique Solver');

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

        for (const groupIndex of array.iterator.range(0, 8, 1)) {
            const cells: Array<Cell> = grouper(grid, groupIndex).cells;

            for (const cell of cells) {
                if (cell.possibilities.length === 1) {
                    continue;
                }

                // Check if the cell has possibilities that no others cell in this group has
                const uniqueValues: Array<number> = complementByCell(cell, cells);

                if (uniqueValues.length > 1) {
                    throw new Error(`Too much unique values found for cell {col: ${cell.col}, row: ${cell.row}},
                     possibilities ${uniqueValues.join(', ')}`);
                }

                if (uniqueValues.length === 1) {
                    const cellIndex: number = coordsToIndex(cell.col, cell.row, grid.size);

                    result.solved = true;
                    result.grid.cells[cellIndex].possibilities = uniqueValues;
                }
            }
        }

        return result;
    }
}

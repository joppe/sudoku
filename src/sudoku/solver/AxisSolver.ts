import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone } from 'app/sudoku/grid/clone';
import { coordsToIndex } from 'app/sudoku/grid/coordsToIndex';
import { Grid } from 'app/sudoku/grid/Grid';
import { byBlock } from 'app/sudoku/grid/group/byBlock';
import { byCol } from 'app/sudoku/grid/group/byCol';
import { byRow } from 'app/sudoku/grid/group/byRow';
import { containsCel } from 'app/sudoku/grid/group/containsCell';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';
import { common } from 'app/sudoku/possibilities/common';
import { remove } from 'app/sudoku/possibilities/remove';
import { ISolver } from 'app/sudoku/solver/ISolver';
import { Solution } from 'app/sudoku/solver/Solution';

type Property = 'col' | 'row';

const PROPERTIES: Array<Property> = ['row', 'col'];

/**
 * This solver checks if there is a possibility that only occures in one col/row of a group.
 * Then the possibilities cannot occur on that same axis.
 */
export class AxisSolver implements ISolver {
    public solve(grid: Grid): Promise<Solution> {
        window.console.log('Axis Solver');

        return new Promise((resolve: Function, reject: Function): void => {
            const result: Solution = PROPERTIES.reduce(
                (acc: Solution, property: Property): Solution => {
                    const solution: Solution = this.byAxis(property, acc.grid);

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

    public byAxis(property: Property, grid: Grid): Solution {
        const grouper: GroupStrategy = property === 'col' ? byCol : byRow;
        let solution: Solution = {
            grid,
            solved: false
        };

        // do it by block
        for (const blockIndex of array.iterator.range(0, 8, 1)) {
            const block: Grid = byBlock(solution.grid, blockIndex);

            // split the cells per col/row of the block
            for (const partitionIndex of array.iterator.range(0, 2, 1)) {
                const partition: Grid = grouper(block, partitionIndex);
                const possibilities: Array<number> = this.findPossibilities(partition, block);

                if (possibilities.length === 0) {
                    continue;
                }

                const axis: Grid = grouper(solution.grid, partition.cells[0][property]);

                solution = this.removePossibilities(possibilities, axis, partition, solution);
            }
        }

        return solution;
    }

    public getOtherIndexes(block: Grid, skipIndex: number, property: Property): Array<number> {
        const min: number = block.cells[0][property];
        const max: number = block.cells[block.cells.length - 1][property];

        return Array.from(array.iterator.range(min, max, 1)).filter((i: number): boolean => i !== skipIndex);
    }

    public findPossibilities(partition: Grid, block: Grid): Array<number> {
        return block.cells.reduce(
            (acc: Array<number>, cell: Cell): Array<number> => {
                if (containsCel(partition, cell)) {
                    return acc;
                }

                return acc.filter((possibility: number): boolean => {
                    return cell.possibilities.indexOf(possibility) === -1;
                });
            },
            common(partition.cells)
        );
    }

    public removePossibilities(possibilities: Array<number>, axis: Grid, partition: Grid, solution: Solution): Solution {
        // find a nicer way to don't clone grid each time
        const result: Solution = {
            grid: clone(solution.grid),
            solved: solution.solved
        };

        for (const cell of axis.cells) {
            if (containsCel(partition, cell)) {
                continue;
            }

            const cellIndex: number = coordsToIndex(cell.col, cell.row, result.grid.size);
            const newPossibilities: Array<number> = remove(possibilities, cell.possibilities);

            if (newPossibilities.length === cell.possibilities.length) {
                continue;
            }

            result.solved = true;
            result.grid.cells[cellIndex].possibilities = newPossibilities;
        }

        return result;
    }
}

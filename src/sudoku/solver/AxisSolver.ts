import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone } from 'app/sudoku/grid/clone';
import { coordsToIndex } from 'app/sudoku/grid/coordsToIndex';
import { Grid } from 'app/sudoku/grid/Grid';
import { byBlock } from 'app/sudoku/grid/group/byBlock';
import { byCol } from 'app/sudoku/grid/group/byCol';
import { byRow } from 'app/sudoku/grid/group/byRow';
import { GroupStrategy } from 'app/sudoku/grid/group/GroupStrategy';
import { common } from 'app/sudoku/possibilities/common';
import { complementByPossibilities } from 'app/sudoku/possibilities/complementByPossibilities';
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
            const result: Solution = ['col'].reduce(
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
        let solution: Solution = {
            grid,
            solved: false
        };

        // do it by block
        for (const blockIndex of array.iterator.range(0, 8, 1)) {
            const block: Grid = byBlock(solution.grid, blockIndex);

            /*
            // split the cells per col/row of the block
            for (const index of array.iterator.range(0, 2, 1)) {
                const commonPosibilities: Array<number> = this.findPossibilities(
                    block,
                    index,
                    property === 'row' ? byRow : byCol
                );

                if (commonPosibilities.length > 0) {
                    solution = this.removePossibilities(
                        this.getOtherIndexes(block, index, property),
                        commonPosibilities,
                        property === 'row' ? byRow : byCol,
                        solution.grid
                    );
                }
            }
            /**/
        }

        return solution;
    }

    public getOtherIndexes(block: Grid, index: number, property: Property): Array<number> {
        const min: number = block.cells[0][property];
        const max: number = block.cells[block.cells.length - 1][property];

        return Array.from(array.iterator.range(min, max, 1)).filter((i: number): boolean => i !== index);
    }

    public findPossibilities(block: Grid, partIndex: number, grouper: GroupStrategy): Array<number> {
        const partition: Grid = grouper(block, partIndex);
        let posibilities: Array<number> = common(partition.cells);

        if (posibilities.length === 0) {
            return posibilities;
        }

        // Remove all posibilities that occur in other cols/rows depending on the grouper
        for (const index of array.iterator.range(0, 2, 1)) {
            if (partIndex === index) {
                continue;
            }

            const otherPart: Grid = grouper(block, index);

            posibilities = complementByPossibilities(posibilities, otherPart.cells);
        }

        return posibilities;
    }

    public removePossibilities(indexes: Array<number>, possibilities: Array<number>, grouper: GroupStrategy, grid: Grid): Solution {
        const result: Solution = {
            grid: clone(grid),
            solved: false
        };
        console.log(grid);
        for (const index of indexes) {
            const cells: Array<Cell> = grouper(grid, index).cells;

            for (const cell of cells) {
                const cellIndex: number = coordsToIndex(cell.col, cell.row, grid.size);
                const newPossibilities: Array<number> = remove(possibilities, cell.possibilities);
                console.log(cell.col, cell.row, cellIndex, cell.possibilities.join(','), newPossibilities.join(','));
                if (newPossibilities.length === cell.possibilities.length) {
                    continue;
                }

                result.solved = true;
                result.grid.cells[cellIndex].possibilities = newPossibilities;
            }
        }

        return result;
    }
}

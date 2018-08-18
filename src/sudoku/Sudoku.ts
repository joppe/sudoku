import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone } from 'app/sudoku/grid/cell/clone';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';
import { Grid } from 'app/sudoku/grid/Grid';
import { IRenderer } from 'app/sudoku/render/IRenderer';
import { ISolver } from 'app/sudoku/solver/ISolver';
import { Solution } from 'app/sudoku/solver/Solution';

const SIZE: number = 9;
const POSSIBILITIES: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class Sudoku {
    private _grid: Grid = {
        size: {
            horizontal: SIZE,
            vertical: SIZE
        },
        cells: new Array(SIZE * SIZE)
    };
    private _solvers: Array<ISolver>;
    private _renderer: IRenderer;
    private _index: number = 0;

    constructor(solvers: Array<ISolver>, renderer: IRenderer, values: Array<number | undefined> = new Array(SIZE * SIZE)) {
        this._solvers = solvers;
        this._renderer = renderer;

        this.set(values);

        this._renderer.render(this._grid);
    }

    public set(values: Array<number | undefined>): void {
        if (values.length !== 81) {
            throw new Error(`Invalid values array, must be exact 81 items, given ${values.length}`);
        }

        let index: number = 0;

        this._grid.cells = [];

        for (const row of array.iterator.range(0, 8, 1)) {
            for (const col of array.iterator.range(0, 8, 1)) {
                this._grid.cells.push({
                    col,
                    possibilities: values[index] ? [values[index]] : [...POSSIBILITIES],
                    row
                });

                index += 1;
            }
        }
    }

    public isSolved(): boolean {
        return this._grid.cells.every((cell: Cell) => {
            return cell.possibilities.length === 1;
        });
    }

    public async solve(unSolvedTries: number = 0): Promise<void> {
        const solver: ISolver = this._solvers[this._index % this._solvers.length];
        const solution: Solution = await solver.solve(this._grid);

        this._grid = solution.grid;

        this._renderer.render(this._grid);

        if (this.isSolved() === false) {
            if (solution.solved === false) {
                this._index += 1;
            } else {
                this._index = 0;
            }
        }
    }
}

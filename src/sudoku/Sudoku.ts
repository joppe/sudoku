import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { clone } from 'app/sudoku/grid/cell/clone';
import { getCellByCoords } from 'app/sudoku/grid/getCellByCoords';
import { getRow } from 'app/sudoku/grid/getRow';
import { IRenderer } from 'app/sudoku/render/IRenderer';
import { ISolver } from 'app/sudoku/solver/ISolver';

export class Sudoku {
    private _cells: Array<Cell>;
    private _solvers: Array<ISolver>;
    private _renderer: IRenderer;

    constructor(solvers: Array<ISolver>, renderer: IRenderer) {
        this._solvers = solvers;
        this._renderer = renderer;

        this.reset();
        this._renderer.render(this._cells);
    }

    public set(cells: Array<Cell>): void {
        if (cells.length !== 81) {
            throw new Error(`Invalid cells array, must be exact 81 items, given ${cells.length}`);
        }

        this._cells = [];

        for (const row of array.iterator.range(0, 8, 1)) {
            for (const column of array.iterator.range(0, 8, 1)) {
                const cell: Cell = getCellByCoords(column, row, cells);

                this._cells.push(clone(cell));
            }
        }
    }

    public reset(): void {
        const possiblities: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        this._cells = [];

        for (const row of array.iterator.range(0, 8, 1)) {
            for (const column of array.iterator.range(0, 8, 1)) {
                this._cells.push({
                    column,
                    possiblities: [...possiblities],
                    row
                });
            }
        }
    }

    public solve(): void {
        for (const row of array.iterator.range(0, 8, 1)) {
            for (const cell of getRow(row, this._cells)) {
                window.console.log(cell);
            }
        }

        this._solvers.forEach((solver: ISolver): void => {
            this._cells = solver.solve(this._cells);

            this._renderer.render(this._cells);
        });
    }
}

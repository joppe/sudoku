import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { Grid } from 'app/sudoku/grid/Grid';
import { IRenderer } from 'app/sudoku/render/IRenderer';

export class Renderer implements IRenderer {
    private _container: HTMLElement;

    constructor(root: HTMLElement) {
        this._container = window.document.createElement('div');
        this._container.classList.add('grid');

        root.appendChild(this._container);
    }

    public render(grid: Grid): void {
        // First remove old elements
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }

        grid.cells.forEach((cell: Cell) => {
            this._container.appendChild(this.renderCell(cell));
        });
    }

    private renderCell(cell: Cell): HTMLElement {
        const element: HTMLDivElement = window.document.createElement('div');
        element.classList.add('grid__cell');

        element.setAttribute('data-col', String(cell.col));
        element.setAttribute('data-row', String(cell.row));

        if (cell.col % 3 === 2 && cell.col % 9 !== 8) {
            element.classList.add('grid__cell--right');
        }

        if (cell.row % 3 === 2 && cell.row % 9 !== 8) {
            element.classList.add('grid__cell--bottom');
        }

        const back: HTMLDivElement = window.document.createElement('div');
        back.classList.add('grid__cell__back');

        const front: HTMLDivElement = window.document.createElement('div');
        front.classList.add('grid__cell__front');

        for (const index of array.iterator.range(1, 9, 1)) {
            const possibility: HTMLDivElement = window.document.createElement('div');

            possibility.classList.add('grid__cell__possibility');

            if (cell.possibilities.indexOf(index) !== -1) {
                possibility.innerText = String(index);
            }

            if (cell.possibilities.length === 1) {
                possibility.classList.add('hidden');
            }

            element.appendChild(possibility);
        }

        if (cell.possibilities.length === 1) {
            front.innerText = String(String(cell.possibilities[0]));
        }

        element.appendChild(back);
        element.appendChild(front);

        return element;
    }
}

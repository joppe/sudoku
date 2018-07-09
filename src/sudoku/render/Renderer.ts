import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { IRenderer } from 'app/sudoku/render/IRenderer';

export class Renderer implements IRenderer {
    private _container: HTMLElement;

    constructor(root: HTMLElement) {
        this._container = window.document.createElement('div');
        this._container.classList.add('grid');

        root.appendChild(this._container);
    }

     public render(cells: Array<Cell>): void {
        window.console.log('render');
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }

        cells.forEach((cell: Cell): void => {
            this.renderCell(cell);
        });
     }

     private renderCell(cell: Cell): void {
        const element: HTMLDivElement = window.document.createElement('div');
        element.classList.add('grid__cell');
        const back: HTMLDivElement = window.document.createElement('div');
        back.classList.add('grid__cell__back');
        const front: HTMLDivElement = window.document.createElement('div');
        front.classList.add('grid__cell__front');

        for (const index of array.iterator.range(1, 9, 1)) {
            const possibility: HTMLDivElement = window.document.createElement('div');
            possibility.classList.add('grid__cell__back__possibility');

            if (cell.possiblities.indexOf(index) !== -1) {
                possibility.innerText = String(index);
            }

            back.appendChild(possibility);
        }

        if (cell.possiblities.length === 1) {
            front.innerText = String(String(cell.possiblities[0]));
        }

        element.appendChild(back);
        element.appendChild(front);
        this._container.appendChild(element);
     }
}

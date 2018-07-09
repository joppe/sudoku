import * as array from '@apestaartje/array/dist';

import { Cell } from 'app/sudoku/grid/cell/Cell';
import { getGroup } from 'app/sudoku/grid/getGroup';
import { IRenderer } from 'app/sudoku/render/IRenderer';

export class Renderer implements IRenderer {
    private _container: HTMLElement;

    constructor(root: HTMLElement) {
        this._container = window.document.createElement('div');
        this._container.classList.add('grid');

        root.appendChild(this._container);
    }

     public render(cells: Array<Cell>): void {
         // First remove old elements
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }

        for (const index of array.iterator.range(1, 9, 1)) {
            this._container.appendChild(this.renderGroup(getGroup(index, cells)));
        }
     }

     private renderGroup(cells: IterableIterator<Cell>): HTMLElement {
        const element: HTMLDivElement = window.document.createElement('div');
        element.classList.add('grid__group');

        for (const cell of cells) {
            element.appendChild(this.renderCell(cell));
        }

        return element;
     }

     private renderCell(cell: Cell): HTMLElement {
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

        return element;
     }
}

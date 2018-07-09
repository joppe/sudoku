import { Cell } from 'app/sudoku/grid/cell/Cell';

export interface IRenderer {
    render(cells: Array<Cell>): void;
}

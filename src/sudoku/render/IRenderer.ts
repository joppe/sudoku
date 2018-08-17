import { Grid } from 'app/sudoku/grid/Grid';

export interface IRenderer {
    render(grid: Grid): void;
}

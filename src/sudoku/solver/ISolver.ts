import { Grid } from 'app/sudoku/grid/Grid';
import { Solution } from 'app/sudoku/solver/Solution';

export interface ISolver {
    solve(grid: Grid): Promise<Solution>;
}

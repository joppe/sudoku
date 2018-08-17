import { Grid } from 'app/sudoku/grid/Grid';

export type GroupStrategy = (grid: Grid, index: number) => Grid;

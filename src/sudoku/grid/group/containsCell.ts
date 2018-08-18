import { Cell } from 'app/sudoku/grid/cell/Cell';
import { Grid } from 'app/sudoku/grid/Grid';

export function containsCel(group: Grid, cell: Cell): boolean {
    return group.cells.find((groupCell: Cell):boolean => {
        return groupCell.col === cell.col && groupCell.row === cell.row;
    }) !== undefined;
}

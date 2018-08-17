import { Size } from 'app/sudoku/grid/Size';

const DEFAULT_SIZE: Size = {
    horizontal: 9,
    vertical: 9
};

export function coordsToIndex(col: number, row: number, size: Size = DEFAULT_SIZE): number {
    return (row * size.horizontal) + col;
}

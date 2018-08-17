import { Grid } from '../../../../../src/sudoku/grid/Grid';
import { byRow } from '../../../../../src/sudoku/grid/group/byRow';

describe('byRow', (): void => {
    const grid: Grid = {
        size: {
            vertical: 9,
            horizontal: 9
        },
        cells: []
    };

    beforeEach(() => {
        for (let row: number = 0; row < grid.size.vertical; row += 1) {
            for (let col: number = 0; col < grid.size.horizontal; col += 1) {
                grid.cells.push({
                    col,
                    possibilities: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    row
                });
            }
        }
    });

    it('return a new grid with vertical size set to 1', (): void => {
        const row: Grid = byRow(grid, 0);

        expect(row.size.vertical).toBe(1);
    });

    it('return a new grid with same horizontal size as the original', (): void => {
        const row: Grid = byRow(grid, 3);

        expect(row.size.horizontal).toBe(9);
    });

    it('return a new grid with 9 cells', (): void => {
        const row: Grid = byRow(grid, 5);

        expect(row.cells.length).toBe(9);
    });

    it('the cells should be of the correct row/col', (): void => {
        const row: Grid = byRow(grid, 3);

        expect(row.cells[0].col).toBe(0);
        expect(row.cells[0].row).toBe(3);
        expect(row.cells[8].col).toBe(8);
        expect(row.cells[8].row).toBe(3);
    });
});

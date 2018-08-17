import { Grid } from '../../../../../src/sudoku/grid/Grid';
import { byCol } from '../../../../../src/sudoku/grid/group/byCol';

describe('byCol', (): void => {
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

    it('return a new grid with horizontal size set to 1', (): void => {
        const col: Grid = byCol(grid, 0);

        expect(col.size.horizontal).toBe(1);
    });

    it('return a new grid with same vertical size as the original', (): void => {
        const col: Grid = byCol(grid, 3);

        expect(col.size.vertical).toBe(9);
    });

    it('return a new grid with 9 cells', (): void => {
        const col: Grid = byCol(grid, 5);

        expect(col.cells.length).toBe(9);
    });

    it('the cells should be of the correct row/col', (): void => {
        const col: Grid = byCol(grid, 3);

        expect(col.cells[0].col).toBe(3);
        expect(col.cells[0].row).toBe(0);
        expect(col.cells[8].col).toBe(3);
        expect(col.cells[8].row).toBe(8);
    });
});

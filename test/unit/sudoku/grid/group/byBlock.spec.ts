import { Grid } from '../../../../../src/sudoku/grid/Grid';
import { byBlock } from '../../../../../src/sudoku/grid/group/byBlock';

describe('byBlock', (): void => {
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

    it('return a new grid with horizontal size set to 3', (): void => {
        const block: Grid = byBlock(grid, 0);

        expect(block.size.horizontal).toBe(3);
    });

    it('return a new grid with vertical size set to 3', (): void => {
        const block: Grid = byBlock(grid, 0);

        expect(block.size.vertical).toBe(3);
    });

    it('return a new grid with 9 cells', (): void => {
        const block: Grid = byBlock(grid, 5);

        expect(block.cells.length).toBe(9);
    });

    it('the cells should be of the correct row/col', (): void => {
        const col: Grid = byBlock(grid, 4);

        expect(col.cells[0].col).toBe(3);
        expect(col.cells[0].row).toBe(3);
        expect(col.cells[1].col).toBe(4);
        expect(col.cells[1].row).toBe(3);
        expect(col.cells[8].col).toBe(5);
        expect(col.cells[8].row).toBe(5);
    });
});

import { Cell } from '../../../../src/sudoku/grid/cell/Cell';
import { getCellByCoords } from '../../../../src/sudoku/grid/getCellByCoords';
import { Grid } from '../../../../src/sudoku/grid/Grid';

describe('getCellByCoords', (): void => {
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

    it('get the cell from a grid', (): void => {
        const cell: Cell = getCellByCoords(grid, 3, 4);

        expect(cell.col).toBe(3);
        expect(cell.row).toBe(4);
    });

    it('throw an error of cell is not found', (): void => {
        expect((): void => {
            const cell: Cell = getCellByCoords(grid, -1, 4);
        }).toThrow();
    });
});

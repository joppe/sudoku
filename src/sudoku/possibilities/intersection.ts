import { Cell } from 'app/sudoku/grid/cell/Cell';

/**
 * Get the possibilities of a cell that also exist in other cells
 */
export function intersection(cells: Array<Cell>): Array<number> {
    return cells.reduce(
        (acc: Array<number>, cell: Cell): Array<number> => {
            if (cell.possibilities.length === 1) {
                return acc;
            }

            return acc.filter((possibility: number): boolean => {
                return cell.possibilities.indexOf(possibility) !== -1;
            });
        },
        [...cells[0].possibilities]
    );
}

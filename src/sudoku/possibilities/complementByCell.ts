import { Cell } from 'app/sudoku/grid/cell/Cell';

/**
 * Get the possibilities of a cell that do not occur in other cells
 */
export function complementByCell(subject: Cell, cells: Array<Cell>): Array<number> {
    return cells.reduce(
        (acc: Array<number>, cell: Cell): Array<number> => {
            if (subject === cell) {
                return acc;
            }

            return acc.filter((possibility: number): boolean => {
                return cell.possibilities.indexOf(possibility) === -1;
            });
        },
        [...subject.possibilities]
    );
}

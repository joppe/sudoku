import { Cell } from 'app/sudoku/grid/cell/Cell';

/**
 * Get the possibilities that do not occur in other cells
 */
export function complementByPossibilities(possibilities: Array<number>, cells: Array<Cell>): Array<number> {
    return cells.reduce(
        (acc: Array<number>, cell: Cell): Array<number> => {
            return acc.filter((possibility: number): boolean => {
                return cell.possibilities.indexOf(possibility) === -1;
            });
        },
        possibilities
    );
}

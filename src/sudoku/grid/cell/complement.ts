import { Cell } from 'app/sudoku/grid/cell/Cell';

export function complement(first: Cell, ...cells: Array<Cell>): Array<number> {
    return cells.reduce(
        (acc: Array<number>, cell: Cell): Array<number> => {
            return acc.filter((possibility: number): boolean => {
                return cell.possiblities.indexOf(possibility) === -1;
            });
        },
        [...first.possiblities]
    );
}

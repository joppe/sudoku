import { Cell } from 'app/sudoku/grid/cell/Cell';

/**
 * Get the possibilities that occur more then once
 */
export function common(cells: Array<Cell>): Array<number> {
    return cells.reduce(
        (acc: Array<number>, cell: Cell): Array<number> => {
            if (cell.possibilities.length === 1) {
                return acc;
            }

            const possibilities: Array<number> = cell.possibilities.filter((possibility: number): boolean => {
                // look in the other cells if the possibility occurs
                return cells.some((other: Cell): boolean => {
                    if (other === cell || acc.indexOf(possibility) !== -1) {
                        return false;
                    }

                    return other.possibilities.indexOf(possibility) !== -1;
                });
            });

            return possibilities.concat(acc).sort();
        },
        []
    );
}

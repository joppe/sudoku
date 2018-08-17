import { importer } from 'app/sudoku/import/importer';
import { IRenderer } from 'app/sudoku/render/IRenderer';
import { Renderer } from 'app/sudoku/render/Renderer';
import { AlreadyAvailable } from 'app/sudoku/solver/AlreadyAvailable';
import { AxisSolver } from 'app/sudoku/solver/AxisSolver';
import { ISolver } from 'app/sudoku/solver/ISolver';
import { UniqueSolver } from 'app/sudoku/solver/UniqueSolver';
import { Sudoku } from 'app/sudoku/Sudoku';

window.console.log('Sudoku');

const GLOBAL: string = 's';

const values: Array<number | undefined> = importer(
    '--953-6----3------5---91-28--58-3--93-6---8-49--1-42--79-42---3------4----2-179--'
);

const solvers: Array<ISolver> = [];
solvers.push(new AlreadyAvailable());
solvers.push(new UniqueSolver());
solvers.push(new AxisSolver());

const renderer: IRenderer = new Renderer(window.document.querySelector('body'));
const s: Sudoku = new Sudoku(solvers, renderer, values);

(async (): Promise<void> => {
    // await s.solve();

    if (s.isSolved() === false) {
        // throw new Error('Could not solve Sudoku');
    }
})();

window[GLOBAL] = s;

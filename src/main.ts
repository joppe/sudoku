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
const easy: string = '--953-6----3------5---91-28--58-3--93-6---8-49--1-42--79-42---3------4----2-179--';
const hard: string = '--3-5--2-4--7----8----2-4---2--1---3316---9879---6--4---9-8----2----6--9-5--7-3--';
const extreme: string = '3-------9-7--4--3---61-35----7-3-8---8-2-4-1---5-7-6----23-74---1--6--2-8-------7';

const values: Array<number | undefined> = importer(extreme);

const solvers: Array<ISolver> = [];
solvers.push(new AlreadyAvailable());
solvers.push(new UniqueSolver());
solvers.push(new AxisSolver());

const renderer: IRenderer = new Renderer(window.document.querySelector('body'));
const s: Sudoku = new Sudoku(solvers, renderer, values);

window[GLOBAL] = s;

import * as array from '@apestaartje/array/dist';

import { IRenderer } from 'app/sudoku/render/IRenderer';
import { Renderer } from 'app/sudoku/render/Renderer';
import { ISolver } from 'app/sudoku/solver/ISolver';
import { Sudoku } from 'app/sudoku/Sudoku';

/**
 * Sudoku
 *
 * A sudoku consists out:
 * - 9 rows
 * - 9 columns
 */

window.console.log('Sudoku');

const solvers: Array<ISolver> = [];
const renderer: IRenderer = new Renderer(window.document.querySelector('.js-sudoku'));
const s: Sudoku = new Sudoku(solvers, renderer);

s.solve();

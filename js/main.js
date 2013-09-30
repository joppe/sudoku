/*global jQuery, Sudoku*/

jQuery(function ($) {
    'use strict';

    var $toolbar = $('#toolbar'),
        $solve = $('<a class="btn btn-success solve">Solve</a>'),
        sudoku = new Sudoku($('#sudoku'));

    $solve.on('click', function (event) {
        event.preventDefault();

        sudoku.solve();
    });

    $toolbar.append($solve);
});
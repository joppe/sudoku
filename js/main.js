/*global jQuery, Sudoku*/

jQuery(function ($) {
    'use strict';

    var $toolbar = $('#toolbar'),
        $solve = $('<a class="btn btn-success solve">Solve</a>'),
        $export = $('<a class="btn btn-primary">Export</a>'),
        sudoku = new Sudoku($('#sudoku'));

    $solve.on('click', function (event) {
        event.preventDefault();

        sudoku.solve();
    });

    $export.on('click', function (event) {
        event.preventDefault();

        $('#data').val(sudoku.export('|'));
    });
    $toolbar.append($solve);
    $toolbar.append($export);
});
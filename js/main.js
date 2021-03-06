/*global jQuery, Sudoku*/

jQuery(function ($) {
    'use strict';

    var $toolbar = $('#toolbar'),
        $sudoku = $('#sudoku'),
        $solve = $('<a class="btn btn-success solve">Solve</a>'),
        $export = $('<a class="btn btn-primary">Export</a>'),
        $import = $('<a class="btn btn-warning">Import</a>'),
        $input = $('<a class="btn btn-default">Toggle input</a>'),
        $validate = $('<a class="btn btn-default">Validate</a>'),
        sudoku = new Sudoku($sudoku);

    $solve.on('click', function (event) {
        event.preventDefault();

        sudoku.solve();
    });

    $export.on('click', function (event) {
        event.preventDefault();

        $('#data').val(sudoku.export('|'));
    });

    $input.on('click', function (event) {
        event.preventDefault();

        if ($sudoku.hasClass('input')) {
            $sudoku.removeClass('input');
        } else {
            $sudoku.addClass('input');
        }
    });

    $import.on('click', function (event) {
        event.preventDefault();

        sudoku.import($('#data').val(), '|');
    });

    $validate.on('click', function (event) {
        event.preventDefault();

        if (sudoku.isValid()) {
            $sudoku.css({
                borderColor: 'green'
            });
        } else {
            $sudoku.css({
                borderColor: 'red'
            });
        }
    });

    $toolbar.append($solve);
    $toolbar.append($export);
    $toolbar.append($import);
    $toolbar.append($input);
    $toolbar.append($validate);
});
/*global jQuery, _, Solver, Cell, Helper*/

window.Sudoku = (function ($, _) {
    'use strict';

    var SEPARATOR = ',',
        Sudoku;

    Sudoku = function ($container) {
        this.$container = $container;

        this.cells = {};
        this.solver = new Solver(this.cells);

        this.render();
    };
    Sudoku.prototype = {
        export: function (separator) {
            var output = [];

            separator = separator || SEPARATOR;

            _.each(this.cells, function (row) {
                _.each(row, function (cell) {
                    output.push(cell.value || 'null');
                });
            });

            return output.join(separator);
        },

        import: function (input, separator) {
            var data = input.split(separator || SEPARATOR),
                index = 0;

            _.each(this.cells, function (row) {
                _.each(row, function (cell) {
                    var value = data[index];

                    if (value !== 'null') {
                        cell.setValue(value, true);
                    }

                    index += 1;
                });
            });
        },

        isValid: function () {
            return _.every([Helper.getBlocks(this.cells), Helper.getRows(this.cells), Helper.getColumns(this.cells)], function (groups) {
                return _.every(groups, function (group) {
                    var values = [];

                    return _.every(group, function (cell) {
                        var valid = true;

                        if (cell.value !== null) {
                            if (_.indexOf(values, cell.value) !== -1) {
                                valid = false;
                            }

                            values.push(cell.value);
                        }

                        return valid;
                    });
                });
            });
        },

        solve: function () {
            this.solver.solve();
        },

        render: function () {
            var self = this;

            _.each(Helper.indexes, function (blockIndex) {
                var $block = $('<div class="block"></div>');

                self.$container.append($block);

                _.each(Helper.indexes, function (cellIndex) {
                    var rowIndex = Helper.getRowIndex(blockIndex, cellIndex),
                        columnIndex = Helper.getColumnIndex(blockIndex, cellIndex);

                    if (self.cells[rowIndex] === undefined) {
                        self.cells[rowIndex] = {};
                    }

                    self.cells[rowIndex][columnIndex] = new Cell($block, blockIndex, rowIndex, columnIndex);
                });

                return {};
            });
        }
    };

    return Sudoku;
}(jQuery, _));
/*global jQuery, _, Solver, Cell, Helper*/

window.Sudoku = (function ($, _) {
    'use strict';

    function validate(group) {
        return _.every(group, function (block) {
            var values = [];

            return _.every(block, function (cell) {
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
    }

    var Sudoku = function ($container) {
        this.$container = $container;

        this.cells = {};
        this.solver = new Solver(this.cells);

        this.render();
    };
    Sudoku.prototype = {
        export: function (separator) {
            var output = [];

            separator = separator || ',';

            _.each(this.cells, function (row) {
                _.each(row, function (cell) {
                    output.push(cell.value || 'null');
                });
            });

            return output.join(separator);
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
            this.$container.removeClass('input');

            this.solver.solve();
        },

        render: function () {
            var self = this;

            _.each(_.range(0, 9), function (blockCount) {
                var $block = $('<div class="block"></div>');

                self.$container.append($block);

                _.each(_.range(0, 9), function (cellCount) {
                    var row = (Math.floor(blockCount / 3) * 3) + Math.floor(cellCount / 3),
                        column = ((blockCount % 3) * 3) + (cellCount % 3);

                    if (self.cells[row] === undefined) {
                        self.cells[row] = {};
                    }

                    self.cells[row][column] = new Cell($block, blockCount, row, column);
                });

                return {};
            });

            this.$container.addClass('input');
        }
    };

    return Sudoku;
}(jQuery, _));
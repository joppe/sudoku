/*global jQuery, _, Solver*/

window.Sudoku = (function ($, _) {
    'use strict';

    var Sudoku = function ($container) {
        this.$container = $container;

        this.cells = {};
        this.solver = new Solver(this.cells);

        this.render();
        this.addEventHandlers();
    };
    Sudoku.prototype = {
        solve: function () {
            this.$container.removeClass('input');

            this.solver.solve();
        },

        addEventHandlers: function () {
            this.$solve.on('click', $.proxy(this.solve, this));
        },

        render: function () {
            var self = this,
                    $actionWrapper = $('<div class="container btn-group"></div>').insertBefore(this.$container);

            this.$solve = $('<a class="btn btn-success solve">Solve</a>').appendTo($actionWrapper);

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
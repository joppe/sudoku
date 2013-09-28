/*global jQuery, _*/

window.Sudoku = (function ($, _) {
    'use strict';

    var Sudoku,
        Cell;

    /**
     * A Cell has two views, one to initialize the sudoku and one display the solution
     * @constructor
     */
    Cell = function ($container, block, row, column) {
        this.$container = $container;
        this.block = block;
        this.row = row;
        this.column = column;

        this.value = null;
        this.posibilities = _.range(1, 10);

        this.render();
        this.addEventHandlers();
    };
    Cell.prototype = {
        setValue: function (value) {
            this.value = value;
            this.posibilities = [];
            this.$text.text(value);
            this.$wrapper.addClass('solved');
        },

        addEventHandlers: function () {
            this.$input.on('change', $.proxy(function () {
                this.setValue(this.$input.val());
            }, this));
        },

        render: function () {
            this.$wrapper = $('<div class="cell" data-block="' + this.block + '" data-row="' + this.row + '" data-column="' + this.column + '"></div>');
            this.$input = $('<input type="text">').appendTo(this.$wrapper);
            this.$text = $('<div class="value"></div>').appendTo(this.$wrapper);

            this.$container.append(this.$wrapper);
        }
    };

    Sudoku = function ($container) {
        this.$container = $container;

        this.cells = {};

        this.render();
        this.addEventHandlers();
    };
    Sudoku.prototype = {
        input: function () {

        },

        solve: function () {
            this.$container.removeClass('input');
            console.log('solve;');
            console.log(this.cells);
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

    return {
        create: function ($container) {
            new Sudoku($container);
        }
    };
}(jQuery, _));
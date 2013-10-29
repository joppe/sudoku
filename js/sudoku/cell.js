/*global jQuery, _*/

window.Cell = (function ($, _) {
    'use strict';

    /**
     * A Cell has two views, one to initialize the sudoku and one display the solution
     * @constructor
     */
    var Cell = function ($container, block, row, column) {
        this.$container = $container;
        this.block = block;
        this.row = row;
        this.column = column;

        this.id = row + ':' + column;
        this.value = null;
        this.possibilities = _.range(1, 10);

        this.render();
        this.addEventHandlers();
    };
    Cell.prototype = {
        isSolved: function () {
            return (1 === this.possibilities.length);
        },

        setPossibilities: function (possibilities) {
            var html = '';

            this.possibilities = possibilities;

            if (1 === this.possibilities.length) {
                this.setValue(this.possibilities[0]);
            } else {
                _.each(_.range(1, 10), function (value) {
                    var text = '';

                    if (this.possibilities.indexOf(value) !== -1) {
                        text = value;
                    }

                    html += '<div class="digit">' + text + '</div>';
                }, this);

                this.$possibilities.html(html);
            }
        },

        setValue: function (value, initial) {
            value = parseInt(value, 10);
            initial = initial || false;

            if (!isNaN(value) && value <= 9 && value > 0) {
                this.value = value;
                this.possibilities = [value];

                this.$possibilities.empty();
                this.$text.text(value);
                this.$wrapper.addClass('solved');

                if (initial) {
                    this.$wrapper.addClass('initial');
                }
            }
        },

        addEventHandlers: function () {
            this.$input.on('change', $.proxy(function () {
                this.setValue(this.$input.val(), true);
            }, this));
        },

        render: function () {
            this.$wrapper = $('<div class="cell" data-block="' + this.block + '" data-row="' + this.row + '" data-column="' + this.column + '"></div>');
            this.$possibilities = $('<div class="possibilities"></div>').appendTo(this.$wrapper);
            this.$input = $('<input type="text">').appendTo(this.$wrapper);
            this.$text = $('<div class="value"></div>').appendTo(this.$wrapper);

            this.$container.append(this.$wrapper);
        }
    };

    return Cell;
}(jQuery, _));
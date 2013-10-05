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
        renderPosibilities: function () {
            var self = this,
                    html = '';

            if (this.possibilities.length > 0) {
                _.each(_.range(1, 10), function (value) {
                    var text = '';

                    if (self.possibilities.indexOf(value) !== -1) {
                        text = value;
                    }

                    html += '<div class="digit">' + text + '</div>';
                });
            }

            this.$possibilities.html(html);
        },

        unsetPossibilities: function(possibilities) {
            var len = this.possibilities.length,
                    changed = false,
                    newLen;

            if (len > 1) {
                this.possibilities = _.difference(this.possibilities, possibilities);

                newLen = this.possibilities.length;

                if (newLen === 1) {
                    this.setValue(this.possibilities[0]);
                }

                this.renderPosibilities();

                changed = newLen !== len;
            }

            return changed;
        },

        setValue: function (value, initial) {
            value = parseInt(value, 10);
            initial = initial || false;

            if (!isNaN(value) && value <= 9 && value > 0) {
                this.value = value;
                this.possibilities = [value];
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
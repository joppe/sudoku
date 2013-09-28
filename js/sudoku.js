/*global jQuery, _*/

window.Sudoku = (function ($, _) {
    'use strict';

    var Sudoku,
        Cell,
        Solver;

    Solver = function () {};
    Solver.solvers = [];
    Solver.add = function (solver) {
        Solver.solvers.push(solver);

        return Solver;
    };
    Solver.prototype = {
        solve: function (cells) {
            this.cells = cells;
            this.current = null;
            this.iterations = 0;
            this.unsuccessfulIterations = 0;

            if (Solver.solvers.length > 0) {
                this.next();
            } else {
                window.console.log('No solvers available');
            }
        },

        isSolved: function () {
            var solved = true;

            _.every(this.cells, function (row) {
                _.every(row, function (cell) {
                    if (cell.value === null) {
                        solved = false;
                    }

                    return solved;
                });

                return solved;
            });

            return solved;
        },

        next: function () {
            var solver;

            this.current = this.current === null ? 0 : this.current + 1;

            if (this.current >= Solver.solvers.length) {
                this.current = 0;
            }

            this.iterations += 1;

            solver = Solver.solvers[this.current];

            if (solver(this.cells)) {
                this.unsuccessfulIterations = 0;
            } else {
                this.unsuccessfulIterations += 1;
            }

            if (this.isSolved()) {
                window.console.log('finished and solved in ' + this.iterations + ' iterations');
            } else if (this.unsuccessfulIterations >= Solver.solvers.length) {
                window.console.log('finished and NOT solved');
            } else {
                window.setTimeout($.proxy(this.next, this), 1000);
            }
        }
    };

    // check by block
    Solver.add(function (cells) {
        var change = false;

        window.console.log('check by block');
        _.each(_.range(0, 9), function (blockCount) {
            // first index the values that are used in this block
            var values = [];

            _.each(_.range(0, 9), function (cellCount) {
                var row = (Math.floor(blockCount / 3) * 3) + Math.floor(cellCount / 3),
                    column = ((blockCount % 3) * 3) + (cellCount % 3),
                    cell = cells[row][column];

                if (cell.value !== null) {
                    values.push(parseInt(cell.value, 10));
                }
            });

            if (values.length > 0) {
                // now remove the values from the posibilities
                _.each(_.range(0, 9), function (cellCount) {
                    var row = (Math.floor(blockCount / 3) * 3) + Math.floor(cellCount / 3),
                        column = ((blockCount % 3) * 3) + (cellCount % 3),
                        cell = cells[row][column];

                    if (cell.unsetPosibilities(values)) {
                        change = true;
                    }
                });
            }
        });

        return change;
    });

    // check by horizontal line
    Solver.add(function (cells) {
        var change = false;

        window.console.log('check by horizontal line');
        _.each(_.range(0, 9), function (row) {
            // first index the values that are used in this line
            var values = [];

            _.each(_.range(0, 9), function (column) {
                var cell = cells[row][column];

                if (cell.value !== null) {
                    values.push(parseInt(cell.value, 10));
                }
            });

            if (values.length > 0) {
                // now remove the values from the posibilities
                _.each(_.range(0, 9), function (column) {
                    var cell = cells[row][column];

                    if (cell.unsetPosibilities(values)) {
                        change = true;
                    }
                });
            }
        });

        return change;
    });

    // check by vertical line
    Solver.add(function (cells) {
        var change = false;

        window.console.log('check by vertical line');
        _.each(_.range(0, 9), function (column) {
            // first index the values that are used in this line
            var values = [];

            _.each(_.range(0, 9), function (row) {
                var cell = cells[row][column];

                if (cell.value !== null) {
                    values.push(parseInt(cell.value, 10));
                }
            });

            if (values.length > 0) {
                // now remove the values from the posibilities
                _.each(_.range(0, 9), function (row) {
                    var cell = cells[row][column];

                    if (cell.unsetPosibilities(values)) {
                        change = true;
                    }
                });
            }
        });

        return change;
    });

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
        renderPosibilities: function () {
            var self = this,
                html = '';

            _.each(_.range(1, 10), function (value) {
                var text = '';

                if (self.posibilities.indexOf(value) !== -1) {
                    text = value;
                }

                html += '<div class="digit">' + text + '</div>';
            });

            this.$posibilities.html(html);
        },

        unsetPosibilities: function(posibilities) {
            var len = this.posibilities.length,
                changed = false,
                newLen;

            if (len > 1) {
                this.posibilities = _.difference(this.posibilities, posibilities);

                newLen = this.posibilities.length;

                if (newLen === 1) {
                    this.setValue(this.posibilities.shift());
                }

                this.renderPosibilities();

                changed = newLen !== len;
            }

            return changed;
        },

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
            this.$posibilities = $('<div class="posibilities"></div>').appendTo(this.$wrapper);
            this.$input = $('<input type="text">').appendTo(this.$wrapper);
            this.$text = $('<div class="value"></div>').appendTo(this.$wrapper);

            this.$container.append(this.$wrapper);
        }
    };

    Sudoku = function ($container) {
        this.$container = $container;

        this.cells = {};
        this.solver = new Solver();

        this.render();
        this.addEventHandlers();
    };
    Sudoku.prototype = {
        solve: function () {
            this.$container.removeClass('input');

            this.solver.solve(this.cells);
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
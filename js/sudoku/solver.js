/*global jQuery, _, Helper*/

window.Solver = (function ($, _) {
    'use strict';

    var Solver;

    Solver = function (cells) {
        this.cells = cells;
    };
    Solver.solvers = [];
    Solver.add = function (solver) {
        Solver.solvers.push(solver);

        return Solver;
    };
    Solver.prototype = {
        solve: function () {
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

    // check by vertical line
    Solver.add(function (cells) {
        var change = false;

        window.console.log('check by group');
        _.each([Helper.getBlocks(cells), Helper.getRows(cells), Helper.getColumns(cells)], function (groups) {
            _.each(groups, function (group) {
                // first index the values that are used in this group
                var values = [];

                _.each(group, function (cell) {
                    if (cell.value !== null) {
                        values.push(cell.value);
                    }
                });

                if (values.length > 0) {
                    // now remove the values from the possibilities
                    _.each(group, function (cell) {
                        if (cell.unsetPossibilities(values)) {
                            change = true;
                        }
                    });
                }
            });
        });

        return change;
    });/**/

    // check if only posibility in block
    Solver.add(function (cells) {
        var change = false;

        window.console.log('check if only posibility in group');
        _.each([Helper.getBlocks(cells), Helper.getRows(cells), Helper.getColumns(cells)], function (groups) {
            _.each(groups, function (group) {
                // a group is a line/column/block
                _.each(group, function (cell) {
                    var possibilities;

                    if (null === cell.value) {
                        possibilities = cell.possibilities;

                        _.every(group, function (sibling) {
                            if (sibling.id !== cell.id) {
                                possibilities = _.difference(possibilities, sibling.possibilities);
                            }

                            return possibilities.length > 0;
                        });

                        if (1 === possibilities.length) {
                            cell.setValue(possibilities[0]);
                        }
                    }
                });
            });
        });

        return change;
    });/**/

    return Solver;
}(jQuery, _));
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
//            } else if (this.iterations === 3) {
                window.console.log('finished and NOT solved');
            } else {
                window.setTimeout($.proxy(this.next, this), 1000);
            }
        }
    };

    // check by group, remove the values of all other cells in the same group
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
                        var len = cell.possibilities.length;

                        if (len > 1) {
                            cell.setPossibilities(_.difference(cell.possibilities, values));

                            if (cell.possibilities.length !== len) {
                                change = true;
                            }
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
                            cell.setPossibilities(possibilities);
                        }
                    }
                });
            });
        });

        return change;
    });/**/

    /**
     * - Get a block
     * - Loop over the rows of the block
     * - Per row check the possibilities that the cells have in common
     * - Compare the common possebilities with the other two rows, if there is a difference then remove the common
     *      possebilities form the other rows
     * - repeat this for the rows
     */
    Solver.add(function (cells) {
        var change = false;

        window.console.log('check force by pair on row/column');
        _.each(Helper.getBlocks(cells), function (block) {
            var rows = Helper.getBlockRows(block),
                columns = Helper.getBlockColumns(block);

            _.each(rows, function (row) {
                var possibilities = null,
                    cellCount = 0,
                    firstCell = _.first(row),
                    rowIndex = firstCell.row,
                    columns = [];

                // get the possibilities that have two or more cells in common on the same row within the same block
                _.each(row, function (cell) {
                    columns.push(cell.column);

                    if (cell.possibilities.length > 1) {
                        cellCount += 1;

                        if (possibilities === null) {
                            possibilities = cell.possibilities;
                        } else {
                            possibilities = _.intersection(possibilities, cell.possibilities);
                        }
                    }
                });

                if (cellCount > 1 && possibilities !== null && possibilities.length > 0) {
                    // remove the possibilities that are in common with cells in different rows within the same block
                    _.each(Helper.getOtherBlockIndexes(rowIndex), function (index) {
                        _.each(rows[index], function (cell) {
                            possibilities = _.difference(possibilities, cell.possibilities);
                        });
                    });

                    if (possibilities.length > 0) {
                        // remove the possibilities from the cells that are in the same row but in an other block
                        _.each(Helper.getRow(cells, rowIndex), function (cell) {
                            if (_.indexOf(columns, cell.column) === -1) {
                                cell.setPossibilities(_.difference(cell.possibilities, possibilities));
                            }
                        });
                    }
                }
            });

            _.each(columns, function (column) {
                var possibilities = null,
                    cellCount = 0,
                    firstCell = _.first(column),
                    columnIndex = firstCell.column,
                    rows = [];

                // get the possibilities that have two or more cells in common on the same column within the same block
                _.each(column, function (cell) {
                    rows.push(cell.row);

                    if (cell.possibilities.length > 1) {
                        cellCount += 1;

                        if (possibilities === null) {
                            possibilities = cell.possibilities;
                        } else {
                            possibilities = _.intersection(possibilities, cell.possibilities);
                        }
                    }
                });

                if (cellCount > 1 && possibilities !== null && possibilities.length > 0) {
                    // remove the possibilities that are in common with cells in different columns within the same block
                    _.each(Helper.getOtherBlockIndexes(columnIndex), function (index) {
                        _.each(columns[index], function (cell) {
                            possibilities = _.difference(possibilities, cell.possibilities);
                        });
                    });

                    if (possibilities.length > 0) {
                        // remove the possibilities from the cells that are in the same column but in an other block
                        _.each(Helper.getColumn(cells, columnIndex), function (cell) {
                            if (_.indexOf(rows, cell.row) === -1) {
                                cell.setPossibilities(_.difference(cell.possibilities, possibilities));
                            }
                        });
                    }
                }
            });
        });

        return change;
    });/**/


    return Solver;
}(jQuery, _));
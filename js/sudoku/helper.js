/*global jQuery, _*/

window.Helper = (function ($, _) {
    'use strict';

    var Helper;

    function cacher(func) {
        var cache = null;

        return function () {
            if (cache === null) {
                cache = func.apply(this, arguments);
            }

            return cache;
        };
    }

    Helper = {
        indexes: _.range(0, 9),

        getRowIndex: function (blockIndex, cellIndex) {
            return (Math.floor(blockIndex / 3) * 3) + Math.floor(cellIndex / 3);
        },

        getColumnIndex: function (blockIndex, cellIndex) {
            return ((blockIndex % 3) * 3) + (cellIndex % 3);
        },

        getCellByBlockAndCellIndex: function (cells, blockIndex, cellIndex) {
            var rowIndex = Helper.getRowIndex(blockIndex, cellIndex),
                columnIndex = Helper.getColumnIndex(blockIndex, cellIndex);

            return cells[rowIndex][columnIndex];
        },

        getBlock: function (cells, blockIndex) {
            var blockCells = [];

            _.each(Helper.indexes, function (cellIndex) {
                blockCells.push(Helper.getCellByBlockAndCellIndex(cells, blockIndex, cellIndex));
            });

            return blockCells;
        },

        getBlocks: cacher(function (cells) {
            var blocks = [];

            _.each(Helper.indexes, function (blockIndex) {
                blocks.push(Helper.getBlock(cells, blockIndex));
            });

            return blocks;
        }),

        getRow: function (cells, rowIndex) {
            return cells[rowIndex];
        },

        getRows: cacher(function (cells) {
            var rows = [];

            _.each(Helper.indexes, function (rowIndex) {
                rows.push(Helper.getRow(cells, rowIndex));
            });

            return rows;
        }),

        getColumn: function (cells, columnIndex) {
            var blocks = [];

            _.each(Helper.indexes, function (rowIndex) {
                blocks.push(cells[rowIndex][columnIndex]);
            });

            return blocks;
        },

        getColumns: cacher(function (cells) {
            var columns = [];

            _.each(Helper.indexes, function (columnIndex) {
                columns.push(Helper.getColumn(cells, columnIndex));
            });

            return columns;
        }),

        getBlockCellsGroupedByProperty: function (block, byProperty) {
            var group = {};

            _.each(block, function (cell) {
                if (group[cell[byProperty]] === undefined) {
                    group[cell[byProperty]] = [];
                }

                group[cell[byProperty]].push(cell);
            });

            return group;
        },

        getBlockRows: function (block) {
            return Helper.getBlockCellsGroupedByProperty(block, 'row');
        },

        getBlockColumns: function (block) {
            return Helper.getBlockCellsGroupedByProperty(block, 'column');
        },

        getOtherBlockIndexes: function (index) {
            var start = Math.floor(index / 3) * 3,
                end = start + 3,
                indexes = [];

            _.each(_.range(start, end), function (i) {
                if (i !== index) {
                    indexes.push(i);
                }
            });

            return indexes;
        }
    };

    return Helper;
}(jQuery, _));
/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
        this.TEST_NO_OF_ROWS_IN_SLICKGRID_DATAVIEW = 'Test Correct Number of Rows are loaded in SlickGrid Dataview.';
        this.TEST_ROWS_LOADED_IN_SLICKGRID_DATAVIEW = 'Test Row is loaded correctly in SlickGrid Dataview.';
        this.TEST_ROWS_LOADED_IN_SLICKGRID_VIEW = 'Test Correct Number of Rows are loaded in SlickGrid View.';
        this.TEST_COLS_LOADED_IN_SLICKGRID_VIEW = 'Test Correct Number of Columns in SlickGrid View.';
        this.SM_TESTS_TITLE = '{0} - Server Manager Tests.';

        this.get = function () {
            var args = arguments;
            return args[0].replace(/\{(\d+)\}/g, function (m, n) {
                n = parseInt(n) + 1;
                return args[n];
            });
        };
    return {
        TEST_NO_OF_ROWS_IN_SLICKGRID_DATAVIEW : TEST_NO_OF_ROWS_IN_SLICKGRID_DATAVIEW,
        TEST_ROWS_LOADED_IN_SLICKGRID_DATAVIEW : TEST_ROWS_LOADED_IN_SLICKGRID_DATAVIEW,
        TEST_ROWS_LOADED_IN_SLICKGRID_VIEW : TEST_ROWS_LOADED_IN_SLICKGRID_VIEW,
        TEST_COLS_LOADED_IN_SLICKGRID_VIEW : TEST_COLS_LOADED_IN_SLICKGRID_VIEW,
        SM_TESTS_TITLE : SM_TESTS_TITLE,
        get : get
    };
});
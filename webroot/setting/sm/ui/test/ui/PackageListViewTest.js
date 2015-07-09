/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'setting/sm/ui/js/views/PackageGridView',
    'setting/sm/ui/js/views/PackageListView',
    'test-slickgrid-utils',
    'test-sm-slickgrid-mockdata',
    'test-slickgrid'
], function (PackageGridView, PackageListView, SMTestUtils, SMTestMockdata, SMTestSlickGrid) {
    module('Package - Server Manager Tests', {
        setup   : function () {
            this.server = sinon.fakeServer.create();
            $.ajaxSetup({
                cache: true
            });
        },
        teardown: function () {
            this.server.restore();
            delete this.server;
        }
    });

    var prefixId = smwc.PACKAGE_PREFIX_ID,
        packageListView = new PackageListView();


    asyncTest("Test Load Package ", function (assert) {
        expect(0);
        var fakeServer = this.server,
            testConfigObj = {
                'prefixId'  : 'package',
                'cols' : smwgc.PACKAGE_COLUMNS,
                'addnCols' : ['detail', 'checkbox', 'actions'],
                'gridElId' :'#' + smwl.SM_PACKAGE_GRID_ID
            };

        fakeServer.respondWith(
            "GET", SMTestUtils.getRegExForUrl(smwc.URL_TAG_NAMES),
            [200, {"Content-Type": "application/json"},
                JSON.stringify(SMTestMockdata.getTagNamesData())]);

        fakeServer.respondWith(
            "GET", SMTestUtils.getRegExForUrl(smwu.getObjectDetailUrl('package')),
            [200, {"Content-Type": "application/json"}, JSON.stringify(SMTestMockdata.getSinglePackageDetailData())]);

        packageListView.render({hashParams: {image_id: null}});
        fakeServer.respond();
        SMTestUtils.startQunitWithTimeout(3000);

        SMTestSlickGrid.executeSlickGridTests(prefixId, SMTestMockdata.formatMockData(SMTestMockdata.getSinglePackageDetailData()), testConfigObj);
    });
});

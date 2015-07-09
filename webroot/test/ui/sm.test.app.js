/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

require(['/base/contrail-web-core/webroot/js/core-app-config.js'], function () {
    requirejs.config({
        baseUrl: "/base/contrail-web-server-manager/webroot",
        paths: getServerManagerTestAppPaths(coreAppPaths),
        map: getServerManagerTestAppMap(coreAppMap),
        shim: getServerManagerTestAppShim(coreAppShim),
        waitSeconds: 0
    });

    require(['sm-test-init'], function () {
    });

    function getServerManagerTestAppPaths(paths) {
        var coreBasePath = '/base/contrail-web-core/webroot', serverManagerTestAppPathObj = {};
        for (var key in paths) {
            if (paths.hasOwnProperty(key)) {
                var value = paths[key];
                if (key == 'core-basedir') {
                    serverManagerTestAppPathObj [key] = coreBasePath;
                } else {
                    serverManagerTestAppPathObj [key] = coreBasePath + value;
                }
            }
        }

        /* serverManager Init*/
        serverManagerTestAppPathObj ["handlebars-helpers"] = "common/ui/js/handlebars.helpers",
            serverManagerTestAppPathObj ["sm-constants"] = "common/ui/js/sm.constants",
            serverManagerTestAppPathObj ["sm-utils"] = "common/ui/js/sm.utils",
            serverManagerTestAppPathObj ["sm-labels"] = "common/ui/js/sm.labels",
            serverManagerTestAppPathObj ["sm-messages"] = "common/ui/js/sm.messages",
            serverManagerTestAppPathObj ["sm-model-config"] = "common/ui/js/sm.model.config",
            serverManagerTestAppPathObj ["sm-grid-config"] = 'common/ui/js/sm.grid.config',
            serverManagerTestAppPathObj ["sm-detail-tmpls"] = 'common/ui/js/sm.detail.tmpls',
            serverManagerTestAppPathObj ["sm-init"] = "common/ui/js/sm.init",
            serverManagerTestAppPathObj ["sm-test-init"] = "test/sm.test.init",

            serverManagerTestAppPathObj ["co-test-utils"] = "/base/contrail-web-core/webroot/test/ui/co.test.utils",
            serverManagerTestAppPathObj ["test-slickgrid"] = "/base/contrail-web-core/webroot/test/ui/slickgrid.test.common",
            serverManagerTestAppPathObj ["image-list-view-mockdata"] = "setting/sm/ui/test/ui/ImageListViewMockData",
            serverManagerTestAppPathObj ["package-list-view-mockdata"] = "setting/sm/ui/test/ui/PackageListViewMockData",
            serverManagerTestAppPathObj ["test-messages"] = "test/ui/sm.test.messages",

            serverManagerTestAppPathObj["sm-test-init"] = "test/ui/sm.test.init";

        serverManagerTestAppPathObj["co-test-mockdata"] = "/base/contrail-web-core/webroot/test/ui/co.test.mockdata";

        return serverManagerTestAppPathObj;
    };

    function getServerManagerTestAppMap(map) {
        return map;
    };

    function getServerManagerTestAppShim(shim) {
        shim['handlebars-helpers'] = {
            deps: ['jquery', 'handlebars']
        };
        return shim;
    };

});

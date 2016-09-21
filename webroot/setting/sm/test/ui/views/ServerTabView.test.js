define([
    "co-test-constants",
    "co-test-runner",
    "sm-test-utils",
    "sm-test-messages",
    "co-grid-contrail-list-model-test-suite",
    "co-grid-view-test-suite",
    "co-details-view-test-suite"
], function (cotc, cotr, smtu, smtm, GridListModelTestSuite, GridViewTestSuite, DetailsViewTestSuite) {

    var moduleId = smtm.SERVER_TAB_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;
    var testServerConfig = cotr.getDefaultTestServerConfig();

    var testServerRoutes = function () {
        var routes = [];

        /*
         /sm/server/monitoring/config                 [Done]
         /sm/tags/names                               [Done]
         /sm/objects/details/server?id=a7s12          [Done]
         /sm/server/monitoring/info?id=a7s12          [Done]
         /sm/server/inventory/info?id=a7s12           [Done]
         */

        routes.push({
            url: smtu.getRegExForUrl('/sm/tags/names').toString(),
            fnName: 'getTagNamesData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/objects/details/server').toString(),
            fnName: 'getServerDetailsData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config').toString(),
            fnName: 'getServerMonitoringConfigData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info').toString(),
            fnName: 'getServerMonitoringInfoData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/server/inventory/info').toString(),
            fnName: 'getServerInventoryInfoData'
        });
        routes.push({
            url: smtu.getRegExForUrl('/sm/objects/details/image').toString() ,
            fnName: 'getSingleImageDetailData'
        });

        return routes;
    };

    testServerConfig.getRoutesConfig = testServerRoutes;
    testServerConfig.responseDataFile = 'setting/sm/test/ui/views/ServerTabView.mock.data.js';

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: "setting_sm_servers",
        q: {
            server_id : "a7s12"
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 10;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_SERVER_TAB_DETAILS_ID,
                    suites: [
                        {
                            class: DetailsViewTestSuite,
                            groups: ["all"],
                            modelConfig: {
                                dataGenerator: smtu.commonDetailsDataGenerator
                            }
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_RESOURCE_INFO_ID,
                },
                {
                    viewId: smwl.SM_SERVER_CHASSIS_DETAILS_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_SENSOR_GRID_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_INTERFACE_GRID_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_FILESYSTEM_GRID_ID
                },
                {
                    viewId: smwl.SM_SERVER_MONITORING_DISKUSAGE_GRID_ID
                },
                // Inventory
                {
                    viewId: smwl.SM_SERVER_INVENTORY_DETAILS_ID
                },
                {
                    viewId: smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ["all"]
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_INVENTORY_FRU_GRID_ID
                }
            ]
        };
    };

    var testInitFn = function(defObj) {
        //simulate click on all the tabs
        var serverTabsViewObj = smPageLoader.smView.viewMap[smwl.SM_SERVER_TAB_VIEW_ID],
            serverTabs = serverTabsViewObj.attributes.viewConfig.tabs;

        _.each(serverTabs, function(tab) {
            $("#" + tab.elementId + "-tab-link").trigger("click");
        });
        setTimeout(function() {
                defObj.resolve();
        }, cotc.PAGE_INIT_TIMEOUT * 2);
        return;
    };

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, testServerConfig, pageConfig, getTestConfig, testInitFn);

    return pageTestConfig;
});

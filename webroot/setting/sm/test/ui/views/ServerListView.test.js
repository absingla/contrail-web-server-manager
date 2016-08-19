define([
    'co-test-constants',
    'co-test-runner',
    'sm-test-utils',
    'sm-test-messages',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-chart-view-zoom-scatter-test-suite',
    'server-list-view-custom-test-suite'
], function (cotc, cotr, smtu, smtm, GridListModelTestSuite, GridViewTestSuite, ZoomScatterChartViewTestSuite,
             ServerListViewCustomTestSuite) {

    var moduleId = smtm.SERVER_LIST_VIEW_COMMON_TEST_MODULE;
    var testServerConfig = cotr.getDefaultTestServerConfig();

    var testType = cotc.VIEW_TEST;


    var testServerRoutes = function () {
        var routes = [];

        routes.push({
            url: '/sm/tags/names',
            fnName: 'getTagNamesData'
        });

        routes.push({
            url: '/sm/tags/values/',
            fnName: 'getTagValuesData'
        });

        routes.push({
            url: '/sm/objects/details/server',
            fnName: 'getSingleServerDetailData'
        });

        routes.push({
            url: '/sm/server/monitoring/config',
            fnName: 'getSingleServerMonitoringConfigData'
        });

        routes.push({
            url: '/sm/server/monitoring/info/summary',
            fnName: 'getSingleServerMonitoringData'
        });
        routes.push({
            url: '/sm/objects/details/image' ,
            fnName: 'getSingleImageDetailData'
        });
        routes.push({
            url: '/sm/chassis/ids' ,
            fnName: 'getChassisMockData'
        });
        routes.push({
            url: '/sm/objects/cluster' ,
            fnName: 'getObjectsCluster'
        });

        return routes;
    };

    testServerConfig.getRoutesConfig = testServerRoutes;
    testServerConfig.responseDataFile =  'setting/sm/test/ui/views/ServerListView.mock.data.js';

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_servers'
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 5;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_SERVER_SCATTER_CHART_ID,
                    suites: [
                        {
                            class: ZoomScatterChartViewTestSuite,
                            groups: ['all']
                        }
                    ]
                },
                {
                    viewId: smwl.SM_SERVER_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ['all']
                        },
                        {
                            class: GridListModelTestSuite,
                            groups: ['all'],
                            modelConfig: {
                                dataGenerator: smtu.commonGridDataGenerator,
                                dataParsers: {
                                    gridDataParseFn: smtu.deleteFieldsForServerScatterChart
                                }
                            }
                        },
                        {
                            class: ServerListViewCustomTestSuite,
                            groups: ['all'],
                            modelConfig: {
                                dataGenerator: smtu.commonGridDataGenerator,
                                dataParsers: {
                                    // gridDataParseFn: smtu.deleteFieldsForClusterScatterChart
                                }
                            }
                        }
                    ]
                },
            ]
        };
    };
    var testInitFn = function (defObj, onAllViewsRenderComplete) {

        setTimeout(function () {
                onAllViewsRenderComplete.notify();
                defObj.resolve();
            },
            // Add necessary timeout for the tab elements to load properly and resolve the promise
            cotc.PAGE_INIT_TIMEOUT * 10
        );
        return;
    };

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, testServerConfig, pageConfig, getTestConfig, testInitFn);

    return pageTestConfig;

});

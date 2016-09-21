define([
    "co-test-constants",
    "co-test-runner",
    "sm-test-utils",
    "sm-test-messages",
    "co-grid-contrail-list-model-test-suite",
    "co-grid-view-test-suite",
    "co-chart-view-zoom-scatter-test-suite",
    "cluster-list-view-custom-test-suite"
], function (cotc, cotr, smtu, smtm, GridListModelTestSuite, GridViewTestSuite,
             ZoomScatterChartViewTestSuite, ClusterListViewCustomTestSuite) {

    var moduleId = smtm.CLUSTER_LIST_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var testServerConfig = cotr.getDefaultTestServerConfig();

    var testServerRoutes = function () {
        var routes = [];
        routes.push({
            url: smtu.getRegExForUrl('/sm/tags/names').toString(),
            fnName: 'getTagNamesData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/objects/details/cluster').toString(),
            fnName: 'getSingleClusterDetailData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config').toString(),
            fnName: 'getSingleClusterMonitoringConfigData'
        });

        routes.push({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info/summary').toString(),
            fnName: 'getSingleClusterMonitoringData'
        });
        
        routes.push({
            url: smtu.getRegExForUrl('/sm/tags/values/').toString(),
            fnName: 'getTagValuesData'
        });
        return routes;
    };
    testServerConfig.getRoutesConfig = testServerRoutes;
    testServerConfig.responseDataFile = 'setting/sm/test/ui/views/ClusterListView.mock.data.js';

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: "setting_sm_clusters"
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 3;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
            {
                viewId: smwl.SM_CLUSTER_SCATTER_CHART_ID,
                suites: [
                    {
                        class: ZoomScatterChartViewTestSuite,
                        groups: ["all"]
                    }
                ]
            },
            {
                    viewId: smwl.SM_CLUSTER_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ["all"]
                        },
                        {
                            class: GridListModelTestSuite,
                            groups: ["all"],
                            modelConfig: {
                                dataGenerator: smtu.commonGridDataGenerator,
                                dataParsers: {
                                    gridDataParseFn: smtu.deleteFieldsForClusterScatterChart
                                }
                            }
                        },
                        {
                            class: ClusterListViewCustomTestSuite,
                            groups: ["all"],
                            modelConfig: {
                                dataGenerator: smtu.commonGridDataGenerator,
                                dataParsers: {
                                    gridDataParseFn: smtu.deleteFieldsForClusterScatterChart
                                }
                            }
                        }
                    ]
                }
            ]
        };
    };

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, testServerConfig, pageConfig, getTestConfig);
    
    return pageTestConfig;
});

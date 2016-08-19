define([
    'co-test-constants',
    'co-test-runner',
    'sm-test-utils',
    'sm-test-messages',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite',
    'co-details-view-test-suite'
], function (cotc, cotr, smtu, smtm, GridListModelTestSuite, GridViewTestSuite, DetailsViewTestSuite) {

    var moduleId = smtm.CLUSTER_TAB_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;
    var testServerConfig = cotr.getDefaultTestServerConfig();


    var testServerRoutes = function () {
        var responses = [];

        responses.push({
            url: smtu.getRegExForUrl('/sm/tags/names').toString(),
            fnName: 'getTagNamesData'
        });

        responses.push({
            url: smtu.getRegExForUrl('/sm/objects/details/cluster').toString(),
            fnName: 'getSingleClusterDetailData'
        });

        responses.push({
            url: smtu.getRegExForUrl('/sm/objects/details/server').toString(),
            fnName: 'getServerDetailsData'
        });

        responses.push({
            url: smtu.getRegExForUrl('/sm/server/monitoring/config').toString(),
            fnName: 'getSingleClusterMonitoringConfigData'
        });

        responses.push({
            url: smtu.getRegExForUrl('/sm/server/monitoring/info/summary').toString(),
            fnName: 'getSingleClusterMonitoringData'
        });
        
        responses.push({
            url: smtu.getRegExForUrl('/sm/tags/values/').toString(),
            fnName: 'getTagValuesData'
        });
        return responses;
    };


    testServerConfig.getRoutesConfig = testServerRoutes;
    testServerConfig.responseDataFile = 'setting/sm/test/ui/views/ClusterTabView.mock.data.js';

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'setting_sm_clusters',
        q: {
            cluster_id : "r22_cluster"
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 2;

    var getTestConfig = function () {
        return {
            rootView: smPageLoader.smView,
            tests: [
                {
                    viewId: smwl.SM_CLUSTER_TAB_DETAILS_ID,
                    suites: [
                        {
                            class: DetailsViewTestSuite,
                            groups: ['all'],
                            modelConfig: {
                                dataGenerator: smtu.commonDetailsDataGenerator
                            }
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
                        }
                    ]
                }
            ]
        };
    };

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, testServerConfig, pageConfig, getTestConfig);

    return pageTestConfig;
});

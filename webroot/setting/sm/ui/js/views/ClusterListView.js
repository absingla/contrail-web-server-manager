/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model'
], function (_, Backbone, ContrailListModel) {
    var ClusterListView = Backbone.View.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, prefixId = smwc.CLUSTER_PREFIX_ID;

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                    }
                },
                cacheConfig: {
                    ucid: smwc.UCID_ALL_CLUSTERS_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            cowu.renderView4Config(this.$el, contrailListModel, getClusterListViewConfig());
        }
    });

    var getClusterListViewConfig = function () {
        return {
            elementId: cowu.formatElementId([smwl.SM_CLUSTER_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.CLUSTERS_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "ClusterGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }}
                            }
                        ]
                    }
                ]
            }
        }
    };

    return ClusterListView;
});
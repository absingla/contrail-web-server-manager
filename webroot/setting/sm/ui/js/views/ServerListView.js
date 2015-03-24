/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model'
], function (_, Backbone, ContrailListModel) {
    var ServerListView = Backbone.View.extend({
        render: function () {
            var self = this, prefixId = smwc.SERVER_PREFIX_ID,
                viewConfig = this.attributes.viewConfig,
                hashParams = viewConfig['hashParams'],
                queryString = smwu.getQueryString4ServersUrl(hashParams);

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId) + queryString
                    }
                }
            };

            if(queryString == '') {
                listModelConfig['cacheConfig'] = {
                    ucid: smwc.UCID_ALL_SERVER_LIST
                };
            } else if(hashParams['cluster_id'] != null && hashParams['tag'] == null) {
                listModelConfig['cacheConfig'] = {
                    ucid: smwc.get(smwc.UCID_CLUSTER_SERVER_LIST, hashParams['cluster_id'])
                };
            }

            var contrailListModel = new ContrailListModel(listModelConfig);
            cowu.renderView4Config(this.$el, contrailListModel, getServerListViewConfig(viewConfig));
        }
    });

    function getServerListViewConfig(viewConfig) {
        return {
            elementId: cowu.formatElementId([smwl.SM_SERVER_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_GRID_VIEW_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ServerGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: $.extend(true, {}, viewConfig, {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }})
                            }
                        ]
                    }
                ]
            }
        }
    };

    return ServerListView;
});
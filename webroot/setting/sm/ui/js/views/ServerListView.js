/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model'
], function (_, Backbone, ContrailListModel) {
    var ServerListView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var self = this, prefixId = smwc.SERVER_PREFIX_ID,
                queryString = smwu.getQueryString4ServersUrl(viewConfig['hashParams']);

            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: smwu.getObjectDetailUrl(prefixId) + queryString
                    }
                },
                cacheConfig: {
                    ucid: smwc.UCID_ALL_SERVERS_LIST
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);
            cowu.renderView4Config(this.$el, contrailListModel, getServerListViewConfig(viewConfig));
        }
    });

    function getServerListViewConfig(viewConfig) {
        return {
            elementId: cowu.formatElementId([smwl.SM_SERVER_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SERVERS_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ServerGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: $.extend(true, viewConfig, {pagerOptions: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] } }})
                            }
                        ]
                    }
                ]
            }
        }
    };

    return ServerListView;
});
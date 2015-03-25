/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var ClusterTabView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;
            cowu.renderView4Config(self.$el, null, getClusterTabViewConfig(viewConfig));
        }
    });

    var getClusterTabViewConfig = function (viewConfig) {
        var clusterId = viewConfig['clusterId'];

        return {
            elementId: smwl.SM_CLUSTER_TAB_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_CLUSTER_TAB_ID,
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'overcast',
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == smwl.TITLE_SERVERS) {
                                            $('#' + smwl.SM_SERVER_GRID_ID).data('contrailGrid').refreshView();
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: smwl.SM_CLUSTER_TAB_DETAILS_ID,
                                            title: smwl.TITLE_DETAILS,
                                            view: "DetailsView",
                                            viewConfig: {
                                                ajaxConfig: {
                                                    url: smwu.getObjectDetailUrl(smwc.CLUSTER_PREFIX_ID, smwc.SERVERS_STATE_PROCESSOR) + "&id=" + clusterId,
                                                    type: 'GET'
                                                },
                                                templateConfig: smwgc.getClusterDetailsTemplateConfig(),
                                                app: cowc.APP_CONTRAIL_SM,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? response[0] : {};
                                                }
                                            }
                                        },
                                        {
                                            elementId: smwl.SM_CLUSTER_TAB_SERVERS_ID,
                                            title: smwl.TITLE_SERVERS,
                                            app: cowc.APP_CONTRAIL_SM,
                                            view: "ServerListView",
                                            viewConfig: {serverColumnsType: smwc.CLUSTER_PREFIX_ID, showAssignRoles: true, hashParams: {"cluster_id": clusterId}}
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    return ClusterTabView;
});

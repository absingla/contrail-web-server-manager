/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var ServerTabView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;
            cowu.renderView4Config(self.$el, null, getServerTabViewConfig(viewConfig));
        }
    });

    var getServerTabViewConfig = function (viewConfig) {
        var serverId = viewConfig['serverId'];

        return {
            elementId: smwl.SM_SERVER_TAB_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_TAB_ID,
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'overcast',
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == smwl.TITLE_INVENTORY) {
                                            $('#' + smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID).data('contrailGrid').refreshView();
                                            $('#' + smwl.SM_SERVER_INVENTORY_FRU_GRID_ID).data('contrailGrid').refreshView();
                                        } else if (selTab == smwl.TITLE_MONITORING) {
                                            $('#' + smwl.SM_SERVER_MONITORING_DISKUSAGE_GRID_ID).data('contrailGrid').refreshView();
                                            $('#' + smwl.SM_SERVER_MONITORING_SENSOR_GRID_ID).data('contrailGrid').refreshView();
                                        }
                                    },
                                    tabs: [
                                        {
                                            elementId: smwl.SM_SERVER_TAB_DETAILS_ID,
                                            title: smwl.TITLE_DETAILS,
                                            view: "DetailsView",
                                            viewConfig: {
                                                ajaxConfig: {
                                                    url: smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + "?id=" + serverId,
                                                    type: 'GET'
                                                },
                                                templateConfig: smwdt.getServerDetailsTemplate(),
                                                app: cowc.APP_CONTRAIL_SM,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? response[0] : {};
                                                }
                                            }
                                        },
                                        {
                                            elementId: smwl.SM_SERVER_TAB_MONITORING_ID,
                                            title: smwl.TITLE_MONITORING,
                                            app: cowc.APP_CONTRAIL_SM,
                                            view: "ServerMonitoringView",
                                            viewConfig: {serverId: serverId}
                                        },
                                        {
                                            elementId: smwl.SM_SERVER_TAB_INVENTORY_ID,
                                            title: smwl.TITLE_INVENTORY,
                                            app: cowc.APP_CONTRAIL_SM,
                                            view: "ServerInventoryView",
                                            viewConfig: {serverId: serverId}
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


    return ServerTabView;
});

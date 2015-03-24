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
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == smwl.TITLE_SENSORS) {
                                            $('#' + smwl.SM_SERVER_SENSORS_GRID_ID).data('contrailGrid').refreshView();
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
                                                templateConfig: smwgc.getServerDetailsTemplateConfig(),
                                                app: cowc.APP_CONTRAIL_SM,
                                                dataParser: function (response) {
                                                    return (response.length != 0) ? response[0] : {};
                                                }
                                            }
                                        },
                                        {
                                            elementId: smwl.SM_SERVER_SENSORS_GRID_ID,
                                            title: smwl.TITLE_SENSORS,
                                            view: "GridView",
                                            viewConfig: {
                                                elementConfig: getSensorsGridConfig(serverId)
                                            }
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

    function getSensorsGridConfig(serverId) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SENSORS
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_SENSORS_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getServerSensorsUrl(serverId)
                        },
                        cacheConfig: {
                            ucid: smwc.get(smwc.UCID_SERVER_SENSOR_LIST, serverId)
                        }
                    }
                }
            },
            footer: {
                pager: { options: { pageSize: 25, pageSizeSelect: [25, 50, 100] }}
            }
        };

        return gridElementConfig;
    };


    return ServerTabView;
});

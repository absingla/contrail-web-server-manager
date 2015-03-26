/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-view-model'
], function (_, Backbone, ContrailViewModel) {
    var ServerInventoryView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                serverId = viewConfig['serverId'],
                modelMap = contrail.handleIfNull(self.modelMap, {}),
                modelKey = smwc.get(smwc.UMID_SERVER_INVENTORY_UVE, serverId);

            var viewModelConfig = {
                modelKey: modelKey,
                remote: {
                    ajaxConfig: {
                        url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, serverId),
                        type: 'GET'
                    },
                    dataParser: function(response) {
                        return response;
                    }
                }
            };

            var contrailViewModel = new ContrailViewModel(viewModelConfig);
            modelMap[viewModelConfig['modelKey']] = contrailViewModel;
            cowu.renderView4Config(this.$el, null, getServerInventoryViewConfig(viewConfig), null, null, modelMap);
        }
    });

    function getServerInventoryViewConfig(viewConfig) {
        var serverId = viewConfig['serverId'],
            modelKey = smwc.get(smwc.UMID_SERVER_INVENTORY_UVE, serverId);

        return {
            elementId: smwl.SM_SERVER_INVENTORY_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_DETAILS_ID,
                                view: "DetailsView",
                                viewConfig: {
                                    ajaxConfig: {
                                        url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, serverId),
                                        type: 'GET'
                                    },
                                    modelKey: modelKey,
                                    templateConfig: smwdt.getServerInventoryDetailsTemplate(),
                                    app: cowc.APP_CONTRAIL_SM
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_INTERFACE_GRID_ID,
                                title: smwl.TITLE_SERVER_INTERFACE_INFO,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getInterfaceGridConfig(serverId)
                                }
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_INVENTORY_FRU_GRID_ID,
                                title: smwl.TITLE_SERVER_FRU_INFO,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getFRUGridConfig(serverId)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getFRUGridConfig(serverId) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_FRU_INFO
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_FRU_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, serverId),
                            type: 'GET'
                        },
                        dataParser: function (response) {
                            return response['ServerInventoryInfo']['fru_infos'];
                        }
                    }
                }
            }
        };

        return gridElementConfig;
    };

    function getInterfaceGridConfig(serverId) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVER_INTERFACE_INFO
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_INTERFACE_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwc.get(smwc.SM_SERVER_INVENTORY_INFO_URL, serverId),
                            type: 'GET'
                        },
                        dataParser: function (response) {
                            return response['ServerInventoryInfo']['interface_infos'];
                        }
                    }
                }
            }
        };

        return gridElementConfig;
    };

    return ServerInventoryView;
});
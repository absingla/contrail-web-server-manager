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
            cowu.renderView4Config(this.$el, contrailViewModel, getServerInventoryViewConfig(viewConfig), null, null, modelMap);
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
                                    app: cowc.APP_CONTRAIL_SM,
                                    dataParser: function (response) {}
                                }
                            },
                        ]
                    }
                ]
            }
        }
    };

    return ServerInventoryView;
});
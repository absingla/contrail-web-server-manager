/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'setting/sm/ui/js/views/ClusterListView',
    'setting/sm/ui/js/views/ClusterGridView',
    'setting/sm/ui/js/views/ServerListView',
    'setting/sm/ui/js/views/ServerGridView'
], function (_, ClusterListView, ClusterGridView, ServerListView, ServerGridView) {
    var SMRenderUtils = function () {
        var self = this;

        this.renderView = function (viewName, parentElement, model, viewAttributes, modelMap) {
            var elementView;

            switch (viewName) {
                case "ClusterListView":
                    elementView = new ClusterListView({ el: parentElement, model: model, attributes: viewAttributes });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    break;

                case "ClusterGridView":
                    elementView = new ClusterGridView({ el: parentElement, model: model, attributes: viewAttributes });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    break;

                case "ServerListView":
                    elementView = new ServerListView({ el: parentElement, model: model, attributes: viewAttributes });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    break;

                case "ServerGridView":
                    elementView = new ServerGridView({ el: parentElement, model: model, attributes: viewAttributes });
                    elementView.modelMap = modelMap;
                    elementView.render();
                    break;
            }
        };
    };
    return SMRenderUtils;
});

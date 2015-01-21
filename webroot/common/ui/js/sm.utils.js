/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var SMUtils = function () {
        var self = this;

        this.getObjectDetailUrl = function (objectName, postProcessor) {
            var url = smwc.URL_OBJ_DETAILS + objectName;
            url += (postProcessor != null) ? ("?postProcessor=" + postProcessor) : '';
            return url;
        };

        this.getIPMIInfoUrl = function (server) {
            var url = smwc.URL_SERVER_IPMI_INFO + server;
            return url;
        };

        this.getObjectUrl = function (objectName) {
            return smwc.URL_OBJECTS + objectName;
        };

        this.getTagsUrl = function (qs) {
            var url = smwc.URL_TAG_VALUES;
            url += (qs != null) ? qs : '';
            return url;
        };

        this.getTagValueUrl = function (value) {
            return smwc.URL_TAG_VALUES + value;
        };

        this.removeRolesFromServers = function(serversObj) {
            var servers = serversObj[smwc.SERVER_PREFIX_ID],
                server;
            for (var i = 0; i < servers.length; i++) {
                server = servers[i];
                server['roles'] = [];
            }
        }
    };
    return SMUtils;
});

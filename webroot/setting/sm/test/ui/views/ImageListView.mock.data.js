/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

    var methods = {};
    module.exports= {
        methods : methods
    };

    methods.getSingleImageDetailData = function () {
        return [
            {
                "category": "image",
                "parameters": {
                    "kickstart": "/var/www/html/kickstarts/kickstarts/contrail-ubuntu.ks",
                    "kickseed": "/var/www/html/kickstarts/contrail-ubuntu.seed"
                },
                "version": "12.04.3",
                "path": "/root/iso/ubuntu-12.04.3-server-amd64.iso",
                "type": "ubuntu",
                "id": "ubuntu"
            }
        ];
    };
    methods.getTagNamesData = function () {
        return ["datacenter", "floor", "hall", "rack", "user_tag"];
    };
    methods.formatMockData = function (rawMockData) {
        return {
            'data': {
                'value': rawMockData
            }
        }
    };


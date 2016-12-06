/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define([
], function () {
    var validations = {
        "parameters.provision.contrail.database.directory": function(val, attr, computed) {
            if (cowu.isNil(val) || (!val.trim().length)) {
                return;
            }
            var dir = val.trim();
            if (-1 == dir.indexOf("/")) {
                return "Enter valid Database Dir Path";
            }
        }
    }
    return validations;
});


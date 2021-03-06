/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-model",
    "sm-model-config"
], function (_, ContrailModel, smwmc) {
    var RoutesModel = ContrailModel.extend({

        defaultConfig: smwmc.getRoutesModel(),

        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model(),
                attr = cowu.getAttributeFromPath(attributePath),
                errors = model.get(cowc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;

            isValid = model.isValid(attributePath, validation);

            attrErrorObj[attr + cowc.ERROR_SUFFIX_ID] = (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },

        validations: {
            routesValidation: {
                "network": {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                "netmask": {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                "gateway": {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                },
                "interface": {
                    required: true,
                    msg: cowm.DATA_ERROR_REQUIRED
                }
            }
        }
    });

    return RoutesModel;
});

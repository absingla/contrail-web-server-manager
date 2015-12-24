/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var SwitchesModel = ContrailModel.extend({

        defaultConfig: smwmc.getSwitchModel(),

        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model();
                var attr = cowu.getAttributeFromPath(attributePath),
                errors = model.get(cowc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;

            isValid = model.isValid(attributePath, validation);

            attrErrorObj[attr + cowc.ERROR_SUFFIX_ID] = (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },

        validations: {
            topOfRackValidation: {
                'switch_id': {
                    required: true,
                    msg: smwm.getRequiredMessage('switch_id')
                },
                'ovs_port': {
                    required: true,
                    msg: smwm.getRequiredMessage('ovs_port')
                },
                'ovs_protocol': {
                    required: true,
                    msg: smwm.getRequiredMessage('ovs_protocol')
                },
                'http_server_port': {
                    required: true,
                    msg: smwm.getRequiredMessage('http_server_port')
                },
                'ip_address': {
                    required: true,
                    pattern: cowc.PATTERN_SUBNET_MASK,
                    msg: smwm.getShortInvalidErrorMessage('ip_address')
                },
            }
        }
    });

    return SwitchesModel;
});

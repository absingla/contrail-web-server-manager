/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var prefixId = smConstants.IMAGE_PREFIX_ID;

    var ImageEditView = Backbone.View.extend({

        render: function (options) {
            var modalId = 'configure-' + prefixId,
                editTemplate = contrail.getTemplate4Id("sm-edit-layout-template"),
                editLayout = editTemplate(editLayoutConfig);

            var that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                var imageForm = $('#' + modalId).find('#sm-image-edit-form').serializeObject();
                that.model.saveConfig(imageForm);
            }});

            smUtils.generateEditFormHTML(modalId, this.model, editLayoutConfig);
        }
    });

    var editLayoutConfig = {
        prefixId: prefixId,
        groups: [
            {
                rows: [
                    {
                        elements: [
                            {id: 'type', path: "type", class: "span6", view: "FormInputView"},
                            {id: 'version', path: 'version', class: "span6", view: "FormInputView"}
                        ]
                    },
                    {
                        elements: [
                            {id: 'path', path: "path", class: "span12", view: "FormInputView"}
                        ]
                    }
                ]
            }
        ]
    };

    return ImageEditView;
});
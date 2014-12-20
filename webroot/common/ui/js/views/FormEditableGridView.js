/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var FormEditableGridView = Backbone.View.extend({
        render: function () {
            var editableGridTmpl = contrail.getTemplate4Id(smwc.TMPL_EDITABLE_GRID_VIEW),
                viewConfig = this.attributes.viewConfig,
                columns = viewConfig.columns,
                path = viewConfig[smwc.KEY_PATH],
                model = this.model,
                validation = (viewConfig['validation'] != null) ? viewConfig['validation'] : this.attributes.validation,
                childViewObj, childElId;

            model.initLockAttr(path, false);

            this.$el.html(editableGridTmpl(viewConfig));

            for (var j = 0; j < columns.length; j++) {
                childViewObj = columns[j];
                childElId = childViewObj[smwc.KEY_ELEMENT_ID];
                smwu.renderView4Config(this.$el.find("#" + childElId), this.model, childViewObj, validation, false);
            }
        }
    });

    return FormEditableGridView;
});
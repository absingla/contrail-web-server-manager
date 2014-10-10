/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'knockback'
], function (_, Backbone, Knockback) {
    var prefixId = smConstants.CLUSTER_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id("sm-edit-form-template");

    var ClusterEditView = Backbone.View.extend({
        modalElementId: '#' + modalId,
        renderConfigure: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                //var clusterForm = $('#' + modalId).find('#sm-cluster-edit-form').serializeObject();
                that.model.configure(function () {
                    options['callback']();
                    $('#' + modalId).modal('hide');
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getConfigureViewConfig(), "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderReimage: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.reimage(function () {
                    options['callback']();
                    $('#' + modalId).modal('hide');
                });
                // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, reimageViewConfig, "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAddCluster: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).find('.contrailWizard').data('contrailWizard').destroy();
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getAddClusterViewConfig(that.model, options['callback']), "configureValidation");

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderProvision: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
                that.model.provision(function () {
                    options['callback']();
                    $('#' + modalId).modal('hide');
                }); // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, provisionViewConfig);

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAddServers: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createWizardModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout, 'onSave': function () {
            }, 'onCancel': function () {
                Knockback.release(that.model, document.getElementById(modalId));
                smValidation.unbind(that);
                $("#" + modalId).modal('hide');
            }});

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getAddServerViewConfig(that.model, options['callback']));

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderAssignRoles: function (options) {
            var editLayout = editTemplate({prefixId: prefixId}),
                that = this;

            smUtils.createModal({'modalId': modalId, 'className': 'modal-840', 'title': options['title'], 'body': editLayout,
                'onSave': function () {
                    return saveAssignRoles(that.model, function(){
                        $("#" + modalId).modal('hide');
                    });

                }, 'onCancel': function () {
                    Knockback.release(that.model, document.getElementById(modalId));
                    smValidation.unbind(that);
                    $("#" + modalId).modal('hide');
                }
            });

            smUtils.renderView4Config($("#" + modalId).find("#sm-" + prefixId + "-form"), this.model, getAssignRolesViewConfig(that.model));

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        },

        renderDeleteCluster: function (options) {
            var textTemplate = contrail.getTemplate4Id("sm-delete-cluster-template"),
                elId = 'deleteCluster',
                that = this,
                checkedRows = options['checkedRows'],
                clustersToBeDeleted = {'clusterId': [], 'elementId': elId};
            clustersToBeDeleted['clusterId'].push(checkedRows['id']);
            this.model.showErrorAttr(elId, false);
            smUtils.createModal({'modalId': modalId, 'className': 'modal-700', 'title': options['title'], 'body': textTemplate(clustersToBeDeleted), 'onSave': function () {
                that.model.deleteCluster(modalId, options['checkedRows'], options['callback']);
            }, 'onCancel': function () {
                $("#" + modalId).modal('hide');
            }});

            Knockback.applyBindings(this.model, document.getElementById(modalId));
            smValidation.bind(this);
        }
    });

    var createClusterViewConfig = [{
        elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_DETAILS]),
        title: smLabels.TITLE_DETAILS,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {elementId: 'id', view: "FormInputView", viewConfig: {path: 'id', dataBindValue: 'id', class: "span6"}},
                        {elementId: 'email', view: "FormInputView", viewConfig: {path: 'email', dataBindValue: 'email', class: "span6"}}

                    ]
                }
            ]
        }
    }];

    var configureClusterViewConfig = [
        {
            elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_OPENSTACK]),
            title: smLabels.TITLE_OPENSTACK,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {elementId: 'openstack_mgmt_ip', view: "FormInputView", viewConfig: {path: 'parameters.openstack_mgmt_ip', dataBindValue: 'parameters().openstack_mgmt_ip', class: "span6"}},
                            {elementId: 'openstack_passwd', view: "FormInputView", viewConfig: {path: 'parameters.openstack_passwd', dataBindValue: 'parameters().openstack_passwd', class: "span6"}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'gateway', view: "FormInputView", viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}},
                            {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'keystone_username', view: "FormInputView", viewConfig: {path: 'parameters.keystone_username', dataBindValue: 'parameters().keystone_username', class: "span6"}},
                            {elementId: 'keystone_password', view: "FormInputView", viewConfig: {path: 'parameters.keystone_password', dataBindValue: 'parameters().keystone_password', class: "span6"}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'keystone_tenant', view: "FormInputView", viewConfig: {path: 'parameters.keystone_tenant', dataBindValue: 'parameters().keystone_tenant', class: "span6"}}
                        ]
                    }
                ]
            }
        },
        {
            elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_CONTRAIL]),
            title: smLabels.TITLE_CONTRAIL,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {elementId: 'analytics_data_ttl', view: "FormInputView", viewConfig: {path: 'parameters.analytics_data_ttl', dataBindValue: 'parameters().analytics_data_ttl', class: "span6"}},
                            {elementId: 'ext_bgp', view: "FormInputView", viewConfig: {path: 'parameters.ext_bgp', dataBindValue: 'parameters().ext_bgp', class: "span6"}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'router_asn', view: "FormInputView", viewConfig: {path: 'parameters.router_asn', dataBindValue: 'parameters().router_asn', class: "span6"}},
                            {elementId: 'multi_tenancy', view: "FormDropdownView", viewConfig: {path: 'parameters.multi_tenancy', dataBindValue: 'parameters().multi_tenancy', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.FLAGS}}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'haproxy', view: "FormDropdownView", viewConfig: {path: 'parameters.haproxy', dataBindValue: 'parameters().haproxy', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.STATES}}},
                            {elementId: 'use_certificates', view: "FormDropdownView", viewConfig: {path: 'parameters.use_certificates', dataBindValue: 'parameters().use_certificates', class: "span6", elementConfig: {dataTextField: "text", dataValueField: "id", data: smConstants.FLAGS}}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'database_dir', view: "FormInputView", viewConfig: {path: 'parameters.database_dir', dataBindValue: 'parameters().database_dir', class: "span6"}},
                            {elementId: 'database_token', view: "FormInputView", viewConfig: {path: 'parameters.database_token', dataBindValue: 'parameters().database_token', class: "span6"}}
                        ]
                    }
                ]
            }
        },
        {
            elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_SERVERS_CONFIG]),
            title: smLabels.TITLE_SERVERS_CONFIG,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {elementId: 'domain', view: "FormInputView", viewConfig: {path: 'parameters.domain', dataBindValue: 'parameters().domain', class: "span6"}},
                            {elementId: 'password', view: "FormInputView", viewConfig: {path: 'parameters.password', dataBindValue: 'parameters().password', class: "span6"}}
                        ]
                    },
                    {
                        columns: [
                            {elementId: 'gateway', view: "FormInputView", viewConfig: {path: 'parameters.gateway', dataBindValue: 'parameters().gateway', class: "span6"}},
                            {elementId: 'subnet_mask', view: "FormInputView", viewConfig: {path: 'parameters.subnet_mask', dataBindValue: 'parameters().subnet_mask', class: "span6"}}
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: 'base_image_id',
                                view: "FormDropdownView",
                                viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectDetailUrl(smConstants.IMAGE_PREFIX_ID, 'filterInImages')}}}
                            },
                            {
                                elementId: 'package_image_id',
                                view: "FormDropdownView",
                                viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectDetailUrl(smConstants.IMAGE_PREFIX_ID, 'filterInPackages')}}}
                            }
                        ]
                    }
                ]
            }
        }
    ];

    function getConfigureViewConfig() {
        var viewConfig = []
        viewConfig = viewConfig.concat(createClusterViewConfig);
        viewConfig = viewConfig.concat(configureClusterViewConfig);
        viewConfig[0].viewConfig.rows[0].columns[0].viewConfig.disabled = true;
        return {
            elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_EDIT_CONFIG]),
            view: "AccordianView",
            viewConfig: viewConfig
        }
    }


    var reimageViewConfig = {
        elementId: prefixId,
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', dataBindValue: 'base_image_id', class: "span6", elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: {type: 'remote', url: smUtils.getObjectDetailUrl(smConstants.IMAGE_PREFIX_ID, 'filterInImages')}}}
                        }
                    ]
                }
            ]
        }
    };

    function getAddServerViewConfig(clusterModel, callback) {
        var addServerViewConfig = {
            elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS]),
            view: "WizardView",
            viewConfig: {
                steps: [
                    {
                        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_SELECT_SERVERS]),
                        title: smLabels.TITLE_SELECT_SERVERS,
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: 'add-server-filtered-servers',
                                            view: "FormGridView",
                                            viewConfig: {
                                                path: 'id',
                                                class: "span12",
                                                elementConfig: getAddServerSelectedServerGridElementConfig()
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        stepType: 'step',
                        onInitRender: true,
                        buttons: {
                            previous: {
                                visible: false
                            }
                        },
                        onLoadFromNext: function (params) {
                            onLoadFilteredServers('add-server', params);
                            $('#add-server-filtered-servers').parents('section').find('.stepInfo').show();
                        }
                    },
                    {
                        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_SERVERS, smLabels.TITLE_ADD_TO_CLUSTER]),
                        title: smLabels.TITLE_ADD_TO_CLUSTER,
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: 'add-server-confirm-servers',
                                            view: "FormGridView",
                                            viewConfig: {
                                                path: 'id',
                                                class: "span12",
                                                elementConfig: getConfirmServerGridElementConfig('add-server')
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        stepType: 'step',
                        onInitRender: false,
                        onLoadFromNext: function(params) {
                            $('#add-server-confirm-servers').data('contrailGrid')._dataView.setData($('#add-server-filtered-servers').data('serverData').selectedServers);
                        },
                        onNext: function(params) {
                            var currentSelectedServers = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItems();
                            return params.model.addServer(currentSelectedServers, function(){
                                callback();
                                $('#' + modalId).modal('hide');
                            });

                        }
                    }
                ]
            }
        };

        return addServerViewConfig;
    }

    function getAssignRolesViewConfig(clusterModel) {
        var clusterModelAttrs = clusterModel.model().attributes,
            assignRolesViewConfig = {
                elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_ASSIGN_ROLES, smLabels.TITLE_SELECT_SERVERS]),
                title: smLabels.TITLE_SELECT_SERVERS,
                view: "SectionView",
                viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'assign-roles-filtered-servers',
                                view: "FormGridView",
                                viewConfig: {
                                    path: 'id',
                                    class: "span12",
                                                elementConfig: getAssignRolesSelectedServerGridElementConfig(clusterModelAttrs)
                                }
                            }
                        ]
                    }
                ]
            }
        };

        return assignRolesViewConfig;
    }

    function saveAssignRoles(clusterModel, callback) {
        if(contrail.checkIfExist($('#assign-roles-filtered-servers').data('serverData'))) {
            var selectedServers = [],
                selectedServerIds = $('#assign-roles-filtered-servers').data('serverData').selectedServers;

            $.each(selectedServerIds, function (selectedServerIdKey, selectedServerIdValue) {
                var selectedServer = $('#assign-roles-filtered-servers').data('contrailGrid')._dataView.getItemById(selectedServerIdValue);
                selectedServers.push(selectedServer)
            });

            return clusterModel.assignRoles(selectedServers, callback);
        } else {
            callback();
            return true;
        }
    }

    function getAddServerSelectedServerGridElementConfig() {
        var gridPrefix = 'add-server',
            filteredServerGrid = '#' + gridPrefix + '-filtered-servers',
            urlParam = 'filterInNull=cluster_id',
            gridElementConfig = {
            header: {
                title: {
                    text: smLabels.TITLE_SELECT_SERVERS
                },
                defaultControls: {
                    refreshable: true
                },
                advanceControls: [
                    {
                        "type": "link",
                        "title": 'Select Servers',
                        "iconClass": "icon-plus",
                        "onClick": function () {
                            var checkedRows = $(filteredServerGrid).data('contrailGrid').getCheckedRows();
                            updateSelectedServer(gridPrefix, 'add', checkedRows);
                        }
                    }, {
                        type: 'checked-multiselect',
                        iconClass: 'icon-filter',
                        title: 'Filter Servers',
                        placeholder: 'Filter Servers',
                        elementConfig: {
                            elementId: 'tagsCheckedMultiselect',
                            dataTextField: 'text',
                            dataValueField: 'id',
                            filterConfig: {
                                placeholder: 'Search Tags'
                            },
                            parse: formatData4Ajax,
                            minWidth: 200,
                            height: 250,
                            dataSource: {
                                type: 'GET',
                                url: smUtils.getTagsUrl('')
                            },
                            click: function(event, ui){
                                applyServerTagFilter(filteredServerGrid, event, ui)
                            },
                            optgrouptoggle: applyServerTagFilter,
                            control: false
                        }
                    }
                ]

            },
            columnHeader: {
                columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
            },
            body: {
                options: {
                    actionCell: {
                        type: 'link',
                        iconClass: 'icon-plus',
                        onclick: function(e, args) {
                            var selectedRow = $(filteredServerGrid).data('contrailGrid')._dataView.getItem(args.row);
                            updateSelectedServer(gridPrefix, 'add', [selectedRow]);
                        }
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?' + urlParam
                        }
                    }
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: 'No Servers to select.'
                    }
                }
            }
        };
        return gridElementConfig;
    }

    function getAssignRolesSelectedServerGridElementConfig(modelAttrs) {
        var gridPrefix = 'assign-roles',
            filteredServerGrid = '#' + gridPrefix + '-filtered-servers',
            urlParam = 'cluster_id=' + modelAttrs.id,
            gridElementConfig = {
            header: {
                title: {
                    text: smLabels.TITLE_SELECT_SERVERS
                },
                defaultControls: {
                    refreshable: true
                },
                advanceControls: [
                    {
                        type: 'checked-multiselect',
                        iconClass: 'icon-filter',
                        title: 'Filter Servers',
                        placeholder: 'Filter Servers',
                        elementConfig: {
                            elementId: 'tagsCheckedMultiselect',
                            dataTextField: 'text',
                            dataValueField: 'id',
                            noneSelectedText: smLabels.FILTER_TAGS,
                            selectedText: '# Tags Selected',
                            filterConfig: {
                                placeholder: smLabels.SEARCH_TAGS
                            },
                            parse: formatData4Ajax,
                            minWidth: 150,
                            height: 200,
                            selectedList: 2,
                            dataSource: {
                                type: 'GET',
                                url: smUtils.getTagsUrl('')
                            },
                            click: function(event, ui){
                                applyServerTagFilter(filteredServerGrid, event, ui)
                            },
                            optgrouptoggle: applyServerTagFilter,
                            control: false
                        }
                    },
                    {
                        actionId: 'rolesCheckedMultiselectAction',
                        type: 'checked-multiselect',
                        iconClass: 'icon-check',
                        placeholder: 'Assign Roles',
                        title: 'Assign Roles',
                        disabledLink: true,
                        elementConfig: {
                            elementId: 'rolesCheckedMultiselect',
                            dataTextField: 'text',
                            dataValueField: 'id',
                            noneSelectedText: smLabels.SELECT_ROLES,
                            selectedText: '# Roles Selected',
                            filterConfig: {
                                placeholder: smLabels.SEARCH_ROLES
                            },
                            minWidth: 150,
                            height: 200,
                            selectedList: 2,
                            data: [
                                {
                                    id: 'roles',
                                    text: 'Roles',
                                    children: smConstants.ROLES_OBJECTS
                                }
                            ],
                            control: [
                                {
                                    label: 'Assign',
                                    cssClass: 'btn-primary',
                                    click: function (self, checkedRows) {
                                        var checkedServers = $(filteredServerGrid).data('contrailGrid').getCheckedRows(),
                                            checkedRoles = checkedRows;

                                        $.each(checkedServers, function (checkedServerKey, checkedServerValue) {
                                            $.each(checkedRoles, function (checkedRoleKey, checkedRoleValue) {
                                                var checkedRoleValue = $.parseJSON(unescape($(checkedRoleValue).val()));
                                                if($.isEmptyObject(checkedServerValue.roles)) {
                                                    checkedServerValue.roles = [];
                                                }
                                                if (checkedServerValue.roles.indexOf(checkedRoleValue.value) == -1) {

                                                    checkedServerValue.roles.push(checkedRoleValue.value);
                                                    if (!contrail.checkIfExist($(filteredServerGrid).data('serverData'))) {
                                                        $(filteredServerGrid).data('serverData', {
                                                            selectedServers: [checkedServerValue.cgrid]
                                                        });
                                                    } else {
                                                        if ($(filteredServerGrid).data('serverData').selectedServers.indexOf(checkedServerValue.cgrid) == -1) {
                                                            $(filteredServerGrid).data('serverData').selectedServers.push(checkedServerValue.cgrid);
                                                        }
                                                    }

                                                }
                                            })
                                        })

                                        $(filteredServerGrid).data('contrailGrid')._dataView.updateData(checkedServers);
                                        $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').uncheckAll()
                                        disableRolesCheckedMultiselect(true);
                                    }
                                },
                                {
                                    label: 'Revoke',
                                    click: function (self, checkedRows) {
                                        var checkedServers = $(filteredServerGrid).data('contrailGrid').getCheckedRows(),
                                            checkedRoles = checkedRows;

                                        $.each(checkedServers, function (checkedServerKey, checkedServerValue) {
                                            $.each(checkedRoles, function (checkedRoleKey, checkedRoleValue) {
                                                if($.isEmptyObject(checkedServerValue.roles)) {
                                                    checkedServerValue.roles = [];
                                                }
                                                var checkedRoleValue = $.parseJSON(unescape($(checkedRoleValue).val())),
                                                    checkedRoleIndex = checkedServerValue.roles.indexOf(checkedRoleValue.value);
                                               if (checkedRoleIndex != -1) {

                                                    checkedServerValue.roles.splice(checkedRoleIndex, 1);
                                                    if (!contrail.checkIfExist($(filteredServerGrid).data('serverData'))) {
                                                        $(filteredServerGrid).data('serverData', {
                                                            selectedServers: [checkedServerValue.cgrid]
                                                        });
                                                    } else {
                                                        if ($(filteredServerGrid).data('serverData').selectedServers.indexOf(checkedServerValue.cgrid) == -1) {
                                                            $(filteredServerGrid).data('serverData').selectedServers.push(checkedServerValue.cgrid);
                                                        }
                                                    }

                                                }
                                            })
                                        })

                                        $(filteredServerGrid).data('contrailGrid')._dataView.updateData(checkedServers);
                                        $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').uncheckAll()
                                        disableRolesCheckedMultiselect(true);                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            columnHeader: {
                columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS.concat(smGridConfig.getGridColumns4Roles())
            },
            body: {
                options: {
                    actionCell: [],
                    checkboxSelectable: {
                        onNothingChecked: function (e) {
                            disableRolesCheckedMultiselect(true);
                        },
                        onSomethingChecked: function (e) {
                            disableRolesCheckedMultiselect(false);
                        }
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?' + urlParam
                        }
                    }
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: 'No Servers to select.'
                    }
                }
            }
        };

        return gridElementConfig;
    }

    function disableRolesCheckedMultiselect(flag) {
        if(flag){
            $('#rolesCheckedMultiselectAction').find('.icon-check').addClass('disabled-link');
            $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').disable();
        } else {
            $('#rolesCheckedMultiselectAction').find('.icon-check').removeClass('disabled-link');
            $('#rolesCheckedMultiselectAction').find('.input-icon').data('contrailCheckedMultiselect').enable();
        }
    }

    function getConfirmServerGridElementConfig(gridPrefix) {
        var confirmServerGrid = '#' + gridPrefix + '-confirm-servers';
        var gridElementConfig = {
            header: {
                title: {
                    text: smLabels.TITLE_SELECTED_SERVERS
                }
            },
            columnHeader: {
                columns: smGridConfig.EDIT_SERVERS_ROLES_COLUMNS
            },
            body: {
                options: {
                    checkboxSelectable: false,
                    actionCell: {
                        type: 'link',
                        iconClass: 'icon-minus',
                        onclick: function(e, args) {
                            var selectedRow = $(confirmServerGrid).data('contrailGrid')._dataView.getItem(args.row);
                            updateSelectedServer(gridPrefix, 'remove', [selectedRow]);
                        }
                    }
                },
                dataSource: {
                    data: []
                },
                statusMessages: {
                    empty: {
                        type: 'status',
                        iconClasses: '',
                        text: 'No Servers Selected.'
                    }
                }
            }
        };

        return gridElementConfig;
    }

    function formatData4Ajax(response) {
        var filterServerData = [];
        $.each(response, function (key, value) {
            var childrenData = [],
                children = value;
            $.each(children, function (k, v) {
                childrenData.push({'id': v, 'text': v});
            });
            filterServerData.push({'id': key, 'text': smLabels.get(key), children: childrenData});
        });
        return filterServerData;
    };

    function applyServerTagFilter(filteredServerGrid, event, ui) {
        var checkedRows = $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').getChecked();
        $(filteredServerGrid).data('contrailGrid')._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $(filteredServerGrid).data('contrailGrid')._dataView.setFilter(serverTagGridFilter);
    };

    function serverTagGridFilter(item, args) {
        if (args.checkedRows.length == 0) {
            return true;
        } else {
            var returnFlag = true;
            $.each(args.checkedRows, function (checkedRowKey, checkedRowValue) {
                var checkedRowValueObj = $.parseJSON(unescape($(checkedRowValue).val()));
                if (item.tag[checkedRowValueObj.parent] == checkedRowValueObj.value) {
                    returnFlag = returnFlag && true;
                } else {
                    returnFlag = false;
                }
            });
            return returnFlag;
        }
    };

    function onLoadFilteredServers(gridPrefix, params) {
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers');
        filteredServerGridElement.data('contrailGrid').refreshView();

        if(!contrail.checkIfExist(filteredServerGridElement.data('serverData'))){
            filteredServerGridElement.data('serverData', {
                selectedServers: [],
                serverIds: []
            });
        }
        else {

        }
    }

    function updateSelectedServer(gridPrefix, method, serverList){
        var filteredServerGridElement = $('#' + gridPrefix + '-filtered-servers'),
            confirmServerGridElement = $('#' + gridPrefix + '-confirm-servers'),
            currentSelectedServer = filteredServerGridElement.data('serverData').selectedServers,
            serverIds = filteredServerGridElement.data('serverData').serverIds;

        if(method == 'add') {
            var cgrids = [];
            currentSelectedServer = currentSelectedServer.concat(serverList);
            filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.push(serverListValue.id);
            });
            filteredServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
        }
        else if(method == 'remove') {
            var cgrids = [];

            $.each(serverList, function(serverListKey, serverListValue){
                cgrids.push(serverListValue.cgrid);
                serverIds.splice(serverIds.indexOf(serverListValue.id), 1 );
            });
            confirmServerGridElement.data('contrailGrid')._dataView.deleteDataByIds(cgrids);
        }

        filteredServerGridElement.data('serverData').serverIds = serverIds;
        filteredServerGridElement.data('serverData').selectedServers = currentSelectedServer;
        filteredServerGridElement.parents('section').find('.selectedServerCount')
            .text((currentSelectedServer.length == 0) ? 'None' : currentSelectedServer.length)
    }

    var provisionViewConfig = {
        elementId:  smUtils.formatElementId([prefixId, smLabels.TITLE_PROVISIONING]),
        view: "SectionView",
        viewConfig: {
            rows: [
                {
                    columns: [
                        {
                            elementId: 'base_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'base_image_id', class: "span6", dataBindValue: 'base_image_id', elementConfig: {placeholder: smLabels.SELECT_IMAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectDetailUrl(smConstants.IMAGE_PREFIX_ID, 'filterInImages')}}}
                        },
                        {
                            elementId: 'package_image_id',
                            view: "FormDropdownView",
                            viewConfig: {path: 'package_image_id', class: "span6", dataBindValue: 'package_image_id', elementConfig: {placeholder: smLabels.SELECT_PACKAGE, dataTextField: "id", dataValueField: "id", dataSource: { type: 'remote', url: smUtils.getObjectDetailUrl(smConstants.IMAGE_PREFIX_ID, 'filterInPackages')}}}
                        }
                    ]
                }
            ]
        }
    };

    function getParamsFromTags(tagsObject) {
        if(tagsObject.length == 0){
            return '';
        }
        var tagParams = [];

        $.each(tagsObject, function (tagKey, tagValue) {
            if(tagValue != ''){
                tagParams.push(tagKey + '=' + tagValue);
            }
        });
        return (tagParams.length > 0) ? '&tag=' + tagParams.join(',') : '';
    }

    function getAddClusterViewConfig(clusterModel, callback) {
        var addClusterViewConfig = {
                elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_ADD_CLUSTER]),
                view: "WizardView",
                viewConfig: {
                    steps: []
                }
            },
            steps = [],
            configureStepViewConfig = null,
            addServerStepViewConfig = null,
            assignRolesStepViewConfig = null,
            openstackStepViewConfig = null;

        //Appending Configure Server Steps
        configureStepViewConfig = {
            elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_CREATE_CONFIG]),
            view: "AccordianView",
            viewConfig: createClusterViewConfig,
            title: smLabels.TITLE_CREATE,
            stepType: 'step',
            onInitRender: true,
            onNext: function (params) {
                return params.model.configure(callback);
            },
            buttons: {
                next: {
                    label: 'Save &amp; Next'
                },
                previous: {
                    visible: false
                }
            }
        };
        steps = steps.concat(configureStepViewConfig);

        //Appending Add Server Steps
        addServerStepViewConfig = $.extend(true, {}, getAddServerViewConfig(clusterModel, callback).viewConfig).steps;

        addServerStepViewConfig[0].title = smLabels.TITLE_ADD_SERVERS_TO_CLUSTER;
        addServerStepViewConfig[0].onPrevious = function(params) {
            return false;
        };
        addServerStepViewConfig[0].buttons = {
            next: {
                label: 'Next'
            },
            previous: {
                visible: false
            }
        };

        addServerStepViewConfig[1].stepType = 'sub-step';
        addServerStepViewConfig[1].onNext = function(params) {
            var currentSelectedServers = $('#add-server-confirm-servers').data('contrailGrid')._dataView.getItems();
            return params.model.addServer(currentSelectedServers, callback);
        };
        addServerStepViewConfig[1].buttons = {
            next: {
                label: 'Save &amp; Next'
            }
        };
        steps = steps.concat(addServerStepViewConfig);

        //Appending Assign Roles Steps
        assignRolesStepViewConfig = $.extend(true, {}, getAssignRolesViewConfig(clusterModel), {
            title: smLabels.TITLE_ASSIGN_ROLES,
            stepType: 'step',
            onInitRender: true,
            onLoadFromNext: function (params) {
                $('#assign-roles-filtered-servers').data('contrailGrid').setRemoteAjaxConfig({
                    url: smUtils.getObjectDetailUrl(smConstants.SERVER_PREFIX_ID) + '?cluster_id=' + clusterModel.model().attributes.id
                });
                $('#assign-roles-filtered-servers').data('contrailGrid').refreshData();
            },
            onNext: function (params) {
                return saveAssignRoles(clusterModel, function(){});
            },
            buttons: {
                next: {
                    label: 'Save &amp; Next'
                },
                previous: {
                    visible: false
                }
            }
        });
        steps = steps.concat(assignRolesStepViewConfig);

        openstackStepViewConfig = {
            elementId: smUtils.formatElementId([prefixId, smLabels.TITLE_EDIT_CONFIG]),
            view: "AccordianView",
            title: smLabels.TITLE_CONFIGURE,
            stepType: 'step',
            viewConfig: configureClusterViewConfig,
            onInitRender: true,
            onNext: function (params) {
                return params.model.configureOpenStack(function(){
                    callback();
                    $('#' + modalId).modal('hide');
                });
            },
            buttons: {
                finish: {
                    label: 'Save'
                },
                previous: {
                    visible: false
                }
            }
        };
        steps = steps.concat(openstackStepViewConfig);

        addClusterViewConfig.viewConfig.steps = steps;

        return addClusterViewConfig;
    }

    return ClusterEditView;
});

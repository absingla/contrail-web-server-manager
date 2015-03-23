/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView',
    'setting/sm/ui/js/views/ServerListView'
], function (_, Backbone, ServerModel, ServerEditView, ServerListView) {
    var prefixId = smwc.SERVER_PREFIX_ID,
        gridElId = '#' + prefixId + cowc.RESULTS_SUFFIX_ID,
        serverEditView = new ServerEditView();

    var ServersView = Backbone.View.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var hashParams = viewConfig['hashParams']
            if (hashParams['server_id'] != null) {
                this.renderServer(hashParams['server_id']);
            } else {
                this.renderServersList(viewConfig);
            }
        },

        renderServersList: function (viewConfig) {
            var serverListView = new ServerListView();
            serverListView.render(viewConfig);
        },

        renderServer: function (serverId) {
            var detailTemplate = cowu.generateDetailTemplate(detailTemplateConfig, cowc.APP_CONTRAIL_SM),
                serverTemplate = contrail.getTemplate4Id(cowc.TMPL_DETAIL_PAGE),
                serverActionTemplate = contrail.getTemplate4Id(cowc.TMPL_DETAIL_PAGE_ACTION),
                ajaxConfig = {}, that = this;

            ajaxConfig.type = "GET";
            ajaxConfig.cache = "true";
            ajaxConfig.url = smwu.getObjectDetailUrl(smwc.SERVER_PREFIX_ID) + "?id=" + serverId;

            contrail.ajaxHandler(ajaxConfig, function () {}, function (response) {
                that.$el.html(serverTemplate({prefix: smwc.SERVER_PREFIX_ID, prefixId: serverId}));
                var actionConfigItem = null,
                    detailActionConfig = getDetailActionConfig(false),
                    gridConfig, ipmiElId;

                $.each(detailActionConfig, function(detailActionConfigKey, detailActionConfigValue) {
                    actionConfigItem = $(serverActionTemplate(detailActionConfigValue));
                    $('#' + smwc.SERVER_PREFIX_ID + '-actions').find('.dropdown-menu').append(actionConfigItem);

                    $(actionConfigItem).on('click', function(){
                        detailActionConfigValue.onClick(response[0])
                    });
                });

                that.$el.find('#' + smwc.SERVER_PREFIX_ID + '-details').html(detailTemplate(response[0]));

                ipmiElId = '#' + smwc.SERVER_PREFIX_ID + "-ipmi-info";
                gridConfig = getIPMIInfoGridConfig(serverId);
                cowu.renderGrid(ipmiElId, gridConfig);
            }, function () {});
        }
    });

    function getIPMIInfoGridConfig(serverId) {
        return {
            header: {
                title: {
                    text: smwl.SENSORS_INFO
                }
            },
            columnHeader: {
                columns: smwgc.SERVER_IPMI_INFO_COLUMNS
            },
            body: {
                options: {
                    detail: false,
                    checkboxSelectable: false
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getIPMIInfoUrl(serverId)
                        }
                    }
                }
            },
            footer : {
                pager : {
                    options : {
                        pageSize : 10,
                        pageSizeSelect : [10, 20, 50, 100, 200 ]
                    }
                }
            }
        };
    }

    function getDetailActionConfig(showAssignRoles) {
        var rowActionConfig = [
            smwgc.getConfigureAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getTagAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_TAGS + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderTagServers({
                    title: title,
                    checkedRows: checkedRow,
                    callback: function () {
                        loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                    },
                    lockEditingByDefault: false
                });
            })
        ];

        if (showAssignRoles) {
            rowActionConfig.push(smwgc.getAssignRoleAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }));
        }

        rowActionConfig = rowActionConfig.concat([
            smwgc.getReimageAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }, true),
            smwgc.getProvisionAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS, q: {server_id: dataItem['id']}});
                }});
            }),
            smwgc.getDeleteAction(function (dataItem) {
                var serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderDeleteServer({"title": title, checkedRows: checkedRow, callback: function () {
                    loadFeature({p: smwc.URL_HASH_SM_SERVERS});
                }});
            }, true)
        ]);

        return rowActionConfig;
    };

    var detailTemplateConfig = {
        templateGenerator: 'ColumnSectionTemplateGenerator',
        templateGeneratorConfig: {
            columns: [
                {
                    class: 'span6',
                    rows: [
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_SYSTEM_MANAGEMENT,
                            templateGeneratorConfig: [
                                {
                                    key: 'id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'mac_address',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'host_name',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'domain',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'ip_address',
                                    templateGenerator: 'LinkGenerator',
                                    templateGeneratorConfig: {
                                        template: 'http://{{params.ip_address}}:8080',
                                        params: {
                                            ip_address: 'ip_address'
                                        }
                                    }
                                },
                                {
                                    key: 'ipmi_address',
                                    templateGenerator: 'LinkGenerator',
                                    templateGeneratorConfig: {
                                        template: 'http://{{params.ipmi_address}}',
                                        params: {
                                            ipmi_address: 'ipmi_address'
                                        }
                                    }
                                },
                                {
                                    key: 'gateway',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'subnet_mask',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'static_ip',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'parameters.partition',
                                    templateGenerator: 'TextGenerator'
                                }
                            ]
                        },
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_CONTRAIL_CONTROLLER,
                            templateGeneratorConfig: [
                                {
                                    key: 'package_image_id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'contrail.control_data_interface',
                                    templateGenerator: 'TextGenerator'
                                }
                            ]
                        },
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_CONTRAIL_STORAGE,
                            templateGeneratorConfig: [
                                {
                                    key: 'parameters.storage_repo_id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'parameters.disks',
                                    templateGenerator: 'TextGenerator'
                                }
                            ]
                        },
                    ]
                },
                {
                    class: 'span6',
                    rows: [
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_STATUS,
                            templateGeneratorConfig: [
                                {
                                    key: 'status',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'last_update',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'state',
                                    templateGenerator: 'TextGenerator'
                                },
                            ]
                        },
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_ROLES,
                            templateGeneratorConfig: [
                                {
                                    key: 'roles',
                                    templateGenerator: 'TextGenerator'
                                },
                            ]
                        },
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_TAGS,
                            templateGeneratorConfig: [
                                {
                                    key: 'tag.datacenter',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'tag.floor',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'tag.hall',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'tag.rack',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'tag.user_tag',
                                    templateGenerator: 'TextGenerator'
                                },
                            ]
                        },
                        {
                            templateGenerator: 'BlockListTemplateGenerator',
                            title: smwl.TITLE_PROVISIONING,
                            templateGeneratorConfig: [
                                {
                                    key: 'cluster_id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'email',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'base_image_id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'reimaged_id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'provisioned_id',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'network.management_interface',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'parameters.kernel_upgrade',
                                    templateGenerator: 'TextGenerator'
                                },
                                {
                                    key: 'parameters.kernel_version',
                                    templateGenerator: 'TextGenerator'
                                },
                            ]
                        },
                    ]
                }
            ]
        }
    };

    return ServersView;
});
/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ServerModel',
    'setting/sm/ui/js/views/ServerEditView'
], function (_, Backbone, ServerModel, ServerEditView) {
    var prefixId = smwc.SERVER_PREFIX_ID,
        gridElId = '#' + smwl.SERVER_GRID_ID,
        serverEditView = new ServerEditView();

    var ServerGridView = Backbone.View.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig;

            cowu.renderView4Config(self.$el, self.model, getServerGridViewConfig(viewConfig));
        }
    });

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

    // ServerFilter: OR within the category, AND across the category
    function serverTagGridFilter(item, args) {
        if (args.checkedRows.length == 0) {
            return true;
        } else {
            var returnObj = {},
                returnFlag = true;
            $.each(args.checkedRows, function (checkedRowKey, checkedRowValue) {
                var checkedRowValueObj = $.parseJSON(unescape($(checkedRowValue).val()));
                if(!contrail.checkIfExist(returnObj[checkedRowValueObj.parent])){
                    returnObj[checkedRowValueObj.parent] = false;
                }
                returnObj[checkedRowValueObj.parent] = returnObj[checkedRowValueObj.parent] || (item.tag[checkedRowValueObj.parent] == checkedRowValueObj.value);
            });

            $.each(returnObj, function(returnObjKey, returnObjValue) {
                returnFlag = returnFlag && returnObjValue;
            });

            return returnFlag;
        }
    };

    function applyServerTagFilter(event, ui) {
        var checkedRows = $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').getChecked();
        $(gridElId).data('contrailGrid')._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $(gridElId).data('contrailGrid')._dataView.setFilter(serverTagGridFilter);
    };

    function formatData4Ajax(response) {
        var filterServerData = [];
        $.each(response, function (key, value) {
            var childrenData = [],
                children = value;
            $.each(children, function (k, v) {
                childrenData.push({'id': v, 'text': v});
            });
            filterServerData.push({'id': key, 'text': smwl.get(key), children: childrenData});
        });
        return filterServerData;
    };

    function getHeaderActionConfig(queryString, showAssignRoles) {
        var headerActionConfig, dropdownActions;
        dropdownActions = [
            {
                "iconClass": "icon-edit",
                "title": smwl.TITLE_EDIT_CONFIG,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderConfigureServers({"title": smwl.TITLE_EDIT_CONFIG, checkedRows: checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            },
            {
                "iconClass": "icon-tags",
                "title": smwl.TITLE_EDIT_TAGS,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderTagServers({
                        "title": smwl.TITLE_EDIT_TAGS,
                        "checkedRows": checkedRows,
                        callback: function () {
                            var dataView = $(gridElId).data("contrailGrid")._dataView;
                            dataView.refreshData();
                            $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').refresh();
                        },
                        lockEditingByDefault: true
                    });
                }
            }
        ];
        if (showAssignRoles) {
            dropdownActions.push({
                "iconClass": "icon-check",
                "title": smwl.TITLE_ASSIGN_ROLES,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderAssignRoles({"title": smwl.TITLE_ASSIGN_ROLES, "checkedRows": checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            });
        }
        dropdownActions.push({
            "iconClass": "icon-signin",
            "title": smwl.TITLE_REIMAGE,
            divider: true,
            "onClick": function () {
                var serverModel = new ServerModel(),
                    checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": smwl.TITLE_REIMAGE, checkedRows: checkedRows, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        }),
            dropdownActions.push({
                "iconClass": "icon-cloud-upload",
                "title": smwl.TITLE_PROVISION,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows();

                    serverEditView.model = serverModel;
                    serverEditView.renderProvisionServers({"title": smwl.TITLE_PROVISION_SERVERS, "checkedRows": checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            });
        headerActionConfig = [
            {
                "type": "dropdown",
                "iconClass": "icon-cog",
                "linkElementId": 'btnActionServers',
                "disabledLink": true,
                "actions": dropdownActions
            }
        ];

        headerActionConfig = headerActionConfig.concat([
            {
                "type": "link",
                "title": smwl.TITLE_ADD_SERVER,
                "iconClass": "icon-plus",
                "onClick": function () {
                    var serverModel = new ServerModel();

                    serverEditView.model = serverModel;
                    serverEditView.renderAddServer({"title": smwl.TITLE_ADD_SERVER, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }, {
                type: 'checked-multiselect',
                iconClass: 'icon-filter',
                placeholder: 'Filter Servers',
                elementConfig: {
                    elementId: 'tagsCheckedMultiselect',
                    dataTextField: 'text',
                    dataValueField: 'id',
                    noneSelectedText: smwl.FILTER_TAGS,
                    filterConfig: {
                        placeholder: smwl.SEARCH_TAGS
                    },
                    parse: formatData4Ajax,
                    minWidth: 150,
                    height: 250,
                    emptyOptionText: 'No Tags found.',
                    dataSource: {
                        type: 'GET',
                        url: smwu.getTagsUrl(queryString)
                    },
                    click: applyServerTagFilter,
                    optgrouptoggle: applyServerTagFilter,
                    control: false
                }
            }
        ]);
        return headerActionConfig;
    };

    function getServerGridViewConfig(viewConfig) {
        return {
            elementId: cowu.formatElementId([smwl.SM_SERVER_LIST_VIEW_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SERVER_GRID_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getServerGridConfig(viewConfig)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getRowActionConfig(showAssignRoles) {
        var rowActionConfig = [
            smwgc.getConfigureAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getTagAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_TAGS + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderTagServers({
                    "title": title,
                    checkedRows: checkedRow,
                    callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                        $('#tagsCheckedMultiselect').data('contrailCheckedMultiselect').refresh();
                    },
                    lockEditingByDefault: false
                });
            })
        ];

        if (showAssignRoles) {
            rowActionConfig.push(smwgc.getAssignRoleAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }));
        }
        rowActionConfig = rowActionConfig.concat([smwgc.getReimageAction(function (rowIndex) {
            var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                checkedRow = [dataItem],
                title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

            serverEditView.model = serverModel;
            serverEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }, true),
            smwgc.getProvisionAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_SERVER + ' ('+ dataItem['id'] +')';

                serverEditView.model = serverModel;
                serverEditView.renderDeleteServer({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true)
        ]);

        return rowActionConfig;
    };

    function getServerGridConfig(viewConfig) {
        var pagerOptions = viewConfig['pagerOptions'],
            serverColumnsType = viewConfig['serverColumnsType'],
            showAssignRoles = viewConfig['showAssignRoles'],
            queryString = smwu.getQueryString4ServersUrl(viewConfig['hashParams']);

        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVERS
                },
                advanceControls: getHeaderActionConfig(queryString, showAssignRoles)
            },
            columnHeader: {
                columns: smwgc.getServerColumns(serverColumnsType)
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(showAssignRoles),
                    checkboxSelectable: {
                        onNothingChecked: function (e) {
                            $('#btnActionServers').addClass('disabled-link').removeAttr('data-toggle');
                        },
                        onSomethingChecked: function (e) {
                            $('#btnActionServers').removeClass('disabled-link').attr('data-toggle', 'dropdown');
                        }
                    },
                    detail: {
                        template: cowu.generateDetailTemplateHTML(detailTemplateConfig, cowc.APP_CONTRAIL_SM)
                    },
                    sortable: {
                        defaultSortCols: {
                            'discovered': {sortAsc: false},
                            'status': {sortAsc: true}
                        }
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(prefixId) + queryString
                        }
                    },
                    cacheConfig: {
                        ucid: smwc.UCID_ALL_SERVERS_LIST
                    }
                },
                footer: {
                    pager: contrail.handleIfNull(pagerOptions, { options: { pageSize: 5, pageSizeSelect: [5, 10, 50, 100] } })
                }
            }
        };

        return gridElementConfig;
    };

    return ServerGridView;
});
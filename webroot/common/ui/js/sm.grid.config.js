/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var GridConfig = function () {
        this.GRID_HEADER_ACTION_TYPE_ACTION = 'action';
        this.GRID_HEADER_ACTION_TYPE_DROPLIST = 'action-droplist';

        this.IMAGE_COLUMNS = [
            {id: "image_id", field: "id", name: "Name", width: 120, minWidth: 100},
            {id: "category", field: "category", name: "Category", width: 120, minWidth: 50},
            {id: "image_type", field: "type", name: "Type", width: 120, minWidth: 100},
            {id: "image_version", field: "version", name: "Version", width: 120, minWidth: 50},
            {id: "image_path", field: "path", name: "Path", width: 300, minWidth: 100}
        ];

        this.PACKAGE_COLUMNS = [
            {id: "package_id", field: "id", name: "Name", width: 120, minWidth: 100},
            {id: "package_category", field: "category", name: "Category", width: 120, minWidth: 50},
            {id: "package_type", field: "type", name: "Type", width: 120, minWidth: 100},
            {id: "package_version", field: "version", name: "Version", width: 120, minWidth: 50},
            {id: "package_path", field: "path", name: "Path", width: 300, minWidth: 100}
        ];

        this.CLUSTER_COLUMNS = [
            { id: "cluster_id", field: "id", name: "Name", width: 150, minWidth: 100, cssClass: 'cell-hyperlink-blue', events: {
                onClick: function (e, dc) {
                    loadFeature({p: 'setting_sm_clusters', q: {'cluster_id': dc['id']}});
                }
            }},
            { id: "email", field: "email", name: "Email", width: 150, minWidth: 100 },
            { id: "new-servers", field: "", name: "New Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['new_servers'];
                }
            },
            { id: "configured-servers", field: "", name: "Configured Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['configured_servers'];
                }
            },
            { id: "inreimage_servers", field: "", name: "In-Reimage Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['inreimage_servers'];
                }
            },
            { id: "reimaged_servers", field: "", name: "Reimaged Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['reimaged_servers'];
                }
            },
            { id: "inprovision_servers", field: "", name: "In-Provision Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['inprovision_servers'];
                }
            },
            { id: "provisioned-servers", field: "", name: "Provisioned Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['provisioned_servers'];
                }
            },
            { id: "total-servers", field: "", name: "Total Servers", width: 120, minWidth: 80, sortable : {sortBy: 'formattedValue'},
                formatter: function (r, c, v, cd, dc) {
                    var uiParams = dc[cowc.KEY_UI_ADDED_PARAMS],
                        serverStatus = uiParams['servers_status'];
                    return serverStatus['total_servers'];
                }
            }
        ];

        this.SERVER_SENSORS_COLUMNS = [
            {id: "sensor", field: "sensor", name: "Name", width: 120, minWidth: 15},
            {id: "sensor_type", field: "sensor_type", name: "Type", width: 120, minWidth: 15},
            {
                id: "reading", field: "reading", name: "Reading", width: 120, minWidth: 15,
                formatter: function (r, c, v, cd, dc) {
                    var unit = dc['unit'],
                        reading = dc['reading'];
                    return reading + " " + unit;
                }
            },
            {id: "status", field: "status", name: "Status", width: 120, minWidth: 15}
        ];

        this.getConfigureAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_CONFIG,
                iconClass: 'icon-edit',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getAddServersAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_ADD_SERVERS,
                iconClass: 'icon-plus',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getRemoveServersAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REMOVE_SERVERS,
                iconClass: 'icon-minus',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getReimageAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_REIMAGE,
                iconClass: 'icon-upload-alt',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getProvisionAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_PROVISION,
                iconClass: 'icon-cloud-upload',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getTagAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_EDIT_TAGS,
                iconClass: 'icon-tags',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getAssignRoleAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_ASSIGN_ROLES,
                iconClass: 'icon-check',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getDeleteAction = function (onClickFunction, divider) {
            return {
                title: smwl.TITLE_DELETE,
                iconClass: 'icon-trash',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };

        this.getGridColumns4Roles = function () {
            var columns = [];
            $.each(smwc.ROLES_ARRAY, function (roleKey, roleValue) {
                var width = 60;
                if(roleValue.indexOf('storage-') != -1) {
                    width = 100;
                }
                columns.push({
                    id: roleValue, field: "roles",
                    name: smwl.get(roleValue),
                    width: width,
                    minWidth: width,
                    cssClass: 'text-center',
                    sortable: {sortBy: 'formattedValue'},
                    formatter: function (r, c, v, cd, dc) {
                        if ($.isEmptyObject(dc.roles)) {
                            return ''
                        } else {
                            return (dc.roles.indexOf(roleValue) != -1) ? '<i class="icon-ok green"></i>' : '';
                        }
                    },
                    exportConfig: {
                        allow: true,
                        advFormatter: function (dc) {
                            return (dc.roles.indexOf(roleValue) != -1);
                        }
                    }
                });
            })
            return columns;
        };

        this.EDIT_SERVERS_ROLES_COLUMNS = ([
            {id: "server_id", field: "id", name: "Hostname", width: 75, minWidth: 75},
            {id: "ip_address", field: "ip_address", name: "IP", width: 80, minWidth: 80}
        ]);

        this.getServerColumns = function (serverColumnsType) {
            var serverColumns,
                commonColumnsSet1 = [
                    { id: "discovered", field: "discovered", resizable: false, sortable: false, width: 30,
                        searchable: false, exportConfig: { allow: false }, formatter: function (r, c, v, cd, dc) {
                        if (dc['discovered'] == 'true') {
                            return '<div class="padding-2-0;"><i class="icon-circle blue"></i></div>';
                        }
                    }
                    },
                    { id: "server_id", field: "id", name: "ID", width: 80, minWidth: 80, cssClass: 'cell-hyperlink-blue', events: {
                        onClick: function (e, dc) {
                            loadFeature({p: 'setting_sm_servers', q: {'server_id': dc['id']}});
                        }
                    } }
                ],
                tagColumnsSet = [
                    {
                        id: "tag", field: "tag", name: "Tags", width: 150, minWidth: 150, sortable: false,
                        formatter: function (r, c, v, cd, dc) {
                            var tagTemplate = contrail.getTemplate4Id(smwc.TMPL_TAGS),
                                tagHTML = tagTemplate({tags: dc.tag, colors: smwc.CACHED_TAG_COLORS, allowLink: true});
                            return tagHTML;
                        },
                        exportConfig: {
                            allow: true,
                            advFormatter: function(dc) {
                                return JSON.stringify(dc.tag);
                            }
                        }
                    }
                ],
                ipColumnsSet = [
                    { id: "ip_address", field: "ip_address", name: "IP", width: 80, minWidth: 80 },
                    { id: "ipmi_address", field: "ipmi_address", name: "IPMI", width: 100, minWidth: 100, cssClass: 'cell-hyperlink-blue', events: {
                        onClick: function (e, dc) {
                            if(dc['ipmi_address'] != null && dc['ipmi_address'] != '') {
                                window.open("http://" + dc['ipmi_address']);
                            }
                        }
                    }}
                ];

            if (serverColumnsType == smwc.SERVER_PREFIX_ID) {
                serverColumns = commonColumnsSet1.concat([
                    { id: "cluster_id", field: "cluster_id", name: "Cluster", width: 80, minWidth: 80, cssClass: 'cell-hyperlink-blue', events: {
                        onClick: function (e, dc) {
                            loadFeature({p: 'setting_sm_clusters', q: {'cluster_id': dc['cluster_id']}});
                        }
                    }}
                ]);
                serverColumns = serverColumns.concat(tagColumnsSet).concat(ipColumnsSet);
            } else if (serverColumnsType == smwc.CLUSTER_PREFIX_ID) {
                serverColumns = commonColumnsSet1.concat(ipColumnsSet).concat(this.getGridColumns4Roles());
            }

            serverColumns = serverColumns.concat([
                { id: "status", field: "status", name: "Status", width: 120, minWidth: 120 }
            ]);

            return serverColumns;
        };

        this.getBaremetalServerColumns = function (baremetalServerColumnsType) {
            var serverColumns =
                [{
                    id: 'serverId',
                    field: 'serverId',
                    name: 'Server'
                },
                {
                    id: 'mac',
                    field: 'mac',
                    name: 'Mac Address'
                },
                {
                    id: 'ip',
                    field: 'ip',
                    name: 'IP Address'
                },
                {
                    id: 'physical_router',
                    field: 'physical_router',
                    name: 'Physical Router'
                },
                {
                    id: 'interface',
                    field: 'interface',
                    name: 'Interface'
                },
                {
                    id: 'vn',
                    field: 'vn',
                    name: 'Virtual Network'
                }];
            return serverColumns;
        };

        this.getClusterDetailsTemplateConfig = function () {
            return {
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span6',
                            rows: [
                                {
                                    title: smwl.TITLE_OVERVIEW,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'email',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    title: smwl.TITLE_OPENSTACK,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.openstack_mgmt_ip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.keystone_ip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.keystone_tenant',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.keystone_service_tenant',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.keystone_username',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.keystone_region_name',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    title: smwl.TITLE_CONTRAIL_CONTROLLER,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.encapsulation_priority',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.external_bgp',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.multi_tenancy',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.router_asn',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.use_certificates',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.database_dir',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.hc_interval',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    title: smwl.TITLE_HA_CONFIG,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.haproxy',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.internal_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.external_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.contrail_internal_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.contrail_external_vip',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.nfs_server',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.nfs_glance_path',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    title: smwl.TITLE_ANALYTICS_CONFIG,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.analytics_data_ttl',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.analytics_syslog_port',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.analytics_data_dir',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.ssd_data_dir',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            class: 'span6',
                            rows: [
                                {
                                    title: smwl.TITLE_STATUS,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'ui_added_parameters.servers_status.total_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.new_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.configured_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.inreimage_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.reimaged_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.inprovision_servers',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'ui_added_parameters.servers_status.provisioned_servers',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    title: smwl.TITLE_CONTRAIL_STORAGE,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.storage_virsh_uuid',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.storage_fsid',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.storage_mon_secret',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.osd_bootstrap_key',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.admin_key',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.live_migration',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.live_migration_nfs_vm_host',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.live_migration_storage_scope',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                },
                                {
                                    title: smwl.TITLE_SERVERS_CONFIG,
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    templateGeneratorConfig: [
                                        {
                                            key: 'parameters.domain',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.gateway',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.subnet_mask',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'base_image_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'package_image_id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kernel_upgrade',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kernel_version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getServerDetailsTemplateConfig = function () {
            return {
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
                                }
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
                                        }
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
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };

        this.getImageDetailsTemplateConfig = function () {
            return {
                templateGenerator: 'ColumnSectionTemplateGenerator',
                templateGeneratorConfig: {
                    columns: [
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_OVERVIEW,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'id',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'category',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'type',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            class: 'span6',
                            rows: [
                                {
                                    templateGenerator: 'BlockListTemplateGenerator',
                                    title: smwl.TITLE_DETAILS,
                                    templateGeneratorConfig: [
                                        {
                                            key: 'path',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kickstart',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.kickseed',
                                            templateGenerator: 'TextGenerator'
                                        },
                                        {
                                            key: 'parameters.puppet_manifest_version',
                                            templateGenerator: 'TextGenerator'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        };
    };

    return GridConfig;
});
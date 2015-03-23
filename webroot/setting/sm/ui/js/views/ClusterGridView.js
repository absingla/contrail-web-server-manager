/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'setting/sm/ui/js/models/ClusterModel',
    'setting/sm/ui/js/views/ClusterEditView'
], function (_, Backbone, ClusterModel, ClusterEditView) {
    var prefixId = smwc.CLUSTER_PREFIX_ID,
        clusterEditView = new ClusterEditView(),
        gridElId = "#" + smwl.CLUSTER_GRID_ID;

    var ClusterGridView = Backbone.View.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'];

            cowu.renderView4Config(self.$el, self.model, getClusterGridViewConfig(pagerOptions));
        }
    });

    function getDetailTemplateConfig() {
        return [
            [
                {
                    title: smwl.TITLE_DETAILS,
                    keys: ['id', 'email']
                },
                {
                    title: smwl.TITLE_OPENSTACK,
                    keys: ['parameters.openstack_mgmt_ip', 'parameters.keystone_ip', 'parameters.keystone_tenant', 'parameters.keystone_service_tenant', 'parameters.keystone_username', 'parameters.keystone_region_name']
                },
                {
                    title: smwl.TITLE_CONTRAIL_CONTROLLER,
                    keys: ['parameters.encapsulation_priority', 'parameters.external_bgp', 'parameters.multi_tenancy', 'parameters.router_asn', 'parameters.use_certificates', 'parameters.database_dir', 'parameters.hc_interval']
                },
                {
                    title: smwl.TITLE_HA_CONFIG,
                    keys: ['parameters.haproxy', 'parameters.internal_vip', 'parameters.external_vip', 'parameters.contrail_internal_vip', 'parameters.contrail_external_vip', 'parameters.nfs_server', 'parameters.nfs_glance_path']
                },
                {
                    title: smwl.TITLE_ANALYTICS_CONFIG,
                    keys: ['parameters.analytics_data_ttl', 'parameters.analytics_syslog_port', 'parameters.analytics_data_dir', 'parameters.ssd_data_dir']
                }
            ],
            [
                {
                    title: smwl.TITLE_STATUS,
                    keys: ['ui_added_parameters.servers_status.total_servers', 'ui_added_parameters.servers_status.new_servers', 'ui_added_parameters.servers_status.configured_servers', 'ui_added_parameters.servers_status.inreimage_servers', 'ui_added_parameters.servers_status.reimaged_servers', 'ui_added_parameters.servers_status.inprovision_servers', 'ui_added_parameters.servers_status.provisioned_servers']
                },
                {
                    title: smwl.TITLE_CONTRAIL_STORAGE,
                    keys: ['parameters.storage_virsh_uuid', 'parameters.storage_fsid','parameters.storage_mon_secret', 'parameters.osd_bootstrap_key', 'parameters.admin_key', 'parameters.live_migration', 'parameters.live_migration_nfs_vm_host', 'parameters.live_migration_storage_scope']
                },
                {
                    title: smwl.TITLE_SERVERS_CONFIG,
                    keys: ['parameters.domain', 'parameters.gateway', 'parameters.subnet_mask', 'base_image_id', 'package_image_id', 'parameters.kernel_upgrade', 'parameters.kernel_version']
                }
            ]
        ];
    };

    function getHeaderActionConfig(gridElId) {
        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_CLUSTER,
                "iconClass": "icon-plus",
                "onClick": function () {
                    var clusterModel = new ClusterModel();

                    clusterEditView.model = clusterModel;
                    clusterEditView.renderAddCluster({"title": smwl.TITLE_ADD_CLUSTER, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }
        ];
    };

    function getRowActionConfig(gridElId) {
        return [
            smwgc.getAddServersAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_ADD_SERVERS + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderAddServers({"title": title, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getRemoveServersAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    title = smwl.TITLE_REMOVE_SERVERS + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderRemoveServers({"title": title, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getAssignRoleAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getConfigureAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getReimageAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_REIMAGE + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true),
            smwgc.getProvisionAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_PROVISION_CLUSTER + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderProvision({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data('contrailGrid')._dataView.getItem(rowIndex),
                    clusterModel = new ClusterModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_CLUSTER + ' ('+ dataItem['id'] +')';

                clusterEditView.model = clusterModel;
                clusterEditView.renderDeleteCluster({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true)
        ]
    };

    function getClusterGridViewConfig(pagerOptions) {
        return {
            elementId: cowu.formatElementId([smwl.SM_CLUSTER_LIST_VIEW_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.CLUSTER_GRID_ID,
                                title: smwl.TITLE_CLUSTERS,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getClusterGridConfig(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getClusterGridConfig(pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_CLUSTERS

                },
                advanceControls: getHeaderActionConfig(gridElId)
            },
            columnHeader: {
                columns: smwgc.CLUSTER_COLUMNS
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(gridElId),
                    checkboxSelectable: {
                        onNothingChecked: function(e){
                            $('#btnDeleteClusters').addClass('disabled-link');
                        },
                        onSomethingChecked: function(e){
                            $('#btnDeleteClusters').removeClass('disabled-link');
                        }
                    },
                    detail: {
                        template: $('#' + cowc.TMPL_2ROW_GROUP_DETAIL).html(),
                        templateConfig: getDetailTemplateConfig()
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(prefixId, smwc.SERVERS_STATE_PROCESSOR)
                        }
                    },
                    cacheConfig: {
                        ucid: smwc.UCID_ALL_CLUSTERS_LIST
                    }
                },
                footer: {
                    pager: contrail.handleIfNull(pagerOptions, { options: { pageSize: 5, pageSizeSelect: [5, 10, 50, 100] } })
                }
            }
        };
        return gridElementConfig;
    };

    return ClusterGridView;
});
/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var DefaultConfig = function () {

        this.getClusterModel = function () {
            return   {
                "id": null,
                "email": null,
                "base_image_id": null,
                "package_image_id": null,
                "parameters" : {
                    "domain": null,
                    "subnet_mask": null,
                    "gateway": null,
                    "password": null,
                    "provision": {
                        "contrail": {
                            "xmpp_auth_enable": false,
                            "xmpp_dns_auth_enable": false,
                            "kernel_upgrade": false,
                            "kernel_version": "",
                            "enable_lbass": false,
                            "ha": {
                                "enable": true,
                                "contrail_internal_vip": "",
                                "contrail_external_vip": "",
                                "contrail_internal_virtual_router_id": 103,
                                "contrail_external_virtual_router_id": 104,
                            },
                            "database": {
                                "ip_port": 9160,
                                "database_initial_token": 0,
                                "directory": "/var/lib/cassandra",
                                "minimum_diskGB": 32
                            },
                            "analytics": {
                                "data_ttl": 48,
                                "config_audit_ttl": 2160,
                                "statistics_ttl": 168,
                                "flow_ttl": 2,
                                "snmp_scan_frequency": 600,
                                "snmp_fast_scan_frequnency": 60,
                                "topology_scan_frequency": 60,
                                "syslog_port": -1,
                                "data_directory": "",
                                "ssd_data_directory": "",
                                "redis_password": null
                            },
                            "control": {
                                "encapsulation_priority": "VXLAN,MPLSoUDP,MPLSoGRE",
                                "router_asn": 64512,
                                "external_bgp": ""
                            },
                            "config": {
                                "manage_neutron": true,
                                "zookeeper_ip_port": 2181,
                                "healthcheck_interval": 5,
                                "use_certs": "false",
                            },
                            "webui": {
                            },
                            "compute": {
                                "huge_pages": "",
                                "core_mask": "",
                                "sriov": {
                                    "enable": false
                                }
                            },
                            "vmware": {
                                "ip": "",
                                "username": "",
                                "password": "",
                                "vswitch": ""
                            },
                            "vgw": {
                                "public_subnet": "",
                                "public_vn_name": "",
                                "interface": "",
                                "gateway_routes": ""
                            },
                            "storage": {
                                "storage_monitor_secret": "",
                                "osd_bootstrap_key": "",
                                "storage_chassis_config": [],
                                "live_migration_host": "",
                                "live_migration_ip": "",
                                "live_migration_storage_scope": "",
                                "storage_num_osd": "",
                                "storage_fsid": "",
                                "storage_num_hosts": "",
                                "storage_admin_key": "",
                                "storage_virsh_uuid": "",
                                "storage_cluster_network": "",
                                "storage_enabled": ""
                            },
                            "toragent": {
                            },
                            "tsn": {
                            }
                        },
                        "openstack":{
                            "keystone": {
                                "admin_password": "contrail123",
                                "ip": "",
                                "admin_user": "admin",
                                "admin_tenant": "admin",
                                "service_tenant": "services",
                                "auth_port": 35357,
                                "auth_protocol": "http",
                            },
                            "neutron": {
                                "service_protocol": "http",
                                "port": 9697
                            },
                            "amqp": {
                                "server_ip": ""
                            },
                            "keystone_region_name": "RegionOne",
                            "multi_tenancy": true,
                            "openstack_manage_amqp": false,
                            "enable_ceilometer": false,
                            "ha": {
                                "internal_vip": "",
                                "external_vip": "",
                                "internal_virtual_router_id": 102,
                                "external_virtual_router_id": 101,
                                "nfs_server": "",
                                "nfs_glance_path": ""
                            },
                            "mysql": {
                                "root_password": "c0ntrail123"
                            }
                        }
                    }
                }
            }
        };

        this.getServerModel = function () {
            return {
                "base_image_id": null,
                "cluster_id": null,
                "domain": null,
                "email": null,
                "id": null,
                "ipmi_address": null,
                "ipmi_username": "ADMIN",
                "ipmi_password": "ADMIN",
                "ipmi_interface": "lan",
                "password": null,
                "package_image_id": null,
                "roles": ["compute"],
                "parameters": {
                    "provision": {
                        "contrail": {
                            "storage": {
                                "storage_repo_id": "",
                                "storage_osd_disks": [],
                                "storage_chassis_id": "",
                                "storage_chassis_id_input": "",
                                "partition": ""
                            }
                        }
                    }
                },
                "tag": {},
                "network": {
                    "interfaces": [],
                    "management_interface": null,
                    "provisioning": "kickstart"
                },
                // TODO confirm if top_of_rack param path is correct
                "top_of_rack": {
                    "switches": []
                }
            }

        }

        this.getInterfaceModel = function () {
            return {
                "name": null,
                "type": null,
                "ip_address" : null,
                "mac_address" : null,
                "default_gateway" : null,
                "dhcp" : null,
                "member_interfaces": [],
                "tor" : null,
                "tor_port" : null,
                "parent": ""
            };
        };

        this.getSwitchModel = function () {
            return {
                "switch_id"       : null,
                "ip_address"      : null,
                "switch_name"     : null,
                "ovs_port"        : null,
                "ovs_protocol"    : null,
                "http_server_port": null,
                "vendor_name"     : null,
                "product_name"    : null,
                "keepalive_time"  : null
            }
        };

        this.getDiskModel = function () {
            return {
                disk: ""
            };
        };

        this.getImageModel = function (category) {
            return {
                'id': null,
                'category': category,
                'type': null,
                'version': null,
                'path': null,
                'parameters': {}
            };
        };
        
        this.getBaremetalModel = function (category) {
            return {
                'baremetal_reimage' : null,
                'base_image_id' : null,
                'interfaces' : []
            };
        };
    };

    return DefaultConfig;
});
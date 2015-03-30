/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var ServerListView = Backbone.View.extend({
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;

            cowu.renderView4Config(this.$el, null, getServerListViewConfig(viewConfig));
        }
    });

    function getServerListViewConfig(viewConfig) {
        var queryString = smwu.getQueryString4ServersUrl(viewConfig['hashParams']),
            hashParams = viewConfig['hashParams'];

        queryString = queryString.replace("?", "&");

        var listModelConfig = {
            remote: {
                ajaxConfig: {
                    url: smwc.get(smwc.SM_SERVER_MONITORING_INFO_URL, queryString)
                }
            }
        };

        if (queryString == '') {
            listModelConfig['cacheConfig'] = {
                ucid: smwc.UCID_ALL_SERVER_MONITORING_LIST
            };
        } else if (hashParams['cluster_id'] != null && hashParams['tag'] == null) {
            listModelConfig['cacheConfig'] = {
                ucid: smwc.get(smwc.UCID_CLUSTER_SERVER_MONITORING_LIST, hashParams['cluster_id'])
            };
        }

        return {
            elementId: cowu.formatElementId([smwl.SM_SERVER_LIST_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_SCATTER_CHART_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ScatterChartView",
                                viewConfig: {
                                    class: "port-distribution-chart",
                                    loadChartInChunks: false,
                                    modelConfig: listModelConfig,
                                    parseFn: function (response) {
                                        var chartDataValues = [];

                                        for (var i = 0; i < response.length; i++) {
                                            var server = response[i],
                                                disksUsage = server['ServerMonitoringInfo']['disk_usage_state'],
                                                interfacesState = server['ServerMonitoringInfo']['interface_info_state'],
                                                diskReadBytes = 0, diskWriteBytes = 0,
                                                cpuUsage = server['ServerMonitoringInfo']['cpu_usage_percentage'],
                                                memUsage = server['ServerMonitoringInfo']['mem_usage_mb'],
                                                rxBytes = 0, rxPackets = 0, txBytes = 0, txPackets = 0;

                                            for (var j = 0; j < disksUsage.length; j++) {
                                                diskReadBytes += disksUsage[j]['read_MB'];
                                                diskWriteBytes += disksUsage[j]['write_MB'];
                                            }

                                            for (var k = 0; k < interfacesState.length; k++) {
                                                rxBytes += interfacesState[k]['rx_bytes'];
                                                rxPackets += interfacesState[k]['rx_packets'];
                                                txBytes += interfacesState[k]['tx_bytes'];
                                                txPackets += interfacesState[k]['tx_packets'];
                                            }

                                            chartDataValues.push({
                                                id: server['name'],
                                                cpu_usage_percentage: cpuUsage,
                                                mem_usage_mb: memUsage,
                                                total_disk_read_MB: diskReadBytes,
                                                total_disk_write_MB: diskWriteBytes,
                                                total_disk_rw_MB: diskReadBytes + diskWriteBytes,
                                                total_interface_rx_bytes: rxBytes,
                                                total_interface_rx_packets: rxPackets,
                                                total_interface_tx_bytes: txBytes,
                                                total_interface_tx_packets: txPackets,
                                                total_interface_rt_bytes: rxBytes + txBytes,
                                                size: rxBytes + txBytes,
                                                y: cpuUsage,
                                                x: memUsage,
                                                rawData: response[i]});
                                        }

                                        return {
                                            d: [{
                                                key: 'Servers',
                                                values: chartDataValues
                                            }],
                                            yLbl: '% CPU Usage',
                                            xLbl: 'Memory Usage (in MB)',
                                            forceY: [0, 1],
                                            xLblFormat: d3.format(","),
                                            chartOptions: {tooltipFn: serverTooltipFn, clickFn: onScatterChartClick},
                                            hideLoadingIcon: false
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_GRID_VIEW_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "ServerGridView",
                                app: cowc.APP_CONTRAIL_SM,
                                viewConfig: $.extend(true, {modelConfig: listModelConfig}, viewConfig, {
                                    pagerOptions: {
                                        options: {
                                            pageSize: 25,
                                            pageSizeSelect: [25, 50, 100]
                                        }
                                    }
                                })
                            }
                        ]
                    }
                ]
            }
        }
    };


    function onScatterChartClick(chartConfig) {
        var serverId = chartConfig['id'],
            hashObj = {server_id: serverId};

        layoutHandler.setURLHashParams(hashObj, {p: "setting_sm_servers", merge: false, triggerHashChange: true});
    };

    function serverTooltipFn(server) {
        var tooltipContents = [
            {lbl: '% CPU Usage', keyClass: 'span6', value: d3.format(',')(server['y']), valueClass: 'span6'},
            {lbl: 'Memory Usage', keyClass: 'span6', value: formatBytes(server['x'] * 1024 * 1024), valueClass: 'span6'},
            {lbl: 'Total Network Traffic', keyClass: 'span6', value: formatBytes(server['total_interface_rt_bytes']), valueClass: 'span6'}
        ];

        return tooltipContents;
    };

    return ServerListView;
});
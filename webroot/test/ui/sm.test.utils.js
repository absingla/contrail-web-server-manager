/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-utils',
    'contrail-list-model',
    'contrail-view-model'
], function (cotu, ContrailListModel, ContrailViewModel) {

    this.getRegExForUrl = function (url) {
        var regexUrlMap = {
            '/sm/tags/names' :/\/sm\/tags\/names.*$/,
            '/sm/server/monitoring/config' : /\/sm\/server\/monitoring\/config.*$/,
            '/sm/server/monitoring/info/summary' : /\/sm\/server\/monitoring\/info\/summary.*$/,
            '/sm/server/monitoring/info' : /\/sm\/server\/monitoring\/info.*$/,
            '/sm/server/inventory/info' : /\/sm\/server\/inventory\/info.*$/,
            '/sm/objects/details/cluster' : /\/sm\/objects\/details\/cluster.*$/,
            '/sm/objects/details/server' : /\/sm\/objects\/details\/server.*$/,
            '/sm/objects/details/package' : /\/sm\/objects\/details\/package.*$/,
            '/sm/objects/details/image' : /\/sm\/objects\/details\/image.*$/,
            '/sm/tags/values/' : /\/sm\/tags\/values.*$/,
            '/sm/chassis/ids' : /\/sm\/chassis\/ids.*$/,
            '/sm/objects/cluster' : /\/sm\/objects\/cluster.*$/,
        };

        return regexUrlMap [url];
    };

    this.commonGridDataGenerator = function (viewObj) {
        var viewConfig = cotu.getViewConfigObj(viewObj);
        var modelConfig = cotu.getGridDataSourceWithOnlyRemotes(viewConfig);
        var contrailListModel = new ContrailListModel(modelConfig);
        return contrailListModel;
    };

    this.commonDetailsDataGenerator = function (viewObj, defObj) {
        var viewConfig = cotu.getViewConfigObj(viewObj),
            modelMap = viewObj.modelMap,
            modelData = viewConfig.data,
            ajaxConfig = viewConfig.ajaxConfig,
            dataParser = viewConfig.dataParser,
            contrailViewModel;

        if (modelMap != null && modelMap[viewConfig.modelKey] != null) {
            contrailViewModel = modelMap[viewConfig.modelKey];
            defObj.resolve();
        } else {
            var modelRemoteDataConfig = {
                remote: {
                    ajaxConfig: ajaxConfig,
                    dataParser: dataParser
                }
            };
            contrailViewModel = new ContrailViewModel($.extend(true, {data: modelData}, modelRemoteDataConfig));
        }
        return contrailViewModel;
    }

    this.deleteSizeField = function (dataArr) {
        _.each(dataArr, function (data) {
            if (contrail.checkIfExist(data.size)) {
                delete data.size;
            }
        });
        return dataArr;
    };

    this.deleteFieldsForClusterScatterChart = function (dataArr) {
        _.each(dataArr, function (data) {
            if (contrail.checkIfExist(data.ui_added_parameters.monitoring)) {
                delete data['ui_added_parameters'].monitoring;
            }
        });
        return dataArr;
    };

    this.deleteFieldsForServerScatterChart = function (dataArr) {
        _.each(dataArr, function (data) {
            if (contrail.checkIfExist(data.ui_added_parameters)) {
                delete data.ui_added_parameters;
            }
            if (contrail.checkIfExist(data.roles)) {
                var roles = (contrail.checkIfExist(data.roles)) ? data.roles : [];
                for (var i = 0; i < roles.length; i++) {
                    roles[i] = smwl.getInLowerCase(roles[i]);
                }
                data.roles = roles;
            }
        });
        return dataArr;
    };

    this.deleteFieldsForPackageModel = function(data) {
        if (contrail.checkIfExist(data.errors)) {
            delete data.errors;
        }
        if (contrail.checkIfExist(data.locks)) {
            delete data.locks;
        }
        return data;
    };

    return {
        self                              : self,
        getRegExForUrl                    : getRegExForUrl,
        commonGridDataGenerator           : commonGridDataGenerator,
        commonDetailsDataGenerator        : commonDetailsDataGenerator,
        deleteSizeField                   : deleteSizeField,
        deleteFieldsForClusterScatterChart: deleteFieldsForClusterScatterChart,
        deleteFieldsForServerScatterChart : deleteFieldsForServerScatterChart,
        deleteFieldsForPackageModel       : deleteFieldsForPackageModel
    };

});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

({
    appDir: './',
    dir: './built',
    baseUrl: './',
    paths: {
        'sm-basedir': './',
        'sm-constants': './' + '/common/ui/js/sm.constants',
        'sm-utils': './' + '/common/ui/js/sm.utils',
        'sm-labels': './' + '/common/ui/js/sm.labels',
        'sm-messages': './' + '/common/ui/js/sm.messages',
        'sm-model-config': './' + '/common/ui/js/sm.model.config',
        'sm-grid-config': './' + '/common/ui/js/sm.grid.config',
        'sm-detail-tmpls': './' + '/common/ui/js/sm.detail.tmpls',
        'sm-parsers': './' + '/common/ui/js/sm.parsers',
        'sm-init': './' + '/common/ui/js/sm.init'
    },
    waitSeconds: 0,
    optimizeCss: 'default',
    modules: [],
    fileExclusionRegExp: /(.*node_modules|.*api|.*jobs|.*test)/
})

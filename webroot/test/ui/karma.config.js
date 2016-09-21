/*/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
module.exports = function (config) {
    config.set({
        basePath: __dirname + "/../../../..",
        autoWatch: false,
        frameworks: ["requirejs", "qunit"],
        plugins: [
            "karma-phantomjs-launcher",
            "karma-coverage",
            "karma-qunit",
            "karma-htmlfile-reporter",
            "karma-requirejs",
            "karma-junit-reporter",
            "karma-html2js-preprocessor",
            "karma-firefox-launcher",
            "karma-chrome-launcher",
        ],
        browsers: [
            "PhantomJS"
            //'Firefox',
            //'Chrome'
        ],
        exclude: [
            "**/node_modules/**/*.test.js",
        ],
        //port: 8143,

        proxies : {
            '/sm': 'http://localhost:9090/sm/'
        },
        reporters: ["progress", "html", "coverage", "junit"],
        // the default configuration
        junitReporter: {
            outputDir: __dirname + "/reports/tests/",
            outputFile: "test-results.xml",
            suite: ""
        },
        preprocessors: {
            "*.view": ["html2js"],
            "*.tmpl": ["html2js"]
        },
        htmlReporter: {
            outputFile: __dirname + "/reports/tests/test-results.html"
        },
        coverageReporter: {
            type : "html",
            dir : __dirname + "/reports/coverage/"
        },
        singleRun: true,
        colors: true,
        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,
        logLevel: config.LOG_INFO
    });
};


/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'co-test-utils',
    'co-test-constants',
    'co-test-runner',
    'sm-test-messages',
], function (_, cotu, cotc, cotr, smtm) {
    var testSuiteClass = function (viewObj, suiteConfig) {

        module(cotu.formatTestModuleMessage(smtm.SERVER_LIST_VIEW_CUSTOM_TEST_MODULE));

        var serverListViewCustomTestSuite = cotr.createTestSuite('ServerFormCustomTestSuite');

        /**
         * Custom test cases for Server page.
         */

        var serverFormTestGroup = serverListViewCustomTestSuite.createTestGroup('form');

        //Validate if the text boxes gives error when the input in invalid.
        serverFormTestGroup.registerTest(cotr.test("Add Server form - Error messages validation", function(assert) {
            expect(8);
            $('i.icon-plus').trigger('click');
            var isDone1 = assert.async();
            setTimeout(function(){
                cotu.focusOutElement('input[name="id"]');
                var isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'), "Id is required");
                equal(isPresent, true,
                    "Custom test to assert the error message when Id is not entered");

                cotu.focusOutElement('input[name="password"]');
                isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'),"Please enter a valid password");
                equal(isPresent, true,
                    "Custom test to assert the error message when Password is not entered");

                setElementValueAndInvokeChange('input[name="ipmi_address"]',"1.1.1:1");
                cotu.focusOutElement('input[name="ipmi_address"]');
                isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'),"Please enter a valid ipmi address");
                equal(isPresent, true,
                    "Custom test to assert the error message when IPMI Address is not entered");

                cotu.triggerClickOnElement($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]);
                $('.editable-grid-add-link').trigger('click');

                cotu.focusOutElement('input[name="name"]');
                isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'),"Name is required.");
                equal(isPresent, true,
                    "Custom test to assert the error message when no Name is entered");

                cotu.focusOutElement('input[name="ip_address"]');
                isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'),"Invalid ip address.");
                equal(isPresent, true,
                    "Custom test to assert the error message when no Ip address is entered");

                cotu.focusOutElement('input[name="mac_address"]');
                isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'),"Invalid mac address.");
                equal(isPresent, true,
                    "Custom test to assert the error message when Mac Address is not entered");

                cotu.triggerClickOnElement('#configure-serverbtn1');
                var isDone2 = assert.async();
                setTimeout(function(){
                    var isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('.alert.alert-error')
                   ,"Server should have valid Id, Ipmi Address, Password, Interfaces, Management Interface, Switches");
                    equal(isPresent, true,
                        "Custom test to assert the error message when Saved without valid details");

                    isDone2();
                }, cotc.FORM_ACTIONS_TIMEOUT);


                 $('i.icon-minus').trigger('click');

                cotu.triggerClickOnElement($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]);
                cotu.triggerClickOnElement('.editable-grid-add-link');

                setElementValueAndInvokeChange('input[name="mac_address"]',"GA:AA:AA:AA:AA");
                cotu.focusOutElement('input[name="mac_address"]');

                var isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('span.help-block.red'),"Invalid mac address.");
                equal(isPresent, true,
                    "Custom test to assert the error message when Mac Address is not entered");

                cotu.triggerClickOnElement('i.icon-remove');
                isDone1();
            }, cotc.FORM_ACTIONS_TIMEOUT * 2);
        }, cotc.SEVERITY_MEDIUM));

        //Validate the model and the drop down menu presence.
        serverFormTestGroup.registerTest(cotr.test("Add Server form - Validate model", function(assert) {
            expect(2);

            cotu.triggerClickOnElement('i.icon-plus');
            var isDone1 = assert.async();
            setTimeout(function(){

                var isPresent = cotu.getTextInElement('#s2id_ipmi_interface_dropdown');
                notEqual(isPresent, "","Dropdown should not be empty");

                cotu.triggerClickOnElement($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]);
                cotu.triggerClickOnElement('.editable-grid-add-link');
                var interfaceName = "test";
                setElementValueAndInvokeChange('input[name="name"]', interfaceName);

                cotu.triggerClickOnElement('#ui-accordion-server-header-5');
                var isPresent = cotu.compareIfMessageExists(cotu.getTextInElement('#s2id_management_interface_dropdown'),interfaceName);

                equal(isPresent, true, "Custom test to assert the model when interface value is entered.");
                var isDone2 = assert.async();
                setTimeout(function(){
                    cotu.triggerClickOnElement('#cancelBtn');
                    isDone2();
                }, cotc.FORM_ACTIONS_TIMEOUT);
                isDone1();
                cotu.triggerClickOnElement('i.icon-remove');
            }, cotc.FORM_ACTIONS_TIMEOUT * 2);

        }, cotc.SEVERITY_MEDIUM));

    serverListViewCustomTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});
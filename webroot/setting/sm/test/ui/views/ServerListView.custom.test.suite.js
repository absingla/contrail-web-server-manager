/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'co-test-utils',
    'co-test-constants',
    'co-test-runner',
    'sm-test-messages',
    'sm-test-utils',
], function (_, cotu, cotc, cotr, smtm, smtu) {
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
                smtu.focusOutElement('input[name="id"]');
                var isPresent = $('span.help-block.red').text().trim().indexOf("Id is required") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Id is not entered");

                smtu.focusOutElement('input[name="password"]');
                isPresent = $('span.help-block.red').text().trim().indexOf("Please enter a valid password") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Password is not entered");

                setElementValueAndInvokeChange('input[name="ipmi_address"]',"1.1.1:1");
                smtu.focusOutElement('input[name="ipmi_address"]');
                isPresent = $('span.help-block.red').text().trim().indexOf("Please enter a valid ipmi address") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when IPMI Address is not entered");

                smtu.triggerClickOnElement($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]);
                $('.editable-grid-add-link').trigger('click');

                smtu.focusOutElement('input[name="name"]');
                isPresent = $('span.help-block.red').text().trim().indexOf("Name is required.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when no Name is entered");

                smtu.focusOutElement('input[name="ip_address"]');
                isPresent = $('span.help-block.red').text().trim().indexOf("Invalid ip address.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when no Ip address is entered");

                smtu.focusOutElement('input[name="mac_address"]');
                isPresent = $('span.help-block.red').text().trim().indexOf("Invalid mac address.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Mac Address is not entered");

                smtu.triggerClickOnElement('#configure-serverbtn1');
                var isDone2 = assert.async();
                setTimeout(function(){
                    var isPresent = $('.alert.alert-error').text().trim().
                    indexOf("Server should have valid Id, Ipmi Address, Password, Interfaces, Management Interface, Switches") > -1 ? true:false;
                    equal(isPresent, true,
                        "Custom test to assert the error message when Saved without valid details");

                    isDone2();
                }, cotc.FORM_ACTIONS_TIMEOUT);


                 $('i.icon-minus').trigger('click');

                smtu.triggerClickOnElement($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]);
                smtu.triggerClickOnElement('.editable-grid-add-link');

                setElementValueAndInvokeChange('input[name="mac_address"]',"GA:AA:AA:AA:AA");
                smtu.focusOutElement('input[name="mac_address"]');

                var isPresent = $('span.help-block.red').text().trim().indexOf("Invalid mac address.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Mac Address is not entered");

                smtu.triggerClickOnElement('i.icon-remove');
                isDone1();
            }, cotc.FORM_ACTIONS_TIMEOUT * 2);
        }, cotc.SEVERITY_MEDIUM));

        //Validate the model and the drop down menu presence.
        serverFormTestGroup.registerTest(cotr.test("Add Server form - Validate model", function(assert) {
            expect(2);

            smtu.triggerClickOnElement('i.icon-plus');
            var isDone1 = assert.async();
            setTimeout(function(){

                var isPresent = $('#s2id_ipmi_interface_dropdown').text().trim();
                notEqual(isPresent, "","Dropdown should not be empty");

                smtu.triggerClickOnElement($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]);
                smtu.triggerClickOnElement('.editable-grid-add-link');
                var interfaceName = "test";
                setElementValueAndInvokeChange('input[name="name"]', interfaceName);

                smtu.triggerClickOnElement('#ui-accordion-server-header-5');
                var isPresent = $('#s2id_management_interface_dropdown').text().trim().indexOf(interfaceName) > -1 ? true:false;

                equal(isPresent, true, "Custom test to assert the model when interface value is entered.");
                var isDone2 = assert.async();
                setTimeout(function(){
                    smtu.triggerClickOnElement('#cancelBtn');
                    isDone2();
                }, cotc.FORM_ACTIONS_TIMEOUT);
                isDone1();
                smtu.triggerClickOnElement('i.icon-remove');
            }, cotc.FORM_ACTIONS_TIMEOUT * 2);

        }, cotc.SEVERITY_MEDIUM));

    serverListViewCustomTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});
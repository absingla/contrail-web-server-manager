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

        var viewConfig = cotu.getViewConfigObj(viewObj),
            el = viewObj.el,
            gridData = $(el).data('contrailGrid'),
            gridItems = gridData._dataView.getItems();

        module(cotu.formatTestModuleMessage(smtm.SERVER_LIST_VIEW_CUSTOM_TEST_MODULE, el.id));

        var gridViewCustomTestSuite = cotr.createTestSuite('ServerFormCustomTestSuite');

        /**
         * Grid Body group Custom test cases
         */

        var bodyTestGroup = gridViewCustomTestSuite.createTestGroup('body');

        //Validate if the textboxes gives error when the input in invalid.
        bodyTestGroup.registerTest(cotr.test("Add Server form - Error messages validation", function(assert) {
            expect(8);
            $('i.icon-plus').trigger('click');
            var isDone1 = assert.async();
            setTimeout(function(){
                $('input[name="id"]').focusout();
                var isPresent = $('span.help-block.red').text().trim().indexOf("Id is required") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Id is not entered");

                $('input[name="password"]').focusout();
                isPresent = $('span.help-block.red').text().trim().indexOf("Please enter a valid password") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Password is not entered");

                $($('input[name="ipmi_address"]')).val("1.1.1:1").change();
                $('input[name="ipmi_address"]').focusout();
                isPresent = $('span.help-block.red').text().trim().indexOf("Please enter a valid ipmi address") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when IPMI Address is not entered");

                $($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]).trigger('click');
                $('.editable-grid-add-link').trigger('click');

                $('input[name="name"]').focusout();
                isPresent = $('span.help-block.red').text().trim().indexOf("Name is required.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when no Name is entered");

                $('input[name="ip_address"]').focusout();
                isPresent = $('span.help-block.red').text().trim().indexOf("Invalid ip address.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when no Ip address is entered");

                $('input[name="mac_address"]').focusout();
                isPresent = $('span.help-block.red').text().trim().indexOf("Invalid mac address.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Mac Address is not entered");

                $('#configure-serverbtn1').trigger('click');
                var isDone2 = assert.async();
                setTimeout(function(){
                    var isPresent = $('.alert.alert-error').text().trim().
                    indexOf("Server should have valid Id, Ipmi Address, Password, Interfaces, Management Interface, Switches") > -1 ? true:false;
                    equal(isPresent, true,
                        "Custom test to assert the error message when Saved without valid details");

                    isDone2();
                }, cotc.FORM_ACTIONS_TIMEOUT);


                 $('i.icon-minus').trigger('click');

                $($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]).trigger('click');
                $('.editable-grid-add-link').trigger('click');

                $('input[name="mac_address"]').val("GA:AA:AA:AA:AA").change();
                $('input[name="mac_address"]').focusout();

                var isPresent = $('span.help-block.red').text().trim().indexOf("Invalid mac address.") > -1 ? true:false;
                equal(isPresent, true,
                    "Custom test to assert the error message when Mac Address is not entered");

                $('i.icon-remove').trigger('click');
                isDone1();
            }, cotc.FORM_ACTIONS_TIMEOUT * 2);
        }, cotc.SEVERITY_MEDIUM));

        //Validate the model and the drop down menu presence.
        bodyTestGroup.registerTest(cotr.test("Add Server form - Validate model", function(assert) {
            expect(2);

            $('i.icon-plus').trigger('click');
            var isDone1 = assert.async();
            setTimeout(function(){

                var isPresent = $('#s2id_ipmi_interface_dropdown').text().trim();
                notEqual(isPresent, "","Dropdown should not be empty");

                $($('span.ui-accordion-header-icon.ui-icon.ui-icon-triangle-1-e')[0]).trigger('click');
                $('.editable-grid-add-link').trigger('click');
                var interfaceName = "test";
                $('input[name="name"]').val(interfaceName);
                $('input[name="name"]').change();

                $('#ui-accordion-server-header-5').click();
                var isPresent = $('#s2id_management_interface_dropdown').text().trim().indexOf(interfaceName) > -1 ? true:false;

                equal(isPresent, true, "Custom test to assert the model when interface value is entered.");
                var isDone2 = assert.async();
                setTimeout(function(){
                    $('#cancelBtn').trigger('click');
                    isDone2();
                }, cotc.FORM_ACTIONS_TIMEOUT);
                isDone1();
                $('i.icon-remove').trigger('click');
            }, cotc.FORM_ACTIONS_TIMEOUT * 2);

        }, cotc.SEVERITY_MEDIUM));

    gridViewCustomTestSuite.run(suiteConfig.groups, suiteConfig.severity);

    };

    return testSuiteClass;
});
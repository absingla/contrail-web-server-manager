/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
var cowu, cowc, smwc, smwgc, smwu, smwl, smwv, smwm, smwgc, smwmc, smwru, smwdt, allTestFiles = [];

var smTestKarma = window.__karma__;

for (var file in smTestKarma.files) {
    if (/Test\.js$/.test(file)) {
        allTestFiles.push(file);
    }
}

var depArray = [
    'jquery',
    'underscore',
    'validation',
    'core-constants',
    'core-utils',
    'core-formatters',
    'knockout',
    'core-cache',
    'contrail-common',

    'text!/base/contrail-web-core/webroot/views/contrail-common.view',
    'text!setting/sm/ui/templates/sm.tmpl',
    'web-utils',

    'sm-constants',
    'sm-utils',
    'sm-labels',
    'sm-messages',
    'sm-model-config',
    'sm-grid-config',
    'sm-detail-tmpls',

    'handlebars-utils', 'slickgrid-utils', 'contrail-elements',
    'topology_api', 'chart-utils', 'qe-utils', 'nvd3-plugin', 'd3-utils', 'analyzer-utils', 'dashboard-utils',
    'joint.contrail', 'text', 'contrail-all-8', 'contrail-all-9'
];

require(['jquery', 'knockout'], function ($, Knockout) {
    window.ko = Knockout;
    require(depArray, function ($, _, validation, CoreConstants, CoreUtils, CoreFormatters, Knockout, Cache, cc,
                                ccView, smView, wu,
                                SMConstants, SMUtils, Labels, Messages, DeafultModelConfig, GridConfig, DetailTemplates) {
        cowc = new CoreConstants();
        cowu = new CoreUtils();
        cowf = new CoreFormatters();
        cowch = new Cache();
        kbValidation = validation;
        initBackboneValidation(_);
        initCustomKOBindings(Knockout);
        initDomEvents();

        smwc = new SMConstants();
        smwu = new SMUtils();
        smwl = new Labels();
        smwm = new Messages();
        smwmc = new DeafultModelConfig();
        smwgc = new GridConfig();
        smwdt = new DetailTemplates();

        $('body').append('<div id="content-container"></div>');
        $("body").append(ccView);
        $("body").append(smView);

        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/bootstrap/css/bootstrap.min.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/bootstrap/css/bootstrap-responsive.min.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/jquery-ui/css/jquery-ui.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail.jquery.ui.css"/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/font-awesome/css/font-awesome.min.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/jquery/css/jquery.steps.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/nvd3/css/nv.d3.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/select2/styles/select2.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/datetimepicker/styles/jquery.datetimepicker.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/slickgrid/styles/slick.grid.css/>');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/assets/jquery-contextMenu/css/jquery.contextMenu.css/>');

        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail-all.css" />');

        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail.layout.css" />');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail.elements.css" />');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail.responsive.css" />');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail.custom.css" />');
        $("body").append('<link rel="stylesheet" href="/base/contrail-web-core/webroot/css/contrail.font.css" />');

        requirejs(['co-test-mockdata', 'co-test-utils'], function (CoreSlickGridMockData, TestUtils) {
            var fakeServer = sinon.fakeServer.create();
            fakeServer.respondWith(
                "GET", TestUtils.getRegExForUrl('/api/service/networking/web-server-info'),
                [200, {"Content-Type": "application/json"},
                    JSON.stringify(CoreSlickGridMockData.webServerInfoMockData)]);
        });
        requirejs(['common/ui/js/sm.render', 'contrail-layout'], function (SMRenderUtils) {
            smwru = new SMRenderUtils();
            smInitComplete = true;
            require(allTestFiles, function () {
                requirejs.config({
                    // dynamically load all test files
                    deps: allTestFiles,
                    callback: window.__karma__.start
                });
            });
        });

    });
});


function initBackboneValidation(_) {
    _.extend(kbValidation.callbacks, {
        valid: function (view, attr, selector) {
            /*
             var $el = $(view.modalElementId).find('[name=' + attr + ']'),
             $group = $el.closest('.form-element');

             $group.removeClass('has-error');
             $group.find('.help-block').html('').addClass('hidden');
             */
        },
        invalid: function (view, attr, error, selector, validation) {
            var model = view.model;
            model.validateAttr(attr, validation);
            /*
             var $el = $(view.modalElementId).find('[name=' + attr + ']'),
             $group = $el.closest('.form-element');
             $group.addClass('has-error');
             $group.find('.help-block').html(error).removeClass('hidden');
             */
        }
    });
};

function initCustomKOBindings(Knockout) {
    Knockout.bindingHandlers.contrailDropdown = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueObj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                dropDown = $(element).contrailDropdown(valueObj).data('contrailDropdown');

            if (allBindings.value) {
                var value = Knockout.utils.unwrapObservable(allBindings.value);
                if (typeof value === 'function') {
                    dropDown.value(value());
                } else {
                    dropDown.value(value);
                }
            }
            else {
                dropDown.value('');
            }

            Knockout.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            $(element).trigger('change');
        }
    };

    Knockout.bindingHandlers.contrailMultiselect = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueObj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey,
                multiselect = $(element).contrailMultiselect(valueObj).data('contrailMultiselect');

            if (allBindings.value) {
                var value = Knockout.utils.unwrapObservable(allBindings.value);
                if (typeof value === 'function') {
                    multiselect.value(value());
                } else {
                    multiselect.value(value);
                }
            }

            Knockout.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            $(element).trigger('change');
        }
    };

    Knockout.bindingHandlers.select2 = {
        init: function (element, valueAccessor) {
            var options = Knockout.toJS(valueAccessor()) || {};
            setTimeout(function () {
                $(element).select2(options);
            }, 0);
        }
    };

    var updateSelect2 = function (element) {
        var el = $(element);
        if (el.data('select2')) {
            el.trigger('change');
        }
    }
    var updateSelect2Options = Knockout.bindingHandlers['options']['update'];

    Knockout.bindingHandlers['options']['update'] = function (element) {
        var r = updateSelect2Options.apply(null, arguments);
        updateSelect2(element);
        return r;
    };

    var updateSelect2SelectedOptions = Knockout.bindingHandlers['selectedOptions']['update'];

    Knockout.bindingHandlers['selectedOptions']['update'] = function (element) {
        var r = updateSelect2SelectedOptions.apply(null, arguments);
        updateSelect2(element);
        return r;
    };
};

function initDomEvents() {
    $(document)
        .off('click', '.group-detail-action-item')
        .on('click', '.group-detail-action-item', function (event) {
            if (!$(this).hasClass('selected')) {
                var thisParent = $(this).parents('.group-detail-container'),
                    newSelectedView = $(this).data('view');

                thisParent.find('.group-detail-item').hide();
                thisParent.find('.group-detail-' + newSelectedView).show();

                thisParent.find('.group-detail-action-item').removeClass('selected');
                $(this).addClass('selected');

                if (contrail.checkIfExist($(this).parents('.slick-row-detail').data('cgrid'))) {
                    $(this).parents('.contrail-grid').data('contrailGrid').adjustDetailRowHeight($(this).parents('.slick-row-detail').data('cgrid'));
                }
            }
        });

    $(document)
        .off('click', '.input-type-toggle-action')
        .on('click', '.input-type-toggle-action', function (event) {
            var input = $(this).parent().find('input');
            if (input.prop('type') == 'text') {
                input.prop('type', 'password');
                $(this).removeClass('blue');
            } else {
                input.prop('type', 'text');
                $(this).addClass('blue');
            }
        });
};
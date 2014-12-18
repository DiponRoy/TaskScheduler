define('config',
    ['jquery'],
    function($) {

        /*bootstrap tooltip*/
        $(function() {
            $("body").tooltip({ selector: '[data-toggle="tooltip"]' });
        });

        /*block UI*/
        $(function() {
            $.blockUI.defaults.overlayCSS.opacity = 0;
            $.blockUI.defaults.message = '';
        });

        /*Ko Templates*/
        $(function() {
            infuser.defaults.templateUrl = "/Templates";
            infuser.defaults.templatePrefix = "_";
            infuser.defaults.templateSuffix = ".tmpl.html";
        });

        /*section translate*/
        var translate = function (sectionToShow, sectionToHide) {
            $(sectionToHide).fadeOut().hide();
            $(sectionToShow).fadeOut().show();
        };

        return {
            translate: translate
        };
    });

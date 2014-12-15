define('config',
    ['jquery'],
    function($) {

        /*bootstrap tooltip*/
        $("body").tooltip({ selector: '[data-toggle="tooltip"]' });

        /*block UI*/
        $.blockUI.defaults.overlayCSS.opacity = 0;
        $.blockUI.defaults.message = '';

        /*section translate*/
        var translate = function (sectionToShow, sectionToHide) {
            $(sectionToHide).fadeOut().hide();
            $(sectionToShow).fadeOut().show();
        };

        return {
            translate: translate
        };
    });

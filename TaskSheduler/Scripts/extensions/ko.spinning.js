﻿
/*http: //fgnass.github.io/spin.js/*/

(function (ko, $, spinner) {

    var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };
    
    ko.bindingHandlers.spinning = {

        init: function (element, valueAccessor, allBindingsAccessor) {
        },

        update: function (element, valueAccessor) {
            var isBusy = ko.utils.unwrapObservable(valueAccessor());
            if (isBusy) {
                new Spinner(opts).spin(element);
                $(element).block(); 
            }
            else {
                $(element).find('div.spinner:first').fadeOut('100').remove();
                $(element).unblock(); 
            }
        }
    };

})(ko, jQuery, Spinner);
(function() {
    var root = this;

    function defineJslibraries() {
        define('jquery', [], function() { return root.jQuery; });
        define('json', [], function() { return root.JSON; });
        define('moment', [], function() { return root.moment; });
        define('amplify', [], function() { return root.amplify; });
        define('ko', [], function() { return root.ko; });
    }

    function loadDefinedModules() {
        require.config({
            baseUrl: "/Scripts/app"
        });
    }

    function boot() {
        require(['jquery', 'ko', 'moment'], function($, ko, moment) {


            function eventListVm() {

                var self = this;

                self.items = ko.observableArray([
                    {
                        title: 'All Day Event',
                        start: '2014-12-20'
                    }
                ]);
                self.calendarViewModel = new ko.fullCalendar.viewModel({
                    events: self.items,
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: true,
                    eventLimit: true,
                });

                self.click = function() {

                };

            }

            var vm = new eventListVm();
            ko.applyBindings(vm);

        });
    }

    defineJslibraries();
    loadDefinedModules();
    boot();
})();
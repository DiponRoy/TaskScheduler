(function () {
    var root = this;

    function defineJslibraries() {
        define('jquery', [], function () { return root.jQuery; });
        define('json', [], function () { return root.JSON; });
        define('moment', [], function () { return root.moment; });
        define('amplify', [], function () { return root.amplify; });
        define('ko', [], function () { return root.ko; });
    }

    function loadDefinedModules() {
        require.config({
            baseUrl: "/Scripts/app"
        });
    }

    function boot() {
        require(['jquery', 'ko', 'moment'], function ($, ko, moment) {

            //$('#calendar').fullCalendar({
            //    defaultDate: '2014-12-12',
            //    editable: true,
            //    eventLimit: true, // allow "more" link when too many events
            //    events: [
            //        {
            //            title: 'All Day Event',
            //            start: '2014-12-01'
            //        },
            //        {
            //            title: 'Long Event',
            //            start: '2014-12-07',
            //            end: '2014-12-10'
            //        },
            //        {
            //            id: 999,
            //            title: 'Repeating Event',
            //            start: '2014-12-09T16:00:00'
            //        },
            //        {
            //            id: 999,
            //            title: 'Repeating Event',
            //            start: '2014-12-16T16:00:00'
            //        },
            //        {
            //            title: 'Conference',
            //            start: '2014-12-12',
            //            end: '2014-12-13'
            //        },
            //        {
            //            title: 'Meeting',
            //            start: '2014-12-12T10:30:00',
            //            end: '2014-12-12T12:30:00'
            //        },
            //        {
            //            title: 'Lunch',
            //            start: '2014-12-12T12:00:00'
            //        },
            //        {
            //            title: 'Meeting',
            //            start: '2014-12-12T14:30:00'
            //        },
            //        {
            //            title: 'Happy Hour',
            //            start: '2014-12-12T17:30:00'
            //        },
            //        {
            //            title: 'Dinner',
            //            start: '2014-12-12T20:00:00'
            //        },
            //        {
            //            title: 'Birthday Party',
            //            start: '2014-12-13T07:00:00'
            //        },
            //        {
            //            title: 'Click for Google',
            //            url: 'http://google.com/',
            //            start: '2014-12-28'
            //        }
            //    ]
            //});



            function eventListVm() {

                var self = this;

                self.items = ko.observableArray([
                    {
                        title: 'All Day Event',
                        start: '2014-12-01'
                    },
                    {
                        title: 'Long Event',
                        start: '2014-12-07',
                        end: '2014-12-10'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2014-12-09T16:00:00'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2014-12-16T16:00:00'
                    },
                    {
                        title: 'Conference',
                        start: '2014-12-12',
                        end: '2014-12-13'
                    },
                    {
                        title: 'Meeting',
                        start: '2014-12-12T10:30:00',
                        end: '2014-12-12T12:30:00'
                    },
                    {
                        title: 'Lunch',
                        start: '2014-12-12T12:00:00'
                    },
                    {
                        title: 'Meeting',
                        start: '2014-12-12T14:30:00'
                    },
                    {
                        title: 'Happy Hour',
                        start: '2014-12-12T17:30:00'
                    },
                    {
                        title: 'Dinner',
                        start: '2014-12-12T20:00:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2014-12-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2014-12-28'
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

                self.addNew = function () {
                    alert('hi');
                    var item = [];
                    items.push({
                        title: 'All Day Event',
                        start: '2014-12-01'
                    });

                    self.calendarViewModel = new ko.fullCalendar.viewModel({
                        events: item,
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        editable: true,
                        eventLimit: true,
                    });
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
//<div data-bind="fullCalendar: calendarViewModel"> </div>
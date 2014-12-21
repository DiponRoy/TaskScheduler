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
        require(['jquery', 'ko', 'moment'],
            function($, ko, moment, eventService) {
                
                /* initialize the external events
-----------------------------------------------------------------*/
                var i = 0;
                $('#external-events .fc-event').each(function () {

                    // store data so the calendar knows to render an event upon drop
                    $(this).data('event', {
                        title: $.trim($(this).text()), // use the element's text as the event title
                        stick: true, // maintain when user navigates (see docs on the renderEvent method)
                        id: ++i
                    });

                    // make the event draggable using jQuery UI
                    $(this).draggable({
                        zIndex: 999,
                        revert: true,      // will cause the event to go back to its
                        revertDuration: 0  //  original position after the drag
                    });

                });


                /* initialize the calendar
                -----------------------------------------------------------------*/

                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: true,
                    droppable: true, // this allows things to be dropped onto the calendar
                    
                    drop: function (date, jsEvent, ui) {

                        var self = this;
                        alert('datetime: ' + moment(date).format('llll'));
                        alert('event id: ' + $(this).text());
                        
                        // is the "remove after drop" checkbox checked?
                        if ($('#drop-remove').is(':checked')) {
                            // if so, remove the element from the "Draggable Events" list
                            $(this).remove();
                        }
                    },
                    
                    eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                        alert('schedule: ' + event.id);
                        alert('date: ' + delta.asDays());
                        if (!confirm("Are you sure about this change?")) {
                            revertFunc();
                        }
                    },
                    
                    /*clicked on scheduled event*/
                    eventClick: function(calEvent, jsEvent, view) {
                        alert('schedule: ' + calEvent.id);
                    }
                });



        });
    }

    defineJslibraries();
    loadDefinedModules();
    boot();
})();
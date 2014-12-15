(function (ko, moment) {
    
    ko.fullCalendar = {
        // Defines a view model class you can use to populate a calendar
        viewModel: function (config) {
            this.events = config.events;
            this.header = config.header;
            this.editable = false || config.editable;
            this.viewDate = config.viewDate || ko.observable(moment());
            this.eventLimit = false || config.eventLimit;
        }
    };
    
    // The "fullCalendar" binding
    ko.bindingHandlers.fullCalendar = {
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor) {
            var viewModel = viewModelAccessor();
            element.innerHTML = "";

            $(element).fullCalendar({
                events: ko.utils.unwrapObservable(viewModel.events),
                header: viewModel.header,
                editable: viewModel.editable,
                eventLimit: viewModel.eventLimit
            });
            $(element).fullCalendar('gotoDate', ko.utils.unwrapObservable(viewModel.viewDate));
        }
    };
    
})(ko, moment);
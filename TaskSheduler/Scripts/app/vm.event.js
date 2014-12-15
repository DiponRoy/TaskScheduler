/*model*/
define('model.event',
    ['ko'],
    function(ko) {
        var event = function() {
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.deviceId = ko.observable();
            self.description = ko.observable();
            self.status = ko.observable();
            
            self.toPostObj = function() {
                return {
                    id: self.id(),
                    name: self.name(),
                    deviceId: self.deviceId(),
                    description: self.description(),
                    status: self.status()
                };
            };

            self.load = function(obj) {
                self.id(obj.id);
                self.name(obj.name);
                self.deviceId(obj.deviceId);
                self.description(obj.description);
                self.status(obj.status);
            };

            self.reset = function () {
                self.id('');
                self.name('');
                self.deviceId('');
                self.description('');
                self.status('');
            };
        };
        return event;
    });


/*createVm*/
define('vm.event.create',
    ['notify', 'ko', 'model.event', 'vm.trainee', 'dataservice.event', 'dataservice.device'],
    function(notify, ko, model, traineeVm, eventService, deviceService) {
        var vm = function() {
            var self = this;
            self.callback = null;

            self.allDevice = ko.observableArray([]);
            self.traineeVm = traineeVm;


            self.model = new model();
            self.errors = ko.validation.group(self.model);
            self.isBusy = ko.observable(false);

            self.create = function() {
                if (self.errors().length > 0) {
                    self.errors.showAllMessages();
                    return;
                }

                self.isBusy(true);
                eventService.create({
                    success: function(data) {
                        self.reset();
                        self.isBusy(false);
                        self.traineeVm.init(data.id);
                        self.callback(data);
                    },
                    error: function() {
                        self.isBusy(false);
                        notify.error('error to create event.');
                    }
                }, self.model.toPostObj());
            };

            self.reset = function() {
                self.model.reset();
                self.model.status(0);
                self.errors.showAllMessages(false);
            };

            self.init = function() {
                self.allDevice([]);
                self.reset();
                deviceService.all({
                    success: function(data) {
                        self.allDevice(data);
                    },
                    error: function() {
                        notify.error('error to load device.');
                    }
                });
            };
        };

        return vm;
    });


/*updateVm*/
define('vm.event.update',
    ['jquery', 'notify', 'ko', 'model.event', 'vm.trainee', 'dataservice.event', 'dataservice.device'],
    function ($, notify, ko, model, traineeVm, eventService, deviceService) {
        var vm = function() {
            var self = this;
            self.callback = null;

            self.allDevice = ko.observableArray([]);
            self.traineeVm = traineeVm;

            self.model = new model();
            self.allStatus = ko.observableArray([
                { text: 'Active', value: 0 },
                { text: 'Inactive', value: 1 }
            ]);
            self.errors = ko.validation.group(self.model);
            self.isBusy = ko.observable(false);

            self.load = function(id) {
                self.isBusy(true);
                eventService.single({
                    success: function(data) {
                        self.model.load(data);
                        self.errors.showAllMessages(false);
                        self.isBusy(false);
                    },
                    error: function() {
                        self.isBusy(false);
                        notify.error('error to load event.');
                    }
                }, id);
            };

            self.update = function() {
                if (self.errors().length > 0) {
                    self.errors.showAllMessages();
                    return;
                }
                self.isBusy(true);
                eventService.update({
                    success: function(data) {
                        self.reset();
                        self.callback(data);
                    },
                    error: function() {
                        notify.error('error to update event.');
                        self.isBusy(false);
                    }
                }, self.model.toPostObj());
            };

            self.reset = function() {
                self.load(self.model.id());
            };

            self.init = function(id) {
                self.model.reset();
                self.errors.showAllMessages(false);
                self.traineeVm.init(id);
                var calls = [];
                calls.push(
                    deviceService.all({
                        success: function(data) {
                            self.allDevice(data);
                        },
                        error: function() {
                            notify.error('error to load device.');
                        }
                    })
                );
                $.when.apply(this, calls).done(function() {
                    self.load(id);
                });
            };

        };
        return vm;
    });


/*list Vm*/
define('vm.event.list',
    ['notify', 'ko', 'dataservice.event'],
    function(notify, ko, eventService) {
        var vm = function() {
            var self = this;
            self.callback = null;
            self.models = ko.observableArray([]);
            self.isBusy = ko.observable(false);

            self.remove = function(obj) {
                eventService.remove({
                    success: function(data) {
                        self.callback(obj);
                    },
                    error: function() {
                        notify.error('error to load event.');
                    }
                }, obj.id);
            };

            self.load = function() {
                self.models([]);
                self.isBusy(true);
                eventService.all({
                    success: function(data) {
                        self.isBusy(false);
                        self.models(data);
                    },
                    error: function() {
                        self.isBusy(false);
                        notify.error('error to load events.');
                    }
                });
            };
        };
        return vm;
    });


define('vm.event',
    [
        'config',
        'notify',
        'vm.event.create',
        'vm.event.update',
        'vm.event.list'
    ],
    function(config, notify, createVm, updateVm, listVm) {

        var sections = {
            create: '#sectionCreate',
            update: '#sectionUpdate',
            list: '#sectionList'
        };

        var self = this;

        self.createVm = new createVm();
        self.updateVm = new updateVm();
        self.listVm = new listVm();

        /*view model callbacks*/
        self.createVm.callback = function(model) {
            self.listVm.load();
            notify.success('Event created successfully.');
        };
        self.updateVm.callback = function(model) {
            self.listVm.load();
            notify.success('Event updated successfully.');
        };
        self.listVm.callback = function(model) {
            self.listVm.models.remove(model);
            notify.success('Event deleted successfully.');
        };

        /*sections done*/
        self.createDone = function() {
            config.translate(sections.list, sections.create);
        };
        self.updateDone = function() {
            config.translate(sections.list, sections.update);
        };

        /*list actions*/
        self.showTocreate = function() {
            self.createVm.init();
            config.translate(sections.create, sections.list);
        };
        self.showToUpdate = function(item) {
            self.updateVm.init(item.id);
            config.translate(sections.update, sections.list);
        };
        self.confirmToDelete = function(item) {
            notify.confirm('Do you want to delete the event?', function(confirmed) {
                if (confirmed) {
                    self.listVm.remove(item);
                }
            });
        };

        self.init = function() {
            self.listVm.load();
        };

        return self;
    });
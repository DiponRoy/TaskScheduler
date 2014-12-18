/*model*/
define('model.trainee',
    ['ko'],
    function(ko) {
        var trainee = function() {
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.contactNo = ko.observable();
            self.email = ko.observable();
            self.eventId = ko.observable();
            self.status = ko.observable();

            self.toPostObj = function() {
                return {
                    id: self.id(),
                    name: self.name(),
                    contactNo: self.contactNo(),
                    email: self.email(),
                    eventId: self.eventId(),
                    status: self.status()
                };
            };

            self.load = function(obj) {
                self.id(obj.id);
                self.name(obj.name);
                self.contactNo(obj.contactNo);
                self.email(obj.email);
                self.eventId(obj.eventId);
                self.status(obj.status);
            };

            self.reset = function () {
                self.id('');
                self.name('');
                self.contactNo('');
                self.email('');
                self.eventId('');
                self.status('');
            };
        };
        return trainee;
    });


/*createVm*/
define('vm.trainee.create',
    ['notify', 'jquery', 'ko', 'model.trainee', 'dataservice.trainee'],
    function(notify, $, ko, model, service) {
        var vm = function() {
            var self = this;
            self.callback = null;

            self.model = new model();
            self.errors = ko.validation.group(self.model);
            self.isBusy = ko.observable(false);
            self.showModal = ko.observable(false);

            self.create = function() {
                if (self.errors().length > 0) {
                    self.errors.showAllMessages();
                    return;
                }

                self.isBusy(true);
                service.create({
                    success: function(data) {
                        self.reset();
                        self.isBusy(false);
                        self.callback(data);
                        self.closeModal();
                    },
                    error: function() {
                        self.isBusy(false);
                        notify.error('error to create trainee.');
                    }
                }, self.model.toPostObj());
            };

            self.reset = function(id) {
                self.model.reset('');
                self.model.eventId(id);
                self.model.status(0);
                self.errors.showAllMessages(false);
            };
            
            self.closeModal = function () {
                self.showModal(false);
            };

            self.init = function (id) {
                self.reset(id);
                self.showModal(true);
            };
        };

        return vm;
    });


/*updateVm*/
define('vm.trainee.update',
    ['jquery', 'ko', 'model.trainee', 'dataservice.trainee'],
    function($, ko, model, service) {
        var vm = function() {
            var self = this;
            self.callback = null;

            self.model = new model();
            self.allStatus = ko.observableArray([
                { text: 'Active', value: 0 },
                { text: 'Inactive', value: 1 }
            ]);
            self.errors = ko.validation.group(self.model);
            self.isBusy = ko.observable(false);
            self.showModal = ko.observable(false);

            self.load = function(id) {
                self.isBusy(true);
                service.single({
                    success: function(data) {
                        self.model.load(data);
                        self.errors.showAllMessages(false);
                        self.isBusy(false);
                    },
                    error: function() {
                        self.isBusy(false);
                        notify.error('error to load trainee.');
                    }
                }, id);
            };

            self.update = function() {
                if (self.errors().length > 0) {
                    self.errors.showAllMessages();
                    return;
                }
                self.isBusy(true);
                service.update({
                    success: function(data) {
                        self.reset();
                        self.callback(data);
                        self.closeModal();
                    },
                    error: function() {
                        notify.error('error to update trainee.');
                        self.isBusy(false);
                    }
                }, self.model.toPostObj());
            };

            self.reset = function() {
                self.load(self.model.id());
            };

            self.closeModal = function() {
                self.showModal(false);
            };
            self.init = function() {
                self.model.reset();
                self.errors.showAllMessages(false);
                self.showModal(true);
            };

        };
        return vm;
    });


/*list Vm*/
define('vm.trainee.list',
    ['notify', 'ko', 'dataservice.trainee'],
    function(notify, ko, service) {
        var vm = function() {
            var self = this;
            self.callback = null;
            self.models = ko.observableArray([]);
            self.isBusy = ko.observable(false);

            self.remove = function(obj) {
                service.remove({
                    success: function(data) {
                        self.callback(obj);
                    },
                    error: function() {
                        notify.error('error to load trainee.');
                    }
                }, obj.id);
            };

            self.load = function(id) {
                self.models([]);
                self.isBusy(true);
                service.all({
                    success: function (data) {
                        self.isBusy(false);
                        self.models(data);
                    },
                    error: function() {
                        self.isBusy(false);
                        notify.error('error to load trainees.');
                    }
                }, id);
            };
        };
        return vm;
    });


define('vm.trainee',
    [
        'ko',
        'notify',
        'vm.trainee.create',
        'vm.trainee.update',
        'vm.trainee.list'
    ],
    function (ko, notify, createVm, updateVm, listVm) {

        var vm = function() {
            var self = this;
            self.eventId = ko.observable();
            self.createVm = new createVm();
            self.updateVm = new updateVm();
            self.listVm = new listVm();

            /*view model callbacks*/
            self.createVm.callback = function(model) {
                self.listVm.load(self.eventId());
                notify.success('Trainee created successfully.');
            };
            self.updateVm.callback = function(model) {
                self.listVm.load(self.eventId());
                notify.success('Trainee updated successfully.');
            };
            self.listVm.callback = function(model) {
                self.listVm.models.remove(model);
                notify.success('Trainee deleted successfully.');
            };

            /*list actions*/
            self.showToCreate = function () {
                self.createVm.init(self.eventId());
            };
            self.showToUpdate = function(item) {
                self.updateVm.init();
                self.updateVm.load(item.id);
            };
            self.confirmToDelete = function(item) {
                notify.confirm('Do you want to delete the trainee?', function(confirmed) {
                    if (confirmed) {
                        self.listVm.remove(item);
                    }
                });
            };

            self.init = function(eventId) {
                self.eventId(eventId);
                self.listVm.load(eventId);
            };
        };

        return vm;
    });
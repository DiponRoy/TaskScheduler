/*model*/
define('model.device',
    ['jquery', 'ko'],
    function($, ko) {
        var device = function() {
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.description = ko.observable();
            self.status = ko.observable();
            self.addedDateTime = ko.observable();
            self.addedBy = ko.observable();
            self.updatedDateTime = ko.observable();
            self.updatedBy = ko.observable();

            self.toPostObj = function() {
                return {
                    id: self.id(),
                    name: self.name(),
                    description: self.description(),
                    status: self.status()
                };
            };

            self.load = function(obj) {
                self.id(obj.id);
                self.name(obj.name);
                self.description(obj.description);
                self.status(obj.status);
            };

            self.reset = function() {
                self.name('');
                self.description('');
                self.status('');
            };
        };
        return device;
    });


/*createVm*/
define('vm.device.create',
    ['notify', 'jquery','ko', 'model.device', 'dataservice.device'],
    function(notify, $, ko, model, service) {
        var vm = function() {
            var self = this;
            self.callback = null;

            self.model = new model();
            self.errors = ko.validation.group(self.model);
            self.isBusy = ko.observable(false);

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
                    },
                    error: function () {
                        self.isBusy(false);
                        notify.error('error to create device.');
                    }
                }, self.model.toPostObj());
            };

            self.reset = function() {
                self.model.reset();
                self.model.status(0);
                self.errors.showAllMessages(false);
            };

            self.init = function() {
                self.reset();
            };
        };

        return vm;
    });


/*updateVm*/
define('vm.device.update',
    ['jquery', 'ko', 'model.device', 'dataservice.device'],
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

            self.load = function (id) {
                self.isBusy(true);
                service.single({
                    success: function(data) {
                        self.model.load(data);
                        self.errors.showAllMessages(false);
                        self.isBusy(false);
                    },
                    error: function () {
                        self.isBusy(false);
                        notify.error('error to load device.');
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
                    },
                    error: function() {
                        notify.error('error to update device.');
                        self.isBusy(false);
                    }
                }, self.model.toPostObj());
            };

            self.reset = function() {
                self.load(self.model.id());
            };

            self.init = function() {
                self.model.reset();
                self.errors.showAllMessages(false);
            };

        };
        return vm;
    });


/*list Vm*/
define('vm.device.list',
    ['notify', 'ko', 'dataservice.device'],
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
                        notify.error('error to load device.');
                    }
                }, obj.id);
            };

            self.load = function() {
                self.models([]);
                self.isBusy(true);
                service.all({
                    success: function (data) {
                        self.isBusy(false);
                        self.models(data);
                    },
                    error: function () {
                        self.isBusy(false);
                        notify.error('error to load devices.');
                    }
                });
            };
        };
        return vm;
    });


define('vm.device',
    [
        'config',
        'notify',
        'vm.device.create',
        'vm.device.update',
        'vm.device.list'
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
            notify.success('Device created successfully.');
        };
        self.updateVm.callback = function(model) {
            self.listVm.load();
            notify.success('Device updated successfully.');
        };
        self.listVm.callback = function (model) {
            self.listVm.models.remove(model);
            notify.success('Device deleted successfully.');
        };

        /*sections done*/
        self.createDone = function() {
            config.translate(sections.list, sections.create);
        };
        self.updateDone = function() {
            config.translate(sections.list, sections.update);
        };

        /*list actions*/
        self.showTocreate = function () {
            self.createVm.init();
            config.translate(sections.create, sections.list);
        };
        self.showToUpdate = function (item) {
            self.updateVm.init();
            self.updateVm.load(item.id);
            config.translate(sections.update, sections.list);
        };
        self.confirmToDelete = function(item) {
            notify.confirm('Do you want to delete the device?', function(confirmed) {
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
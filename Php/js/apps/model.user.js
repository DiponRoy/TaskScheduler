/*model*/
define('model.user',
    ['jquery', 'ko'],
    function($, ko) {
        var user = function() {
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.contactNo = ko.observable();
            self.email = ko.observable();
            self.password = ko.observable();
            self.status = ko.observable();
            self.addedDateTime = ko.observable();
            self.addedBy = ko.observable();
            self.updatedDateTime = ko.observable();
            self.updatedBy = ko.observable();

            self.toPostObj = function() {
                return {
                    id: self.id(),
                    name: self.name(),
                    contactNo: self.contactNo(),
                    email: self.email(),
                    password: self.password(),
                    status: self.status()
                };
            };

            self.load = function(obj) {
                self.id(obj.id);
                self.name(obj.name);
                self.contactNo(obj.contactNo);
                self.email(obj.email);
                self.password(obj.password);
                self.status(obj.status);
            };

            self.reset = function () {
                self.id('');
                self.name('');
                self.contactNo('');
                self.email('');
                self.password('');
                self.status('');
            };
        };
        return user;
    });
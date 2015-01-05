define('vm.login',
    [
        'config',
        'notify',
        'ko',
        'model.user',
        'dataservice.user'
    ],
    function(config, notify, ko, model, service) {

        var self = this;
        self.model = new model();
        self.errors = ko.validation.group(self.model);
        self.isBusy = ko.observable(false);

        self.signIn = function() {
            if (self.errors().length > 0) {
                self.errors.showAllMessages();
                return;
            }

            self.isBusy(true);
            service.has({
                success: function(data) {
                    self.isBusy(false);
                    self.reset();
                    notify.success(data);
                },
                error: function() {
                    self.isBusy(false);
                    notify.error('error to create user.');
                }
            }, self.model.toPostObj());
        };

        self.reset = function() {
            self.model.email('');
            self.model.password('');
            self.errors.showAllMessages(false);
        };

        return self;
    });




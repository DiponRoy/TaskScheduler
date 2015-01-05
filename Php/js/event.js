(function() {
    var root = this;

    function defineJslibraries() {
        define('jquery', [], function() { return root.jQuery; });
        define('json', [], function() { return root.JSON; });
        define('moment', [], function() { return root.moment; });
        define('amplify', [], function() { return root.amplify; });
        define('ko', [], function () { return root.ko; });
        define('toastr', [], function () { return root.toastr; });
        define('bootbox', [], function () { return root.bootbox; });
    }

    function loadDefinedModules() {
        require.config({
            baseUrl: "../js/apps"
        });
    }

    function boot() {
            require(['ko','vm.event'],
            function (ko, viewModel) {
                ko.applyBindings(viewModel);
                viewModel.init();
            });
    }

    defineJslibraries();
    loadDefinedModules();
    boot();
})();
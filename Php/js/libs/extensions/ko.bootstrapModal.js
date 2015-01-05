ko.bindingHandlers.bsModal = {
    init: function (element, valueAccessor) {
        $(element).modal({ backdrop: 'static', keyboard: true, show: false });
    },
    update: function (element, valueAccessor) {
        var value = valueAccessor();
        if (ko.utils.unwrapObservable(value)) {
            $(element).modal('show');
            $("input", element).focus();
        }
        else {
            $(element).modal('hide');
        }
    }
};
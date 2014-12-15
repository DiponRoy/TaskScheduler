(function($, _, entitySet) {
    $.mockjax({
        url: "/device/all",
        responseTime: 500,
        response: function(settings) {
            var all = entitySet.devices.get();
            this.responseText = _.sortBy(all, function(obj) { return obj.updatedDateTime; }).reverse();
        }
    });

    $.mockjax({
        url: "/device/get",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.devices.single(settings.data.id);
        }
    });

    $.mockjax({
        url: "/device/post",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.devices.add(settings.data);
        }
    });

    $.mockjax({
        url: "/device/put",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.devices.replace(settings.data.id, settings.data);
        }
    });

    $.mockjax({
        url: "/device/delete",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.devices.remove(settings.data.id);
        }
    });
} (jQuery, _, datacontext));


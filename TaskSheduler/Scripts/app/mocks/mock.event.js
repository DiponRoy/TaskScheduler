(function($, _, entitySet) {
    $.mockjax({
        url: "/event/all",
        responseTime: 500,
        response: function(settings) {
            var data = entitySet.events.get();
            for (var i = 0; i < data.length; i++) {
                var device = entitySet.devices.single(data[i].deviceId);
                data[i].deviceName = device.name;
                data[i].deviceDescription = device.description;
            }
            this.responseText = _.sortBy(data, function (obj) { return obj.updatedDateTime; }).reverse();
        }
    });

    $.mockjax({
        url: "/event/get",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.events.single(settings.data.id);
        }
    });

    $.mockjax({
        url: "/event/post",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.events.add(settings.data);
        }
    });

    $.mockjax({
        url: "/event/put",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.events.replace(settings.data.id, settings.data);
        }
    });

    $.mockjax({
        url: "/event/delete",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.events.remove(settings.data.id);
        }
    });
} (jQuery, _, datacontext));


(function($, _, entitySet) {
    $.mockjax({
        url: "/trainee/all",
        responseTime: 500,
        response: function(settings) {
            var all = _.where(entitySet.trainees.get(), {eventId: settings.data.id});
            this.responseText = _.sortBy(all, function(obj) { return obj.updatedDateTime; }).reverse();
        }
    });

    $.mockjax({
        url: "/trainee/get",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.trainees.single(settings.data.id);
        }
    });

    $.mockjax({
        url: "/trainee/post",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.trainees.add(settings.data);
        }
    });

    $.mockjax({
        url: "/trainee/put",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.trainees.replace(settings.data.id, settings.data);
        }
    });

    $.mockjax({
        url: "/trainee/delete",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.trainees.remove(settings.data.id);
        }
    });
} (jQuery, _, datacontext));


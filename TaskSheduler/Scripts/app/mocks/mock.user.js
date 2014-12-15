(function($, _, entitySet) {
    $.mockjax({
        url: "/user/all",
        responseTime: 500,
        response: function(settings) {
            var all = entitySet.users.get();
            this.responseText = _.sortBy(all, function(obj) { return obj.updatedDateTime; }).reverse();
        }
    });

    $.mockjax({
        url: "/user/get",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.users.single(settings.data.id);
        }
    });

    $.mockjax({
        url: "/user/post",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.users.add(settings.data);
        }
    });

    $.mockjax({
        url: "/user/put",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.users.replace(settings.data.id, settings.data);
        }
    });

    $.mockjax({
        url: "/user/delete",
        responseTime: 500,
        response: function (settings) {
            this.responseText = entitySet.users.remove(settings.data.id);
        }
    });
} (jQuery, _, datacontext));


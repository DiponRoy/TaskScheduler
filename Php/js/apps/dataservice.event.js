define('dataservice.event',
['amplify'],
function(amplify) {

    var init = function() {

        amplify.request.define('events.all', 'ajax', {
            url: '../dataController/event.php?action=all',
            dataType: 'json',
            type: 'GET'
        }),
        amplify.request.define('events.single', 'ajax', {
            url: '../dataController/event.php?action=get',
            dataType: 'json',
            type: 'GET'
        });

        amplify.request.define('events.create', 'ajax', {
            url: '../dataController/event.php?action=post',
            dataType: 'json',
            type: 'POST'
        });

        amplify.request.define('events.update', 'ajax', {
            url: '../dataController/event.php?action=put',
            dataType: 'json',
            type: 'PUT'
        });

        amplify.request.define('events.remove', 'ajax', {
            url: '../dataController/event.php?action=delete',
            dataType: 'json',
            type: 'DELETE'
        });
    },            
        all = function(callbacks) {
            return amplify.request({
                resourceId: 'events.all',
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        single = function(callbacks, id) {
            return amplify.request({
                resourceId: 'events.single',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        create = function(callbacks, data) {
            return amplify.request({
                resourceId: 'events.create',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        update = function(callbacks, data) {
            return amplify.request({
                resourceId: 'events.update',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        remove = function(callbacks, id) {
            return amplify.request({
                resourceId: 'events.remove',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();

    return {
        all: all,
        single: single,
        create: create,
        update: update,
        remove: remove
    };
});
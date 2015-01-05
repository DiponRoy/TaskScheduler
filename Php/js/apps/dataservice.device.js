define('dataservice.device',
['amplify'],
function(amplify) {

    var init = function() {

        amplify.request.define('devices.all', 'ajax', {
            url: '../dataController/device.php?action=all',
            dataType: 'json',
            type: 'GET'
        }),
        amplify.request.define('devices.single', 'ajax', {
            url: '../dataController/device.php?action=get',
            dataType: 'json',
            type: 'GET'
        });

        amplify.request.define('devices.create', 'ajax', {
            url: '../dataController/device.php?action=post',
            dataType: 'json',
            type: 'POST'
        });

        amplify.request.define('devices.update', 'ajax', {
            url: '../dataController/device.php?action=put',
            dataType: 'json',
            type: 'PUT'
        });

        amplify.request.define('devices.remove', 'ajax', {
            url: '../dataController/device.php?action=delete',
            dataType: 'json',
            type: 'DELETE'
        });
    },            
        all = function(callbacks) {
            return amplify.request({
                resourceId: 'devices.all',
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        single = function(callbacks, id) {
            return amplify.request({
                resourceId: 'devices.single',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        create = function(callbacks, data) {
            return amplify.request({
                resourceId: 'devices.create',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        update = function(callbacks, data) {
            return amplify.request({
                resourceId: 'devices.update',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        remove = function(callbacks, id) {
            return amplify.request({
                resourceId: 'devices.remove',
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
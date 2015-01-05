define('dataservice.user',
['amplify'],
function(amplify) {

    var init = function() {

        amplify.request.define('users.all', 'ajax', {
            url: '../dataController/user.php?action=all',
            dataType: 'json',
            type: 'GET'
        }),
        amplify.request.define('users.single', 'ajax', {
            url: '../dataController/user.php?action=get',
            dataType: 'json',
            type: 'GET'
        });

        amplify.request.define('users.create', 'ajax', {
            url: '../dataController/user.php?action=post',
            dataType: 'json',
            type: 'POST'
        });

        amplify.request.define('users.update', 'ajax', {
            url: '../dataController/user.php?action=put',
            dataType: 'json',
            type: 'PUT'
        });

        amplify.request.define('users.remove', 'ajax', {
            url: '../dataController/user.php?action=delete',
            dataType: 'json',
            type: 'DELETE'
        });

        amplify.request.define('users.has', 'ajax', {
            url: 'dataController/user.php?action=has',
            dataType: 'json',
            type: 'POST'
        });
    },            
        all = function(callbacks) {
            return amplify.request({
                resourceId: 'users.all',
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        single = function(callbacks, id) {
            return amplify.request({
                resourceId: 'users.single',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        },
        has = function(callbacks, data) {
            return amplify.request({
                resourceId: 'users.has',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },
        create = function(callbacks, data) {
            return amplify.request({
                resourceId: 'users.create',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        update = function(callbacks, data) {
            return amplify.request({
                resourceId: 'users.update',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        remove = function(callbacks, id) {
            return amplify.request({
                resourceId: 'users.remove',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();

    return {
        all: all,
        single: single,
        has: has,
        create: create,
        update: update,
        remove: remove
    };
});
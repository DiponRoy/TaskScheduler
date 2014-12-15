define('dataservice.user',
['amplify'],
function(amplify) {

    var init = function() {

        amplify.request.define('users.all', 'ajax', {
            url: '/user/all',
            dataType: 'json',
            type: 'GET'
        }),
        amplify.request.define('users.single', 'ajax', {
            url: '/user/get',
            dataType: 'json',
            type: 'GET'
        });

        amplify.request.define('users.create', 'ajax', {
            url: '/user/post',
            dataType: 'json',
            type: 'POST',
        });

        amplify.request.define('users.update', 'ajax', {
            url: '/user/put',
            dataType: 'json',
            type: 'PUT',
        });

        amplify.request.define('users.remove', 'ajax', {
            url: '/user/delete',
            dataType: 'json',
            type: 'DELETE',
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
        create: create,
        update: update,
        remove: remove
    };
});
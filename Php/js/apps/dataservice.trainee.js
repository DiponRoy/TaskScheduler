define('dataservice.trainee',
['amplify'],
function(amplify) {

    var init = function() {

        amplify.request.define('trainees.all', 'ajax', {
            url: '../dataController/trainee.php?action=all',
            dataType: 'json',
            type: 'GET'
        }),
        amplify.request.define('trainees.single', 'ajax', {
            url: '../dataController/trainee.php?action=get',
            dataType: 'json',
            type: 'GET'
        });

        amplify.request.define('trainees.create', 'ajax', {
            url: '../dataController/trainee.php?action=post',
            dataType: 'json',
            type: 'POST'
        });

        amplify.request.define('trainees.update', 'ajax', {
            url: '../dataController/trainee.php?action=put',
            dataType: 'json',
            type: 'PUT'
        });

        amplify.request.define('trainees.remove', 'ajax', {
            url: '../dataController/trainee.php?action=delete',
            dataType: 'json',
            type: 'DELETE'
        });
    },            
        all = function(callbacks, id) {
            return amplify.request({
                resourceId: 'trainees.all',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        single = function(callbacks, id) {
            return amplify.request({
                resourceId: 'trainees.single',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        create = function(callbacks, data) {
            return amplify.request({
                resourceId: 'trainees.create',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        update = function(callbacks, data) {
            return amplify.request({
                resourceId: 'trainees.update',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        },            
        remove = function(callbacks, id) {
            return amplify.request({
                resourceId: 'trainees.remove',
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
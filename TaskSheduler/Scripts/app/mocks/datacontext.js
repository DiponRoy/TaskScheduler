var datacontext = {};
(function (datacontext, amplify, _, moment) {

    var storeIndexs = {
        user: 'user',
        device: 'device',
        event: 'event',
        trainee: 'trainee',
        schedule: 'schedule'
    };

    function entitySet(storeIndex) {

        var index = storeIndex,
            set = function(items) {
                amplify.store(index, items);
            },
            all = function() {
                return amplify.store(index);
            },
            get = function() {
                return $.grep(all(), function(obj) {
                    return obj.status == 0 || obj.status == 1;
                });
            },
            single = function(id) {
                var items = _.where(all(), {id: id});
                return _.first(items);
            },
            add = function(item) {
                var element = _.last(all());
                var lastIndex = (element == null) ? 0 : element.id;
                item.id = ++lastIndex;
                item.addedDateTime = moment();
                item.addedBy = 1;
                item.updatedDateTime = moment();
                item.updateedBy = 1;

                var elements = all();
                elements.push(item);
                set(elements);
                
                return single(lastIndex);
            },
            replace = function (id, item) {
                item.id = id;
                item.updatedDateTime = moment();
                item.updatedBy = 1;
                
                var elements = all().map(function(obj) { return obj.id == id ? item : obj; });
                set(elements);                
                return single(item.id);
            },
            remove = function (id) {
                var element = single(id);
                element.status = 2;
                return replace(id, element);
            },
            init = function() {
                set([]);
            };

        init();

        return {
            all: all,
            get: get,
            single: single,
            add: add,
            replace: replace,
            remove: remove
        };
    }

    datacontext.devices = entitySet(storeIndexs.device);
    datacontext.users = entitySet(storeIndexs.user);
    datacontext.events = entitySet(storeIndexs.event);
    datacontext.trainees = entitySet(storeIndexs.trainee);
    datacontext.schedules = entitySet(storeIndexs.schedule);
    
} (datacontext, amplify, _, moment));
(function (db) {


    for (var i = 1; i <= 5; i++) {
        db.devices.add({
            name: 'device ' + i,
            description: 'device description ' + i, 
            status: "0"
        });
    }

    for (var i = 0; i <= 5; i++) {
        db.users.add({
            name: 'user ' + i,
            contactNo: '+1234', 
            email: 'user' + i + '@gmail.com',
            password: '123',
            status: "0"
        });
    }

    for (var i = 1; i <= 5; i++) {
        db.events.add({
            name: 'event ' + i,
            description: 'event description ' + i,
            deviceId: i,
            status: 0
        });
    }

    for (var eventId = 1; eventId <= 5; eventId++) {
        for (var i = 1; i <= 15; i++) {
            db.trainees.add({
                eventId: eventId,
                name: 'trainee ' + i,
                contactNo: '+1234',
                email: 'trainee' + i + '@gmail.com',
                status: 0
            });
        }
    }

} (datacontext));
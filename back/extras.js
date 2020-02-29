const dateFns = require('date-fns');

module.exports = {
    runReminders(database) {
        database.find({}, (err, docs) => {
            for (let tracker of docs) {
                if (tracker.takenAt[ tracker.takenAt.length ] + tracker.interval < dateFns.getTime() - 1800000) {
                    //TODO - send push notification reminders
                }
            }
        });
    }
}
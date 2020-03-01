const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const Datastore = require('nedb')
const cron = require('node-cron');

const app = express();
const port = 5000;

//db setup
const patientDb = new Datastore({ filename: './patientDb.json', autoload: true });
const medTrackerDb = new Datastore({ filename: './medTrackerDb.json', autoload: true });
const subscriptionDb = new Datastore({ filename: './subscriptionDb.json', autoload: true });

//the reminder function
function runReminders(database) {
    database.find({}, (err, docs) => {
        for (let tracker of docs) {
            if (tracker.takenAt[tracker.takenAt.length] + tracker.interval > Date.now() - 1800000
                && tracker.endsAt > Date.now()) {
                subscriptionDb.findOne({ uid: tracker.patientID }, (_, doc) => {
                    const { subscription } = doc

                    //create payload
                    const payload = JSON.stringify({ title: 'Przypomnienie', message: 'Powinieneś teraz wziąć leki!' });

                    //pass object into sendNotification
                    webPush.sendNotification(subscription, payload).catch(err => console.error(err));
                });
            }
        }
    });
}

//set static path
app.use(express.static('../front/src'));

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//push notifications
const publicVapidKey =
    'BHF3G5cqLOzPnFaOCekYqUu7EUy9o0XyUSiQKhUyvfjv3T1M_x-0xMJgHFnbhEIOfZ3ysZpQQZOhSJee_9NdzIo';
const privateVapidKey =
    'nXdTf3itrlaKXq6toaVZMQEor52rOB6RYHDBMsFPhDg';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', async (req, res) => {
    //get pushsubscription object
    const { subscription, uid } = req.body;

    //send 201 - resource created
    res.status(201).json({});

    //save subscription to database
    await subscriptionDb.findOne({ uid }, (err, doc) => {
        if (!doc) subscriptionDb.insert({ uid, subscription })
    })

    //create payload
    const payload = JSON.stringify({ title: 'Przypomnienie', message: 'Takie powiadomienia będą przypominać ci o zażyciu leków' });

    //pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

});

//cron setup to run reminder check every 30 minutes
cron.schedule('30 * * * *', () => {
    medTrackerDb.persistence.compactDatafile();
    runReminders(medTrackerDb);
});


//-----GET ENDPOINTS-----

//get ID of patient by PESEL
app.post('/api/get_uid', (req, res) => {
    patientDb.find({ pesel: req.body.id }, (err, docs) => res.send(docs[0]._id));
});

//get all patient info by ID
app.get('/api/get_all/:id', (req, res) => {
    patientDb.find({ _id: req.params.id }, function (err, docs) {
        res.send(docs);
    });
});

//get patient name, surname, date of birth and PESEL
app.post('/api/get_personal', (req, res) => {
    patientDb.findOne({ _id: req.body.uid }, (err, doc) => {
        res.send({
            name: doc.name,
            surname: doc.surname,
            birthday: doc.birthday,
            PESEL: doc.pesel
        });
    });
});

//get all medicine patient is taking and has ever taken
app.get('/api/get_medicine/:id', (req, res) => {
    patientDb.find({ _id: req.params.id }, function (err, docs) {
        res.send(docs[0].medicine);
    });
});

//get medicine-taking history
app.get('/api/get_history/:patientId/:medicine', (req, res) => {
    medTrackerDb.findOne({ patientId: req.params.patientId, medicine: req.params.medicine }, function (err, doc) {
        res.send(doc.takenAt);
    });
});

//get all medicines taken on a given day
app.get('/api/meds_on/:patientId/:date', (req, res) => {
    const medicineTaken = [];
    medTrackerDb.find({ patientId: req.params.patientId }, (err, docs) => {
        for (let tracker of docs) {
            for (let date of tracker.takenAt) {
                if (date % 86400000 == req.params.date % 86400000) {
                    medicineTaken.push(tracker.medicine);
                    break;
                }
            }
        }
    });
    res.send(medicineTaken);
});

//get all checkups of patient
app.get('/api/checkups/:patientId', (req, res) => {
    patientDb.findOne({ _id: req.params.patientId }, (err, doc) => {
        res.send(doc.checkups);
    });
});

//-----UPDATE/ADD ENDPOINTS-----

//update patient
app.post('/api/update_patient/:id', (req, res) => {
    patientDb.update({ _id: req.params.id }, req.body, {}, function (err, numReplaced) {
        res.send({ status: 'ok, updated patient' });
    });
});

//add patient (for testing only)
app.post('/api/add_patient', (req, res) => {
    patientDb.insert(req.body);
    res.send({ status: 'ok, added new patient' });
});

//add new medTracker
app.post('/api/add_tracker', (req, res) => {
    medTrackerDb.insert(req.body);
    res.send({ status: 'ok, added new tracker' });
});


const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'))

app.get('/api/complete/:name', (req, res) => {
    const name = req.params.name
    res.send(data.filter(x => x.name.toLowerCase().startsWith(name)).slice(0, 5))
})

const { findColiding } = require('./webscrap.js')
app.post('/api/coliding', async (req, res) => {
    const data = await findColiding(req.body.drugs)
    console.log(data)
    res.send(data)
})

//prescribe medicine to patient
app.post('/api/prescribe/:id', (req, res) => {
    let updatedMedicines = [];
    patientDb.findOne({_id: req.params.id}, (err, doc) => {
        updatedMedicines = doc.medicine;
        updatedMedicines.push(req.body);
        patientDb.update({ _id: req.params.id }, { $set: { medicine: updatedMedicines }}, {multi: true}, function(err, numReplaced) {});
    });
    res.send({ status: 'ok, medicine prescribed to patient' });
});

//add checkup to patient
app.post('/api/checkups/:patientId', (req, res) => {
    updatedCheckups;
    patientDb.findOne({ _id: req.params.patientId }, (err, doc) => {
        updatedCheckups = doc.checkups;
        updatedCheckups.push(req.body);
        patientDb.update({ _id: req.params.patientId }, { $set: { checkups: updatedCheckups } });
        res.send({ status: 'ok, checkup added to patients record' });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

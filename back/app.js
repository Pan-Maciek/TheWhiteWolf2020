const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const Datastore = require('nedb')
const cron = require('node-cron');
const { runReminders } = require('./extras');

//db setup
const patientDb = new Datastore({filename: './patientDb.json', autoload: true});
/*const medTrackerDb = new Datastore({filename: './medTrackerDb.json', autoload: true}); - this line, for some damn reason,
                                                                                           resets the db every time it's triggered,
                                                                                           even though the line just above it is
                                                                                           identical and does not do that
*/

//cron setup to run reminder check every 30 minutes
cron.schedule('30 * * * *', () => {
    runReminders(medTrackerDb);
});

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//-----GET ENDPOINTS-----

//get ID of patient by PESEL
app.post('/api/get_uid', (req, res) => {
    patientDb.find({pesel: req.body.id}, (err, docs) => res.send(docs[0]._id));
});

//get all patient info by ID
app.get('/api/get_all/:id', (req, res) => {
    patientDb.find({_id: req.params.id}, function(err, docs) {
        res.send(docs);
    });
});

//get patient name, surname, date of birth and PESEL
app.get('/api/get_personal/:id', (req, res) => {
    patientDb.findOne({_id: req.params.id}, function(err, doc) {
        res.send(
            {
                "name": doc.name,
                "surname": doc.surname,
                "birthday": doc.birthday,
                "PESEL": doc.pesel
            }
        );
    });
});

//get all medicine patient is taking and has ever taken
app.get('/api/get_medicine/:id', (req, res) => {
    patientDb.find({_id: req.params.id}, function(err, docs) {
        res.send(docs[0].medicine);
    });
});

//get medicine-taking history
app.get('/api/get_history/:patientId/:medicine', (req, res) => {
    medTrackerDb.findOne({patientId: req.params.patientId, medicine: req.params.medicine}, function(err, doc) {
        res.send(doc.takenAt);
    });
});


//-----UPDATE/ADD ENDPOINTS-----

//update patient
app.post('/api/update_patient/:id', (req, res) => {
    patientDb.update({ _id: req.params.id }, req.body, {}, function(err, numReplaced) {
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

//prescribe medicine to patient
app.post('/api/prescribe/:id', (req, res) => {
    updatedMedicines;
    patientDb.findOne({_id: req.params.id}, (err, doc) => {
        updatedMedicines = doc.medicine;
    });
    updatedMedicines.push(req.body);
    patientDb.update({_id: req.params.id}, { $set: {medicine: updatedMedicines} });
    res.send({status: 'ok, medicine prescribed to patient'});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
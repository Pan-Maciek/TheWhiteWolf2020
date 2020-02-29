const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const Datastore = require('nedb')

//db setup
const db = new Datastore({filename: './db.json', autoload: true});

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//get ID of patient by PESEL
app.get('/api/get_uid/:pesel', (req, res) => {
    db.find({pesel: req.params.pesel}, function(err, docs) {
        if (docs == []) res.send('');
        else res.send(docs[0]._id);
    });
});

//get all patient info by ID
app.get('/api/get_all/:id', (req, res) => {
    db.find({_id: req.params.id}, function(err, docs) {
        res.send(docs);
    });
});

//update patient
app.post('/api/update/:id', (req, res) => {
    db.update({ _id: req.params.id }, req.body, {}, function(err, numReplaced) {
       res.send({ status: 'ok, updated patient' });
    });
});

//add patient (for testing only)
app.post('/api/add', (req, res) => {
    db.insert(req.body);
    res.send({ status: 'ok, added new patient' });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
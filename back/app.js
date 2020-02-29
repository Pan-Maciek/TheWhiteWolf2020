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

//get patient info by PESEL
app.get('/api/:id', (req, res) => {
    db.find({_id: req.params.id}, function(err, docs) {
        res.send(docs);
    });
});

//update patient
app.post('/api/:id', (req, res) => {
    db.update({ _id: req.params.id }, req.body, {}, function (err, numReplaced) {
       res.send({ status: 'ok' });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
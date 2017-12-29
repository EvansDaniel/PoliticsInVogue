// set up ======================================================================
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = 3001,
    database = require('./config/database'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path');

// configuration ===============================================================
mongoose.connect(database.localUrl, {useMongoClient: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

// routes ======================================================================
require('./routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);

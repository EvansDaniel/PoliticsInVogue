// set up ======================================================================
const express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    port = 3001,
    database = require('./config/database'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    passport = require('passport'),
    PassportConfig = require('./config/passport'),
    cors = require('cors');

// configuration ===============================================================
// TODO: check for prod. Connect to prodUrl
mongoose.connect(database.localUrl, {useMongoClient: true});

// TODO: provide resave and saveUninitialized option
app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());
// PassportConfig();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

// routes ======================================================================
require('./bootstrap.js')(app);

const CORS_ORIGINS_ALLOWED = [
    'http://localhost:3000',
    'http://politicsinvogue.com'
];
// https://github.com/expressjs/cors#configuring-cors
// Manual version: https://gist.github.com/cuppster/2344435
app.use(cors({
    origin: CORS_ORIGINS_ALLOWED,
    // Some old browsers choke on 204
    optionsSuccessStatus: 200,
}));

app.listen(port);
console.log("App listening on port " + port);

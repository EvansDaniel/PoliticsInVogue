// set up ======================================================================
const dotenv = require('dotenv');

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

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
    cors = require('cors'),
    MongoDBStore = require('connect-mongodb-session')(session);

process.env.isDev = process.env.NODE_ENV === 'development';
process.env.isProd = process.env.NODE_ENV === 'production';
process.env.isTest = process.env.NODE_ENV === 'test';

// configuration ===============================================================
// TODO: check for prod. Connect to prodUrl
dbUrl = process.env.isDev ? database.localUrl : database.prodUrl;
mongoose.connect(dbUrl, {useMongoClient: true});

const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});


app.use(require('express-session')({
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: process.env.isProd ? store : null,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));

// TODO: provide resave and saveUninitialized option
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

// set up ======================================================================
const dotenv = require('dotenv');

// TODO: perform find up/down to find .env in server dir always
// Currently doesn't work if running "node /path/to/server.js"
// when not in server dir
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

const express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    port = 3001,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    morgan = require('morgan'),
    passport = require('passport'),
    PassportConfig = require('./config/passport'),
    cors = require('cors'),
    MongoDBStore = require('connect-mongodb-session')(session),
    cookieParser = require('cookie-parser'),
    CONSTANTS = require('../src/shared/constants');

process.env.isDev = process.env.NODE_ENV === 'development';
process.env.isProd = process.env.NODE_ENV === 'production';
process.env.isTest = process.env.NODE_ENV === 'test';

// configuration ===============================================================
const dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.connect(dbUrl,
    {useMongoClient: true}
);

// Adding own promise library, mpromise is deprecated
mongoose.Promise = require('bluebird');

const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions'
});

// Catch store errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
    throw error;
});


app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
        maxAge: CONSTANTS.SESSION_COOKIE_TIME,
        httpOnly: true,
    },
    name: process.env.SESSION_COOKIE_ID,
    store: process.env.NODE_ENV === 'production' ? store : null,

    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));

// TODO: provide resave and saveUninitialized option
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(morgan('dev'));

app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));

const CORS_ORIGINS_ALLOWED = [
    'http://localhost:3000',
    'http://politicsinvogue.com'
];
// https://github.com/expressjs/cors#configuring-cors
// Manual version: https://gist.github.com/cuppster/2344435
/*
Requirements to set a cookie in browser from a subdomain (i.e. api.politicsinvogue.com)
on the domain (i.e. politicsinvogue.com)
 1. Add the Access-Control-Allow-Credentials (via cors({credentials: true} below)
 2. Add withCredentials: true to axios api request (or similar option for other XMLHttpRequest lib)
 3. Add domain: DOMAIN_FOR_WHICH_YOU_ARE_SETTING_COOKIE (politicsinvogue.com in this case) on the cookie
 -> ex: res.cookie({domain: politicsinvogue.com});
 */
app.use(cors({
    origin: CORS_ORIGINS_ALLOWED,
    credentials: true,
    // Some old browsers choke on 204
    optionsSuccessStatus: 200,
}));

// Bootstrap the app VERY LAST
require('./bootstrap.js')(app);
app.listen(port);
console.log("App listening on port " + port);

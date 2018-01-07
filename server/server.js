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
    path = require('path');

// configuration ===============================================================
// TODO: check for prod. Connect to prodUrl
mongoose.connect(database.localUrl, {useMongoClient: true});
/*
 let Cat = mongoose.model('Cat', { name: String });

 let kitty = new Cat({ name: 'Zildjian' });
 kitty.save(function (err) {
 if (err) {
 console.log(err);
 } else {
 console.log('meow');
 }
 });*/

let passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function (username, password, done) {
        return done(null, {'username': 'username'});
        /*User.findOne({ username: username }, function(err, user) {
         if (err) { return done(err); }
         if (!user) {
         return done(null, false, { message: 'Incorrect username.' });
         }
         if (!user.validPassword(password)) {
         return done(null, false, { message: 'Incorrect password.' });
         }
         return done(null, user);
         });*/
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        console.log(req.body);
        console.log(req.session);
        res.json({
            'json': 'json'
        })
    });

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.json({
        message: 'User not authenticated'
    })
};

app.get('/temp', isAuthenticated, function (req, res, next) {
    console.log(req.session);
    return res.json({
        'user': req.user
    });
});

// routes ======================================================================
require('./routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);

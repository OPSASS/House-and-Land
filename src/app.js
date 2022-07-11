const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const morgan = require('morgan');

app.locals.moment = require('moment'); //moment.js
app.locals.countdown = require('countdown');
// Cai dat routes
const Route = require('./routes');

// Ket noi voi database
let db = require('./config/database');

const cors = require('cors');

// Cai dat dia chi
const port = process.env.PORT || '8800';

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/img/uploads')));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Load View Engine
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
// Passport Config
require('./middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


// Set view engine to use
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500 Có gì đó không ổn! Hoặc máy tính không có internet' + "\n" + err);
});

app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// GET app
Route(app);

// Start server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
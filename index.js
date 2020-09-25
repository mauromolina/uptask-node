const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const helper = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('./config/passport');

const db = require('./config/db');
require('./models/Project');
require('./models/Task');
require('./models/User');


db.sync()
    .then( () => {
        console.log('DB Conectada :D');
    })
    .catch( error => {
        console.log(error);
    })

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(flash());

app.use(cookie());

app.use(session({
    secret: 'secreta',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.vardump = helper.vardump;
    res.locals.errors = req.flash();
    res.locals.user = {...req.user} || null;
    next();
});


app.use('/', routes())

app.listen(app.get('port'), () => {
    console.log('El servidor corre en el puerto ', app.get('port'));
})
const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const helper = require('./helpers');

const db = require('./config/db');
require('./models/Project');
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

app.use((req, res, next) => {
    res.locals.vardump = helper.vardump;
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes())

app.listen(app.get('port'), () => {
    console.log('El servidor corre en el puerto ', app.get('port'));
})
const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use('/', routes())

app.listen(app.get('port'), () => {
    console.log('El servidor corre en el puerto ', app.get('port'));
})
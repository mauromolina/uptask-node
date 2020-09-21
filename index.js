const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', (req, res) => {
    res.send('Configuración OK');
})

app.listen(app.get('port'), () => {
    console.log('El servidor corre en el puerto ', app.get('port'));
})
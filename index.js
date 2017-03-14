const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
//const wsM = require('./ws_miMovistar.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log('El servidor está escuchando en el puerto 5000'));

app.get('/', verificationController);
app.post('/', messageWebhookController);








 
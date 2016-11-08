const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const PORT = 8000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));



//ROUTER
app.use('/', require('./server/controller'));


app.use((err, req, res, next) => {
    console.log('ERR', err);
    res.status(err.status || 500);
    res.send('Error ');
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '!');
});

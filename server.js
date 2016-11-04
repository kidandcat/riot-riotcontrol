const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const cookie = require('cookie-parser');

const PORT = 8000;

app.use(helmet());
app.use(cors());
app.use(cookie());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));





//ROUTES
app.use('/',(req, res, next)=>{
  console.log('cookie ', req.cookies);
  next();
});
app.use('/', require('./api/ticket'));
app.use('/', require('./api/user'));


app.use((err, req, res, next) => {
    console.log('ERR', err);
    res.status(err.status || 500);
    res.send('Error ');
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '!');
});

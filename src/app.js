'use strict';

require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/', require('./routes'))

app.listen(3000, () => console.log('Listening on port 3000!'))



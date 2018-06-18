'use strict';

require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const winston = require('./modules/winston')

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    winston.info('Request URL: %s', req.originalUrl)
    winston.info('Request Type: %s', req.method)
    next()
})
app.use('/', require('./routes'))
app.listen(process.env.PORT || 3000, () => winston.info('Express initialized. Port:' + process.env.PORT || 3000))
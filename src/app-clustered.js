'use strict';

require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const winston = require('./modules/winston')

var cluster = require('cluster');  
var numCPUs = require('os').cpus().length;

const app = express()

if (cluster.isMaster) {  
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
} else {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        winston.info('Request URL: %s', req.originalUrl)
        winston.info('Request Type: %s', req.method)
        next()
    })
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }
        else {
          next();
        }
    })
    app.use('/', require('./routes'))
    app.listen(process.env.PORT || 3000, () => winston.info('Express initialized. Port: %s', process.env.PORT || 3000))
}

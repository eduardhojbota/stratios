'use strict'

const flesch = require('./flesch')
const fleschKincaid = require('./fleschKincaid')
const gunningFog = require('./gunningFog')
const colemanLiau = require('./colemanLiau')
const smog = require('./smog')
const automated = require('./automated')
const daleChall = require('./daleChall')
const spache = require('./spache')

module.exports = {
    flesch,
    fleschKincaid,
    gunningFog,
    colemanLiau,
    smog,
    automated,
    daleChall,
    spache
}
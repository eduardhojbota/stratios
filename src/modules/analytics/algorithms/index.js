'use strict'

const flesch = require('./flesch')
const fleschKincaid = require('./flesch-kincaid')
const daleChall = require('./dalle-chall')
const gunningFog = require('./gunning-fog')
const smog = require('./smog')

module.exports = {
    flesch,
    fleschKincaid,
    daleChall,
    gunningFog,
    smog
}

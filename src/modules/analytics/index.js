'use strict'

const winston = require('../winston')
const algorithms = require('./algorithms')
const dataProcessing = require('./data-processing')

// winston.debug(algorithms.fleschKincaid(`Why would you split client and server between two repo when there will be dependencies between both? For having worked with projects needlessly spilt into multiple repo, this is quite a hassle as you never know what branch or commit or which repo matches the commit or branch of another repo. With one repo you checkout the code and it just works. Companies like Google or Facebook manage just fine with a monorepo so for small projects it should definitely be fine too.`))
// winston.debug(algorithms.daleChall(`Why would you split client and server between two repo when there will be dependencies between both? For having worked with projects needlessly spilt into multiple repo, this is quite a hassle as you never know what branch or commit or which repo matches the commit or branch of another repo. With one repo you checkout the code and it just works. Companies like Google or Facebook manage just fine with a monorepo so for small projects it should definitely be fine too.`))

module.exports = {
    algorithms,
    dataProcessing
}

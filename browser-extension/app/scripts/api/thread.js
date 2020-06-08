const env = require('../config/index')

const thread = (config) => {
    return fetch(env.HOST + '/reddit/thread/' + config.threadId + '/' + (config.level || 1))
        .then(response => response.json())
}

module.exports = thread
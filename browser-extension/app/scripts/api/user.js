const env = require('../config/index')

const user = (config) => {
    return fetch(env.HOST + '/reddit/user/' + config.username + '/' + (config.level || 1))
        .then(response => response.json())
}

module.exports = user
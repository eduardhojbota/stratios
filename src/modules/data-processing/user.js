const analytics = require('../analytics')
const utils = require('./utils')

const processData = (data) => {

    let readability = new utils.Readability(analytics)
    let sentiment = new utils.Sentiment(analytics)

    data.forEach(e => {
        console.log(e)
        readability.processEntry(e.body || e.selftext);
        sentiment.processEntry(e.body || e.selftext);
    })

    return {
        readability: readability.calculateAverage(data.length),
        sentiment: sentiment.calculateAverage(data.length)
    }

}

module.exports = processData
const analysis = require('./analysis')
const utils = require('./utils')

const processData = (data, analysisLevel) => {
    
    let overview, about
    [overview, about] = data
    let readability = new utils.Readability(analysis, analysisLevel)
    let sentiment = new utils.Sentiment(analysis, analysisLevel)

    overview.forEach(e => {
        readability.processEntry(e.body || e.selftext);
        sentiment.processEntry(e.body || e.selftext);
    })

    return {
        readability: readability.calculateAverage(overview.length),
        sentiment: sentiment.calculateAverage(overview.length),
        activity: analysis.activity(about.created_utc, overview.length)
    }

}

module.exports = processData
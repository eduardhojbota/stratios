const analytics = require('../analytics')
const utils = require('./utils')

const processComments = (comments) => {

    function* parseRedditBlob(data) {
        if (!data) {
            return;
        }

        for (var i = 0; i < data.length; i++) {
            var val = data[i];
            yield val.body;

            if (val.replies) {
                yield* parseRedditBlob(val.replies);
            }
        }
    }

    let it = parseRedditBlob(comments)
    let res = it.next()
    let blob = []

    while (!res.done) {
        blob.push(res.value)
        res = it.next()
    }

    return blob
}


const processData = (data, analysisLevel) => {
    let texts = [data.selftext || data.title, ...processComments(data.comments)]

    let readability = new utils.Readability(analytics, analysisLevel)
    let sentiment = new utils.Sentiment(analytics, analysisLevel)

    texts.forEach(e => {
        readability.processEntry(e);
        sentiment.processEntry(e);
    })

    return {
        readability: readability.calculateAverage(texts.length),
        sentiment: sentiment.calculateAverage(texts.length),
        activity: analytics.activity(data.created_utc, data.num_comments)
    }

}

module.exports = processData
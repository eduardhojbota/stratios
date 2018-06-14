const algorithms = require('../algorithms')
let Sentiment = new require('sentiment');
let sentiment = new Sentiment();

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

const avg = (textsArray) => textsArray.reduce((x, y) => x + y) / textsArray.length

const dataMine = (data) => {
    let texts = [data.selftext, ...processComments(data.comments)]
    let scores = {
        flesch: 0,
        fleschKincaid: 0,
        daleChall: 0,
        gunningFog: 0,
        smog: 0,
    }
    let sentimentAnalysisData = {
        score: 0,
        words: {
            positive: {},
            negative: {},
        },
        temp: {
            positive: [],
            negative: [],
        }        
    }

    texts.forEach(e => {
        scores.flesch += algorithms.flesch(e)
        scores.fleschKincaid += algorithms.fleschKincaid(e)
        scores.daleChall += algorithms.daleChall(e)
        scores.gunningFog += algorithms.gunningFog(e)
        scores.smog += algorithms.smog(e)
        let sentimentData = sentiment.analyze(e)
        sentimentAnalysisData.score += sentimentData.score
        sentimentAnalysisData.temp.positive = [...sentimentAnalysisData.temp.positive, ...sentimentData.positive]
        sentimentAnalysisData.temp.negative = [...sentimentAnalysisData.temp.negative, ...sentimentData.negative]
    })

    scores.flesch /= texts.length
    scores.fleschKincaid /= texts.length
    scores.daleChall /= texts.length
    scores.gunningFog /= texts.length
    scores.smog /= texts.length
    sentimentAnalysisData.score /= texts.length

    sentimentAnalysisData.temp.positive.forEach(function(el){
        sentimentAnalysisData.words.positive[el] = sentimentAnalysisData.words.positive[el] + 1 || 1
    });
    sentimentAnalysisData.temp.negative.forEach(function(el){
        sentimentAnalysisData.words.negative[el] = sentimentAnalysisData.words.negative[el] + 1 || 1
    });

    delete sentimentAnalysisData["temp"]

    return {
        scores,
        sentimentAnalysisData
    }

}

module.exports = dataMine
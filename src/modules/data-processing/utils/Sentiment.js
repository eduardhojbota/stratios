class Sentiment {

    processEntry(e) {
        let sentimentData = this.analytics.sentiment.analyze(e)
        this.analysis.score += sentimentData.score
        this.temp.positive = [...this.temp.positive, ...sentimentData.positive]
        this.temp.negative = [...this.temp.negative, ...sentimentData.negative]
        return this.analysis;
    }

    calculateAverage(datasetLength) {
        const processWords = (type) => {
            this.temp[type].forEach((el) => {
                this.analysis.words[type][el] = this.analysis.words[type][el] + 1 || 1
            });
        }

        this.analysis.score /= datasetLength

        processWords('positive');
        processWords('negative');
        
        return this.analysis;
    }

    constructor(analytics) {
        this.analysis = {
            score: 0,
            words: {
                positive: {},
                negative: {},
            }
        }
        this.temp = {
            positive: [],
            negative: []
        }
        this.analytics = analytics;
    }

}

module.exports = Sentiment
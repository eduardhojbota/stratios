class Sentiment {

    processEntry(e) {
        let sentimentData = this.analytics.sentiment.analyze(e)
        this.analysis.score += sentimentData.score
        if(this.analysisLevel > 0){
            this.temp.positive = [...this.temp.positive, ...sentimentData.positive]
            this.temp.negative = [...this.temp.negative, ...sentimentData.negative]
        }
        return this.analysis;
    }

    calculateAverage(datasetLength) {
        const processWords = (type) => {
            this.temp[type].forEach((el) => {
                this.analysis.words[type][el] = this.analysis.words[type][el] + 1 || 1
            });
        }

        this.analysis.score /= datasetLength

        if(this.analysisLevel > 0){
            processWords('positive');
            processWords('negative');
        }
        
        return this.analysis;
    }

    constructor(analytics, analysisLevel) {
        this.analysisLevel = analysisLevel || 0;
        this.analysis = {
            score: 0
        }
        if(this.analysisLevel > 0){
            this.analysis.words = {
                positive: {},
                negative: {},
            }
            this.temp = {
                positive: [],
                negative: []
            }
        }
        this.analytics = analytics;
    }

}

module.exports = Sentiment
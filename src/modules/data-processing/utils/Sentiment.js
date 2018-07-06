class Sentiment {

    processEntry(e) {
        let sentimentData = this.analysis.sentiment.analyze(e)
        this.scores.score += sentimentData.score
        if(this.analysisLevel > 0){
            this.temp.positive = [...this.temp.positive, ...sentimentData.positive]
            this.temp.negative = [...this.temp.negative, ...sentimentData.negative]
        }
        return this.scores;
    }

    calculateAverage(datasetLength) {
        const processWords = (type) => {
            this.temp[type].forEach((el) => {
                this.scores.words[type][el] = this.scores.words[type][el] + 1 || 1
            });
        }

        this.scores.score /= datasetLength

        if(this.analysisLevel > 0){
            processWords('positive');
            processWords('negative');
        }
        
        return this.scores;
    }

    constructor(analysis, analysisLevel) {
        this.analysisLevel = analysisLevel || 0;
        this.scores = {
            score: 0
        }
        if(this.analysisLevel > 0){
            this.scores.words = {
                positive: {},
                negative: {},
            }
            this.temp = {
                positive: [],
                negative: []
            }
        }
        this.analysis = analysis;
    }

}

module.exports = Sentiment
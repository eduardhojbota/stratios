class Readability {

    processEntry(e) {
        this.readabilityFormulas.forEach(formula => {
            if(e.match(/[a-zA-Z0-9]+/g)){
                this.scores[formula] += this.analytics.readability[formula](e)
            }
        })
        return this.scores;
    }

    calculateAverage(datasetLength) {
        this.readabilityFormulas.forEach(formula => {
            this.scores[formula] /= datasetLength
        })
        return this.scores;
    }

    constructor(analytics, analysisLevel) {
        this.scores = {};
        this.analytics = analytics;
        this.readabilityFormulas = Object.keys(analytics.readability)
        this.readabilityFormulas.forEach(formula => {
            this.scores[formula] = 0
        })
        this.analysisLevel = analysisLevel || 0;
    }

}

module.exports = Readability
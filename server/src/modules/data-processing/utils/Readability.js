class Readability {

    processEntry(e) {
        this.readabilityFormulas.forEach(formula => {
            if(e.match(/[a-zA-Z0-9]+/g)){
                this.scores[formula] += this.analysis.readability[formula](e)
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

    constructor(analysis, analysisLevel) {
        this.scores = {};
        this.analysis = analysis;
        this.readabilityFormulas = Object.keys(analysis.readability)
        this.readabilityFormulas.forEach(formula => {
            this.scores[formula] = 0
        })
        this.analysisLevel = analysisLevel || 0;
    }

}

module.exports = Readability
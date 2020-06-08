const settings = require('./settings.js')

const domains = {
    readability: (data) => {
        const fleschConvert = score => {

            let scaledScore = 0

            if (score > 90 && score <= 100) {
                scaledScore = 1
            }
            if (score > 80 && score <= 90) {
                scaledScore = 2
            }
            if (score > 70 && score <= 80) {
                scaledScore = 3
            }
            if (score > 60 && score <= 70) {
                scaledScore = 4
            }
            if (score > 50 && score <= 60) {
                scaledScore = 5
            }
            if (score > 30 && score <= 50) {
                scaledScore = 6
            }
            if (score <= 30) {
                scaledScore = 7
            }

            let scaleLength = 7
            return (scaledScore / scaleLength) * 17
        }

        const daleChallConvert = score => {

            let scaledScore = 0

            if (score < 5) {
                scaledScore = 1
            }
            if (score >= 5 && score < 6) {
                scaledScore = 2
            }
            if (score >= 6 && score < 7) {
                scaledScore = 3
            }
            if (score >= 7 && score < 8) {
                scaledScore = 4
            }
            if (score >= 8 && score < 9) {
                scaledScore = 5
            }
            if (score >= 9) {
                scaledScore = 6
            }

            let scaleLength = 6
            return (scaledScore / scaleLength) * 17
        }

        let score = 0
        let usedFormulas = 0

        Object.keys(data.rawData).forEach(formula => {
            if (data.settings.analytics.readability[formula]) {
                usedFormulas++
                switch (formula) {
                    case 'flesch':
                        score += fleschConvert(data.rawData[formula])
                        break;
                    case 'daleChall':
                        score += daleChallConvert(data.rawData[formula])
                        break;
                    default:
                        score += data.rawData[formula]
                }
            }
        })

        score /= usedFormulas
        let userPreferedGrade = data.settings.analytics.readability.grade
        let userPreferedRange = data.settings.analytics.readability.range
        let distance = Math.abs(Math.round(score) - userPreferedGrade)

        if(distance !== 0){
            if(userPreferedRange - distance >= 0){
                return (1 - (1 / (userPreferedRange - distance + 2))) * 100
            } else {
                return 0
            }
        } else {
            return 100
        }
    },

    sentiment: (data) => {
        let threshold = data.settings.analytics.sentiment.threshold
        let score = 1
        let scaleLength = 2

        if (data.rawData.score <= -threshold) {
            score = 0
        } else if (data.rawData.score >= threshold) {
            score = 2
        }

        return score / scaleLength * 100
    },

    activity: (data) => {

        let score = 0;
        let scale = ['year', 'month', 'week', 'day', 'hour']

        if (data.pageType == 'thread') {
            scale.push('minute')
        }
        scale.some(scaleItem => {
            if (data.rawData[scaleItem] >= 1 && data.settings.analytics.activity[data.pageType] !== scaleItem) {
                score++;
            } else if (data.rawData[scaleItem] >= 1 && data.settings.analytics.activity[data.pageType] === scaleItem) {
                score++;
                return true
            } else {
                return true
            }
        })

        return score / (scale.indexOf(data.settings.analytics.activity[data.pageType]) + 1) * 100
    }
}

const mergeScores = (activeDomains) => {
    let score = 0;
    for (let domain in activeDomains) {
        score += activeDomains[domain].score * (1 / Object.keys(activeDomains).length)
    }

    return score
}

const score = (data, pageType, split) => {

    let activeDomains = {}

    return settings.get().then(settings => {
        for (let domain in settings.analytics) {
            if (settings.analytics[domain].active) {
                activeDomains[domain] = data[domain]
            }
        }

        for (let domain in activeDomains) {
            activeDomains[domain].score = domains[domain]({
                rawData: data[domain], 
                settings,
                pageType
            })
        }

        if(split){
            return activeDomains
        }

        return mergeScores(activeDomains)
    })

}

module.exports = {
    index: score,
    split: (data, pageType) => score(data, pageType, true)
}
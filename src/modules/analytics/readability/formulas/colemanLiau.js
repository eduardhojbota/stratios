'use strict'

const formula = (data) => {
    if (data && data.words && data.sentences && data.characters) {
        let L = data.characters / data.words * 100
        let S = data.sentences / data.words * 100
        return (0.0588 * L) - (0.296 * S) - 15.8
    }
    return NaN
}

const dependencies = ['sentences','words', 'characters']

module.exports = {
    formula,
    dependencies
}
const formula = (data) => {
    if (data && data.words && data.sentences && data.syllables) {
        return 0.39 * (data.words / data.sentences) + 11.8 * (data.syllables / data.words) - 15.59
    }
    return NaN
}

const dependencies = ['sentences','words', 'syllables']

module.exports = {
    formula,
    dependencies
}
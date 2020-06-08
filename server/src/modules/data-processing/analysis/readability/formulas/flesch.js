const formula = (data) => {
    if (data && data.words && data.sentences && data.syllables) {
        return 206.835 - (1.015 * (data.words / data.sentences)) - (84.6 * (data.syllables / data.words))
    }
    return NaN
}

const dependencies = ['sentences','words', 'syllables']

module.exports = {
    formula,
    dependencies
}
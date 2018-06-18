const formula = (data) => {
    if (data && data.words && data.sentences) {
        return 0.4 * ((data.words / data.sentences) + (100 * ((data.complexWords || 0) / data.words)))
    }
    return NaN
}

const dependencies = ['sentences','words', 'complexWords']

module.exports = {
    formula,
    dependencies
}
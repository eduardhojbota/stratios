'use strict';

const formula = (data) => {
    if (data && data.words && data.sentences) {
      return 0.659 + (0.121 * data.words / data.sentences) + (0.082 * (data.unfamiliarWords || 0) / data.words * 100)
    }
    return NaN
}

const dependencies = ['words', 'sentences', 'unfamiliarWords']

module.exports = {
    formula,
    dependencies
}
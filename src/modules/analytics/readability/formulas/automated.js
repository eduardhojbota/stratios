'use strict';

const formula = (data) => {
    if (data && data.characters && data.words && data.sentences) {
        return (4.71 * (data.characters / data.words)) + (0.5 * (data.words / data.sentences)) - 21.43
    }
    return NaN
}

const dependencies = ['sentences', 'characters', 'words']

module.exports = {
    formula,
    dependencies
}
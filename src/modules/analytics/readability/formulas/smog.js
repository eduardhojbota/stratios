'use strict';

const formula = (data) => {
    if (data && data.sentences) {
        return 3.1291 + (1.0430 * Math.sqrt((data.complexWords || 0) * (30 / data.sentences)))
    }
    return NaN
}

const dependencies = ['sentences', 'complexWords']

module.exports = {
    formula,
    dependencies
}
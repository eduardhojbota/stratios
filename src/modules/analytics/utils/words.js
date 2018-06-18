const winston = require('../../winston')
const syllable = require('syllable')
const datasets = require('./datasets')

const compare = (text, dataset) => {
    let words = [...new Set(text.replace(/[“”…";:,.?¿!¡\(\)\[\]]+/g, '').match(/\S+/g) || [])]
    return words.filter(value => -1 === dataset.indexOf(value.toLowerCase()));
}

const complex = (text) => {
    // let words = [...new Set(text.split(' '))]
    let words = [...new Set(all(text))]
    return words.filter(e => syllable(e) > 2) || []
}

const all = (text) => {
        // .replace(/([a-zA-Z])\.([a-zA-Z])\./g, '$1 $2').replace(/['";:,?¿\-!¡]+/g, '').match(/\S+/g) || []
    return text.replace(/[\-—]+/g, ' ').replace(/[“”…’'";:,.?¿!¡\(\)\[\]]+/g, '').match(/\S+/g) || []
}

module.exports = {
    all,
    complex,
    unfamiliar: (text) => compare(text, datasets.words.spache),
    difficult: (text) => compare(text, datasets.words.daleChall),
}
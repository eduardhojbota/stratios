const syllable = require('syllable')
const datasets = require('./datasets')

const regex = {
    words: /[\w']+/g,
    wordsNoNumbers: /[a-zA-Z_']+/g,
    compoundWords: /[\w]+\-[\w]+/g
}

// normalize apostrophe, en/em dash, quotation marks
const normalize = text => text.replace(/’/g,'\'').replace(/[–—]/g, '-').replace(/[“”]/g,'"')

const compare = (text, dataset) => {
    text = normalize(text)
    let words = [...new Set(text.toLowerCase().match(regex.wordsNoNumbers) || [])]
    return words.filter(value => -1 === dataset.indexOf(value));
}

const complex = (text) => {
    text = normalize(text)
    let words = text.replace(regex.compoundWords,'').match(regex.words) || []
    return words.filter(e => e[0] !== e[0].toUpperCase() && syllable(e) > 2) || []
}

const polysyllabic = (text) => {
    text = normalize(text)
    let words = text.match(regex.words) || []
    return words.filter(e => syllable(e) > 2) || []
}

const all = (text) => {
    text = normalize(text)
    return text.match(regex.words) || []
}

module.exports = {
    all,
    complex,
    polysyllabic,
    unfamiliar: (text) => compare(text, datasets.words.spache),
    difficult: (text) => compare(text, datasets.words.daleChall),
}
const numberToText = require('number-to-text')
const syllable = require('syllable')
require('number-to-text/converters/en-us');


const getPolysillabicWords = (text) => {
    let words = getWords(text)
    return words.filter(e => syllable(e) > 2) || []
}

const getWords = (text) => text
    .replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []

const getNumbers = (text) => text
    .match(/([0-9]+[\.\,]?)+/g) || []

const getNumbersToText = (text) => text
    .map(e => numberToText.convertToText(e)) || []

const words = (text) => {
    let words = getWords(text)
    // let numbers = getWords(getNumbersToText(getNumbers(text)).join())
    return [...words]
}

module.exports = {
    all: getWords,
    polysillabic: getPolysillabicWords
}
'use strict'

const winston = require('../../winston')
const fleschKincaid = require('flesch-kincaid')
const syllable = require('syllable')
const utils = require('../../utils')

const alg = (text) => {

    let sentences = utils.sentences(text).length
    let words = utils.words.all(text).length
    let syllables = syllable(text)

    let result = fleschKincaid({
        sentence: sentences,
        word: words,
        syllable: syllables
    });

    if(sentences == 0){
        winston.debug('[Flesch Kincaid] Text: %s', text)
        winston.debug('[Flesch Kincaid] Sentences: %s', sentences)
        winston.debug('[Flesch Kincaid] Words: %s', words)
        winston.debug('[Flesch Kincaid] Syllables: %s', syllables)
        winston.debug('[Flesch Kincaid] Result: %s', result)
    }

    if(isNaN(result)){
        winston.error('[Flesch Kincaid] Failed for: %s', text)
        winston.error('[Flesch Kincaid] Sentences: %s | Words: %s | Syllables: %s', sentences, words, syllables)
        return 0
    }
    
    return result
}

module.exports = alg
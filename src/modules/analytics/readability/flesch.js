'use strict'

const winston = require('../../winston')
const flesch = require('flesch')
const syllable = require('syllable')
const utils = require('../utils')

const alg = (text) => {

    let sentences = utils.sentences(text).length
    let words = utils.words.all(text).length
    let syllables = syllable(text)

    let result = flesch({
        sentence: sentences,
        word: words,
        syllable: syllables
    });

    winston.debug('[Flesch] Text: %s', text)
    winston.debug('[Flesch] Sentences: %s', sentences)
    winston.debug('[Flesch] Words: %s', words)
    winston.debug('[Flesch] Syllables: %s', syllables)
    winston.debug('[Flesch] Result: %s', result)

    if(isNaN(result)){
        winston.error('[Flesch] Failed for: %s', text)
        winston.error('[Flesch] Sentences: %s | Words: %s | Syllables: %s', sentences, words, syllables)
        return 0
    }
    
    return result
}

module.exports = alg
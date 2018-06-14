'use strict'

const winston = require('../../winston')
const gunningFog = require('gunning-fog')
const utils = require('../utils')

const alg = (text) => {

    let sentences = utils.sentences(text).length
    let words = utils.words.all(text).length
    let complexPolysillabicWords = utils.words.polysillabic(text).length

    let result = gunningFog({
        sentence: sentences,
        word: words,
        complexPolysillabicWord: complexPolysillabicWords
    });

    winston.debug('[Gunning Fog] Text: %s', text)
    winston.debug('[Gunning Fog] Sentences: %s', sentences)
    winston.debug('[Gunning Fog] Words: %s', words)
    winston.debug('[Gunning Fog] Complex Polysillabic Words: %s', complexPolysillabicWords)
    winston.debug('[Gunning Fog] Result: %s', result)

    if(isNaN(result)){
        winston.error('[Gunning Fog] Failed for: %s', text)
        winston.error('[Gunning Fog] Sentences: %s | Words: %s | Complex Polysillabic Words: %s', sentences, words, complexPolysillabicWords)
        return 0
    }
    
    return result
}

module.exports = alg
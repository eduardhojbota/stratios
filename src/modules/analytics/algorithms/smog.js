'use strict'

const winston = require('../../winston')
const smog = require('smog-formula')
const utils = require('../../utils')

const alg = (text) => {

    let sentences = utils.sentences(text).length
    let words = utils.words.all(text).length
    let polysillabicWords = utils.words.polysillabic(text).length

    let result = smog({
        sentence: sentences,
        polysillabicWord: polysillabicWords
    });

    winston.debug('[Smog] Text: %s', text)
    winston.debug('[Smog] Sentences: %s', sentences)
    winston.debug('[Smog] Polysillabic Words: %s', polysillabicWords)
    winston.debug('[Smog] Result: %s', result)

    if(isNaN(result)){
        winston.error('[Smog] Failed for: %s', text)
        winston.error('[Smog] Words: %s | Polysillabic Words: %s', sentences, polysillabicWords)
        return 0
    }
    
    return result
}

module.exports = alg
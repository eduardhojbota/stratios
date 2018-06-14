'use strict'

const winston = require('../../winston')
const daleChallFormula = require('dale-chall-formula')
const utils = require('../../utils')

const alg = (text) => {

    let sentences = utils.sentences(text).length
    let words = utils.words.all(text).length
    let difficultWords = 0

    let result = daleChallFormula({
        sentence: sentences,
        word: words,
        difficultWord: difficultWords
    });

    winston.debug('[Dale Chall] Text: %s', text)
    winston.debug('[Dale Chall] Sentences: %s', sentences)
    winston.debug('[Dale Chall] Words: %s', words)
    winston.debug('[Dale Chall] Difficult words: %s', difficultWords)
    winston.debug('[Dale Chall] Result: %s', result)

    if(isNaN(result)){
        winston.error('[Dale Chall] Failed for: %s', text)
        winston.error('[Dale Chall] Sentences: %s | Words: %s | Difficult words: %s', sentences, words, difficultWords)
        return 0
    }
    
    return result
}

module.exports = alg
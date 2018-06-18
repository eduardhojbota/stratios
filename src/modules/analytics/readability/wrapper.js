'use strict'

const formulas = require('./formulas')
const winston = require('../../winston')
const utils = require('../utils')

const dependencies = {
    sentences: text => utils.sentences(text).length,
    words: text => utils.words.all(text).length,
    syllables: text => utils.syllables(text),
    polysyllabicWords: text => utils.words.polysyllabic(text).length,
    complexWords: text => utils.words.complex(text).length,
    characters: text => utils.characters(text).length,
    unfamiliarWords: text => utils.words.unfamiliar(text).length,
    difficultWords: text => utils.words.difficult(text).length,
}

const wrapper = (text, formula) => {

    let options = {};
    let winstonLevel = 'debug';

    formulas[formula].dependencies.forEach(dependency => {
        options[dependency] = dependencies[dependency](text)
    })
    
    let result = formulas[formula].formula(options)

    // if(text == "Eskimos of Alaska’s Arctic north coast have hunted whales for centuries. Survival has depended on killing the 80-footlong bowhead whales that swim from the Bering Sea to the ice-clogged Beaufort Sea each Spring. The Eskimos’ entire way of life has been centered around the hunt. But now that way of life is being threatened by America’s need for oil, say many Eskimos who hunt the whales. Huge amounts of oil may be beneath the Beaufort Sea. And oil companies want to begin drilling this spring. However, many Eskimos say severe storms and ice conditions make drilling dangerous…"){
    //     console.log(utils.words.complex(text))
    //     formulas[formula].dependencies.forEach(dependency => {
    //         console.log(dependencies[dependency](text))
    //     })
    // }

    if (isNaN(result)) {
        winstonLevel = 'error';
    }

    winston[winstonLevel]('[%s] Text: %s', formula, text)
    for (let key in options) {
        winston[winstonLevel]('[%s] %s: %s', formula, key, options[key])
    }
    winston[winstonLevel]('[%s] Result: %s', formula, result)

    return isNaN(result) ? 0 : result
}

module.exports = {
    flesch: (text) => wrapper(text, 'flesch'),
    fleschKincaid: (text) => wrapper(text, 'fleschKincaid'),
    gunningFog: (text) => wrapper(text, 'gunningFog'),
    colemanLiau: (text) => wrapper(text, 'colemanLiau'),
    smog: (text) => wrapper(text, 'smog'),
    automated: (text) => wrapper(text, 'automated'),
    daleChall: (text) => wrapper(text, 'daleChall'),
    spache: (text) => wrapper(text, 'spache')
}
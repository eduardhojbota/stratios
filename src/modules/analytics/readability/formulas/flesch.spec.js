let expect = require('chai').expect;

let flesch = require('./flesch')

describe('Formulas', function () {
    describe('#flesch()', function () {
        it('should calculate flesh score and be close to 116', function () {
            expect(flesch.formula({
                sentences: 1,
                words: 6,
                syllables: 6
            })).to.be.closeTo(116, 0.5);
        });
    });
});
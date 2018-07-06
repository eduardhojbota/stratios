let expect = require('chai').expect;

let automated = require('./automated')

describe('Formulas', function () {
    describe('#automated()', function () {
        it('should calculate automated score and be close to 5.1', function () {
            expect(automated.formula({
                sentences: 11,
                words: 153,
                characters: 635
            })).to.be.closeTo(5.1, 0.1);
        });
    });
});
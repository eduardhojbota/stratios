let expect = require('chai').expect;

let fleschKincaid = require('./fleschKincaid')

describe('Formulas', function () {
    describe('#fleschKincaid()', function () {
        it('should calculate flesh kinaid score and be close to 14', function () {
            expect(fleschKincaid.formula({
                sentences: 12,
                words: 194,
                syllables: 375 + 8
            })).to.be.closeTo(14, 0.1);
        });
    });
});
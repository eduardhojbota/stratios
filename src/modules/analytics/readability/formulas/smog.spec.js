let expect = require('chai').expect;

let smog = require('./smog')

describe('Formulas', function () {
    describe('#smog()', function () {
        it('should calculate smog score and be close to 14.55', function () {
            expect(smog.formula({
                sentences: 1,
                complexWords: 4,
            })).to.be.closeTo(14.55, 0.5);
        });
    });
});
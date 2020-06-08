let expect = require('chai').expect;

let spache = require('./spache')

describe('Formulas', function () {
    describe('#spache()', function () {
        it('should calculate spache score and be close to 4', function () {
            expect(spache.formula({
                words: 30,
                sentences: 2,
                unfamiliarWords: 6
            })).to.be.closeTo(4, 0.5);
        });
        it('should calculate spache score and be close to 2.4', function () {
            expect(spache.formula({
                words: 30,
                sentences: 2
            })).to.be.closeTo(2.4, 0.5);
        });
    });
});
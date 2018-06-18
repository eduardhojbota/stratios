let expect = require('chai').expect;

let daleChall = require('./daleChall')

describe('Formulas', function () {
    describe('#daleChall()', function () {
        it('should calculate dale-chall score and be close to 4.4', function () {
            expect(daleChall.formula({
                words: 30,
                sentences: 2,
                difficultWords: 6
            })).to.be.closeTo(4.4, 0.5);
        });
        it('should calculate dale-chall score and be close to 0.7', function () {
            expect(daleChall.formula({
                words: 30,
                sentences: 2
            })).to.be.closeTo(0.7, 0.5);
        });
    });
});
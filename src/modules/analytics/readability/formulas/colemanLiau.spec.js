let expect = require('chai').expect;

let colemanLiau = require('./colemanLiau')

describe('Formulas', function () {
    describe('#colemanLiau()', function () {
        it('should calculate coleman liau score and be close to 4.8', function () {
            expect(colemanLiau.formula({
                sentences: 9,
                words: 88,
                characters: 354
            })).to.be.closeTo(4.8, 0.1);
        });
    });
});
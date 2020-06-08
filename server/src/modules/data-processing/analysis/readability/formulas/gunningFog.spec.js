let expect = require('chai').expect;

let gunningFog = require('./gunningFog')

// Eskimos of Alaska’s Arctic north coast have hunted whales for centuries. Survival has depended on killing the 80-footlong bowhead whales that swim from the Bering Sea to the ice-clogged Beaufort Sea each Spring. The Eskimos’ entire way of life has been centered around the hunt. But now that way of life is being threatened by America’s need for oil, say many Eskimos who hunt the whales. Huge amounts of oil may be beneath the Beaufort Sea. And oil companies want to begin drilling this spring. However, many Eskimos say severe storms and ice conditions make drilling dangerous…

describe('Formulas', function () {
    describe('#gunningFog()', function () {
        it('should calculate gunning fog score and be close to 11.35', function () {
            expect(gunningFog.formula({
                sentences: 1,
                words: 13,
                complexWords: 2
            })).to.be.closeTo(11.35, 0.1);
        });
    });
});
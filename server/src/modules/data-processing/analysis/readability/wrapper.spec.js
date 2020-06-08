const expect = require('chai').expect;
const wrapper = require('./wrapper')
const mocks = require('./mocks')

let margins = {
    flesch: 5,
    fleschKincaid: 0.75,
    gunningFog: 0.5,
    colemanLiau: 0.5,
    smog: 0.5,
    automated: 0.5,
    daleChall: 0.5, // + 3.6365,
    spache: 0.5,
}

describe('Formullas wrapper', function () {
    Object.keys(mocks).forEach(category => {
        describe(category, function () {
            mocks[category].forEach((mock, index) => {
                describe('case ' + (index + 1) + ': ' + mock.text, function () {
                    Object.keys(wrapper).forEach(formula => {
                        describe('#' + formula + '()', function () {
                            it('should calculate ' + formula + ' score and be close to ' + mock.expected[formula], function () {
                                expect(wrapper[formula](mock.text)).to.be.closeTo(mock.expected[formula], margins[formula]);
                            });
                        })
                    });
                });
            });
        })
    })
});
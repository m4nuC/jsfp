const chai = require('chai');
const expect = chai.expect;

const jsfp = require('../dist/jsfp');

describe('Dist index', function() {
	it ('expose monads and utils module via properties', function (done) {
		expect(jsfp.monads).to.be.a('object');
		expect(jsfp.monads.Maybe.of).to.be.a('function');
		expect(jsfp.utils).to.be.a('object');
		expect(jsfp.utils.map).to.be.a('function');
		done()
	});
});
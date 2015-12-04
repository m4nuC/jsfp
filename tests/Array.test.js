'use strict';

const chai = require('chai');
const expect = chai.expect;

const monads = require('../src/monads');

// Test helpers
const tu = require('./helpers');

describe('Monadify/unmonadify Arrays', function() {
	// it ('should have a monafify and a unmonadify method that path and unpatch arrays', function (done) {
	// 	monads.monadifyArray();
	// 	expect([].of).to.be.a('function');
	// 	monads.monadifyRevert();
	// 	expect([].of).to.not.be.a('function');
	// 	done()
	// });

	// describe('Mondafied Arrays are monad because: ', function() {
	// 	beforeEach(monads.monadifyArray)
	// 	afterEach(monads.monadifyRevert)
	// 	it ('they a unit method', function (done) {
	// 		expect([].of).to.be.a('function');
	// 		expect([].of(1)).to.deep.equal([1]);
	// 		done()
	// 	});
	// 	it ('is mapable', function (done) {
	// 		expect([].map).to.be.a('function');
	// 		expect([1].map(tu.add1)).to.deep.equal([2]);
	// 		done()
	// 	});
	// 	it ('is chainable', function (done) {
	// 		const monoid = (value) => [value]
	// 		const m = ['test'];
	// 		expect(m.flatMap(monoid)[0]).to.equal('test');
	// 		done()
	// 	});
	// });
});
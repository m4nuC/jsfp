'use strict';

const chai = require('chai');
const expect = chai.expect;

const monads = require('../src/monads');

describe('Maybe', function() {
	describe('is monad because: ', function() {
		it ('has a unit method', function (done) {
			expect(monads.Maybe.of).to.be.a('function');
			done()
		});
		it ('is mapable', function (done) {
			const m = monads.Maybe.of('test')
			expect(m.map).to.be.a('function');
			done()
		});
		it ('is chainable', function (done) {
			const monoid = (value) => monads.Maybe.of(value)
			const m = monads.Maybe.of('test');
			expect(m.chain(monoid).__value).to.equal('test');
			done()
		});
	});
	describe('unit method (.of)', function() {
		it ('should exist has an instance method', function (done) {
			expect(monads.Maybe.of).to.be.a('function');
			done()
		});
		it ('should exist has an instance method', function (done) {
			const m = monads.Maybe.of('test')
			expect(m.of).to.be.a('function');
			done()
		});
	});
	describe('bind method (.map)', function() {
		it ('should exist has an instance method', function (done) {
			expect(monads.Maybe.of).to.be.a('function');
			done()
		});
		it ('should exist has an instance method', function (done) {
			const m = monads.Maybe.of('test')
			expect(m.of).to.be.a('function');
			done()
		});
		it ('should exist has an instance method', function (done) {
			const m = monads.Maybe.of('test')
			expect(m.of).to.be.a('function');
			done()
		});
	});
});
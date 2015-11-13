'use strict';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const utils = require('../src/utils');
const monads = require('../src/monads');

// Test helpers
const add = (a, b) => a + b;
const addd = (a, b, c) => a + b + c;
const adddd = (a, b, c, d, e, f, g, h) => a + b + c + d + e + f + g + h;
const add1 = (x) => x + 1;
const mult2 = (x) => x * 2;
const square = (x) => x * x;
const negate = (x) => -x;

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


describe('Compose', function() {
	it ('should compose 2 or more function', function (done) {
		let add1andMultAndSquare = utils.compose( square, mult2, add1 );
		expect(add1andMultAndSquare(1)).to.equal(16);
		let add1thenMult = utils.compose( mult2, add1 );
		expect(add1thenMult(1)).to.equal(4);
		done()
	});

	it ('compsotion order should go from the right to left', function (done) {
		let multThenSquare = utils.compose( square, mult2);
		expect(multThenSquare(1)).to.equal(4);
		expect(multThenSquare(1)).to.not.equal(2);
		done()
	});

	it ('compsotion order should go from the right to left', function (done) {
		let multThenSquare = utils.compose( square, mult2);
		expect(multThenSquare(1)).to.equal(4);
		expect(multThenSquare(1)).to.not.equal(2);
		done()
	});

	it ('allow to compose with composed funciton jsut the same', function (done) {
		let add1andMultAndSquare = utils.compose( square, mult2, add1 );
		expect(add1andMultAndSquare(1)).to.equal(16);
		let add1andMultAndSquareThenAdd1 = utils.compose( add1,add1andMultAndSquare);
		expect(add1andMultAndSquareThenAdd1(1)).to.equal(4);
		done()
	});
});

describe('Curry', function() {
	it ('should transform a function with an arity of 2 in a unary one', function (done) {
		let add2 = utils.curry( add )(2);
		expect(add2(1)).to.equal(3);
		done()
	});

	it ('should transform a function with an arity of 3 in a unary one', function (done) {
		let addALot = utils.curry(adddd)(1)(1)(1)(1)(1)(1)(1);
		expect(addALot(1)).to.equal(8);
		done()
	});

	it ('should transform a function with large arity in multiple unary ones', function (done) {
		let add2 = utils.curry(addd)(1)(1);
		expect(add2(1)).to.equal(3);
		done()
	});

	it ('should provide a short hand to apply first call right during invocation', function (done) {
		let add2 = utils.curry( add, 2 );
		expect(add2(1)).to.equal(3);
		done()
	});
});

describe('Map', function() {
	it ('should call map method on functors', function (done) {
		let maybe = monads.Maybe.of('test');
		let func = (x) => x;
		let spy = sinon.spy(maybe, 'map');

		utils.map(func, maybe);
		expect(spy).to.have.been.called;
		expect(spy).to.have.been.calledWith(func);

		maybe.map.restore();
		done()
	});

	it ('should call native array map method on arrays', function (done) {
		let arr = [1, 2, 3];
		let func = (x) => x + 1;
		let spy = sinon.spy(arr, 'map');

		let newArr = utils.map(func, arr);
		expect(spy).to.have.been.called;
		expect(newArr).to.deep.equal([2, 3, 4]);
		arr.map.restore();
		done()
	});

	it ('should call hack it\'s way into mapping object', function (done) {
		let obj = {1:1, 2:2, 3:3, 4:4};
		let func = (x) => x + 1;
		let newObj = utils.map(func, obj);
		expect(newObj).to.deep.equal({1:2, 2:3, 3:4, 4:5});
		done()
	});

	it ('should alway make copies of the structure', function (done) {
		let obj = {1:1, 2:2, 3:3, 4:4};
		let func = (x) => x + 1;
		let newObj = utils.map(func, obj);
		expect(obj).to.not.deep.equal(newObj)
		done()
	});
});
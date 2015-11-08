'use strict';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const fp = require('../src/utils').fp;

// Test helpers
const add = (a, b) => a + b;
const addd = (a, b, c) => a + b + c;
const adddd = (a, b, c, d, e, f, g, h) => a + b + c + d + e + f + g + h;
const add1 = (x) => x + 1;
const mult2 = (x) => x * 2;
const square = (x) => x * x;
const negate = (x) => -x;


describe('Compose', function() {
	it ('should compose 2 or more function from right to left', function (done) {
		let add1andMultAndSquare = fp.compose( square, mult2, add1 );
		expect(add1andMultAndSquare(1)).to.equal(16);
		done()
	});
});

describe('Curry', function() {
	it ('should transform a function with an arity of 2 in a unary one', function (done) {
		let add2 = fp.curry( add )(2);
		expect(add2(1)).to.equal(3);
		done()
	});

	it ('should transform a function with an arity of 3 in a unary one', function (done) {
		let addALot = fp.curry(adddd)(1)(1)(1)(1)(1)(1)(1);
		expect(addALot(1)).to.equal(8);
		done()
	});

	it ('should transform a function with large arity in multiple unary ones', function (done) {
		let add2 = fp.curry(addd)(1)(1);
		expect(add2(1)).to.equal(3);
		done()
	});

	it ('should provide a short hand to apply first call right during invocation', function (done) {
		let add2 = fp.curry( add, 2 );
		expect(add2(1)).to.equal(3);
		done()
	});
});

describe('Map', function() {
	it ('should call map method on functors', function (done) {
		let maybe = fp.Maybe.of('test');
		let func = (x) => x;
		let spy = sinon.spy(maybe, 'map');

		fp.map(func, maybe);
		expect(spy).to.have.been.called;
		expect(spy).to.have.been.calledWith(func);

		maybe.map.restore();
		done()
	});

	it ('should call native array map method on arrays', function (done) {
		let arr = [1, 2, 3];
		let func = (x) => x + 1;
		let spy = sinon.spy(arr, 'map');

		let newArr = fp.map(func, arr);
		expect(spy).to.have.been.called;
		expect(spy).to.have.been.calledWith(func);
		expect(newArr).to.deep.equal([2, 3, 4]);
		arr.map.restore();
		done()
	});

	it ('should call hack it\'s way into mapping object', function (done) {
		let obj = {1:1, 2:2, 3:3, 4:4};
		let func = (x) => x + 1;
		let newObj = fp.map(func, obj);
		expect(newObj).to.deep.equal({1:2, 2:3, 3:4, 4:5});
		done()
	});

	it ('should alway make copies of the structure', function (done) {
		let obj = {1:1, 2:2, 3:3, 4:4};
		let func = (x) => x + 1;
		let newObj = fp.map(func, obj);
		expect(obj).to.not.deep.equal(newObj)
		done()
	});
});
'use strict';

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const utils = require('../src/utils');
const monads = require('../src/monads');

// Test helpers
const tu = require('./helpers');

describe('Compose', function() {
	it ('should compose 2 or more function', function (done) {
		let add1andMultAndSquare = utils.compose( tu.square, tu.mult2, tu.add1 );
		expect(add1andMultAndSquare(1)).to.equal(16);
		let add1thenMult = utils.compose( tu.mult2, tu.add1 );
		expect(add1thenMult(1)).to.equal(4);
		done()
	});

	it ('compsotion order should go from the right to left', function (done) {
		let multThenSquare = utils.compose( tu.square, tu.mult2);
		expect(multThenSquare(1)).to.equal(4);
		expect(multThenSquare(1)).to.not.equal(2);
		done()
	});

	it ('compsotion order should go from the right to left', function (done) {
		let multThenSquare = utils.compose( tu.square, tu.mult2);
		expect(multThenSquare(1)).to.equal(4);
		expect(multThenSquare(1)).to.not.equal(2);
		done()
	});

	it ('allow to compose with composed function just the same', function (done) {
		let add1andMultAndSquare = utils.compose( tu.square, tu.mult2, tu.add1 );
		expect(add1andMultAndSquare(1)).to.equal(16);
		let add1andMultAndSquareThenAdd1 = utils.compose( tu.add1, add1andMultAndSquare);
		expect(add1andMultAndSquareThenAdd1(1)).to.equal(17);
		done()
	});
});

describe('Curry', function() {
	it ('should transform a function with an arity of 2 in a unary one', function (done) {
		let add2 = utils.curry( tu.add )(2);
		expect(add2(1)).to.equal(3);
		done()
	});

	it ('should transform a function with an arity of 3 in a unary one', function (done) {
		let addALot = utils.curry(tu.adddd)(1)(1)(1)(1)(1)(1)(1);
		expect(addALot(1)).to.equal(8);
		done()
	});

	it ('should transform a function with large arity in multiple unary ones', function (done) {
		let add2 = utils.curry(tu.addd)(1)(1);
		expect(add2(1)).to.equal(3);
		done()
	});

	it ('should provide a short hand to apply first call right during invocation', function (done) {
		let add2 = utils.curry( tu.add, 2 );
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
		let newObj = utils.map(tu.add1, obj);
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


describe('filtero', function() {
	it ('filter an object without mutation', function (done) {
		const obj = { testKey: 'testValue', testKey2: 'testValue2' };
		const filtered = utils.filtero((v, k) => true, obj);
		expect(filtered).not.to.equal(obj);
		done()
	});
	it ('filter method should be passed the value and the key of the object', function (done) {
		const obj = { testKey: 'testValue', testKey2: 'testValue2' };
		const filtered = utils.filtero((v, k) => v === 'testValue', obj);
		expect(filtered).to.deep.equal({ testKey: 'testValue'});

		const filtered2 = utils.filtero((v, k) => k === 'testKey', obj);
		expect(filtered2).to.deep.equal({ testKey: 'testValue'});
		done()
	});
});
'use strict';
const flatten =  module.exports.flatten = (arr) => [].concat.apply([], arr);

// Identity
const _Container = function (val) {
  this.__value = val;
}

_Container.prototype.map = function(f) {
  return _Container.of( f(this.__value));
}
_Container.prototype.count = function(f) {
  return this.__value ? this.__value.length : 0;
}

_Container.prototype.constructor.valueOf = () => '_Container';

// By overiding valueOf this would print this.val ..
_Container.prototype.valueOf = function() {
  return this.__value;
}

_Container.of = function(x) { return new _Container(x); };

const Identity = module.exports.Identity = (val) => new _Container(val);


// Monadify Arrays

module.exports.monadifyArray = () => {
  Array.of = Array.prototype.of = function (a) {
    return [a];
  };

  Array.prototype.flatMap = function (f) {
    return flatten(this.map(f));
  }

}



// Revert Monadification of Arrays

module.exports.monadifyRevert = () => {
  if (!Array.of) throw new Error('Array haven\'t been patched');
  // Save the original array
  delete Array.of;
  delete Array.prototype.of;
  delete Array.prototype.flatMap;
}

// MAYBE
const _Maybe = function (val) {
  _Container.call( this, val );
}
_Maybe.prototype = Object.create(_Container.prototype);
_Maybe.prototype.constructor = _Container;
_Maybe.of = _Maybe.prototype.of = function(x) { return new _Maybe(x); }
_Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}
_Maybe.prototype.map = function(f) {
  var ret = null;
  if( this.isNothing() ) {
    ret = _Maybe.of(null)
  } else {
    ret = _Maybe.of( f(this.__value));
  }
  return ret;
}

_Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
}

_Maybe.prototype.chain = function(f) {
  return this.map(f).join(); // or compose(join, map(f))(m)
}

const Maybe = module.exports.Maybe = _Maybe;

// Either(String, Number)
var Left = function(x) {
  this.__value = x;
}

Left.of = function(x) {
  return new Left(x);
}

Left.prototype.map = function(f) {
  return this;
}

var Right = function(x) {
  this.__value = x;
}

Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}
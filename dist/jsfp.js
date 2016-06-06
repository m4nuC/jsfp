(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/ombre/www/OpenSource/fp/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(1);
	var monads = __webpack_require__(2);

	module.exports = { utils: utils, monads: monads };

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict'

	// CURRY
	;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var curry = module.exports.curry = function (f) {
	  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    params[_key - 1] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    var fullArgs = [].concat(params, args);
	    return fullArgs.length === f.length ? f.apply(null, fullArgs) : curry.apply(null, [f].concat(_toConsumableArray(fullArgs)));
	  };
	};

	// COMPOSE
	var compose = module.exports.compose = function () {
	  for (var _len3 = arguments.length, fs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    fs[_key3] = arguments[_key3];
	  }

	  return function (x) {
	    var res = x;
	    for (var i = fs.length - 1; i >= 0; i--) {
	      res = fs[i].call(this, res);
	    };
	    return res;
	  };
	};

	// MAP
	module.exports.map = curry(function (f, a) {
	  if (a.constructor !== Array && a.constructor.valueOf() !== '_Container') {
	    return mapo(f, a);
	  }

	  if (a.constructor === Array) {
	    return a.map(function (item) {
	      return f(item);
	    });
	  }
	  return a.map(f);
	});

	// FILTER
	module.exports.filter = curry(function (f, a) {
	  return a.filter(f);
	});

	// MAP OBJECTS
	var mapo = module.exports.mapo = curry(function (f, object) {
	  var newObject = Object.assign({}, object);
	  Object.keys(newObject).map(function (key) {
	    newObject[key] = f(object[key], key);
	  });
	  return newObject;
	});

	// FILTER OBJECTS
	var filtero = module.exports.filtero = curry(function (f, object) {
	  var newObject = {};
	  Object.keys(object).filter(function (key) {
	    if (f(object[key], key)) {
	      newObject[key] = object[key];
	    }
	  });
	  return newObject;
	});

	// REDUCE OBJECTS
	var reduceo = module.exports.reduceo = curry(function (tranform, init, object) {
	  var keys = Object.keys(object);
	  var acc = init ? init : object[keys[0]];
	  keys.map(function (key) {
	    return tranform(object[key], acc);
	  });
	  return acc;
	});

	// FLATTEN
	var flatten = module.exports.flatten = function (arr) {
	  return [].concat.apply([], arr);
	};

	// DEEP FLATTEN
	var deepFlatten = module.exports.deepFlatten = function (arr, deep) {
	  // Since map() alway returns an array, we use flatten() to remove this array
	  return flatten(flatten(arr).map(function (item) {
	    return Array.isArray(item) ? deepFlatten(item) : item;
	  }));
	};

	// JOIN
	var join = module.exports.join = function (mma) {
	  if (mma.constructor.valueOf() == '_Container') {
	    mma.join();
	  }

	  mma.join();
	};

	//  OBJECT to ARRAY
	var oToA = module.exports.oToA = function (object) {
	  return Object.keys(object).map(function (key) {
	    return object[key];
	  });
	};

	//  ARRAY to OBJECT
	var aToO = module.exports.aToO = function (tranfrom, array) {
	  var obj = {};
	  array.map(function (key) {
	    return obj[key] = tranfrom(key);
	  });
	  return obj;
	};

	// CHAIN
	var chain = module.exports.chain = curry(function (f, m) {
	  return m.map(f).join();
	}); // or compose(join, map(f))(m)

	// EITHER
	var either = curry(function (f, g, e) {
	  switch (e.constructor) {
	    case Left:
	      return f(e.__value);
	    case Right:
	      return g(e.__value);
	  }
	});

	//  maybe :: b -> (a -> b) -> Maybe a -> b
	var maybe = module.exports.maybe = curry(function (x, f, m) {
	  if (m.isNothing()) {
	    return x;
	  } else {
	    return f(m.__value);
	  }
	});
	//const maybe = fp.curry((x, f, m) => m.length === 0 || m.isNothing &&m.isNothing() ? x : f(m.__value));

	var log = function log(x) {
	  console.dir(x);
	  return x;
	};

	// Apply inital value to each function in an array and return array of result (revers map)
	var rMap = curry(function (array, value) {
	  return array.map(function (f) {
	    return f(value);
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var flatten = module.exports.flatten = function (arr) {
	  return [].concat.apply([], arr);
	};

	// Identity
	var _Container = function _Container(val) {
	  this.__value = val;
	};

	_Container.prototype.map = function (f) {
	  return _Container.of(f(this.__value));
	};
	_Container.prototype.count = function (f) {
	  return this.__value ? this.__value.length : 0;
	};

	_Container.prototype.constructor.valueOf = function () {
	  return '_Container';
	};

	// By overiding valueOf this would print this.val ..
	_Container.prototype.valueOf = function () {
	  return this.__value;
	};

	_Container.of = function (x) {
	  return new _Container(x);
	};

	var Identity = module.exports.Identity = function (val) {
	  return new _Container(val);
	};

	// Monadify Arrays

	module.exports.monadifyArray = function () {
	  Array.of = Array.prototype.of = function (a) {
	    return [a];
	  };

	  Array.prototype.flatMap = function (f) {
	    return flatten(this.map(f));
	  };

	  Array.prototype.join = function (f) {
	    return flatten(this.map(f));
	  };
	};

	// Revert Monadification of Arrays

	module.exports.monadifyRevert = function () {
	  if (!Array.of) throw new Error('Array haven\'t been patched');
	  // Save the original array
	  delete Array.of;
	  delete Array.prototype.of;
	  delete Array.prototype.flatMap;
	};

	// MAYBE
	var _Maybe = function _Maybe(val) {
	  _Container.call(this, val);
	};
	_Maybe.prototype = Object.create(_Container.prototype);
	_Maybe.prototype.constructor = _Container;
	_Maybe.of = _Maybe.prototype.of = function (x) {
	  return new _Maybe(x);
	};
	_Maybe.prototype.isNothing = function () {
	  return this.__value === null || this.__value === undefined;
	};
	_Maybe.prototype.map = function (f) {
	  var ret = null;
	  if (this.isNothing()) {
	    ret = _Maybe.of(null);
	  } else {
	    ret = _Maybe.of(f(this.__value));
	  }
	  return ret;
	};

	_Maybe.prototype.join = function () {
	  return this.isNothing() ? Maybe.of(null) : this.__value;
	};

	_Maybe.prototype.chain = function (f) {
	  return this.map(f).join(); // or compose(join, map(f))(m)
	};

	var Maybe = module.exports.Maybe = _Maybe;

	// Either(String, Number)
	var Left = function Left(x) {
	  this.__value = x;
	};

	Left.of = function (x) {
	  return new Left(x);
	};

	Left.prototype.map = function (f) {
	  return this;
	};

	var Right = function Right(x) {
	  this.__value = x;
	};

	Right.of = function (x) {
	  return new Right(x);
	};

	Right.prototype.map = function (f) {
	  return Right.of(f(this.__value));
	};

/***/ }
/******/ ])));
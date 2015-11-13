'use strict';

// CURRY
const curry = module.exports.curry = (f, ...params) => {
  return (...args) => {
    let fullArgs = [...params, ...args];
    return fullArgs.length  === f.length ?
      f.apply(null, fullArgs) :
      curry.apply(null, [f, ...fullArgs]);
  }
}

// COMPOSE
const compose = module.exports.compose = function(...fs) {
  return function(x) {
    var res = x;
    for (var i = fs.length - 1; i >= 0; i--) {
      res = fs[i].call(this, res);
    };
    return res;
  }
};

// MAP
module.exports.map = curry((f, a) => {
  if (a.constructor !== Array && a.constructor.valueOf() !== '_Container') {
    return mapo(f, a);
  }

  if (a.constructor === Array) {
    return a.map((item) => {
      return f(item);
    })
  }
  return a.map(f);
});


// FILTER
module.exports.filter = curry((f, a) => {
  return a.filter(f);
});

// MAP OBJECTS
const mapo = module.exports.mapo = curry((f, object) => {
  let newObject = Object.assign({}, object);
  Object.keys(newObject).map((key) => {
    newObject[key] = f(object[key], key);
  });
  return newObject;
})

// FILTER OBJECTS
const filtero = module.exports.filtero = curry((f, object) => {
  let newObject = {};
  Object.keys(object).filter((key) => {
    if (f(object[key])) {
      newObject[key] = object[key]
    }
  });
  return newObject;
})

// FLATTEN
const flatten =  module.exports.flatten = (arr) => [].concat.apply([], arr);

// JOIN
const join = module.exports.join = (mma) => {
  if ( mma.constructor.valueOf() == '_Container') {
    mma.join();
  }

  mma.join();
}


//  OBJECT to ARRAY
const oToA = module.exports.oToA = (object) => Object.keys(object).map((key) => object[key]);

//  ARRAY to OBJECT
const aToO = module.exports.aToO = (tranfrom, array) => {
  let obj = {};
  array.map((key) => obj[key] = tranfrom(key));
  return obj;
}

// CHAIN
const chain = module.exports.chain = curry((f, m) => m.map(f).join()); // or compose(join, map(f))(m)

// EITHER
var either = curry((f, g, e) => {
  switch(e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
  }
});

//  maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = module.exports.maybe = curry(function(x, f, m) {
  if (m.isNothing() ) {
    return x
  } else {
    return f(m.__value)
  }
});
//const maybe = fp.curry((x, f, m) => m.length === 0 || m.isNothing &&m.isNothing() ? x : f(m.__value));

const log = (x) => {
  console.dir(x);
  return x;
}

// Apply inital value to each function in an array and return array of result (revers map)
const rMap = curry((array, value) => {
  return array.map((f) => f(value));
});
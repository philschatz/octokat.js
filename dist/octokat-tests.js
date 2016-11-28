/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);

	describe('Root construction', function() {
	  return it('can be instantiated via window.Octokat', function() {
	    if (!(typeof window.Octokat === "function" ? window.Octokat() : void 0)) {
	      throw new Error('window.Octokat is not a function');
	    }
	  });
	});

	mocha.checkLeaks();

	window.sepia.fixtureDir('node_modules/octokat-fixtures/fixtures');

	window.sepia.start();

	if (window.mochaPhantomJS) {
	  mochaPhantomJS.run();
	} else {
	  mocha.run();
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);

	__webpack_require__(49);

	__webpack_require__(59);

	__webpack_require__(60);

	__webpack_require__(61);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Octokat, REPO_NAME, REPO_USER, TOKEN, assert, expect, ref, ref1;

	ref = __webpack_require__(4), assert = ref.assert, expect = ref.expect;

	ref1 = __webpack_require__(44), Octokat = ref1.Octokat, TOKEN = ref1.TOKEN, REPO_USER = ref1.REPO_USER, REPO_NAME = ref1.REPO_NAME;

	describe('Event Emitter', function() {
	  return it('emits when a request begins and when it completes', function(done) {
	    var client, emittedStart, emitter;
	    emittedStart = false;
	    emitter = function(name, id, arg, status, rate) {
	      var method, path;
	      method = arg.method, path = arg.path;
	      expect(method).to.equal('GET');
	      expect(path).to.be.a('string');
	      switch (name) {
	        case 'start':
	          return emittedStart = true;
	        case 'end':
	          expect(emittedStart).to.be["true"];
	          expect(status).to.equal(200);
	          expect(rate.remaining).to.be.gt(0);
	          expect(rate.limit).to.be.gt(0);
	          expect(rate.reset).to.be.gt(0);
	          return done();
	        default:
	          return done('Woah! odd event name ' + name);
	      }
	    };
	    client = new Octokat({
	      token: TOKEN,
	      emitter: emitter
	    });
	    client.repos(REPO_USER, REPO_NAME).fetch().then(function(info) {
	      return expect(info).to.not.be["null"];
	    });
	    return null;
	  });
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var used = []
	  , exports = module.exports = {};

	/*!
	 * Chai version
	 */

	exports.version = '3.5.0';

	/*!
	 * Assertion Error
	 */

	exports.AssertionError = __webpack_require__(6);

	/*!
	 * Utils for plugins (not exported)
	 */

	var util = __webpack_require__(7);

	/**
	 * # .use(function)
	 *
	 * Provides a way to extend the internals of Chai
	 *
	 * @param {Function}
	 * @returns {this} for chaining
	 * @api public
	 */

	exports.use = function (fn) {
	  if (!~used.indexOf(fn)) {
	    fn(this, util);
	    used.push(fn);
	  }

	  return this;
	};

	/*!
	 * Utility Functions
	 */

	exports.util = util;

	/*!
	 * Configuration
	 */

	var config = __webpack_require__(20);
	exports.config = config;

	/*!
	 * Primary `Assertion` prototype
	 */

	var assertion = __webpack_require__(39);
	exports.use(assertion);

	/*!
	 * Core Assertions
	 */

	var core = __webpack_require__(40);
	exports.use(core);

	/*!
	 * Expect interface
	 */

	var expect = __webpack_require__(41);
	exports.use(expect);

	/*!
	 * Should interface
	 */

	var should = __webpack_require__(42);
	exports.use(should);

	/*!
	 * Assert interface
	 */

	var assert = __webpack_require__(43);
	exports.use(assert);


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*!
	 * assertion-error
	 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
	 * MIT Licensed
	 */

	/*!
	 * Return a function that will copy properties from
	 * one object to another excluding any originally
	 * listed. Returned function will create a new `{}`.
	 *
	 * @param {String} excluded properties ...
	 * @return {Function}
	 */

	function exclude () {
	  var excludes = [].slice.call(arguments);

	  function excludeProps (res, obj) {
	    Object.keys(obj).forEach(function (key) {
	      if (!~excludes.indexOf(key)) res[key] = obj[key];
	    });
	  }

	  return function extendExclude () {
	    var args = [].slice.call(arguments)
	      , i = 0
	      , res = {};

	    for (; i < args.length; i++) {
	      excludeProps(res, args[i]);
	    }

	    return res;
	  };
	};

	/*!
	 * Primary Exports
	 */

	module.exports = AssertionError;

	/**
	 * ### AssertionError
	 *
	 * An extension of the JavaScript `Error` constructor for
	 * assertion and validation scenarios.
	 *
	 * @param {String} message
	 * @param {Object} properties to include (optional)
	 * @param {callee} start stack function (optional)
	 */

	function AssertionError (message, _props, ssf) {
	  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
	    , props = extend(_props || {});

	  // default values
	  this.message = message || 'Unspecified AssertionError';
	  this.showDiff = false;

	  // copy from properties
	  for (var key in props) {
	    this[key] = props[key];
	  }

	  // capture stack trace
	  ssf = ssf || arguments.callee;
	  if (ssf && Error.captureStackTrace) {
	    Error.captureStackTrace(this, ssf);
	  } else {
	    try {
	      throw new Error();
	    } catch(e) {
	      this.stack = e.stack;
	    }
	  }
	}

	/*!
	 * Inherit from Error.prototype
	 */

	AssertionError.prototype = Object.create(Error.prototype);

	/*!
	 * Statically set name
	 */

	AssertionError.prototype.name = 'AssertionError';

	/*!
	 * Ensure correct constructor
	 */

	AssertionError.prototype.constructor = AssertionError;

	/**
	 * Allow errors to be converted to JSON for static transfer.
	 *
	 * @param {Boolean} include stack (default: `true`)
	 * @return {Object} object that can be `JSON.stringify`
	 */

	AssertionError.prototype.toJSON = function (stack) {
	  var extend = exclude('constructor', 'toJSON', 'stack')
	    , props = extend({ name: this.name }, this);

	  // include stack if exists and not turned off
	  if (false !== stack && this.stack) {
	    props.stack = this.stack;
	  }

	  return props;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Main exports
	 */

	var exports = module.exports = {};

	/*!
	 * test utility
	 */

	exports.test = __webpack_require__(8);

	/*!
	 * type utility
	 */

	exports.type = __webpack_require__(10);

	/*!
	 * expectTypes utility
	 */
	exports.expectTypes = __webpack_require__(12);

	/*!
	 * message utility
	 */

	exports.getMessage = __webpack_require__(13);

	/*!
	 * actual utility
	 */

	exports.getActual = __webpack_require__(14);

	/*!
	 * Inspect util
	 */

	exports.inspect = __webpack_require__(15);

	/*!
	 * Object Display util
	 */

	exports.objDisplay = __webpack_require__(19);

	/*!
	 * Flag utility
	 */

	exports.flag = __webpack_require__(9);

	/*!
	 * Flag transferring utility
	 */

	exports.transferFlags = __webpack_require__(21);

	/*!
	 * Deep equal utility
	 */

	exports.eql = __webpack_require__(22);

	/*!
	 * Deep path value
	 */

	exports.getPathValue = __webpack_require__(30);

	/*!
	 * Deep path info
	 */

	exports.getPathInfo = __webpack_require__(31);

	/*!
	 * Check if a property exists
	 */

	exports.hasProperty = __webpack_require__(32);

	/*!
	 * Function name
	 */

	exports.getName = __webpack_require__(16);

	/*!
	 * add Property
	 */

	exports.addProperty = __webpack_require__(33);

	/*!
	 * add Method
	 */

	exports.addMethod = __webpack_require__(34);

	/*!
	 * overwrite Property
	 */

	exports.overwriteProperty = __webpack_require__(35);

	/*!
	 * overwrite Method
	 */

	exports.overwriteMethod = __webpack_require__(36);

	/*!
	 * Add a chainable method
	 */

	exports.addChainableMethod = __webpack_require__(37);

	/*!
	 * Overwrite chainable method
	 */

	exports.overwriteChainableMethod = __webpack_require__(38);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - test utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependancies
	 */

	var flag = __webpack_require__(9);

	/**
	 * # test(object, expression)
	 *
	 * Test and object for expression.
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name test
	 */

	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , expr = args[0];
	  return negate ? !expr : expr;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### flag(object, key, [value])
	 *
	 * Get or set a flag value on an object. If a
	 * value is provided it will be set, else it will
	 * return the currently set value or `undefined` if
	 * the value is not set.
	 *
	 *     utils.flag(this, 'foo', 'bar'); // setter
	 *     utils.flag(this, 'foo'); // getter, returns `bar`
	 *
	 * @param {Object} object constructed Assertion
	 * @param {String} key
	 * @param {Mixed} value (optional)
	 * @namespace Utils
	 * @name flag
	 * @api private
	 */

	module.exports = function (obj, key, value) {
	  var flags = obj.__flags || (obj.__flags = Object.create(null));
	  if (arguments.length === 3) {
	    flags[key] = value;
	  } else {
	    return flags[key];
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Primary Exports
	 */

	var exports = module.exports = getType;

	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	var objectTypeRegexp = /^\[object (.*)\]$/;

	function getType(obj) {
	  var type = Object.prototype.toString.call(obj).match(objectTypeRegexp)[1].toLowerCase();
	  // Let "new String('')" return 'object'
	  if (typeof Promise === 'function' && obj instanceof Promise) return 'promise';
	  // PhantomJS has type "DOMWindow" for null
	  if (obj === null) return 'null';
	  // PhantomJS has type "DOMWindow" for undefined
	  if (obj === undefined) return 'undefined';
	  return type;
	}

	exports.Library = Library;

	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */

	function Library() {
	  if (!(this instanceof Library)) return new Library();
	  this.tests = {};
	}

	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */

	Library.prototype.of = getType;

	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */

	Library.prototype.define = function(type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};

	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */

	Library.prototype.test = function(obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];

	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - expectTypes utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### expectTypes(obj, types)
	 *
	 * Ensures that the object being tested against is of a valid type.
	 *
	 *     utils.expectTypes(this, ['array', 'object', 'string']);
	 *
	 * @param {Mixed} obj constructed Assertion
	 * @param {Array} type A list of allowed types for this assertion
	 * @namespace Utils
	 * @name expectTypes
	 * @api public
	 */

	var AssertionError = __webpack_require__(6);
	var flag = __webpack_require__(9);
	var type = __webpack_require__(10);

	module.exports = function (obj, types) {
	  var obj = flag(obj, 'object');
	  types = types.map(function (t) { return t.toLowerCase(); });
	  types.sort();

	  // Transforms ['lorem', 'ipsum'] into 'a lirum, or an ipsum'
	  var str = types.map(function (t, index) {
	    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
	    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
	    return or + art + ' ' + t;
	  }).join(', ');

	  if (!types.some(function (expected) { return type(obj) === expected; })) {
	    throw new AssertionError(
	      'object tested must be ' + str + ', but ' + type(obj) + ' given'
	    );
	  }
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - message composition utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependancies
	 */

	var flag = __webpack_require__(9)
	  , getActual = __webpack_require__(14)
	  , inspect = __webpack_require__(15)
	  , objDisplay = __webpack_require__(19);

	/**
	 * ### .getMessage(object, message, negateMessage)
	 *
	 * Construct the error message based on flags
	 * and template tags. Template tags will return
	 * a stringified inspection of the object referenced.
	 *
	 * Message template tags:
	 * - `#{this}` current asserted object
	 * - `#{act}` actual value
	 * - `#{exp}` expected value
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getMessage
	 * @api public
	 */

	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , val = flag(obj, 'object')
	    , expected = args[3]
	    , actual = getActual(obj, args)
	    , msg = negate ? args[2] : args[1]
	    , flagMsg = flag(obj, 'message');

	  if(typeof msg === "function") msg = msg();
	  msg = msg || '';
	  msg = msg
	    .replace(/#\{this\}/g, function () { return objDisplay(val); })
	    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
	    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

	  return flagMsg ? flagMsg + ': ' + msg : msg;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*!
	 * Chai - getActual utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * # getActual(object, [actual])
	 *
	 * Returns the `actual` value for an Assertion
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getActual
	 */

	module.exports = function (obj, args) {
	  return args.length > 4 ? args[4] : obj._obj;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// This is (almost) directly from Node.js utils
	// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

	var getName = __webpack_require__(16);
	var getProperties = __webpack_require__(17);
	var getEnumerableProperties = __webpack_require__(18);

	module.exports = inspect;

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
	 *    properties of objects.
	 * @param {Number} depth Depth in which to descend in object. Default is 2.
	 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
	 *    output. Default is false (no coloring).
	 * @namespace Utils
	 * @name inspect
	 */
	function inspect(obj, showHidden, depth, colors) {
	  var ctx = {
	    showHidden: showHidden,
	    seen: [],
	    stylize: function (str) { return str; }
	  };
	  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
	}

	// Returns true if object is a DOM element.
	var isDOMElement = function (object) {
	  if (typeof HTMLElement === 'object') {
	    return object instanceof HTMLElement;
	  } else {
	    return object &&
	      typeof object === 'object' &&
	      object.nodeType === 1 &&
	      typeof object.nodeName === 'string';
	  }
	};

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (value && typeof value.inspect === 'function' &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes);
	    if (typeof ret !== 'string') {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // If this is a DOM element, try to get the outer HTML.
	  if (isDOMElement(value)) {
	    if ('outerHTML' in value) {
	      return value.outerHTML;
	      // This value does not have an outerHTML attribute,
	      //   it could still be an XML element
	    } else {
	      // Attempt to serialize it
	      try {
	        if (document.xmlVersion) {
	          var xmlSerializer = new XMLSerializer();
	          return xmlSerializer.serializeToString(value);
	        } else {
	          // Firefox 11- do not support outerHTML
	          //   It does, however, support innerHTML
	          //   Use the following to render the element
	          var ns = "http://www.w3.org/1999/xhtml";
	          var container = document.createElementNS(ns, '_');

	          container.appendChild(value.cloneNode(false));
	          html = container.innerHTML
	            .replace('><', '>' + value.innerHTML + '<');
	          container.innerHTML = '';
	          return html;
	        }
	      } catch (err) {
	        // This could be a non-native DOM implementation,
	        //   continue with the normal flow:
	        //   printing the element as if it is an object.
	      }
	    }
	  }

	  // Look up the keys of the object.
	  var visibleKeys = getEnumerableProperties(value);
	  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

	  // Some type of object without properties can be shortcutted.
	  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
	  // a `stack` plus `description` property; ignore those for consistency.
	  if (keys.length === 0 || (isError(value) && (
	      (keys.length === 1 && keys[0] === 'stack') ||
	      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
	     ))) {
	    if (typeof value === 'function') {
	      var name = getName(value);
	      var nameSuffix = name ? ': ' + name : '';
	      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (typeof value === 'function') {
	    var name = getName(value);
	    var nameSuffix = name ? ': ' + name : '';
	    base = ' [Function' + nameSuffix + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    return formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  switch (typeof value) {
	    case 'undefined':
	      return ctx.stylize('undefined', 'undefined');

	    case 'string':
	      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                               .replace(/'/g, "\\'")
	                                               .replace(/\\"/g, '"') + '\'';
	      return ctx.stylize(simple, 'string');

	    case 'number':
	      if (value === 0 && (1/value) === -Infinity) {
	        return ctx.stylize('-0', 'number');
	      }
	      return ctx.stylize('' + value, 'number');

	    case 'boolean':
	      return ctx.stylize('' + value, 'boolean');
	  }
	  // For some reason typeof null is "object", so special case here.
	  if (value === null) {
	    return ctx.stylize('null', 'null');
	  }
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str;
	  if (value.__lookupGetter__) {
	    if (value.__lookupGetter__(key)) {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Getter/Setter]', 'special');
	      } else {
	        str = ctx.stylize('[Getter]', 'special');
	      }
	    } else {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Setter]', 'special');
	      }
	    }
	  }
	  if (visibleKeys.indexOf(key) < 0) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(value[key]) < 0) {
	      if (recurseTimes === null) {
	        str = formatValue(ctx, value[key], null);
	      } else {
	        str = formatValue(ctx, value[key], recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (typeof name === 'undefined') {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	function isArray(ar) {
	  return Array.isArray(ar) ||
	         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
	}

	function isRegExp(re) {
	  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
	}

	function isDate(d) {
	  return typeof d === 'object' && objectToString(d) === '[object Date]';
	}

	function isError(e) {
	  return typeof e === 'object' && objectToString(e) === '[object Error]';
	}

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * Chai - getName utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * # getName(func)
	 *
	 * Gets the name of a function, in a cross-browser way.
	 *
	 * @param {Function} a function (usually a constructor)
	 * @namespace Utils
	 * @name getName
	 */

	module.exports = function (func) {
	  if (func.name) return func.name;

	  var match = /^\s?function ([^(]*)\(/.exec(func);
	  return match && match[1] ? match[1] : "";
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*!
	 * Chai - getProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### .getProperties(object)
	 *
	 * This allows the retrieval of property names of an object, enumerable or not,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getProperties
	 * @api public
	 */

	module.exports = function getProperties(object) {
	  var result = Object.getOwnPropertyNames(object);

	  function addProperty(property) {
	    if (result.indexOf(property) === -1) {
	      result.push(property);
	    }
	  }

	  var proto = Object.getPrototypeOf(object);
	  while (proto !== null) {
	    Object.getOwnPropertyNames(proto).forEach(addProperty);
	    proto = Object.getPrototypeOf(proto);
	  }

	  return result;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*!
	 * Chai - getEnumerableProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### .getEnumerableProperties(object)
	 *
	 * This allows the retrieval of enumerable property names of an object,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getEnumerableProperties
	 * @api public
	 */

	module.exports = function getEnumerableProperties(object) {
	  var result = [];
	  for (var name in object) {
	    result.push(name);
	  }
	  return result;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependancies
	 */

	var inspect = __webpack_require__(15);
	var config = __webpack_require__(20);

	/**
	 * ### .objDisplay (object)
	 *
	 * Determines if an object or an array matches
	 * criteria to be inspected in-line for error
	 * messages or should be truncated.
	 *
	 * @param {Mixed} javascript object to inspect
	 * @name objDisplay
	 * @namespace Utils
	 * @api public
	 */

	module.exports = function (obj) {
	  var str = inspect(obj)
	    , type = Object.prototype.toString.call(obj);

	  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
	    if (type === '[object Function]') {
	      return !obj.name || obj.name === ''
	        ? '[Function]'
	        : '[Function: ' + obj.name + ']';
	    } else if (type === '[object Array]') {
	      return '[ Array(' + obj.length + ') ]';
	    } else if (type === '[object Object]') {
	      var keys = Object.keys(obj)
	        , kstr = keys.length > 2
	          ? keys.splice(0, 2).join(', ') + ', ...'
	          : keys.join(', ');
	      return '{ Object (' + kstr + ') }';
	    } else {
	      return str;
	    }
	  } else {
	    return str;
	  }
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {

	  /**
	   * ### config.includeStack
	   *
	   * User configurable property, influences whether stack trace
	   * is included in Assertion error message. Default of false
	   * suppresses stack trace in the error message.
	   *
	   *     chai.config.includeStack = true;  // enable stack on error
	   *
	   * @param {Boolean}
	   * @api public
	   */

	   includeStack: false,

	  /**
	   * ### config.showDiff
	   *
	   * User configurable property, influences whether or not
	   * the `showDiff` flag should be included in the thrown
	   * AssertionErrors. `false` will always be `false`; `true`
	   * will be true when the assertion has requested a diff
	   * be shown.
	   *
	   * @param {Boolean}
	   * @api public
	   */

	  showDiff: true,

	  /**
	   * ### config.truncateThreshold
	   *
	   * User configurable property, sets length threshold for actual and
	   * expected values in assertion errors. If this threshold is exceeded, for
	   * example for large data structures, the value is replaced with something
	   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
	   *
	   * Set it to zero if you want to disable truncating altogether.
	   *
	   * This is especially userful when doing assertions on arrays: having this
	   * set to a reasonable large value makes the failure messages readily
	   * inspectable.
	   *
	   *     chai.config.truncateThreshold = 0;  // disable truncating
	   *
	   * @param {Number}
	   * @api public
	   */

	  truncateThreshold: 40

	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*!
	 * Chai - transferFlags utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### transferFlags(assertion, object, includeAll = true)
	 *
	 * Transfer all the flags for `assertion` to `object`. If
	 * `includeAll` is set to `false`, then the base Chai
	 * assertion flags (namely `object`, `ssfi`, and `message`)
	 * will not be transferred.
	 *
	 *
	 *     var newAssertion = new Assertion();
	 *     utils.transferFlags(assertion, newAssertion);
	 *
	 *     var anotherAsseriton = new Assertion(myObj);
	 *     utils.transferFlags(assertion, anotherAssertion, false);
	 *
	 * @param {Assertion} assertion the assertion to transfer the flags from
	 * @param {Object} object the object to transfer the flags to; usually a new assertion
	 * @param {Boolean} includeAll
	 * @namespace Utils
	 * @name transferFlags
	 * @api private
	 */

	module.exports = function (assertion, object, includeAll) {
	  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

	  if (!object.__flags) {
	    object.__flags = Object.create(null);
	  }

	  includeAll = arguments.length === 3 ? includeAll : true;

	  for (var flag in flags) {
	    if (includeAll ||
	        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
	      object.__flags[flag] = flags[flag];
	    }
	  }
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * deep-eql
	 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependencies
	 */

	var type = __webpack_require__(24);

	/*!
	 * Buffer.isBuffer browser shim
	 */

	var Buffer;
	try { Buffer = __webpack_require__(26).Buffer; }
	catch(ex) {
	  Buffer = {};
	  Buffer.isBuffer = function() { return false; }
	}

	/*!
	 * Primary Export
	 */

	module.exports = deepEqual;

	/**
	 * Assert super-strict (egal) equality between
	 * two objects of any type.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @param {Array} memoised (optional)
	 * @return {Boolean} equal match
	 */

	function deepEqual(a, b, m) {
	  if (sameValue(a, b)) {
	    return true;
	  } else if ('date' === type(a)) {
	    return dateEqual(a, b);
	  } else if ('regexp' === type(a)) {
	    return regexpEqual(a, b);
	  } else if (Buffer.isBuffer(a)) {
	    return bufferEqual(a, b);
	  } else if ('arguments' === type(a)) {
	    return argumentsEqual(a, b, m);
	  } else if (!typeEqual(a, b)) {
	    return false;
	  } else if (('object' !== type(a) && 'object' !== type(b))
	  && ('array' !== type(a) && 'array' !== type(b))) {
	    return sameValue(a, b);
	  } else {
	    return objectEqual(a, b, m);
	  }
	}

	/*!
	 * Strict (egal) equality test. Ensures that NaN always
	 * equals NaN and `-0` does not equal `+0`.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} equal match
	 */

	function sameValue(a, b) {
	  if (a === b) return a !== 0 || 1 / a === 1 / b;
	  return a !== a && b !== b;
	}

	/*!
	 * Compare the types of two given objects and
	 * return if they are equal. Note that an Array
	 * has a type of `array` (not `object`) and arguments
	 * have a type of `arguments` (not `array`/`object`).
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */

	function typeEqual(a, b) {
	  return type(a) === type(b);
	}

	/*!
	 * Compare two Date objects by asserting that
	 * the time values are equal using `saveValue`.
	 *
	 * @param {Date} a
	 * @param {Date} b
	 * @return {Boolean} result
	 */

	function dateEqual(a, b) {
	  if ('date' !== type(b)) return false;
	  return sameValue(a.getTime(), b.getTime());
	}

	/*!
	 * Compare two regular expressions by converting them
	 * to string and checking for `sameValue`.
	 *
	 * @param {RegExp} a
	 * @param {RegExp} b
	 * @return {Boolean} result
	 */

	function regexpEqual(a, b) {
	  if ('regexp' !== type(b)) return false;
	  return sameValue(a.toString(), b.toString());
	}

	/*!
	 * Assert deep equality of two `arguments` objects.
	 * Unfortunately, these must be sliced to arrays
	 * prior to test to ensure no bad behavior.
	 *
	 * @param {Arguments} a
	 * @param {Arguments} b
	 * @param {Array} memoize (optional)
	 * @return {Boolean} result
	 */

	function argumentsEqual(a, b, m) {
	  if ('arguments' !== type(b)) return false;
	  a = [].slice.call(a);
	  b = [].slice.call(b);
	  return deepEqual(a, b, m);
	}

	/*!
	 * Get enumerable properties of a given object.
	 *
	 * @param {Object} a
	 * @return {Array} property names
	 */

	function enumerable(a) {
	  var res = [];
	  for (var key in a) res.push(key);
	  return res;
	}

	/*!
	 * Simple equality for flat iterable objects
	 * such as Arrays or Node.js buffers.
	 *
	 * @param {Iterable} a
	 * @param {Iterable} b
	 * @return {Boolean} result
	 */

	function iterableEqual(a, b) {
	  if (a.length !==  b.length) return false;

	  var i = 0;
	  var match = true;

	  for (; i < a.length; i++) {
	    if (a[i] !== b[i]) {
	      match = false;
	      break;
	    }
	  }

	  return match;
	}

	/*!
	 * Extension to `iterableEqual` specifically
	 * for Node.js Buffers.
	 *
	 * @param {Buffer} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */

	function bufferEqual(a, b) {
	  if (!Buffer.isBuffer(b)) return false;
	  return iterableEqual(a, b);
	}

	/*!
	 * Block for `objectEqual` ensuring non-existing
	 * values don't get in.
	 *
	 * @param {Mixed} object
	 * @return {Boolean} result
	 */

	function isValue(a) {
	  return a !== null && a !== undefined;
	}

	/*!
	 * Recursively check the equality of two objects.
	 * Once basic sameness has been established it will
	 * defer to `deepEqual` for each enumerable key
	 * in the object.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */

	function objectEqual(a, b, m) {
	  if (!isValue(a) || !isValue(b)) {
	    return false;
	  }

	  if (a.prototype !== b.prototype) {
	    return false;
	  }

	  var i;
	  if (m) {
	    for (i = 0; i < m.length; i++) {
	      if ((m[i][0] === a && m[i][1] === b)
	      ||  (m[i][0] === b && m[i][1] === a)) {
	        return true;
	      }
	    }
	  } else {
	    m = [];
	  }

	  try {
	    var ka = enumerable(a);
	    var kb = enumerable(b);
	  } catch (ex) {
	    return false;
	  }

	  ka.sort();
	  kb.sort();

	  if (!iterableEqual(ka, kb)) {
	    return false;
	  }

	  m.push([ a, b ]);

	  var key;
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], m)) {
	      return false;
	    }
	  }

	  return true;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);


/***/ },
/* 25 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Primary Exports
	 */

	var exports = module.exports = getType;

	/*!
	 * Detectable javascript natives
	 */

	var natives = {
	    '[object Array]': 'array'
	  , '[object RegExp]': 'regexp'
	  , '[object Function]': 'function'
	  , '[object Arguments]': 'arguments'
	  , '[object Date]': 'date'
	};

	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */

	function getType (obj) {
	  var str = Object.prototype.toString.call(obj);
	  if (natives[str]) return natives[str];
	  if (obj === null) return 'null';
	  if (obj === undefined) return 'undefined';
	  if (obj === Object(obj)) return 'object';
	  return typeof obj;
	}

	exports.Library = Library;

	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */

	function Library () {
	  this.tests = {};
	}

	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */

	Library.prototype.of = getType;

	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */

	Library.prototype.define = function (type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};

	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */

	Library.prototype.test = function (obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];

	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(27)
	var ieee754 = __webpack_require__(28)
	var isArray = __webpack_require__(29)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathValue utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * @see https://github.com/logicalparadox/filtr
	 * MIT Licensed
	 */

	var getPathInfo = __webpack_require__(31);

	/**
	 * ### .getPathValue(path, object)
	 *
	 * This allows the retrieval of values in an
	 * object given a string path.
	 *
	 *     var obj = {
	 *         prop1: {
	 *             arr: ['a', 'b', 'c']
	 *           , str: 'Hello'
	 *         }
	 *       , prop2: {
	 *             arr: [ { nested: 'Universe' } ]
	 *           , str: 'Hello again!'
	 *         }
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     getPathValue('prop1.str', obj); // Hello
	 *     getPathValue('prop1.att[2]', obj); // b
	 *     getPathValue('prop2.arr[0].nested', obj); // Universe
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} value or `undefined`
	 * @namespace Utils
	 * @name getPathValue
	 * @api public
	 */
	module.exports = function(path, obj) {
	  var info = getPathInfo(path, obj);
	  return info.value;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathInfo utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var hasProperty = __webpack_require__(32);

	/**
	 * ### .getPathInfo(path, object)
	 *
	 * This allows the retrieval of property info in an
	 * object given a string path.
	 *
	 * The path info consists of an object with the
	 * following properties:
	 *
	 * * parent - The parent object of the property referenced by `path`
	 * * name - The name of the final property, a number if it was an array indexer
	 * * value - The value of the property, if it exists, otherwise `undefined`
	 * * exists - Whether the property exists or not
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} info
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */

	module.exports = function getPathInfo(path, obj) {
	  var parsed = parsePath(path),
	      last = parsed[parsed.length - 1];

	  var info = {
	    parent: parsed.length > 1 ? _getPathValue(parsed, obj, parsed.length - 1) : obj,
	    name: last.p || last.i,
	    value: _getPathValue(parsed, obj)
	  };
	  info.exists = hasProperty(info.name, info.parent);

	  return info;
	};


	/*!
	 * ## parsePath(path)
	 *
	 * Helper function used to parse string object
	 * paths. Use in conjunction with `_getPathValue`.
	 *
	 *      var parsed = parsePath('myobject.property.subprop');
	 *
	 * ### Paths:
	 *
	 * * Can be as near infinitely deep and nested
	 * * Arrays are also valid using the formal `myobject.document[3].property`.
	 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
	 *
	 * @param {String} path
	 * @returns {Object} parsed
	 * @api private
	 */

	function parsePath (path) {
	  var str = path.replace(/([^\\])\[/g, '$1.[')
	    , parts = str.match(/(\\\.|[^.]+?)+/g);
	  return parts.map(function (value) {
	    var re = /^\[(\d+)\]$/
	      , mArr = re.exec(value);
	    if (mArr) return { i: parseFloat(mArr[1]) };
	    else return { p: value.replace(/\\([.\[\]])/g, '$1') };
	  });
	}


	/*!
	 * ## _getPathValue(parsed, obj)
	 *
	 * Helper companion function for `.parsePath` that returns
	 * the value located at the parsed address.
	 *
	 *      var value = getPathValue(parsed, obj);
	 *
	 * @param {Object} parsed definition from `parsePath`.
	 * @param {Object} object to search against
	 * @param {Number} object to search against
	 * @returns {Object|Undefined} value
	 * @api private
	 */

	function _getPathValue (parsed, obj, index) {
	  var tmp = obj
	    , res;

	  index = (index === undefined ? parsed.length : index);

	  for (var i = 0, l = index; i < l; i++) {
	    var part = parsed[i];
	    if (tmp) {
	      if ('undefined' !== typeof part.p)
	        tmp = tmp[part.p];
	      else if ('undefined' !== typeof part.i)
	        tmp = tmp[part.i];
	      if (i == (l - 1)) res = tmp;
	    } else {
	      res = undefined;
	    }
	  }
	  return res;
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - hasProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var type = __webpack_require__(10);

	/**
	 * ### .hasProperty(object, name)
	 *
	 * This allows checking whether an object has
	 * named property or numeric array index.
	 *
	 * Basically does the same thing as the `in`
	 * operator but works properly with natives
	 * and null/undefined values.
	 *
	 *     var obj = {
	 *         arr: ['a', 'b', 'c']
	 *       , str: 'Hello'
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     hasProperty('str', obj);  // true
	 *     hasProperty('constructor', obj);  // true
	 *     hasProperty('bar', obj);  // false
	 *
	 *     hasProperty('length', obj.str); // true
	 *     hasProperty(1, obj.str);  // true
	 *     hasProperty(5, obj.str);  // false
	 *
	 *     hasProperty('length', obj.arr);  // true
	 *     hasProperty(2, obj.arr);  // true
	 *     hasProperty(3, obj.arr);  // false
	 *
	 * @param {Objuect} object
	 * @param {String|Number} name
	 * @returns {Boolean} whether it exists
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */

	var literals = {
	    'number': Number
	  , 'string': String
	};

	module.exports = function hasProperty(name, obj) {
	  var ot = type(obj);

	  // Bad Object, obviously no props at all
	  if(ot === 'null' || ot === 'undefined')
	    return false;

	  // The `in` operator does not work with certain literals
	  // box these before the check
	  if(literals[ot] && typeof obj !== 'object')
	    obj = new literals[ot](obj);

	  return name in obj;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var config = __webpack_require__(20);
	var flag = __webpack_require__(9);

	/**
	 * ### addProperty (ctx, name, getter)
	 *
	 * Adds a property to the prototype of an object.
	 *
	 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.instanceof(Foo);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.foo;
	 *
	 * @param {Object} ctx object to which the property is added
	 * @param {String} name of property to add
	 * @param {Function} getter function to be used for name
	 * @namespace Utils
	 * @name addProperty
	 * @api public
	 */

	module.exports = function (ctx, name, getter) {
	  Object.defineProperty(ctx, name,
	    { get: function addProperty() {
	        var old_ssfi = flag(this, 'ssfi');
	        if (old_ssfi && config.includeStack === false)
	          flag(this, 'ssfi', addProperty);

	        var result = getter.call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var config = __webpack_require__(20);

	/**
	 * ### .addMethod (ctx, name, method)
	 *
	 * Adds a method to the prototype of an object.
	 *
	 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for name
	 * @namespace Utils
	 * @name addMethod
	 * @api public
	 */
	var flag = __webpack_require__(9);

	module.exports = function (ctx, name, method) {
	  ctx[name] = function () {
	    var old_ssfi = flag(this, 'ssfi');
	    if (old_ssfi && config.includeStack === false)
	      flag(this, 'ssfi', ctx[name]);
	    var result = method.apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### overwriteProperty (ctx, name, fn)
	 *
	 * Overwites an already existing property getter and provides
	 * access to previous value. Must return function to use as getter.
	 *
	 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
	 *       return function () {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.name).to.equal('bar');
	 *         } else {
	 *           _super.call(this);
	 *         }
	 *       }
	 *     });
	 *
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.ok;
	 *
	 * @param {Object} ctx object whose property is to be overwritten
	 * @param {String} name of property to overwrite
	 * @param {Function} getter function that returns a getter function to be used for name
	 * @namespace Utils
	 * @name overwriteProperty
	 * @api public
	 */

	module.exports = function (ctx, name, getter) {
	  var _get = Object.getOwnPropertyDescriptor(ctx, name)
	    , _super = function () {};

	  if (_get && 'function' === typeof _get.get)
	    _super = _get.get

	  Object.defineProperty(ctx, name,
	    { get: function () {
	        var result = getter(_super).call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### overwriteMethod (ctx, name, fn)
	 *
	 * Overwites an already existing method and provides
	 * access to previous function. Must return function
	 * to be used for name.
	 *
	 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
	 *       return function (str) {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.value).to.equal(str);
	 *         } else {
	 *           _super.apply(this, arguments);
	 *         }
	 *       }
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.equal('bar');
	 *
	 * @param {Object} ctx object whose method is to be overwritten
	 * @param {String} name of method to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @namespace Utils
	 * @name overwriteMethod
	 * @api public
	 */

	module.exports = function (ctx, name, method) {
	  var _method = ctx[name]
	    , _super = function () { return this; };

	  if (_method && 'function' === typeof _method)
	    _super = _method;

	  ctx[name] = function () {
	    var result = method(_super).apply(this, arguments);
	    return result === undefined ? this : result;
	  }
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addChainingMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependencies
	 */

	var transferFlags = __webpack_require__(21);
	var flag = __webpack_require__(9);
	var config = __webpack_require__(20);

	/*!
	 * Module variables
	 */

	// Check whether `__proto__` is supported
	var hasProtoSupport = '__proto__' in Object;

	// Without `__proto__` support, this module will need to add properties to a function.
	// However, some Function.prototype methods cannot be overwritten,
	// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
	var excludeNames = /^(?:length|name|arguments|caller)$/;

	// Cache `Function` properties
	var call  = Function.prototype.call,
	    apply = Function.prototype.apply;

	/**
	 * ### addChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Adds a method to an object, such that the method can also be chained.
	 *
	 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
	 *
	 * The result can then be used as both a method assertion, executing both `method` and
	 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *     expect(fooStr).to.be.foo.equal('foo');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for `name`, when called
	 * @param {Function} chainingBehavior function to be called every time the property is accessed
	 * @namespace Utils
	 * @name addChainableMethod
	 * @api public
	 */

	module.exports = function (ctx, name, method, chainingBehavior) {
	  if (typeof chainingBehavior !== 'function') {
	    chainingBehavior = function () { };
	  }

	  var chainableBehavior = {
	      method: method
	    , chainingBehavior: chainingBehavior
	  };

	  // save the methods so we can overwrite them later, if we need to.
	  if (!ctx.__methods) {
	    ctx.__methods = {};
	  }
	  ctx.__methods[name] = chainableBehavior;

	  Object.defineProperty(ctx, name,
	    { get: function () {
	        chainableBehavior.chainingBehavior.call(this);

	        var assert = function assert() {
	          var old_ssfi = flag(this, 'ssfi');
	          if (old_ssfi && config.includeStack === false)
	            flag(this, 'ssfi', assert);
	          var result = chainableBehavior.method.apply(this, arguments);
	          return result === undefined ? this : result;
	        };

	        // Use `__proto__` if available
	        if (hasProtoSupport) {
	          // Inherit all properties from the object by replacing the `Function` prototype
	          var prototype = assert.__proto__ = Object.create(this);
	          // Restore the `call` and `apply` methods from `Function`
	          prototype.call = call;
	          prototype.apply = apply;
	        }
	        // Otherwise, redefine all properties (slow!)
	        else {
	          var asserterNames = Object.getOwnPropertyNames(ctx);
	          asserterNames.forEach(function (asserterName) {
	            if (!excludeNames.test(asserterName)) {
	              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
	              Object.defineProperty(assert, asserterName, pd);
	            }
	          });
	        }

	        transferFlags(this, assert);
	        return assert;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteChainableMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### overwriteChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Overwites an already existing chainable method
	 * and provides access to the previous function or
	 * property.  Must return functions to be used for
	 * name.
	 *
	 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',
	 *       function (_super) {
	 *       }
	 *     , function (_super) {
	 *       }
	 *     );
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.have.length(3);
	 *     expect(myFoo).to.have.length.above(3);
	 *
	 * @param {Object} ctx object whose method / property is to be overwritten
	 * @param {String} name of method / property to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @param {Function} chainingBehavior function that returns a function to be used for property
	 * @namespace Utils
	 * @name overwriteChainableMethod
	 * @api public
	 */

	module.exports = function (ctx, name, method, chainingBehavior) {
	  var chainableBehavior = ctx.__methods[name];

	  var _chainingBehavior = chainableBehavior.chainingBehavior;
	  chainableBehavior.chainingBehavior = function () {
	    var result = chainingBehavior(_chainingBehavior).call(this);
	    return result === undefined ? this : result;
	  };

	  var _method = chainableBehavior.method;
	  chainableBehavior.method = function () {
	    var result = method(_method).apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var config = __webpack_require__(20);

	module.exports = function (_chai, util) {
	  /*!
	   * Module dependencies.
	   */

	  var AssertionError = _chai.AssertionError
	    , flag = util.flag;

	  /*!
	   * Module export.
	   */

	  _chai.Assertion = Assertion;

	  /*!
	   * Assertion Constructor
	   *
	   * Creates object for chaining.
	   *
	   * @api private
	   */

	  function Assertion (obj, msg, stack) {
	    flag(this, 'ssfi', stack || arguments.callee);
	    flag(this, 'object', obj);
	    flag(this, 'message', msg);
	  }

	  Object.defineProperty(Assertion, 'includeStack', {
	    get: function() {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      return config.includeStack;
	    },
	    set: function(value) {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      config.includeStack = value;
	    }
	  });

	  Object.defineProperty(Assertion, 'showDiff', {
	    get: function() {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      return config.showDiff;
	    },
	    set: function(value) {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      config.showDiff = value;
	    }
	  });

	  Assertion.addProperty = function (name, fn) {
	    util.addProperty(this.prototype, name, fn);
	  };

	  Assertion.addMethod = function (name, fn) {
	    util.addMethod(this.prototype, name, fn);
	  };

	  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
	    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };

	  Assertion.overwriteProperty = function (name, fn) {
	    util.overwriteProperty(this.prototype, name, fn);
	  };

	  Assertion.overwriteMethod = function (name, fn) {
	    util.overwriteMethod(this.prototype, name, fn);
	  };

	  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
	    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };

	  /**
	   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
	   *
	   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
	   *
	   * @name assert
	   * @param {Philosophical} expression to be tested
	   * @param {String|Function} message or function that returns message to display if expression fails
	   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
	   * @param {Mixed} expected value (remember to check for negation)
	   * @param {Mixed} actual (optional) will default to `this.obj`
	   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
	   * @api private
	   */

	  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
	    var ok = util.test(this, arguments);
	    if (true !== showDiff) showDiff = false;
	    if (true !== config.showDiff) showDiff = false;

	    if (!ok) {
	      var msg = util.getMessage(this, arguments)
	        , actual = util.getActual(this, arguments);
	      throw new AssertionError(msg, {
	          actual: actual
	        , expected: expected
	        , showDiff: showDiff
	      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
	    }
	  };

	  /*!
	   * ### ._obj
	   *
	   * Quick reference to stored `actual` value for plugin developers.
	   *
	   * @api private
	   */

	  Object.defineProperty(Assertion.prototype, '_obj',
	    { get: function () {
	        return flag(this, 'object');
	      }
	    , set: function (val) {
	        flag(this, 'object', val);
	      }
	  });
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	module.exports = function (chai, _) {
	  var Assertion = chai.Assertion
	    , toString = Object.prototype.toString
	    , flag = _.flag;

	  /**
	   * ### Language Chains
	   *
	   * The following are provided as chainable getters to
	   * improve the readability of your assertions. They
	   * do not provide testing capabilities unless they
	   * have been overwritten by a plugin.
	   *
	   * **Chains**
	   *
	   * - to
	   * - be
	   * - been
	   * - is
	   * - that
	   * - which
	   * - and
	   * - has
	   * - have
	   * - with
	   * - at
	   * - of
	   * - same
	   *
	   * @name language chains
	   * @namespace BDD
	   * @api public
	   */

	  [ 'to', 'be', 'been'
	  , 'is', 'and', 'has', 'have'
	  , 'with', 'that', 'which', 'at'
	  , 'of', 'same' ].forEach(function (chain) {
	    Assertion.addProperty(chain, function () {
	      return this;
	    });
	  });

	  /**
	   * ### .not
	   *
	   * Negates any of assertions following in the chain.
	   *
	   *     expect(foo).to.not.equal('bar');
	   *     expect(goodFn).to.not.throw(Error);
	   *     expect({ foo: 'baz' }).to.have.property('foo')
	   *       .and.not.equal('bar');
	   *
	   * @name not
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('not', function () {
	    flag(this, 'negate', true);
	  });

	  /**
	   * ### .deep
	   *
	   * Sets the `deep` flag, later used by the `equal` and
	   * `property` assertions.
	   *
	   *     expect(foo).to.deep.equal({ bar: 'baz' });
	   *     expect({ foo: { bar: { baz: 'quux' } } })
	   *       .to.have.deep.property('foo.bar.baz', 'quux');
	   *
	   * `.deep.property` special characters can be escaped
	   * by adding two slashes before the `.` or `[]`.
	   *
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name deep
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('deep', function () {
	    flag(this, 'deep', true);
	  });

	  /**
	   * ### .any
	   *
	   * Sets the `any` flag, (opposite of the `all` flag)
	   * later used in the `keys` assertion.
	   *
	   *     expect(foo).to.have.any.keys('bar', 'baz');
	   *
	   * @name any
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('any', function () {
	    flag(this, 'any', true);
	    flag(this, 'all', false)
	  });


	  /**
	   * ### .all
	   *
	   * Sets the `all` flag (opposite of the `any` flag)
	   * later used by the `keys` assertion.
	   *
	   *     expect(foo).to.have.all.keys('bar', 'baz');
	   *
	   * @name all
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('all', function () {
	    flag(this, 'all', true);
	    flag(this, 'any', false);
	  });

	  /**
	   * ### .a(type)
	   *
	   * The `a` and `an` assertions are aliases that can be
	   * used either as language chains or to assert a value's
	   * type.
	   *
	   *     // typeof
	   *     expect('test').to.be.a('string');
	   *     expect({ foo: 'bar' }).to.be.an('object');
	   *     expect(null).to.be.a('null');
	   *     expect(undefined).to.be.an('undefined');
	   *     expect(new Error).to.be.an('error');
	   *     expect(new Promise).to.be.a('promise');
	   *     expect(new Float32Array()).to.be.a('float32array');
	   *     expect(Symbol()).to.be.a('symbol');
	   *
	   *     // es6 overrides
	   *     expect({[Symbol.toStringTag]:()=>'foo'}).to.be.a('foo');
	   *
	   *     // language chain
	   *     expect(foo).to.be.an.instanceof(Foo);
	   *
	   * @name a
	   * @alias an
	   * @param {String} type
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function an (type, msg) {
	    if (msg) flag(this, 'message', msg);
	    type = type.toLowerCase();
	    var obj = flag(this, 'object')
	      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

	    this.assert(
	        type === _.type(obj)
	      , 'expected #{this} to be ' + article + type
	      , 'expected #{this} not to be ' + article + type
	    );
	  }

	  Assertion.addChainableMethod('an', an);
	  Assertion.addChainableMethod('a', an);

	  /**
	   * ### .include(value)
	   *
	   * The `include` and `contain` assertions can be used as either property
	   * based language chains or as methods to assert the inclusion of an object
	   * in an array or a substring in a string. When used as language chains,
	   * they toggle the `contains` flag for the `keys` assertion.
	   *
	   *     expect([1,2,3]).to.include(2);
	   *     expect('foobar').to.contain('foo');
	   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
	   *
	   * @name include
	   * @alias contain
	   * @alias includes
	   * @alias contains
	   * @param {Object|String|Number} obj
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function includeChainingBehavior () {
	    flag(this, 'contains', true);
	  }

	  function include (val, msg) {
	    _.expectTypes(this, ['array', 'object', 'string']);

	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var expected = false;

	    if (_.type(obj) === 'array' && _.type(val) === 'object') {
	      for (var i in obj) {
	        if (_.eql(obj[i], val)) {
	          expected = true;
	          break;
	        }
	      }
	    } else if (_.type(val) === 'object') {
	      if (!flag(this, 'negate')) {
	        for (var k in val) new Assertion(obj).property(k, val[k]);
	        return;
	      }
	      var subset = {};
	      for (var k in val) subset[k] = obj[k];
	      expected = _.eql(subset, val);
	    } else {
	      expected = (obj != undefined) && ~obj.indexOf(val);
	    }
	    this.assert(
	        expected
	      , 'expected #{this} to include ' + _.inspect(val)
	      , 'expected #{this} to not include ' + _.inspect(val));
	  }

	  Assertion.addChainableMethod('include', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
	  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

	  /**
	   * ### .ok
	   *
	   * Asserts that the target is truthy.
	   *
	   *     expect('everything').to.be.ok;
	   *     expect(1).to.be.ok;
	   *     expect(false).to.not.be.ok;
	   *     expect(undefined).to.not.be.ok;
	   *     expect(null).to.not.be.ok;
	   *
	   * @name ok
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('ok', function () {
	    this.assert(
	        flag(this, 'object')
	      , 'expected #{this} to be truthy'
	      , 'expected #{this} to be falsy');
	  });

	  /**
	   * ### .true
	   *
	   * Asserts that the target is `true`.
	   *
	   *     expect(true).to.be.true;
	   *     expect(1).to.not.be.true;
	   *
	   * @name true
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('true', function () {
	    this.assert(
	        true === flag(this, 'object')
	      , 'expected #{this} to be true'
	      , 'expected #{this} to be false'
	      , this.negate ? false : true
	    );
	  });

	  /**
	   * ### .false
	   *
	   * Asserts that the target is `false`.
	   *
	   *     expect(false).to.be.false;
	   *     expect(0).to.not.be.false;
	   *
	   * @name false
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('false', function () {
	    this.assert(
	        false === flag(this, 'object')
	      , 'expected #{this} to be false'
	      , 'expected #{this} to be true'
	      , this.negate ? true : false
	    );
	  });

	  /**
	   * ### .null
	   *
	   * Asserts that the target is `null`.
	   *
	   *     expect(null).to.be.null;
	   *     expect(undefined).to.not.be.null;
	   *
	   * @name null
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('null', function () {
	    this.assert(
	        null === flag(this, 'object')
	      , 'expected #{this} to be null'
	      , 'expected #{this} not to be null'
	    );
	  });

	  /**
	   * ### .undefined
	   *
	   * Asserts that the target is `undefined`.
	   *
	   *     expect(undefined).to.be.undefined;
	   *     expect(null).to.not.be.undefined;
	   *
	   * @name undefined
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('undefined', function () {
	    this.assert(
	        undefined === flag(this, 'object')
	      , 'expected #{this} to be undefined'
	      , 'expected #{this} not to be undefined'
	    );
	  });

	  /**
	   * ### .NaN
	   * Asserts that the target is `NaN`.
	   *
	   *     expect('foo').to.be.NaN;
	   *     expect(4).not.to.be.NaN;
	   *
	   * @name NaN
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('NaN', function () {
	    this.assert(
	        isNaN(flag(this, 'object'))
	        , 'expected #{this} to be NaN'
	        , 'expected #{this} not to be NaN'
	    );
	  });

	  /**
	   * ### .exist
	   *
	   * Asserts that the target is neither `null` nor `undefined`.
	   *
	   *     var foo = 'hi'
	   *       , bar = null
	   *       , baz;
	   *
	   *     expect(foo).to.exist;
	   *     expect(bar).to.not.exist;
	   *     expect(baz).to.not.exist;
	   *
	   * @name exist
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('exist', function () {
	    this.assert(
	        null != flag(this, 'object')
	      , 'expected #{this} to exist'
	      , 'expected #{this} to not exist'
	    );
	  });


	  /**
	   * ### .empty
	   *
	   * Asserts that the target's length is `0`. For arrays and strings, it checks
	   * the `length` property. For objects, it gets the count of
	   * enumerable keys.
	   *
	   *     expect([]).to.be.empty;
	   *     expect('').to.be.empty;
	   *     expect({}).to.be.empty;
	   *
	   * @name empty
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('empty', function () {
	    var obj = flag(this, 'object')
	      , expected = obj;

	    if (Array.isArray(obj) || 'string' === typeof object) {
	      expected = obj.length;
	    } else if (typeof obj === 'object') {
	      expected = Object.keys(obj).length;
	    }

	    this.assert(
	        !expected
	      , 'expected #{this} to be empty'
	      , 'expected #{this} not to be empty'
	    );
	  });

	  /**
	   * ### .arguments
	   *
	   * Asserts that the target is an arguments object.
	   *
	   *     function test () {
	   *       expect(arguments).to.be.arguments;
	   *     }
	   *
	   * @name arguments
	   * @alias Arguments
	   * @namespace BDD
	   * @api public
	   */

	  function checkArguments () {
	    var obj = flag(this, 'object')
	      , type = Object.prototype.toString.call(obj);
	    this.assert(
	        '[object Arguments]' === type
	      , 'expected #{this} to be arguments but got ' + type
	      , 'expected #{this} to not be arguments'
	    );
	  }

	  Assertion.addProperty('arguments', checkArguments);
	  Assertion.addProperty('Arguments', checkArguments);

	  /**
	   * ### .equal(value)
	   *
	   * Asserts that the target is strictly equal (`===`) to `value`.
	   * Alternately, if the `deep` flag is set, asserts that
	   * the target is deeply equal to `value`.
	   *
	   *     expect('hello').to.equal('hello');
	   *     expect(42).to.equal(42);
	   *     expect(1).to.not.equal(true);
	   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
	   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
	   *
	   * @name equal
	   * @alias equals
	   * @alias eq
	   * @alias deep.equal
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertEqual (val, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'deep')) {
	      return this.eql(val);
	    } else {
	      this.assert(
	          val === obj
	        , 'expected #{this} to equal #{exp}'
	        , 'expected #{this} to not equal #{exp}'
	        , val
	        , this._obj
	        , true
	      );
	    }
	  }

	  Assertion.addMethod('equal', assertEqual);
	  Assertion.addMethod('equals', assertEqual);
	  Assertion.addMethod('eq', assertEqual);

	  /**
	   * ### .eql(value)
	   *
	   * Asserts that the target is deeply equal to `value`.
	   *
	   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
	   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
	   *
	   * @name eql
	   * @alias eqls
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertEql(obj, msg) {
	    if (msg) flag(this, 'message', msg);
	    this.assert(
	        _.eql(obj, flag(this, 'object'))
	      , 'expected #{this} to deeply equal #{exp}'
	      , 'expected #{this} to not deeply equal #{exp}'
	      , obj
	      , this._obj
	      , true
	    );
	  }

	  Assertion.addMethod('eql', assertEql);
	  Assertion.addMethod('eqls', assertEql);

	  /**
	   * ### .above(value)
	   *
	   * Asserts that the target is greater than `value`.
	   *
	   *     expect(10).to.be.above(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *
	   * @name above
	   * @alias gt
	   * @alias greaterThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertAbove (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len > n
	        , 'expected #{this} to have a length above #{exp} but got #{act}'
	        , 'expected #{this} to not have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj > n
	        , 'expected #{this} to be above ' + n
	        , 'expected #{this} to be at most ' + n
	      );
	    }
	  }

	  Assertion.addMethod('above', assertAbove);
	  Assertion.addMethod('gt', assertAbove);
	  Assertion.addMethod('greaterThan', assertAbove);

	  /**
	   * ### .least(value)
	   *
	   * Asserts that the target is greater than or equal to `value`.
	   *
	   *     expect(10).to.be.at.least(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.least(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);
	   *
	   * @name least
	   * @alias gte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertLeast (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= n
	        , 'expected #{this} to have a length at least #{exp} but got #{act}'
	        , 'expected #{this} to have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj >= n
	        , 'expected #{this} to be at least ' + n
	        , 'expected #{this} to be below ' + n
	      );
	    }
	  }

	  Assertion.addMethod('least', assertLeast);
	  Assertion.addMethod('gte', assertLeast);

	  /**
	   * ### .below(value)
	   *
	   * Asserts that the target is less than `value`.
	   *
	   *     expect(5).to.be.below(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *
	   * @name below
	   * @alias lt
	   * @alias lessThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertBelow (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len < n
	        , 'expected #{this} to have a length below #{exp} but got #{act}'
	        , 'expected #{this} to not have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj < n
	        , 'expected #{this} to be below ' + n
	        , 'expected #{this} to be at least ' + n
	      );
	    }
	  }

	  Assertion.addMethod('below', assertBelow);
	  Assertion.addMethod('lt', assertBelow);
	  Assertion.addMethod('lessThan', assertBelow);

	  /**
	   * ### .most(value)
	   *
	   * Asserts that the target is less than or equal to `value`.
	   *
	   *     expect(5).to.be.at.most(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.most(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);
	   *
	   * @name most
	   * @alias lte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertMost (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len <= n
	        , 'expected #{this} to have a length at most #{exp} but got #{act}'
	        , 'expected #{this} to have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj <= n
	        , 'expected #{this} to be at most ' + n
	        , 'expected #{this} to be above ' + n
	      );
	    }
	  }

	  Assertion.addMethod('most', assertMost);
	  Assertion.addMethod('lte', assertMost);

	  /**
	   * ### .within(start, finish)
	   *
	   * Asserts that the target is within a range.
	   *
	   *     expect(7).to.be.within(5,10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a length range. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * @name within
	   * @param {Number} start lowerbound inclusive
	   * @param {Number} finish upperbound inclusive
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('within', function (start, finish, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , range = start + '..' + finish;
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= start && len <= finish
	        , 'expected #{this} to have a length within ' + range
	        , 'expected #{this} to not have a length within ' + range
	      );
	    } else {
	      this.assert(
	          obj >= start && obj <= finish
	        , 'expected #{this} to be within ' + range
	        , 'expected #{this} to not be within ' + range
	      );
	    }
	  });

	  /**
	   * ### .instanceof(constructor)
	   *
	   * Asserts that the target is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , Chai = new Tea('chai');
	   *
	   *     expect(Chai).to.be.an.instanceof(Tea);
	   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
	   *
	   * @name instanceof
	   * @param {Constructor} constructor
	   * @param {String} message _optional_
	   * @alias instanceOf
	   * @namespace BDD
	   * @api public
	   */

	  function assertInstanceOf (constructor, msg) {
	    if (msg) flag(this, 'message', msg);
	    var name = _.getName(constructor);
	    this.assert(
	        flag(this, 'object') instanceof constructor
	      , 'expected #{this} to be an instance of ' + name
	      , 'expected #{this} to not be an instance of ' + name
	    );
	  };

	  Assertion.addMethod('instanceof', assertInstanceOf);
	  Assertion.addMethod('instanceOf', assertInstanceOf);

	  /**
	   * ### .property(name, [value])
	   *
	   * Asserts that the target has a property `name`, optionally asserting that
	   * the value of that property is strictly equal to  `value`.
	   * If the `deep` flag is set, you can use dot- and bracket-notation for deep
	   * references into objects and arrays.
	   *
	   *     // simple referencing
	   *     var obj = { foo: 'bar' };
	   *     expect(obj).to.have.property('foo');
	   *     expect(obj).to.have.property('foo', 'bar');
	   *
	   *     // deep referencing
	   *     var deepObj = {
	   *         green: { tea: 'matcha' }
	   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
	   *     };
	   *
	   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
	   *
	   * You can also use an array as the starting point of a `deep.property`
	   * assertion, or traverse nested arrays.
	   *
	   *     var arr = [
	   *         [ 'chai', 'matcha', 'konacha' ]
	   *       , [ { tea: 'chai' }
	   *         , { tea: 'matcha' }
	   *         , { tea: 'konacha' } ]
	   *     ];
	   *
	   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');
	   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
	   *
	   * Furthermore, `property` changes the subject of the assertion
	   * to be the value of that property from the original object. This
	   * permits for further chainable assertions on that property.
	   *
	   *     expect(obj).to.have.property('foo')
	   *       .that.is.a('string');
	   *     expect(deepObj).to.have.property('green')
	   *       .that.is.an('object')
	   *       .that.deep.equals({ tea: 'matcha' });
	   *     expect(deepObj).to.have.property('teas')
	   *       .that.is.an('array')
	   *       .with.deep.property('[2]')
	   *         .that.deep.equals({ tea: 'konacha' });
	   *
	   * Note that dots and bracket in `name` must be backslash-escaped when
	   * the `deep` flag is set, while they must NOT be escaped when the `deep`
	   * flag is not set.
	   *
	   *     // simple referencing
	   *     var css = { '.link[target]': 42 };
	   *     expect(css).to.have.property('.link[target]', 42);
	   *
	   *     // deep referencing
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name property
	   * @alias deep.property
	   * @param {String} name
	   * @param {Mixed} value (optional)
	   * @param {String} message _optional_
	   * @returns value of property for chaining
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('property', function (name, val, msg) {
	    if (msg) flag(this, 'message', msg);

	    var isDeep = !!flag(this, 'deep')
	      , descriptor = isDeep ? 'deep property ' : 'property '
	      , negate = flag(this, 'negate')
	      , obj = flag(this, 'object')
	      , pathInfo = isDeep ? _.getPathInfo(name, obj) : null
	      , hasProperty = isDeep
	        ? pathInfo.exists
	        : _.hasProperty(name, obj)
	      , value = isDeep
	        ? pathInfo.value
	        : obj[name];

	    if (negate && arguments.length > 1) {
	      if (undefined === value) {
	        msg = (msg != null) ? msg + ': ' : '';
	        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
	      }
	    } else {
	      this.assert(
	          hasProperty
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name)
	        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
	    }

	    if (arguments.length > 1) {
	      this.assert(
	          val === value
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
	        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'
	        , val
	        , value
	      );
	    }

	    flag(this, 'object', value);
	  });


	  /**
	   * ### .ownProperty(name)
	   *
	   * Asserts that the target has an own property `name`.
	   *
	   *     expect('test').to.have.ownProperty('length');
	   *
	   * @name ownProperty
	   * @alias haveOwnProperty
	   * @param {String} name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertOwnProperty (name, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        obj.hasOwnProperty(name)
	      , 'expected #{this} to have own property ' + _.inspect(name)
	      , 'expected #{this} to not have own property ' + _.inspect(name)
	    );
	  }

	  Assertion.addMethod('ownProperty', assertOwnProperty);
	  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

	  /**
	   * ### .ownPropertyDescriptor(name[, descriptor[, message]])
	   *
	   * Asserts that the target has an own property descriptor `name`, that optionally matches `descriptor`.
	   *
	   *     expect('test').to.have.ownPropertyDescriptor('length');
	   *     expect('test').to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 4 });
	   *     expect('test').not.to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 3 });
	   *     expect('test').ownPropertyDescriptor('length').to.have.property('enumerable', false);
	   *     expect('test').ownPropertyDescriptor('length').to.have.keys('value');
	   *
	   * @name ownPropertyDescriptor
	   * @alias haveOwnPropertyDescriptor
	   * @param {String} name
	   * @param {Object} descriptor _optional_
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertOwnPropertyDescriptor (name, descriptor, msg) {
	    if (typeof descriptor === 'string') {
	      msg = descriptor;
	      descriptor = null;
	    }
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
	    if (actualDescriptor && descriptor) {
	      this.assert(
	          _.eql(descriptor, actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
	        , descriptor
	        , actualDescriptor
	        , true
	      );
	    } else {
	      this.assert(
	          actualDescriptor
	        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
	        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
	      );
	    }
	    flag(this, 'object', actualDescriptor);
	  }

	  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
	  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

	  /**
	   * ### .length
	   *
	   * Sets the `doLength` flag later used as a chain precursor to a value
	   * comparison for the `length` property.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * *Deprecation notice:* Using `length` as an assertion will be deprecated
	   * in version 2.4.0 and removed in 3.0.0. Code using the old style of
	   * asserting for `length` property value using `length(value)` should be
	   * switched to use `lengthOf(value)` instead.
	   *
	   * @name length
	   * @namespace BDD
	   * @api public
	   */

	  /**
	   * ### .lengthOf(value[, message])
	   *
	   * Asserts that the target's `length` property has
	   * the expected value.
	   *
	   *     expect([ 1, 2, 3]).to.have.lengthOf(3);
	   *     expect('foobar').to.have.lengthOf(6);
	   *
	   * @name lengthOf
	   * @param {Number} length
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertLengthChain () {
	    flag(this, 'doLength', true);
	  }

	  function assertLength (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).to.have.property('length');
	    var len = obj.length;

	    this.assert(
	        len == n
	      , 'expected #{this} to have a length of #{exp} but got #{act}'
	      , 'expected #{this} to not have a length of #{act}'
	      , n
	      , len
	    );
	  }

	  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
	  Assertion.addMethod('lengthOf', assertLength);

	  /**
	   * ### .match(regexp)
	   *
	   * Asserts that the target matches a regular expression.
	   *
	   *     expect('foobar').to.match(/^foo/);
	   *
	   * @name match
	   * @alias matches
	   * @param {RegExp} RegularExpression
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	  function assertMatch(re, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        re.exec(obj)
	      , 'expected #{this} to match ' + re
	      , 'expected #{this} not to match ' + re
	    );
	  }

	  Assertion.addMethod('match', assertMatch);
	  Assertion.addMethod('matches', assertMatch);

	  /**
	   * ### .string(string)
	   *
	   * Asserts that the string target contains another string.
	   *
	   *     expect('foobar').to.have.string('bar');
	   *
	   * @name string
	   * @param {String} string
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('string', function (str, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('string');

	    this.assert(
	        ~obj.indexOf(str)
	      , 'expected #{this} to contain ' + _.inspect(str)
	      , 'expected #{this} to not contain ' + _.inspect(str)
	    );
	  });


	  /**
	   * ### .keys(key1, [key2], [...])
	   *
	   * Asserts that the target contains any or all of the passed-in keys.
	   * Use in combination with `any`, `all`, `contains`, or `have` will affect
	   * what will pass.
	   *
	   * When used in conjunction with `any`, at least one key that is passed
	   * in must exist in the target object. This is regardless whether or not
	   * the `have` or `contain` qualifiers are used. Note, either `any` or `all`
	   * should be used in the assertion. If neither are used, the assertion is
	   * defaulted to `all`.
	   *
	   * When both `all` and `contain` are used, the target object must have at
	   * least all of the passed-in keys but may have more keys not listed.
	   *
	   * When both `all` and `have` are used, the target object must both contain
	   * all of the passed-in keys AND the number of keys in the target object must
	   * match the number of keys passed in (in other words, a target object must
	   * have all and only all of the passed-in keys).
	   *
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys('bar', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys(['foo']);
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys({'foo': 6});
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys({'bar': 6, 'foo': 7});
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys({'bar': 6});
	   *
	   *
	   * @name keys
	   * @alias key
	   * @param {...String|Array|Object} keys
	   * @namespace BDD
	   * @api public
	   */

	  function assertKeys (keys) {
	    var obj = flag(this, 'object')
	      , str
	      , ok = true
	      , mixedArgsMsg = 'keys must be given single argument of Array|Object|String, or multiple String arguments';

	    switch (_.type(keys)) {
	      case "array":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        break;
	      case "object":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        keys = Object.keys(keys);
	        break;
	      default:
	        keys = Array.prototype.slice.call(arguments);
	    }

	    if (!keys.length) throw new Error('keys required');

	    var actual = Object.keys(obj)
	      , expected = keys
	      , len = keys.length
	      , any = flag(this, 'any')
	      , all = flag(this, 'all');

	    if (!any && !all) {
	      all = true;
	    }

	    // Has any
	    if (any) {
	      var intersection = expected.filter(function(key) {
	        return ~actual.indexOf(key);
	      });
	      ok = intersection.length > 0;
	    }

	    // Has all
	    if (all) {
	      ok = keys.every(function(key){
	        return ~actual.indexOf(key);
	      });
	      if (!flag(this, 'negate') && !flag(this, 'contains')) {
	        ok = ok && keys.length == actual.length;
	      }
	    }

	    // Key string
	    if (len > 1) {
	      keys = keys.map(function(key){
	        return _.inspect(key);
	      });
	      var last = keys.pop();
	      if (all) {
	        str = keys.join(', ') + ', and ' + last;
	      }
	      if (any) {
	        str = keys.join(', ') + ', or ' + last;
	      }
	    } else {
	      str = _.inspect(keys[0]);
	    }

	    // Form
	    str = (len > 1 ? 'keys ' : 'key ') + str;

	    // Have / include
	    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

	    // Assertion
	    this.assert(
	        ok
	      , 'expected #{this} to ' + str
	      , 'expected #{this} to not ' + str
	      , expected.slice(0).sort()
	      , actual.sort()
	      , true
	    );
	  }

	  Assertion.addMethod('keys', assertKeys);
	  Assertion.addMethod('key', assertKeys);

	  /**
	   * ### .throw(constructor)
	   *
	   * Asserts that the function target will throw a specific error, or specific type of error
	   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
	   * for the error's message.
	   *
	   *     var err = new ReferenceError('This is a bad function.');
	   *     var fn = function () { throw err; }
	   *     expect(fn).to.throw(ReferenceError);
	   *     expect(fn).to.throw(Error);
	   *     expect(fn).to.throw(/bad function/);
	   *     expect(fn).to.not.throw('good function');
	   *     expect(fn).to.throw(ReferenceError, /bad function/);
	   *     expect(fn).to.throw(err);
	   *
	   * Please note that when a throw expectation is negated, it will check each
	   * parameter independently, starting with error constructor type. The appropriate way
	   * to check for the existence of a type of error but for a message that does not match
	   * is to use `and`.
	   *
	   *     expect(fn).to.throw(ReferenceError)
	   *        .and.not.throw(/good function/);
	   *
	   * @name throw
	   * @alias throws
	   * @alias Throw
	   * @param {ErrorConstructor} constructor
	   * @param {String|RegExp} expected error message
	   * @param {String} message _optional_
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @returns error for chaining (null if no error)
	   * @namespace BDD
	   * @api public
	   */

	  function assertThrows (constructor, errMsg, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('function');

	    var thrown = false
	      , desiredError = null
	      , name = null
	      , thrownError = null;

	    if (arguments.length === 0) {
	      errMsg = null;
	      constructor = null;
	    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
	      errMsg = constructor;
	      constructor = null;
	    } else if (constructor && constructor instanceof Error) {
	      desiredError = constructor;
	      constructor = null;
	      errMsg = null;
	    } else if (typeof constructor === 'function') {
	      name = constructor.prototype.name;
	      if (!name || (name === 'Error' && constructor !== Error)) {
	        name = constructor.name || (new constructor()).name;
	      }
	    } else {
	      constructor = null;
	    }

	    try {
	      obj();
	    } catch (err) {
	      // first, check desired error
	      if (desiredError) {
	        this.assert(
	            err === desiredError
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp}'
	          , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	          , (err instanceof Error ? err.toString() : err)
	        );

	        flag(this, 'object', err);
	        return this;
	      }

	      // next, check constructor
	      if (constructor) {
	        this.assert(
	            err instanceof constructor
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp} but #{act} was thrown'
	          , name
	          , (err instanceof Error ? err.toString() : err)
	        );

	        if (!errMsg) {
	          flag(this, 'object', err);
	          return this;
	        }
	      }

	      // next, check message
	      var message = 'error' === _.type(err) && "message" in err
	        ? err.message
	        : '' + err;

	      if ((message != null) && errMsg && errMsg instanceof RegExp) {
	        this.assert(
	            errMsg.exec(message)
	          , 'expected #{this} to throw error matching #{exp} but got #{act}'
	          , 'expected #{this} to throw error not matching #{exp}'
	          , errMsg
	          , message
	        );

	        flag(this, 'object', err);
	        return this;
	      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
	        this.assert(
	            ~message.indexOf(errMsg)
	          , 'expected #{this} to throw error including #{exp} but got #{act}'
	          , 'expected #{this} to throw error not including #{act}'
	          , errMsg
	          , message
	        );

	        flag(this, 'object', err);
	        return this;
	      } else {
	        thrown = true;
	        thrownError = err;
	      }
	    }

	    var actuallyGot = ''
	      , expectedThrown = name !== null
	        ? name
	        : desiredError
	          ? '#{exp}' //_.inspect(desiredError)
	          : 'an error';

	    if (thrown) {
	      actuallyGot = ' but #{act} was thrown'
	    }

	    this.assert(
	        thrown === true
	      , 'expected #{this} to throw ' + expectedThrown + actuallyGot
	      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
	      , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	      , (thrownError instanceof Error ? thrownError.toString() : thrownError)
	    );

	    flag(this, 'object', thrownError);
	  };

	  Assertion.addMethod('throw', assertThrows);
	  Assertion.addMethod('throws', assertThrows);
	  Assertion.addMethod('Throw', assertThrows);

	  /**
	   * ### .respondTo(method)
	   *
	   * Asserts that the object or class target will respond to a method.
	   *
	   *     Klass.prototype.bar = function(){};
	   *     expect(Klass).to.respondTo('bar');
	   *     expect(obj).to.respondTo('bar');
	   *
	   * To check if a constructor will respond to a static function,
	   * set the `itself` flag.
	   *
	   *     Klass.baz = function(){};
	   *     expect(Klass).itself.to.respondTo('baz');
	   *
	   * @name respondTo
	   * @alias respondsTo
	   * @param {String} method
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function respondTo (method, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , itself = flag(this, 'itself')
	      , context = ('function' === _.type(obj) && !itself)
	        ? obj.prototype[method]
	        : obj[method];

	    this.assert(
	        'function' === typeof context
	      , 'expected #{this} to respond to ' + _.inspect(method)
	      , 'expected #{this} to not respond to ' + _.inspect(method)
	    );
	  }

	  Assertion.addMethod('respondTo', respondTo);
	  Assertion.addMethod('respondsTo', respondTo);

	  /**
	   * ### .itself
	   *
	   * Sets the `itself` flag, later used by the `respondTo` assertion.
	   *
	   *     function Foo() {}
	   *     Foo.bar = function() {}
	   *     Foo.prototype.baz = function() {}
	   *
	   *     expect(Foo).itself.to.respondTo('bar');
	   *     expect(Foo).itself.not.to.respondTo('baz');
	   *
	   * @name itself
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('itself', function () {
	    flag(this, 'itself', true);
	  });

	  /**
	   * ### .satisfy(method)
	   *
	   * Asserts that the target passes a given truth test.
	   *
	   *     expect(1).to.satisfy(function(num) { return num > 0; });
	   *
	   * @name satisfy
	   * @alias satisfies
	   * @param {Function} matcher
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function satisfy (matcher, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var result = matcher(obj);
	    this.assert(
	        result
	      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
	      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
	      , this.negate ? false : true
	      , result
	    );
	  }

	  Assertion.addMethod('satisfy', satisfy);
	  Assertion.addMethod('satisfies', satisfy);

	  /**
	   * ### .closeTo(expected, delta)
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     expect(1.5).to.be.closeTo(1, 0.5);
	   *
	   * @name closeTo
	   * @alias approximately
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function closeTo(expected, delta, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');

	    new Assertion(obj, msg).is.a('number');
	    if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
	      throw new Error('the arguments to closeTo or approximately must be numbers');
	    }

	    this.assert(
	        Math.abs(obj - expected) <= delta
	      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
	      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
	    );
	  }

	  Assertion.addMethod('closeTo', closeTo);
	  Assertion.addMethod('approximately', closeTo);

	  function isSubsetOf(subset, superset, cmp) {
	    return subset.every(function(elem) {
	      if (!cmp) return superset.indexOf(elem) !== -1;

	      return superset.some(function(elem2) {
	        return cmp(elem, elem2);
	      });
	    })
	  }

	  /**
	   * ### .members(set)
	   *
	   * Asserts that the target is a superset of `set`,
	   * or that the target and `set` have the same strictly-equal (===) members.
	   * Alternately, if the `deep` flag is set, set members are compared for deep
	   * equality.
	   *
	   *     expect([1, 2, 3]).to.include.members([3, 2]);
	   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
	   *
	   *     expect([4, 2]).to.have.members([2, 4]);
	   *     expect([5, 2]).to.not.have.members([5, 2, 1]);
	   *
	   *     expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);
	   *
	   * @name members
	   * @param {Array} set
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('members', function (subset, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');

	    new Assertion(obj).to.be.an('array');
	    new Assertion(subset).to.be.an('array');

	    var cmp = flag(this, 'deep') ? _.eql : undefined;

	    if (flag(this, 'contains')) {
	      return this.assert(
	          isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to be a superset of #{act}'
	        , 'expected #{this} to not be a superset of #{act}'
	        , obj
	        , subset
	      );
	    }

	    this.assert(
	        isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to have the same members as #{act}'
	        , 'expected #{this} to not have the same members as #{act}'
	        , obj
	        , subset
	    );
	  });

	  /**
	   * ### .oneOf(list)
	   *
	   * Assert that a value appears somewhere in the top level of array `list`.
	   *
	   *     expect('a').to.be.oneOf(['a', 'b', 'c']);
	   *     expect(9).to.not.be.oneOf(['z']);
	   *     expect([3]).to.not.be.oneOf([1, 2, [3]]);
	   *
	   *     var three = [3];
	   *     // for object-types, contents are not compared
	   *     expect(three).to.not.be.oneOf([1, 2, [3]]);
	   *     // comparing references works
	   *     expect(three).to.be.oneOf([1, 2, three]);
	   *
	   * @name oneOf
	   * @param {Array<*>} list
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function oneOf (list, msg) {
	    if (msg) flag(this, 'message', msg);
	    var expected = flag(this, 'object');
	    new Assertion(list).to.be.an('array');

	    this.assert(
	        list.indexOf(expected) > -1
	      , 'expected #{this} to be one of #{exp}'
	      , 'expected #{this} to not be one of #{exp}'
	      , list
	      , expected
	    );
	  }

	  Assertion.addMethod('oneOf', oneOf);


	  /**
	   * ### .change(function)
	   *
	   * Asserts that a function changes an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val += 3 };
	   *     var noChangeFn = function() { return 'foo' + 'bar'; }
	   *     expect(fn).to.change(obj, 'val');
	   *     expect(noChangeFn).to.not.change(obj, 'val')
	   *
	   * @name change
	   * @alias changes
	   * @alias Change
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertChanges (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');

	    var initial = object[prop];
	    fn();

	    this.assert(
	      initial !== object[prop]
	      , 'expected .' + prop + ' to change'
	      , 'expected .' + prop + ' to not change'
	    );
	  }

	  Assertion.addChainableMethod('change', assertChanges);
	  Assertion.addChainableMethod('changes', assertChanges);

	  /**
	   * ### .increase(function)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     expect(fn).to.increase(obj, 'val');
	   *
	   * @name increase
	   * @alias increases
	   * @alias Increase
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertIncreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');

	    var initial = object[prop];
	    fn();

	    this.assert(
	      object[prop] - initial > 0
	      , 'expected .' + prop + ' to increase'
	      , 'expected .' + prop + ' to not increase'
	    );
	  }

	  Assertion.addChainableMethod('increase', assertIncreases);
	  Assertion.addChainableMethod('increases', assertIncreases);

	  /**
	   * ### .decrease(function)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     expect(fn).to.decrease(obj, 'val');
	   *
	   * @name decrease
	   * @alias decreases
	   * @alias Decrease
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertDecreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');

	    var initial = object[prop];
	    fn();

	    this.assert(
	      object[prop] - initial < 0
	      , 'expected .' + prop + ' to decrease'
	      , 'expected .' + prop + ' to not decrease'
	    );
	  }

	  Assertion.addChainableMethod('decrease', assertDecreases);
	  Assertion.addChainableMethod('decreases', assertDecreases);

	  /**
	   * ### .extensible
	   *
	   * Asserts that the target is extensible (can have new properties added to
	   * it).
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect({}).to.be.extensible;
	   *     expect(nonExtensibleObject).to.not.be.extensible;
	   *     expect(sealedObject).to.not.be.extensible;
	   *     expect(frozenObject).to.not.be.extensible;
	   *
	   * @name extensible
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('extensible', function() {
	    var obj = flag(this, 'object');

	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.

	    var isExtensible;

	    try {
	      isExtensible = Object.isExtensible(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isExtensible = false;
	      else throw err;
	    }

	    this.assert(
	      isExtensible
	      , 'expected #{this} to be extensible'
	      , 'expected #{this} to not be extensible'
	    );
	  });

	  /**
	   * ### .sealed
	   *
	   * Asserts that the target is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(sealedObject).to.be.sealed;
	   *     expect(frozenObject).to.be.sealed;
	   *     expect({}).to.not.be.sealed;
	   *
	   * @name sealed
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('sealed', function() {
	    var obj = flag(this, 'object');

	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.

	    var isSealed;

	    try {
	      isSealed = Object.isSealed(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isSealed = true;
	      else throw err;
	    }

	    this.assert(
	      isSealed
	      , 'expected #{this} to be sealed'
	      , 'expected #{this} to not be sealed'
	    );
	  });

	  /**
	   * ### .frozen
	   *
	   * Asserts that the target is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(frozenObject).to.be.frozen;
	   *     expect({}).to.not.be.frozen;
	   *
	   * @name frozen
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('frozen', function() {
	    var obj = flag(this, 'object');

	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.

	    var isFrozen;

	    try {
	      isFrozen = Object.isFrozen(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isFrozen = true;
	      else throw err;
	    }

	    this.assert(
	      isFrozen
	      , 'expected #{this} to be frozen'
	      , 'expected #{this} to not be frozen'
	    );
	  });
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	module.exports = function (chai, util) {
	  chai.expect = function (val, message) {
	    return new chai.Assertion(val, message);
	  };

	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Expect
	   * @api public
	   */

	  chai.expect.fail = function (actual, expected, message, operator) {
	    message = message || 'expect.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, chai.expect.fail);
	  };
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	module.exports = function (chai, util) {
	  var Assertion = chai.Assertion;

	  function loadShould () {
	    // explicitly define this method as function as to have it's name to include as `ssfi`
	    function shouldGetter() {
	      if (this instanceof String || this instanceof Number || this instanceof Boolean ) {
	        return new Assertion(this.valueOf(), null, shouldGetter);
	      }
	      return new Assertion(this, null, shouldGetter);
	    }
	    function shouldSetter(value) {
	      // See https://github.com/chaijs/chai/issues/86: this makes
	      // `whatever.should = someValue` actually set `someValue`, which is
	      // especially useful for `global.should = require('chai').should()`.
	      //
	      // Note that we have to use [[DefineProperty]] instead of [[Put]]
	      // since otherwise we would trigger this very setter!
	      Object.defineProperty(this, 'should', {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    }
	    // modify Object.prototype to have `should`
	    Object.defineProperty(Object.prototype, 'should', {
	      set: shouldSetter
	      , get: shouldGetter
	      , configurable: true
	    });

	    var should = {};

	    /**
	     * ### .fail(actual, expected, [message], [operator])
	     *
	     * Throw a failure.
	     *
	     * @name fail
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @param {String} operator
	     * @namespace Should
	     * @api public
	     */

	    should.fail = function (actual, expected, message, operator) {
	      message = message || 'should.fail()';
	      throw new chai.AssertionError(message, {
	          actual: actual
	        , expected: expected
	        , operator: operator
	      }, should.fail);
	    };

	    /**
	     * ### .equal(actual, expected, [message])
	     *
	     * Asserts non-strict equality (`==`) of `actual` and `expected`.
	     *
	     *     should.equal(3, '3', '== coerces values to strings');
	     *
	     * @name equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */

	    should.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.equal(val2);
	    };

	    /**
	     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
	     *
	     * Asserts that `function` will throw an error that is an instance of
	     * `constructor`, or alternately that it will throw an error with message
	     * matching `regexp`.
	     *
	     *     should.throw(fn, 'function throws a reference error');
	     *     should.throw(fn, /function throws a reference error/);
	     *     should.throw(fn, ReferenceError);
	     *     should.throw(fn, ReferenceError, 'function throws a reference error');
	     *     should.throw(fn, ReferenceError, /function throws a reference error/);
	     *
	     * @name throw
	     * @alias Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */

	    should.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.Throw(errt, errs);
	    };

	    /**
	     * ### .exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var foo = 'hi';
	     *
	     *     should.exist(foo, 'foo exists');
	     *
	     * @name exist
	     * @namespace Should
	     * @api public
	     */

	    should.exist = function (val, msg) {
	      new Assertion(val, msg).to.exist;
	    }

	    // negation
	    should.not = {}

	    /**
	     * ### .not.equal(actual, expected, [message])
	     *
	     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	     *
	     *     should.not.equal(3, 4, 'these numbers are not equal');
	     *
	     * @name not.equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */

	    should.not.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.not.equal(val2);
	    };

	    /**
	     * ### .throw(function, [constructor/regexp], [message])
	     *
	     * Asserts that `function` will _not_ throw an error that is an instance of
	     * `constructor`, or alternately that it will not throw an error with message
	     * matching `regexp`.
	     *
	     *     should.not.throw(fn, Error, 'function does not throw');
	     *
	     * @name not.throw
	     * @alias not.Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */

	    should.not.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.not.Throw(errt, errs);
	    };

	    /**
	     * ### .not.exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var bar = null;
	     *
	     *     should.not.exist(bar, 'bar does not exist');
	     *
	     * @name not.exist
	     * @namespace Should
	     * @api public
	     */

	    should.not.exist = function (val, msg) {
	      new Assertion(val, msg).to.not.exist;
	    }

	    should['throw'] = should['Throw'];
	    should.not['throw'] = should.not['Throw'];

	    return should;
	  };

	  chai.should = loadShould;
	  chai.Should = loadShould;
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */


	module.exports = function (chai, util) {

	  /*!
	   * Chai dependencies.
	   */

	  var Assertion = chai.Assertion
	    , flag = util.flag;

	  /*!
	   * Module export.
	   */

	  /**
	   * ### assert(expression, message)
	   *
	   * Write your own test expressions.
	   *
	   *     assert('foo' !== 'bar', 'foo is not bar');
	   *     assert(Array.isArray([]), 'empty arrays are arrays');
	   *
	   * @param {Mixed} expression to test for truthiness
	   * @param {String} message to display on error
	   * @name assert
	   * @namespace Assert
	   * @api public
	   */

	  var assert = chai.assert = function (express, errmsg) {
	    var test = new Assertion(null, null, chai.assert);
	    test.assert(
	        express
	      , errmsg
	      , '[ negation message unavailable ]'
	    );
	  };

	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure. Node.js `assert` module-compatible.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Assert
	   * @api public
	   */

	  assert.fail = function (actual, expected, message, operator) {
	    message = message || 'assert.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, assert.fail);
	  };

	  /**
	   * ### .isOk(object, [message])
	   *
	   * Asserts that `object` is truthy.
	   *
	   *     assert.isOk('everything', 'everything is ok');
	   *     assert.isOk(false, 'this will fail');
	   *
	   * @name isOk
	   * @alias ok
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isOk = function (val, msg) {
	    new Assertion(val, msg).is.ok;
	  };

	  /**
	   * ### .isNotOk(object, [message])
	   *
	   * Asserts that `object` is falsy.
	   *
	   *     assert.isNotOk('everything', 'this will fail');
	   *     assert.isNotOk(false, 'this will pass');
	   *
	   * @name isNotOk
	   * @alias notOk
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotOk = function (val, msg) {
	    new Assertion(val, msg).is.not.ok;
	  };

	  /**
	   * ### .equal(actual, expected, [message])
	   *
	   * Asserts non-strict equality (`==`) of `actual` and `expected`.
	   *
	   *     assert.equal(3, '3', '== coerces values to strings');
	   *
	   * @name equal
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.equal = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.equal);

	    test.assert(
	        exp == flag(test, 'object')
	      , 'expected #{this} to equal #{exp}'
	      , 'expected #{this} to not equal #{act}'
	      , exp
	      , act
	    );
	  };

	  /**
	   * ### .notEqual(actual, expected, [message])
	   *
	   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	   *
	   *     assert.notEqual(3, 4, 'these numbers are not equal');
	   *
	   * @name notEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notEqual = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.notEqual);

	    test.assert(
	        exp != flag(test, 'object')
	      , 'expected #{this} to not equal #{exp}'
	      , 'expected #{this} to equal #{act}'
	      , exp
	      , act
	    );
	  };

	  /**
	   * ### .strictEqual(actual, expected, [message])
	   *
	   * Asserts strict equality (`===`) of `actual` and `expected`.
	   *
	   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
	   *
	   * @name strictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.strictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.equal(exp);
	  };

	  /**
	   * ### .notStrictEqual(actual, expected, [message])
	   *
	   * Asserts strict inequality (`!==`) of `actual` and `expected`.
	   *
	   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
	   *
	   * @name notStrictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notStrictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.equal(exp);
	  };

	  /**
	   * ### .deepEqual(actual, expected, [message])
	   *
	   * Asserts that `actual` is deeply equal to `expected`.
	   *
	   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
	   *
	   * @name deepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.eql(exp);
	  };

	  /**
	   * ### .notDeepEqual(actual, expected, [message])
	   *
	   * Assert that `actual` is not deeply equal to `expected`.
	   *
	   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
	   *
	   * @name notDeepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notDeepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.eql(exp);
	  };

	   /**
	   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
	   *
	   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`
	   *
	   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
	   *
	   * @name isAbove
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAbove
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isAbove = function (val, abv, msg) {
	    new Assertion(val, msg).to.be.above(abv);
	  };

	   /**
	   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
	   *
	   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`
	   *
	   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
	   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
	   *
	   * @name isAtLeast
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtLeast
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isAtLeast = function (val, atlst, msg) {
	    new Assertion(val, msg).to.be.least(atlst);
	  };

	   /**
	   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
	   *
	   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`
	   *
	   *     assert.isBelow(3, 6, '3 is strictly less than 6');
	   *
	   * @name isBelow
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeBelow
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isBelow = function (val, blw, msg) {
	    new Assertion(val, msg).to.be.below(blw);
	  };

	   /**
	   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
	   *
	   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`
	   *
	   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
	   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
	   *
	   * @name isAtMost
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtMost
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isAtMost = function (val, atmst, msg) {
	    new Assertion(val, msg).to.be.most(atmst);
	  };

	  /**
	   * ### .isTrue(value, [message])
	   *
	   * Asserts that `value` is true.
	   *
	   *     var teaServed = true;
	   *     assert.isTrue(teaServed, 'the tea has been served');
	   *
	   * @name isTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isTrue = function (val, msg) {
	    new Assertion(val, msg).is['true'];
	  };

	  /**
	   * ### .isNotTrue(value, [message])
	   *
	   * Asserts that `value` is not true.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotTrue(tea, 'great, time for tea!');
	   *
	   * @name isNotTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotTrue = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(true);
	  };

	  /**
	   * ### .isFalse(value, [message])
	   *
	   * Asserts that `value` is false.
	   *
	   *     var teaServed = false;
	   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
	   *
	   * @name isFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isFalse = function (val, msg) {
	    new Assertion(val, msg).is['false'];
	  };

	  /**
	   * ### .isNotFalse(value, [message])
	   *
	   * Asserts that `value` is not false.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotFalse(tea, 'great, time for tea!');
	   *
	   * @name isNotFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotFalse = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(false);
	  };

	  /**
	   * ### .isNull(value, [message])
	   *
	   * Asserts that `value` is null.
	   *
	   *     assert.isNull(err, 'there was no error');
	   *
	   * @name isNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNull = function (val, msg) {
	    new Assertion(val, msg).to.equal(null);
	  };

	  /**
	   * ### .isNotNull(value, [message])
	   *
	   * Asserts that `value` is not null.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotNull(tea, 'great, time for tea!');
	   *
	   * @name isNotNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotNull = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(null);
	  };

	  /**
	   * ### .isNaN
	   * Asserts that value is NaN
	   *
	   *    assert.isNaN('foo', 'foo is NaN');
	   *
	   * @name isNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNaN = function (val, msg) {
	    new Assertion(val, msg).to.be.NaN;
	  };

	  /**
	   * ### .isNotNaN
	   * Asserts that value is not NaN
	   *
	   *    assert.isNotNaN(4, '4 is not NaN');
	   *
	   * @name isNotNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	  assert.isNotNaN = function (val, msg) {
	    new Assertion(val, msg).not.to.be.NaN;
	  };

	  /**
	   * ### .isUndefined(value, [message])
	   *
	   * Asserts that `value` is `undefined`.
	   *
	   *     var tea;
	   *     assert.isUndefined(tea, 'no tea defined');
	   *
	   * @name isUndefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isUndefined = function (val, msg) {
	    new Assertion(val, msg).to.equal(undefined);
	  };

	  /**
	   * ### .isDefined(value, [message])
	   *
	   * Asserts that `value` is not `undefined`.
	   *
	   *     var tea = 'cup of chai';
	   *     assert.isDefined(tea, 'tea has been defined');
	   *
	   * @name isDefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isDefined = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(undefined);
	  };

	  /**
	   * ### .isFunction(value, [message])
	   *
	   * Asserts that `value` is a function.
	   *
	   *     function serveTea() { return 'cup of tea'; };
	   *     assert.isFunction(serveTea, 'great, we can have tea now');
	   *
	   * @name isFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isFunction = function (val, msg) {
	    new Assertion(val, msg).to.be.a('function');
	  };

	  /**
	   * ### .isNotFunction(value, [message])
	   *
	   * Asserts that `value` is _not_ a function.
	   *
	   *     var serveTea = [ 'heat', 'pour', 'sip' ];
	   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
	   *
	   * @name isNotFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotFunction = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('function');
	  };

	  /**
	   * ### .isObject(value, [message])
	   *
	   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   * _The assertion does not match subclassed objects._
	   *
	   *     var selection = { name: 'Chai', serve: 'with spices' };
	   *     assert.isObject(selection, 'tea selection is an object');
	   *
	   * @name isObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isObject = function (val, msg) {
	    new Assertion(val, msg).to.be.a('object');
	  };

	  /**
	   * ### .isNotObject(value, [message])
	   *
	   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   *
	   *     var selection = 'chai'
	   *     assert.isNotObject(selection, 'tea selection is not an object');
	   *     assert.isNotObject(null, 'null is not an object');
	   *
	   * @name isNotObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotObject = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('object');
	  };

	  /**
	   * ### .isArray(value, [message])
	   *
	   * Asserts that `value` is an array.
	   *
	   *     var menu = [ 'green', 'chai', 'oolong' ];
	   *     assert.isArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isArray = function (val, msg) {
	    new Assertion(val, msg).to.be.an('array');
	  };

	  /**
	   * ### .isNotArray(value, [message])
	   *
	   * Asserts that `value` is _not_ an array.
	   *
	   *     var menu = 'green|chai|oolong';
	   *     assert.isNotArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isNotArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotArray = function (val, msg) {
	    new Assertion(val, msg).to.not.be.an('array');
	  };

	  /**
	   * ### .isString(value, [message])
	   *
	   * Asserts that `value` is a string.
	   *
	   *     var teaOrder = 'chai';
	   *     assert.isString(teaOrder, 'order placed');
	   *
	   * @name isString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isString = function (val, msg) {
	    new Assertion(val, msg).to.be.a('string');
	  };

	  /**
	   * ### .isNotString(value, [message])
	   *
	   * Asserts that `value` is _not_ a string.
	   *
	   *     var teaOrder = 4;
	   *     assert.isNotString(teaOrder, 'order placed');
	   *
	   * @name isNotString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotString = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('string');
	  };

	  /**
	   * ### .isNumber(value, [message])
	   *
	   * Asserts that `value` is a number.
	   *
	   *     var cups = 2;
	   *     assert.isNumber(cups, 'how many cups');
	   *
	   * @name isNumber
	   * @param {Number} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNumber = function (val, msg) {
	    new Assertion(val, msg).to.be.a('number');
	  };

	  /**
	   * ### .isNotNumber(value, [message])
	   *
	   * Asserts that `value` is _not_ a number.
	   *
	   *     var cups = '2 cups please';
	   *     assert.isNotNumber(cups, 'how many cups');
	   *
	   * @name isNotNumber
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotNumber = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('number');
	  };

	  /**
	   * ### .isBoolean(value, [message])
	   *
	   * Asserts that `value` is a boolean.
	   *
	   *     var teaReady = true
	   *       , teaServed = false;
	   *
	   *     assert.isBoolean(teaReady, 'is the tea ready');
	   *     assert.isBoolean(teaServed, 'has tea been served');
	   *
	   * @name isBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isBoolean = function (val, msg) {
	    new Assertion(val, msg).to.be.a('boolean');
	  };

	  /**
	   * ### .isNotBoolean(value, [message])
	   *
	   * Asserts that `value` is _not_ a boolean.
	   *
	   *     var teaReady = 'yep'
	   *       , teaServed = 'nope';
	   *
	   *     assert.isNotBoolean(teaReady, 'is the tea ready');
	   *     assert.isNotBoolean(teaServed, 'has tea been served');
	   *
	   * @name isNotBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotBoolean = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('boolean');
	  };

	  /**
	   * ### .typeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
	   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
	   *     assert.typeOf('tea', 'string', 'we have a string');
	   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
	   *     assert.typeOf(null, 'null', 'we have a null');
	   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
	   *
	   * @name typeOf
	   * @param {Mixed} value
	   * @param {String} name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.typeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.a(type);
	  };

	  /**
	   * ### .notTypeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is _not_ `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
	   *
	   * @name notTypeOf
	   * @param {Mixed} value
	   * @param {String} typeof name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notTypeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.a(type);
	  };

	  /**
	   * ### .instanceOf(object, constructor, [message])
	   *
	   * Asserts that `value` is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new Tea('chai');
	   *
	   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
	   *
	   * @name instanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.instanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.instanceOf(type);
	  };

	  /**
	   * ### .notInstanceOf(object, constructor, [message])
	   *
	   * Asserts `value` is not an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new String('chai');
	   *
	   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
	   *
	   * @name notInstanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notInstanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.instanceOf(type);
	  };

	  /**
	   * ### .include(haystack, needle, [message])
	   *
	   * Asserts that `haystack` includes `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');
	   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');
	   *
	   * @name include
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.include = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.include).include(inc);
	  };

	  /**
	   * ### .notInclude(haystack, needle, [message])
	   *
	   * Asserts that `haystack` does not include `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.notInclude('foobar', 'baz', 'string not include substring');
	   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');
	   *
	   * @name notInclude
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notInclude = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.notInclude).not.include(inc);
	  };

	  /**
	   * ### .match(value, regexp, [message])
	   *
	   * Asserts that `value` matches the regular expression `regexp`.
	   *
	   *     assert.match('foobar', /^foo/, 'regexp matches');
	   *
	   * @name match
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.match = function (exp, re, msg) {
	    new Assertion(exp, msg).to.match(re);
	  };

	  /**
	   * ### .notMatch(value, regexp, [message])
	   *
	   * Asserts that `value` does not match the regular expression `regexp`.
	   *
	   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
	   *
	   * @name notMatch
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notMatch = function (exp, re, msg) {
	    new Assertion(exp, msg).to.not.match(re);
	  };

	  /**
	   * ### .property(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`.
	   *
	   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
	   *
	   * @name property
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.property = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.property(prop);
	  };

	  /**
	   * ### .notProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`.
	   *
	   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
	   *
	   * @name notProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop);
	  };

	  /**
	   * ### .deepProperty(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`, which can be a
	   * string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');
	   *
	   * @name deepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop);
	  };

	  /**
	   * ### .notDeepProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`, which
	   * can be a string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
	   *
	   * @name notDeepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notDeepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop);
	  };

	  /**
	   * ### .propertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`.
	   *
	   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
	   *
	   * @name propertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.propertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.property(prop, val);
	  };

	  /**
	   * ### .propertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`.
	   *
	   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');
	   *
	   * @name propertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.propertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop, val);
	  };

	  /**
	   * ### .deepPropertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`. `property` can use dot- and bracket-notation for deep
	   * reference.
	   *
	   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
	   *
	   * @name deepPropertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepPropertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop, val);
	  };

	  /**
	   * ### .deepPropertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`. `property` can use dot- and
	   * bracket-notation for deep reference.
	   *
	   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
	   *
	   * @name deepPropertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepPropertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
	  };

	  /**
	   * ### .lengthOf(object, length, [message])
	   *
	   * Asserts that `object` has a `length` property with the expected value.
	   *
	   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
	   *     assert.lengthOf('foobar', 6, 'string has length of 6');
	   *
	   * @name lengthOf
	   * @param {Mixed} object
	   * @param {Number} length
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.lengthOf = function (exp, len, msg) {
	    new Assertion(exp, msg).to.have.length(len);
	  };

	  /**
	   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])
	   *
	   * Asserts that `function` will throw an error that is an instance of
	   * `constructor`, or alternately that it will throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.throws(fn, 'function throws a reference error');
	   *     assert.throws(fn, /function throws a reference error/);
	   *     assert.throws(fn, ReferenceError);
	   *     assert.throws(fn, ReferenceError, 'function throws a reference error');
	   *     assert.throws(fn, ReferenceError, /function throws a reference error/);
	   *
	   * @name throws
	   * @alias throw
	   * @alias Throw
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */

	  assert.throws = function (fn, errt, errs, msg) {
	    if ('string' === typeof errt || errt instanceof RegExp) {
	      errs = errt;
	      errt = null;
	    }

	    var assertErr = new Assertion(fn, msg).to.throw(errt, errs);
	    return flag(assertErr, 'object');
	  };

	  /**
	   * ### .doesNotThrow(function, [constructor/regexp], [message])
	   *
	   * Asserts that `function` will _not_ throw an error that is an instance of
	   * `constructor`, or alternately that it will not throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.doesNotThrow(fn, Error, 'function does not throw');
	   *
	   * @name doesNotThrow
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotThrow = function (fn, type, msg) {
	    if ('string' === typeof type) {
	      msg = type;
	      type = null;
	    }

	    new Assertion(fn, msg).to.not.Throw(type);
	  };

	  /**
	   * ### .operator(val1, operator, val2, [message])
	   *
	   * Compares two values using `operator`.
	   *
	   *     assert.operator(1, '<', 2, 'everything is ok');
	   *     assert.operator(1, '>', 2, 'this will fail');
	   *
	   * @name operator
	   * @param {Mixed} val1
	   * @param {String} operator
	   * @param {Mixed} val2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.operator = function (val, operator, val2, msg) {
	    var ok;
	    switch(operator) {
	      case '==':
	        ok = val == val2;
	        break;
	      case '===':
	        ok = val === val2;
	        break;
	      case '>':
	        ok = val > val2;
	        break;
	      case '>=':
	        ok = val >= val2;
	        break;
	      case '<':
	        ok = val < val2;
	        break;
	      case '<=':
	        ok = val <= val2;
	        break;
	      case '!=':
	        ok = val != val2;
	        break;
	      case '!==':
	        ok = val !== val2;
	        break;
	      default:
	        throw new Error('Invalid operator "' + operator + '"');
	    }
	    var test = new Assertion(ok, msg);
	    test.assert(
	        true === flag(test, 'object')
	      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
	      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
	  };

	  /**
	   * ### .closeTo(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name closeTo
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.closeTo = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.closeTo(exp, delta);
	  };

	  /**
	   * ### .approximately(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name approximately
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.approximately = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.approximately(exp, delta);
	  };

	  /**
	   * ### .sameMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members.
	   * Order is not taken into account.
	   *
	   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
	   *
	   * @name sameMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.sameMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.members(set2);
	  }

	  /**
	   * ### .sameDeepMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members - using a deep equality checking.
	   * Order is not taken into account.
	   *
	   *     assert.sameDeepMembers([ {b: 3}, {a: 2}, {c: 5} ], [ {c: 5}, {b: 3}, {a: 2} ], 'same deep members');
	   *
	   * @name sameDeepMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.sameDeepMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.deep.members(set2);
	  }

	  /**
	   * ### .includeMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset`.
	   * Order is not taken into account.
	   *
	   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');
	   *
	   * @name includeMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.includeMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.members(subset);
	  }

	  /**
	   * ### .includeDeepMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset` - using deep equality checking.
	   * Order is not taken into account.
	   * Duplicates are ignored.
	   *
	   *     assert.includeDeepMembers([ {a: 1}, {b: 2}, {c: 3} ], [ {b: 2}, {a: 1}, {b: 2} ], 'include deep members');
	   *
	   * @name includeDeepMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.includeDeepMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.deep.members(subset);
	  }

	  /**
	   * ### .oneOf(inList, list, [message])
	   *
	   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
	   *
	   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
	   *
	   * @name oneOf
	   * @param {*} inList
	   * @param {Array<*>} list
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.oneOf = function (inList, list, msg) {
	    new Assertion(inList, msg).to.be.oneOf(list);
	  }

	   /**
	   * ### .changes(function, object, property)
	   *
	   * Asserts that a function changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 22 };
	   *     assert.changes(fn, obj, 'val');
	   *
	   * @name changes
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.changes = function (fn, obj, prop) {
	    new Assertion(fn).to.change(obj, prop);
	  }

	   /**
	   * ### .doesNotChange(function, object, property)
	   *
	   * Asserts that a function does not changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { console.log('foo'); };
	   *     assert.doesNotChange(fn, obj, 'val');
	   *
	   * @name doesNotChange
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotChange = function (fn, obj, prop) {
	    new Assertion(fn).to.not.change(obj, prop);
	  }

	   /**
	   * ### .increases(function, object, property)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 13 };
	   *     assert.increases(fn, obj, 'val');
	   *
	   * @name increases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.increases = function (fn, obj, prop) {
	    new Assertion(fn).to.increase(obj, prop);
	  }

	   /**
	   * ### .doesNotIncrease(function, object, property)
	   *
	   * Asserts that a function does not increase object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 8 };
	   *     assert.doesNotIncrease(fn, obj, 'val');
	   *
	   * @name doesNotIncrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotIncrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.increase(obj, prop);
	  }

	   /**
	   * ### .decreases(function, object, property)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     assert.decreases(fn, obj, 'val');
	   *
	   * @name decreases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.decreases = function (fn, obj, prop) {
	    new Assertion(fn).to.decrease(obj, prop);
	  }

	   /**
	   * ### .doesNotDecrease(function, object, property)
	   *
	   * Asserts that a function does not decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     assert.doesNotDecrease(fn, obj, 'val');
	   *
	   * @name doesNotDecrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotDecrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.decrease(obj, prop);
	  }

	  /*!
	   * ### .ifError(object)
	   *
	   * Asserts if value is not a false value, and throws if it is a true value.
	   * This is added to allow for chai to be a drop-in replacement for Node's
	   * assert class.
	   *
	   *     var err = new Error('I am a custom error');
	   *     assert.ifError(err); // Rethrows err!
	   *
	   * @name ifError
	   * @param {Object} object
	   * @namespace Assert
	   * @api public
	   */

	  assert.ifError = function (val) {
	    if (val) {
	      throw(val);
	    }
	  };

	  /**
	   * ### .isExtensible(object)
	   *
	   * Asserts that `object` is extensible (can have new properties added to it).
	   *
	   *     assert.isExtensible({});
	   *
	   * @name isExtensible
	   * @alias extensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.be.extensible;
	  };

	  /**
	   * ### .isNotExtensible(object)
	   *
	   * Asserts that `object` is _not_ extensible.
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freese({});
	   *
	   *     assert.isNotExtensible(nonExtensibleObject);
	   *     assert.isNotExtensible(sealedObject);
	   *     assert.isNotExtensible(frozenObject);
	   *
	   * @name isNotExtensible
	   * @alias notExtensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.extensible;
	  };

	  /**
	   * ### .isSealed(object)
	   *
	   * Asserts that `object` is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.seal({});
	   *
	   *     assert.isSealed(sealedObject);
	   *     assert.isSealed(frozenObject);
	   *
	   * @name isSealed
	   * @alias sealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.be.sealed;
	  };

	  /**
	   * ### .isNotSealed(object)
	   *
	   * Asserts that `object` is _not_ sealed.
	   *
	   *     assert.isNotSealed({});
	   *
	   * @name isNotSealed
	   * @alias notSealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.sealed;
	  };

	  /**
	   * ### .isFrozen(object)
	   *
	   * Asserts that `object` is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *     assert.frozen(frozenObject);
	   *
	   * @name isFrozen
	   * @alias frozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.be.frozen;
	  };

	  /**
	   * ### .isNotFrozen(object)
	   *
	   * Asserts that `object` is _not_ frozen.
	   *
	   *     assert.isNotFrozen({});
	   *
	   * @name isNotFrozen
	   * @alias notFrozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.frozen;
	  };

	  /*!
	   * Aliases.
	   */

	  (function alias(name, as){
	    assert[as] = assert[name];
	    return alias;
	  })
	  ('isOk', 'ok')
	  ('isNotOk', 'notOk')
	  ('throws', 'throw')
	  ('throws', 'Throw')
	  ('isExtensible', 'extensible')
	  ('isNotExtensible', 'notExtensible')
	  ('isSealed', 'sealed')
	  ('isNotSealed', 'notSealed')
	  ('isFrozen', 'frozen')
	  ('isNotFrozen', 'notFrozen');
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Octokat, config;

	Octokat = __webpack_require__(45);

	config = {
	  USERNAME: 'octokit-test',
	  TOKEN: 'dca7f85a5911df8e9b7aeb4c5be8f5f50806ac49',
	  ORG_NAME: 'octokit-test-org',
	  REPO_USER: 'octokit-test',
	  REPO_NAME: 'octokit-test-repo',
	  REPO_HOMEPAGE: 'https:/github.com/philschatz/octokat.js',
	  OTHER_HOMEPAGE: 'http://example.com',
	  OTHER_USERNAME: 'octokit-test2',
	  DEFAULT_BRANCH: 'master',
	  LONG_TIMEOUT: 10 * 1000,
	  SHORT_TIMEOUT: 5 * 1000
	};

	config.Octokat = Octokat;

	config.client = new Octokat({
	  token: config.TOKEN
	});

	config.test_repo = config.REPO_USER + "/" + config.REPO_NAME;

	config.test_github_login = config.USERNAME;

	module.exports = config;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(46);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	}(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports, __webpack_require__) {

		module.exports = __webpack_require__(1);

		/***/
	},
	/* 1 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var deprecate = __webpack_require__(2);
		var OctokatBase = __webpack_require__(3);

		var HypermediaPlugin = __webpack_require__(18);

		var ALL_PLUGINS = [__webpack_require__(19), // re-chain methods when we detect an object (issue, comment, user, etc)
		__webpack_require__(21), __webpack_require__(25), __webpack_require__(27), __webpack_require__(29), __webpack_require__(31), __webpack_require__(11), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34),
		// Run cacheHandler after PagedResults so the link headers are remembered
		// but before hypermedia so the object is still serializable
		__webpack_require__(35), HypermediaPlugin, __webpack_require__(36)];

		var Octokat = function Octokat() {
			var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			if (clientOptions.plugins == null) {
				clientOptions.plugins = ALL_PLUGINS;
			}

			if (clientOptions.disableHypermedia) {
				deprecate('Please use the clientOptions.plugins array and just do not include the hypermedia plugin');
				clientOptions.plugins = clientOptions.plugins.filter(function (plugin) {
					return plugin !== HypermediaPlugin;
				});
			}

			// the octokat instance
			var instance = new OctokatBase(clientOptions);
			return instance;
		};

		// module.exports = Octokat;
		module.exports = Octokat;

		/***/
	},
	/* 2 */
	/***/function (module, exports) {

		"use strict";

		module.exports = function (message) {
			if (console && console.warn) {
				console.warn("Octokat Deprecation: " + message);
			}
		};

		/***/
	},
	/* 3 */
	/***/function (module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function (global) {
			'use strict';

			var plus = __webpack_require__(4);
			var deprecate = __webpack_require__(2);
			var TREE_OPTIONS = __webpack_require__(8);
			var Chainer = __webpack_require__(9);

			var _require = __webpack_require__(10),
			    VerbMethods = _require.VerbMethods,
			    toPromise = _require.toPromise;

			// Use the following plugins by default (they should be neglegible additional code)


			var SimpleVerbsPlugin = __webpack_require__(11);
			var NativePromiseOnlyPlugin = __webpack_require__(13);

			var Requester = __webpack_require__(15);
			var applyHypermedia = __webpack_require__(17);

			var uncamelizeObj = function uncamelizeObj(obj) {
				if (Array.isArray(obj)) {
					return obj.map(function (i) {
						return uncamelizeObj(i);
					});
				} else if (obj === Object(obj)) {
					var o = {};
					var iterable = Object.keys(obj);
					for (var j = 0; j < iterable.length; j++) {
						var key = iterable[j];
						var value = obj[key];
						o[plus.uncamelize(key)] = uncamelizeObj(value);
					}
					return o;
				} else {
					return obj;
				}
			};

			var OctokatBase = function OctokatBase() {
				var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				var plugins = clientOptions.plugins || [SimpleVerbsPlugin, NativePromiseOnlyPlugin];

				// TODO remove disableHypermedia
				var disableHypermedia = clientOptions.disableHypermedia;
				// set defaults

				if (typeof disableHypermedia === 'undefined' || disableHypermedia === null) {
					disableHypermedia = false;
				}

				// the octokat instance
				var instance = {};

				var request = function request(method, path, data) {
					var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { raw: false, isBase64: false, isBoolean: false };
					var cb = arguments[4];

					// replacer = new Replacer(request)

					// Use a slightly convoluted syntax so browserify does not include the
					// NodeJS Buffer in the browser version.
					// data is a Buffer when uploading a release asset file
					if (data && !__guard__(__guard__(global, function (x1) {
						return x1['Buffer'];
					}), function (x) {
						return x.isBuffer(data);
					})) {
						data = uncamelizeObj(data);
					}

					// For each request, convert the JSON into Objects
					var requester = new Requester(instance, clientOptions, plugins);

					return requester.request(method, path, data, options, function (err, val) {
						if (err) {
							return cb(err);
						}
						if (options.raw) {
							return cb(null, val);
						}

						if (!disableHypermedia) {
							var context = {
								data: val,
								plugins: plugins,
								requester: requester,
								instance: instance,
								clientOptions: clientOptions
							};
							return instance._parseWithContext(path, context, cb);
						} else {
							return cb(null, val);
						}
					});
				};

				var verbMethods = new VerbMethods(plugins, { request: request });
				new Chainer(verbMethods).chain('', null, TREE_OPTIONS, instance);

				// Special case for `me`
				instance.me = instance.user;

				instance.parse = function (cb, data) {
					// The signature of toPromise has cb as the 1st arg
					var context = {
						requester: { request: request },
						plugins: plugins,
						data: data,
						instance: instance,
						clientOptions: clientOptions
					};
					return instance._parseWithContext('', context, cb);
				};

				// If not callback is provided then return a promise
				var newPromise = plugins.filter(function (_ref) {
					var promiseCreator = _ref.promiseCreator;
					return promiseCreator;
				})[0].promiseCreator.newPromise;

				instance.parse = toPromise(instance.parse, newPromise);

				instance._parseWithContext = function (path, context, cb) {
					if (typeof cb !== 'function') {
						throw new Error('Callback is required');
					}
					var data = context.data;

					context.url = __guard__(data, function (x) {
						return x.url;
					}) || path;

					var responseMiddlewareAsyncs = plus.map(plus.filter(plugins, function (_ref2) {
						var responseMiddlewareAsync = _ref2.responseMiddlewareAsync;
						return responseMiddlewareAsync;
					}), function (plugin) {
						return plugin.responseMiddlewareAsync.bind(plugin);
					});

					// async.waterfall requires that the 1st entry take 0 arguments
					responseMiddlewareAsyncs.unshift(function (cb) {
						return cb(null, context);
					});
					return plus.waterfall(responseMiddlewareAsyncs, function (err, val) {
						if (err) {
							return cb(err, val);
						}
						data = val.data;

						return cb(err, data);
					});
				};

				// TODO remove this deprectaion too
				instance._fromUrlWithDefault = function (path, defaultFn) {
					for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
						args[_key - 2] = arguments[_key];
					}

					path = applyHypermedia.apply(undefined, [path].concat(args));
					verbMethods.injectVerbMethods(path, defaultFn);
					return defaultFn;
				};

				instance.fromUrl = function (path) {
					for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
						args[_key2 - 1] = arguments[_key2];
					}

					var defaultFn = function defaultFn() {
						deprecate('call ....fetch() explicitly instead of ...()');
						return defaultFn.fetch.apply(defaultFn, arguments);
					};

					return instance._fromUrlWithDefault.apply(instance, [path, defaultFn].concat(args));
				};

				instance._fromUrlCurried = function (path, defaultFn) {
					var fn = function fn() {
						for (var _len3 = arguments.length, templateArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
							templateArgs[_key3] = arguments[_key3];
						}

						// This conditional logic is for the deprecated .nextPage() call
						if (defaultFn && templateArgs.length === 0) {
							return defaultFn.apply(fn);
						} else {
							return instance.fromUrl.apply(instance, [path].concat(templateArgs));
						}
					};

					if (!/\{/.test(path)) {
						verbMethods.injectVerbMethods(path, fn);
					}
					return fn;
				};

				// Add the GitHub Status API https://status.github.com/api
				instance.status = instance.fromUrl('https://status.github.com/api/status.json');
				instance.status.api = instance.fromUrl('https://status.github.com/api.json');
				instance.status.lastMessage = instance.fromUrl('https://status.github.com/api/last-message.json');
				instance.status.messages = instance.fromUrl('https://status.github.com/api/messages.json');

				return instance;
			};

			module.exports = OctokatBase;

			function __guard__(value, transform) {
				return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
			}
			/* WEBPACK VAR INJECTION */
		}).call(exports, function () {
			return this;
		}());

		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		// Both of these internal methods are really small/simple and we are only
		// working with arrays anyway

		var filter = __webpack_require__(5);
		var forEach = __webpack_require__(6);
		var map = __webpack_require__(7);

		// From async
		var onlyOnce = function onlyOnce(fn) {
			return function () {
				if (fn === null) {
					throw new Error('Callback was already called.');
				}
				var callFn = fn;
				fn = null;
				return callFn.apply(this, arguments);
			};
		};

		// require('underscore-plus')
		var plus = {
			camelize: function camelize(string) {
				if (string) {
					return string.replace(/[_-]+(\w)/g, function (m) {
						return m[1].toUpperCase();
					});
				} else {
					return '';
				}
			},
			uncamelize: function uncamelize(string) {
				if (!string) {
					return '';
				}
				return string.replace(/([A-Z])+/g, function (match) {
					var letter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
					return '_' + letter.toLowerCase();
				});
			},
			dasherize: function dasherize(string) {
				if (!string) {
					return '';
				}

				string = string[0].toLowerCase() + string.slice(1);
				return string.replace(/([A-Z])|(_)/g, function (m, letter) {
					if (letter) {
						return '-' + letter.toLowerCase();
					} else {
						return '-';
					}
				});
			},
			waterfall: function waterfall(tasks, cb) {
				var taskIndex = 0;
				var nextTask = function nextTask(val) {
					if (taskIndex === tasks.length) {
						return cb(null, val);
					}

					var taskCallback = onlyOnce(function (err, val) {
						if (err) {
							return cb(err, val);
						}
						return nextTask(val);
					});

					var task = tasks[taskIndex++];
					if (val) {
						return task(val, taskCallback);
					} else {
						return task(taskCallback);
					}
				};

				return nextTask(null); // Initial value passed to the 1st
			},

			// Just _.extend(target, source)
			extend: function extend(target, source) {
				if (source) {
					return Object.keys(source).map(function (key) {
						target[key] = source[key];
					});
				}
			},

			// Just _.forOwn(obj, iterator)
			forOwn: function forOwn(obj, iterator) {
				return Object.keys(obj).map(function (key) {
					return iterator(obj[key], key);
				});
			},

			filter: filter,
			forEach: forEach,
			map: map
		};

		module.exports = plus;

		/***/
	},
	/* 5 */
	/***/function (module, exports) {

		/**
	  * A specialized version of `_.filter` for arrays without support for
	  * iteratee shorthands.
	  *
	  * @private
	  * @param {Array} [array] The array to iterate over.
	  * @param {Function} predicate The function invoked per iteration.
	  * @returns {Array} Returns the new filtered array.
	  */
		function arrayFilter(array, predicate) {
			var index = -1,
			    length = array == null ? 0 : array.length,
			    resIndex = 0,
			    result = [];

			while (++index < length) {
				var value = array[index];
				if (predicate(value, index, array)) {
					result[resIndex++] = value;
				}
			}
			return result;
		}

		module.exports = arrayFilter;

		/***/
	},
	/* 6 */
	/***/function (module, exports) {

		/**
	  * A specialized version of `_.forEach` for arrays without support for
	  * iteratee shorthands.
	  *
	  * @private
	  * @param {Array} [array] The array to iterate over.
	  * @param {Function} iteratee The function invoked per iteration.
	  * @returns {Array} Returns `array`.
	  */
		function arrayEach(array, iteratee) {
			var index = -1,
			    length = array == null ? 0 : array.length;

			while (++index < length) {
				if (iteratee(array[index], index, array) === false) {
					break;
				}
			}
			return array;
		}

		module.exports = arrayEach;

		/***/
	},
	/* 7 */
	/***/function (module, exports) {

		/**
	  * A specialized version of `_.map` for arrays without support for iteratee
	  * shorthands.
	  *
	  * @private
	  * @param {Array} [array] The array to iterate over.
	  * @param {Function} iteratee The function invoked per iteration.
	  * @returns {Array} Returns the new mapped array.
	  */
		function arrayMap(array, iteratee) {
			var index = -1,
			    length = array == null ? 0 : array.length,
			    result = Array(length);

			while (++index < length) {
				result[index] = iteratee(array[index], index, array);
			}
			return result;
		}

		module.exports = arrayMap;

		/***/
	},
	/* 8 */
	/***/function (module, exports) {

		'use strict';

		module.exports = {
			'zen': false,
			'octocat': false,
			'organizations': false,
			'issues': false,
			'emojis': false,
			'markdown': false,
			'meta': false,
			'rate_limit': false,
			'feeds': false,
			'events': false,
			'notifications': {
				'threads': {
					'subscription': false
				}
			},
			'gitignore': {
				'templates': false
			},
			'user': {
				'repos': false,
				'orgs': false,
				'followers': false,
				'following': false,
				'emails': false,
				'issues': false,
				'starred': false,
				'teams': false
			},
			'orgs': {
				'repos': false,
				'issues': false,
				'members': false,
				'events': false,
				'teams': false
			},
			'teams': {
				'members': false,
				'memberships': false,
				'repos': false
			},
			'users': {
				'repos': false,
				'orgs': false,
				'gists': false,
				'followers': false,
				'following': false,
				'keys': false,
				'starred': false,
				'received_events': {
					'public': false
				},
				'events': {
					'public': false,
					'orgs': false
				},
				// Enterprise-only:
				'site_admin': false,
				'suspended': false
			},

			'search': {
				'repositories': false,
				'issues': false,
				'users': false,
				'code': false
			},
			'gists': {
				'public': false,
				'starred': false,
				'star': false,
				'comments': false,
				'forks': false
			},
			'repos': {
				'readme': false,
				'tarball': false,
				'zipball': false,
				'compare': false,
				'deployments': {
					'statuses': false
				},
				'hooks': {
					'tests': false
				},
				'assignees': false,
				'languages': false,
				'teams': false,
				'tags': false,
				'branches': false,
				'contributors': false,
				'subscribers': false,
				'subscription': false,
				'stargazers': false,
				'comments': false,
				'downloads': false,
				'forks': false,
				'milestones': {
					'labels': false
				},
				'labels': false,
				'releases': {
					'assets': false,
					'latest': false,
					'tags': false
				},
				'events': false,
				'notifications': false,
				'merges': false,
				'statuses': false,
				'pulls': {
					'merge': false,
					'comments': false,
					'commits': false,
					'files': false,
					'events': false,
					'labels': false
				},
				'pages': {
					'builds': {
						'latest': false
					}
				},
				'commits': {
					'comments': false,
					'status': false,
					'statuses': false
				},
				'contents': false,
				'collaborators': false,
				'issues': {
					'events': false,
					'comments': false,
					'labels': false
				},
				'git': {
					'refs': {
						'heads': false,
						'tags': false
					},
					'trees': false,
					'blobs': false,
					'commits': false
				},
				'stats': {
					'contributors': false,
					'commit_activity': false,
					'code_frequency': false,
					'participation': false,
					'punch_card': false
				}
			},
			'licenses': false,
			'authorizations': {
				'clients': false
			},
			'applications': {
				'tokens': false
			},
			// Enterprise routes
			'enterprise': {
				'settings': {
					'license': false
				},
				'stats': {
					'issues': false,
					'hooks': false,
					'milestones': false,
					'orgs': false,
					'comments': false,
					'pages': false,
					'users': false,
					'gists': false,
					'pulls': false,
					'repos': false,
					'all': false
				}
			},
			'staff': {
				'indexing_jobs': false
			},
			// Enterprise Maintenance routes
			'setup': {
				'api': {
					'start': false, // POST
					'upgrade': false, // POST
					'configcheck': false, // GET
					'configure': false, // POST
					'settings': { // GET/PUT
						'authorized-keys': false // GET/POST/DELETE
					},
					'maintenance': false // GET/POST
				}
			}
		};

		/***/
	},
	/* 9 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
		};

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var plus = __webpack_require__(4);

		// Daisy-Chainer
		// ===============================
		//
		// Generates the functions so `octo.repos(...).issues.comments.fetch()` works.
		// Constructs a URL for the verb methods (like `.fetch` and `.create`).

		module.exports = function () {
			function Chainer(_verbMethods) {
				_classCallCheck(this, Chainer);

				this._verbMethods = _verbMethods;
			}

			_createClass(Chainer, [{
				key: 'chain',
				value: function chain(path, name, contextTree, fn) {
					var _this = this;

					if (typeof fn === 'undefined' || fn === null) {
						fn = function fn() {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}

							if (!args.length) {
								throw new Error('BUG! must be called with at least one argument');
							}
							var separator = '/';
							// Special-case compare because its args turn into '...' instead of the usual '/'
							if (name === 'compare') {
								separator = '...';
							}
							return _this.chain(path + '/' + args.join(separator), name, contextTree);
						};
					}

					this._verbMethods.injectVerbMethods(path, fn);

					if (typeof fn === 'function' || (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object') {
						for (name in contextTree || {}) {
							(function (name) {
								// Delete the key if it already exists
								delete fn[plus.camelize(name)];

								return Object.defineProperty(fn, plus.camelize(name), {
									configurable: true,
									enumerable: true,
									get: function get() {
										return _this.chain(path + '/' + name, name, contextTree[name]);
									}
								});
							})(name);
						}
					}

					return fn;
				}
			}]);

			return Chainer;
		}();

		/***/
	},
	/* 10 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
		};

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _require = __webpack_require__(4),
		    filter = _require.filter,
		    forOwn = _require.forOwn,
		    extend = _require.extend;

		// When `origFn` is not passed a callback as the last argument then return a
		// Promise, or error if no Promise can be found (see `plugins/promise/*` for
		// some strategies for loading a Promise implementation)


		var toPromise = function toPromise(orig, newPromise) {
			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var last = args[args.length - 1];
				if (typeof last === 'function') {
					// The last arg is a callback function
					args.pop();
					return orig.apply(undefined, [last].concat(args));
				} else if (newPromise) {
					return newPromise(function (resolve, reject) {
						var cb = function cb(err, val) {
							if (err) {
								return reject(err);
							}
							return resolve(val);
						};
						return orig.apply(undefined, [cb].concat(args));
					});
				} else {
					throw new Error('You must specify a callback or have a promise library loaded');
				}
			};
		};

		var VerbMethods = function () {
			function VerbMethods(plugins, _requester) {
				_classCallCheck(this, VerbMethods);

				this._requester = _requester;
				if (!this._requester) {
					throw new Error('Octokat BUG: request is required');
				}

				var promisePlugins = filter(plugins, function (_ref) {
					var promiseCreator = _ref.promiseCreator;
					return promiseCreator;
				});
				if (promisePlugins) {
					this._promisePlugin = promisePlugins[0];
				}

				this._syncVerbs = {};
				var iterable = filter(plugins, function (_ref2) {
					var verbs = _ref2.verbs;
					return verbs;
				});
				for (var i = 0; i < iterable.length; i++) {
					var plugin = iterable[i];
					extend(this._syncVerbs, plugin.verbs);
				}
				this._asyncVerbs = {};
				var iterable1 = filter(plugins, function (_ref3) {
					var asyncVerbs = _ref3.asyncVerbs;
					return asyncVerbs;
				});
				for (var j = 0; j < iterable1.length; j++) {
					var _plugin = iterable1[j];
					extend(this._asyncVerbs, _plugin.asyncVerbs);
				}
			}

			// Injects verb methods onto `obj`


			_createClass(VerbMethods, [{
				key: 'injectVerbMethods',
				value: function injectVerbMethods(path, obj) {
					var _this = this;

					if (this._promisePlugin) {
						var newPromise = this._promisePlugin.promiseCreator.newPromise;
					}

					if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') {
						obj.url = path; // Mostly for testing
						forOwn(this._syncVerbs, function (verbFunc, verbName) {
							obj[verbName] = function () {
								var makeRequest = function makeRequest(cb) {
									for (var _len2 = arguments.length, originalArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
										originalArgs[_key2 - 1] = arguments[_key2];
									}

									var data = void 0,
									    method = void 0,
									    options = void 0;

									var _verbFunc = verbFunc.apply(undefined, [path].concat(originalArgs));

									method = _verbFunc.method;
									path = _verbFunc.path;
									data = _verbFunc.data;
									options = _verbFunc.options;

									return _this._requester.request(method, path, data, options, cb);
								};
								return toPromise(makeRequest, newPromise).apply(undefined, arguments);
							};
						});

						forOwn(this._asyncVerbs, function (verbFunc, verbName) {
							obj[verbName] = function () {
								var makeRequest = verbFunc(_this._requester, path); // Curried function
								return toPromise(makeRequest, newPromise).apply(undefined, arguments);
							};
						});
					} else {
						// console.warn('BUG: Attempted to injectVerbMethods on a ' + (typeof obj));
					}

					return obj;
				}
			}]);

			return VerbMethods;
		}();

		exports.VerbMethods = VerbMethods;
		exports.toPromise = toPromise;

		/***/
	},
	/* 11 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var toQueryString = __webpack_require__(12);

		// new class SimpleVerbs
		module.exports = {
			verbs: {
				fetch: function fetch(path, query) {
					return { method: 'GET', path: '' + path + toQueryString(query) };
				},
				read: function read(path, query) {
					return { method: 'GET', path: '' + path + toQueryString(query), options: { isRaw: true } };
				},
				remove: function remove(path, data) {
					return { method: 'DELETE', path: path, data: data, options: { isBoolean: true } };
				},
				create: function create(path, data, contentType) {
					if (contentType) {
						return { method: 'POST', path: path, data: data, options: { isRaw: true, contentType: contentType } };
					} else {
						return { method: 'POST', path: path, data: data };
					}
				},
				update: function update(path, data) {
					return { method: 'PATCH', path: path, data: data };
				},
				add: function add(path, data) {
					return { method: 'PUT', path: path, data: data, options: { isBoolean: true } };
				},
				contains: function contains(path) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					return { method: 'GET', path: path + '/' + args.join('/'), options: { isBoolean: true } };
				}
			}
		};

		/***/
	},
	/* 12 */
	/***/function (module, exports) {

		'use strict';

		// Converts a dictionary to a query string.
		// Internal helper method

		var toQueryString = function toQueryString(options, omitQuestionMark) {
			// Returns '' if `options` is empty so this string can always be appended to a URL
			if (!options || options === {}) {
				return '';
			}

			var params = [];
			var object = options || {};
			for (var key in object) {
				var value = object[key];
				if (value) {
					params.push(key + '=' + encodeURIComponent(value));
				}
			}
			if (params.length) {
				if (omitQuestionMark) {
					return '&' + params.join('&');
				} else {
					return '?' + params.join('&');
				}
			} else {
				return '';
			}
		};

		module.exports = toQueryString;

		/***/
	},
	/* 13 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		// new class UseNativePromises

		module.exports = {
			promiseCreator: __webpack_require__(14)
		};

		/***/
	},
	/* 14 */
	/***/function (module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		if (typeof Promise !== 'undefined' && Promise !== null) {
			var newPromise = function newPromise(fn) {
				return new Promise(function (resolve, reject) {
					// Some browsers (like node-webkit 0.8.6) contain an older implementation
					// of Promises that provide 1 argument (a `PromiseResolver`).
					if (resolve.fulfill) {
						return fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve));
					} else {
						return fn.apply(undefined, arguments);
					}
				});
			};

			var allPromises = function allPromises(promises) {
				return Promise.all(promises);
			};
		}

		exports.newPromise = newPromise;
		exports.allPromises = allPromises;

		/***/
	},
	/* 15 */
	/***/function (module, exports, __webpack_require__) {

		var require;'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _require = __webpack_require__(4),
		    filter = _require.filter,
		    map = _require.map,
		    waterfall = _require.waterfall;

		// Request Function
		// ===============================
		//
		// Generates the actual HTTP requests to GitHub.
		// Handles ETag caching, authentication headers, boolean requests, and paged results

		// Simple jQuery.ajax() shim that returns a promise for a xhr object


		var ajax = function ajax(options, cb) {
			// Use the browser XMLHttpRequest if it exists. If not, then this is NodeJS
			// Pull this in for every request so sepia.js has a chance to override `window.XMLHTTPRequest`
			var XMLHttpRequest = null;
			if (typeof window !== 'undefined' && window !== null) {
				var _window = window;
				XMLHttpRequest = _window.XMLHttpRequest;
			} else {
				var req = require;

				var _req = __webpack_require__(16);

				XMLHttpRequest = _req.XMLHttpRequest;
			}

			var xhr = new XMLHttpRequest();
			xhr.dataType = options.dataType;
			__guardFunc__(xhr.overrideMimeType, function (f) {
				return f(options.mimeType);
			});
			xhr.open(options.type, options.url);

			if (options.data && options.type !== 'GET') {
				xhr.setRequestHeader('Content-Type', options.contentType);
			}

			for (var name in options.headers) {
				var value = options.headers[name];
				xhr.setRequestHeader(name, value);
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					__guardFunc__(__guard__(options.statusCode, function (x) {
						return x[xhr.status];
					}), function (f1) {
						return f1();
					});

					// When disconnected, pass if the status is 0 so the cacheHandler has a chance to return the cached version
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 302 || xhr.status === 0) {
						return cb(null, xhr);
					} else {
						return cb(xhr);
					}
				}
			};
			return xhr.send(options.data);
		};

		// # Construct the request function.
		// It contains all the auth credentials passed in to the client constructor

		var eventId = 0; // counter for the emitter so it is easier to match up requests

		module.exports = function () {
			function Requester(_instance) {
				var _clientOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var plugins = arguments[2];

				_classCallCheck(this, Requester);

				// Provide an option to override the default URL
				this._instance = _instance;
				this._clientOptions = _clientOptions;
				if (this._clientOptions.rootURL == null) {
					this._clientOptions.rootURL = 'https://api.github.com';
				}
				if (this._clientOptions.useETags == null) {
					this._clientOptions.useETags = true;
				}
				if (this._clientOptions.usePostInsteadOfPatch == null) {
					this._clientOptions.usePostInsteadOfPatch = false;
				}

				// These are updated whenever a request is made (optional)
				if (typeof this._clientOptions.emitter === 'function') {
					this._emit = this._clientOptions.emitter;
				}

				this._pluginMiddlewareAsync = map(filter(plugins, function (_ref) {
					var requestMiddlewareAsync = _ref.requestMiddlewareAsync;
					return requestMiddlewareAsync;
				}), function (plugin) {
					return plugin.requestMiddlewareAsync.bind(plugin);
				});
				this._plugins = plugins;
			}

			// HTTP Request Abstraction
			// =======
			//


			_createClass(Requester, [{
				key: 'request',
				value: function request(method, path, data) {
					var _this = this;

					var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { isRaw: false, isBase64: false, isBoolean: false, contentType: 'application/json' };
					var cb = arguments[4];

					if (typeof options === 'undefined' || options === null) {
						options = {};
					}
					if (options.isRaw == null) {
						options.isRaw = false;
					}
					if (options.isBase64 == null) {
						options.isBase64 = false;
					}
					if (options.isBoolean == null) {
						options.isBoolean = false;
					}
					if (options.contentType == null) {
						options.contentType = 'application/json';
					}

					// console.log method, path, data, options, typeof cb

					// Only prefix the path when it does not begin with http.
					// This is so pagination works (which provides absolute URLs).
					if (!/^http/.test(path)) {
						path = '' + this._clientOptions.rootURL + path;
					}

					var headers = { 'Accept': this._clientOptions.acceptHeader || 'application/json' };

					if (typeof window === 'undefined' || window === null) {
						// Set the `User-Agent` because it is required and NodeJS
						// does not send one by default.
						// See http://developer.github.com/v3/#user-agent-required
						headers['User-Agent'] = 'octokat.js';
					}

					var acc = { method: method, path: path, headers: headers, options: options, clientOptions: this._clientOptions };

					// To use async.waterfall we need to pass in the initial data (`acc`)
					// so we create an initial function that just takes a callback
					var initial = function initial(cb) {
						return cb(null, acc);
					};
					var pluginsPlusInitial = [initial].concat(this._pluginMiddlewareAsync);

					return waterfall(pluginsPlusInitial, function (err, acc) {
						var mimeType = void 0;
						if (err) {
							return cb(err, acc);
						}

						var _acc = acc;
						method = _acc.method;
						headers = _acc.headers;
						mimeType = _acc.mimeType;

						if (options.isRaw) {
							headers['Accept'] = 'application/vnd.github.raw';
						}

						var ajaxConfig = {
							// Be sure to **not** blow the cache with a random number
							// (GitHub will respond with 5xx or CORS errors)
							url: path,
							type: method,
							contentType: options.contentType,
							mimeType: mimeType,
							headers: headers,

							processData: false, // Don't convert to QueryString
							data: !options.isRaw && data && JSON.stringify(data) || data,
							dataType: !options.isRaw ? 'json' : undefined
						};

						// If the request is a boolean yes/no question GitHub will indicate
						// via the HTTP Status of 204 (No Content) or 404 instead of a 200.
						if (options.isBoolean) {
							ajaxConfig.statusCode = {
								204: function _() {
									return cb(null, true);
								},
								404: function _() {
									return cb(null, false);
								}
							};
						}

						eventId++;
						__guardFunc__(_this._emit, function (f) {
							return f('start', eventId, { method: method, path: path, data: data, options: options });
						});

						return ajax(ajaxConfig, function (err, val) {
							var jqXHR = err || val;

							// Fire listeners when the request completes or fails
							if (_this._emit) {
								if (jqXHR.getResponseHeader('X-RateLimit-Limit')) {
									var rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'));
									var rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'));
									var rateLimitReset = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Reset'));
									// Reset time is in seconds, not milliseconds
									// if rateLimitReset
									//   rateLimitReset = new Date(rateLimitReset * 1000)

									var emitterRate = {
										remaining: rateLimitRemaining,
										limit: rateLimit,
										reset: rateLimitReset
									};

									if (jqXHR.getResponseHeader('X-OAuth-Scopes')) {
										emitterRate.scopes = jqXHR.getResponseHeader('X-OAuth-Scopes').split(', ');
									}
								}
								_this._emit('end', eventId, { method: method, path: path, data: data, options: options }, jqXHR.status, emitterRate);
							}

							if (!err) {
								// Return the result and Base64 encode it if `options.isBase64` flag is set.

								// Respond with the redirect URL (for archive links)
								// TODO: implement a `followRedirects` plugin
								if (jqXHR.status === 302) {
									return cb(null, jqXHR.getResponseHeader('Location'));
									// If it was a boolean question and the server responded with 204 ignore.
								} else if (jqXHR.status !== 204 || !options.isBoolean) {
									if (jqXHR.responseText && ajaxConfig.dataType === 'json') {
										data = JSON.parse(jqXHR.responseText);
									} else {
										data = jqXHR.responseText;
									}

									acc = {
										clientOptions: _this._clientOptions,
										plugins: _this._plugins,
										data: data,
										options: options,
										jqXHR: jqXHR, // for cacheHandler
										status: jqXHR.status, // cacheHandler changes this
										request: acc, // Include the request data for plugins like cacheHandler
										requester: _this, // for Hypermedia to generate verb methods
										instance: _this._instance // for Hypermedia to be able to call `.fromUrl`
									};
									return _this._instance._parseWithContext('', acc, function (err, val) {
										if (err) {
											return cb(err, val);
										}
										return cb(null, val, jqXHR.status, jqXHR);
									});
								}
							} else {
								// Parse the error if one occurs

								// If the request was for a Boolean then a 404 should be treated as a "false"
								if (!options.isBoolean || jqXHR.status !== 404) {
									err = new Error(jqXHR.responseText);
									err.status = jqXHR.status;
									if (jqXHR.getResponseHeader('Content-Type') === 'application/json; charset=utf-8') {
										var json = '';
										if (jqXHR.responseText) {
											try {
												json = JSON.parse(jqXHR.responseText);
											} catch (error) {
												cb({ message: 'Error Parsing Response' });
											}
										} else {
											// In the case of 404 errors, `responseText` is an empty string
											json = '';
										}
										err.json = json;
									}
									return cb(err);
								}
							}
						});
					});
				}
			}]);

			return Requester;
		}();

		function __guardFunc__(func, transform) {
			return typeof func === 'function' ? transform(func) : undefined;
		}
		function __guard__(value, transform) {
			return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
		}

		/***/
	},
	/* 16 */
	/***/function (module, exports) {

		'use strict';

		module.exports = __webpack_require__(47);

		/***/
	},
	/* 17 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var toQueryString = __webpack_require__(12);
		var deprecate = __webpack_require__(2);

		module.exports = function (url) {
			// Deprecated interface. Use an Object to specify the args in the template.
			// the order of fields in the template should not matter.
			var m = void 0;
			if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 0) {
				var templateParams = {};
			} else {
				if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) {
					deprecate('When filling in a template URL pass all the field to fill in 1 object instead of comma-separated args');
				}

				var templateParams = arguments.length <= 1 ? undefined : arguments[1];
			}

			// url can contain {name} or {/name} in the URL.
			// for every arg passed in, replace {...} with that arg
			// and remove the rest (they may or may not be optional)
			var i = 0;
			while (m = /(\{[^\}]+\})/.exec(url)) {
				// `match` is something like `{/foo}` or `{?foo,bar}` or `{foo}` (last one means it is required)
				var match = m[1];
				var param = '';
				// replace it
				switch (match[1]) {
					case '/':
						var fieldName = match.slice(2, match.length - 1); // omit the braces and the slash
						var fieldValue = templateParams[fieldName];
						if (fieldValue) {
							if (/\//.test(fieldValue)) {
								throw new Error('Octokat Error: this field must not contain slashes: ' + fieldName);
							}
							param = '/' + fieldValue;
						}
						break;
					case '+':
						fieldName = match.slice(2, match.length - 1); // omit the braces and the `+`
						fieldValue = templateParams[fieldName];
						if (fieldValue) {
							param = fieldValue;
						}
						break;
					case '?':
						// Strip off the "{?" and the trailing "}"
						// For example, the URL is `/assets{?name,label}`
						//   which turns into `/assets?name=foo.zip`
						// Used to upload releases via the repo releases API.
						//
						// When match contains `,` or
						// `args.length is 1` and args[0] is object match the args to those in the template
						var optionalNames = match.slice(2, -2 + 1).split(','); // omit the braces and the `?` before splitting
						var optionalParams = {};
						for (var j = 0; j < optionalNames.length; j++) {
							fieldName = optionalNames[j];
							optionalParams[fieldName] = templateParams[fieldName];
						}
						param = toQueryString(optionalParams);
						break;
					case '&':
						optionalNames = match.slice(2, -2 + 1).split(','); // omit the braces and the `?` before splitting
						optionalParams = {};
						for (var k = 0; k < optionalNames.length; k++) {
							fieldName = optionalNames[k];
							optionalParams[fieldName] = templateParams[fieldName];
						}
						param = toQueryString(optionalParams, true); // true means omitQuestionMark
						break;

					default:
						// This is a required field. ie `{repoName}`
						fieldName = match.slice(1, match.length - 1); // omit the braces
						if (templateParams[fieldName]) {
							param = templateParams[fieldName];
						} else {
							throw new Error('Octokat Error: Required parameter is missing: ' + fieldName);
						}
				}

				url = url.replace(match, param);
				i++;
			}

			return url;
		};

		/***/
	},
	/* 18 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var deprecate = __webpack_require__(2);

		module.exports = new (function () {
			function HyperMedia() {
				_classCallCheck(this, HyperMedia);
			}

			_createClass(HyperMedia, [{
				key: 'replace',
				value: function replace(instance, data) {
					if (Array.isArray(data)) {
						return this._replaceArray(instance, data);
					} else if (typeof data === 'function') {
						return data;
					} else if (data instanceof Date) {
						return data;
					} else if (data === Object(data)) {
						return this._replaceObject(instance, data);
					} else {
						return data;
					}
				}
			}, {
				key: '_replaceObject',
				value: function _replaceObject(instance, orig) {
					var acc = {};
					var iterable = Object.keys(orig);
					for (var i = 0; i < iterable.length; i++) {
						var key = iterable[i];
						var value = orig[key];
						this._replaceKeyValue(instance, acc, key, value);
					}

					return acc;
				}
			}, {
				key: '_replaceArray',
				value: function _replaceArray(instance, orig) {
					var _this = this;

					var arr = orig.map(function (item) {
						return _this.replace(instance, item);
					});
					// Convert the nextPage methods for paged results
					var iterable = Object.keys(orig);
					for (var i = 0; i < iterable.length; i++) {
						var key = iterable[i];
						var value = orig[key];
						this._replaceKeyValue(instance, arr, key, value);
					}
					return arr;
				}

				// Convert things that end in `_url` to methods which return a Promise

			}, {
				key: '_replaceKeyValue',
				value: function _replaceKeyValue(instance, acc, key, value) {
					if (/_url$/.test(key)) {
						if (/^upload_url$/.test(key)) {
							// POST https://<upload_url>/repos/:owner/:repo/releases/:id/assets?name=foo.zip
							var defaultFn = function defaultFn() {
								// TODO: Maybe always set isRaw=true when contentType is provided
								deprecate('call .upload({name, label}).create(data, contentType)' + ' instead of .upload(name, data, contentType)');
								return defaultFn.create.apply(defaultFn, arguments);
							};

							var fn = function fn() {
								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
									args[_key] = arguments[_key];
								}

								return instance._fromUrlWithDefault.apply(instance, [value, defaultFn].concat(args))();
							};
						} else {
							var defaultFn = function defaultFn() {
								deprecate('instead of directly calling methods like .nextPage(), use .nextPage.fetch()');
								return this.fetch();
							};
							var fn = instance._fromUrlCurried(value, defaultFn);
						}

						var newKey = key.substring(0, key.length - '_url'.length);
						acc[newKey] = fn;
						// add a camelCase URL field for retrieving non-templated URLs
						// like `avatarUrl` and `htmlUrl`
						if (!/\{/.test(value)) {
							return acc[key] = value;
						}
					} else if (/_at$/.test(key)) {
						// Ignore null dates so we do not get `Wed Dec 31 1969`
						return acc[key] = value ? new Date(value) : null;
					} else {
						return acc[key] = this.replace(instance, value);
					}
				}
			}, {
				key: 'responseMiddlewareAsync',
				value: function responseMiddlewareAsync(input, cb) {
					var instance = input.instance,
					    data = input.data;

					data = this.replace(instance, data);
					input.data = data; // or throw new Error('BUG! Expected JSON data to exist')
					return cb(null, input);
				}
			}]);

			return HyperMedia;
		}())();

		/***/
	},
	/* 19 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var OBJECT_MATCHER = __webpack_require__(20);
		var TREE_OPTIONS = __webpack_require__(8);

		var _require = __webpack_require__(10),
		    VerbMethods = _require.VerbMethods;

		var Chainer = __webpack_require__(9);

		module.exports = new (function () {
			function ObjectChainer() {
				_classCallCheck(this, ObjectChainer);
			}

			_createClass(ObjectChainer, [{
				key: 'chainChildren',
				value: function chainChildren(chainer, url, obj) {
					return function () {
						var result = [];
						for (var key in OBJECT_MATCHER) {
							var re = OBJECT_MATCHER[key];
							var item = void 0;
							if (re.test(obj.url)) {
								var context = TREE_OPTIONS;
								var iterable = key.split('.');
								for (var i = 0; i < iterable.length; i++) {
									var k = iterable[i];
									context = context[k];
								}
								item = chainer.chain(url, k, context, obj);
							}
							result.push(item);
						}
						return result;
					}();
				}
			}, {
				key: 'responseMiddlewareAsync',
				value: function responseMiddlewareAsync(input, cb) {
					var plugins = input.plugins,
					    requester = input.requester,
					    data = input.data,
					    url = input.url;
					// unless data
					//    throw new Error('BUG! Expected JSON data to exist')

					var verbMethods = new VerbMethods(plugins, requester);
					var chainer = new Chainer(verbMethods);
					if (url) {
						chainer.chain(url, true, {}, data);
						this.chainChildren(chainer, url, data);
					} else {
						chainer.chain('', null, {}, data);
						// For the paged results, rechain all children in the array
						if (Array.isArray(data)) {
							for (var i = 0; i < data.length; i++) {
								var datum = data[i];
								this.chainChildren(chainer, datum.url, datum);
							}
						}
					}

					return cb(null, input);
				}
			}]);

			return ObjectChainer;
		}())();

		/***/
	},
	/* 20 */
	/***/function (module, exports) {

		module.exports = {
			'repos': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+$/,
			'gists': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/gists\/[^\/]+$/,
			'issues': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/(issues|pulls)\/[^\/]+$/,
			'users': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/[^\/]+$/,
			'orgs': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/orgs\/[^\/]+$/,
			'teams': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/teams\/[^\/]+$/,
			'repos.comments': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/comments\/[^\/]+$/
		};

		/***/
	},
	/* 21 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _require = __webpack_require__(22),
		    newPromise = _require.newPromise,
		    allPromises = _require.allPromises;

		if (!newPromise || !allPromises) {
			var _require2 = __webpack_require__(14);

			newPromise = _require2.newPromise;
			allPromises = _require2.allPromises;
		}
		if ((typeof window === 'undefined' || window === null) && !newPromise) {
			var _require3 = __webpack_require__(23);

			newPromise = _require3.newPromise;
			allPromises = _require3.allPromises;
		}

		if (typeof window !== 'undefined' && window !== null && !newPromise) {
			// Otherwise, show a warning (library can still be used with just callbacks)
			__guardFunc__(__guard__(console, function (x) {
				return x.warn;
			}), function (f) {
				return f('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise');
			});
		} else if ((typeof window === 'undefined' || window === null) && !newPromise) {
			// Running in NodeJS
			throw new Error('Could not find a promise lib for node. Seems like a bug');
		}

		// new class PreferLibraryOverNativePromises
		module.exports = {
			promiseCreator: { newPromise: newPromise, allPromises: allPromises }
		};

		function __guardFunc__(func, transform) {
			return typeof func === 'function' ? transform(func) : undefined;
		}
		function __guard__(value, transform) {
			return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
		}

		/***/
	},
	/* 22 */
	/***/function (module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		function _toConsumableArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}return arr2;
			} else {
				return Array.from(arr);
			}
		}

		if (typeof window !== 'undefined' && window !== null) {
			// Running in a browser

			// Determine the correct Promise factory.
			// Try to use libraries before native Promises since most Promise users
			// are already using a library.
			//
			// Try in the following order:
			// - Q Promise
			// - angularjs Promise
			// - jQuery Promise
			// - native Promise or a polyfill
			if (window.Q) {
				var newPromise = function newPromise(fn) {
					var deferred = window.Q.defer();
					var resolve = function resolve(val) {
						return deferred.resolve(val);
					};
					var reject = function reject(err) {
						return deferred.reject(err);
					};
					fn(resolve, reject);
					return deferred.promise;
				};
				var allPromises = function allPromises(promises) {
					return window.Q.all(promises);
				};
			} else if (window.angular) {
				var newPromise = null;
				var allPromises = null;

				// Details on Angular Promises: http://docs.angularjs.org/api/ng/service/$q
				var injector = angular.injector(['ng']);
				injector.invoke(function ($q) {
					exports.newPromise = newPromise = function newPromise(fn) {
						var deferred = $q.defer();
						var resolve = function resolve(val) {
							return deferred.resolve(val);
						};
						var reject = function reject(err) {
							return deferred.reject(err);
						};
						fn(resolve, reject);
						return deferred.promise;
					};
					return exports.allPromises = allPromises = function allPromises(promises) {
						return $q.all(promises);
					};
				});
			} else if (__guard__(window.jQuery, function (x) {
				return x.Deferred;
			})) {
				var newPromise = function newPromise(fn) {
					var promise = window.jQuery.Deferred();
					var resolve = function resolve(val) {
						return promise.resolve(val);
					};
					var reject = function reject(val) {
						return promise.reject(val);
					};
					fn(resolve, reject);
					return promise.promise();
				};
				var allPromises = function allPromises(promises) {
					var _window$jQuery;

					// `jQuery.when` is a little odd.
					// - It accepts each promise as an argument (instead of an array of promises)
					// - Each resolved value is an argument (instead of an array of values)
					//
					// So, convert the array of promises to args and then the resolved args to an array
					return (_window$jQuery = window.jQuery).when.apply(_window$jQuery, _toConsumableArray(promises)).then(function () {
						for (var _len = arguments.length, promises = Array(_len), _key = 0; _key < _len; _key++) {
							promises[_key] = arguments[_key];
						}

						return promises;
					});
				};
			}
		}

		exports.newPromise = newPromise;
		exports.allPromises = allPromises;

		function __guard__(value, transform) {
			return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
		}

		/***/
	},
	/* 23 */
	/***/function (module, exports, __webpack_require__) {

		var require;'use strict';

		(function (root) {
			var req = require; // Hack so requireJS does not try to load `es6-promise` in the browser
			// Use native promises if Harmony is on
			var Promise = this.Promise || __webpack_require__(24).Promise;
			var newPromise = function newPromise(fn) {
				return new Promise(fn);
			};
			var allPromises = function allPromises(promises) {
				return Promise.all(promises);
			};

			module.exports = { newPromise: newPromise, allPromises: allPromises };
		})(undefined);

		/***/
	},
	/* 24 */
	/***/function (module, exports) {

		'use strict';

		// Webpack tries to include this package when building for node
		// Therefore, we stub it out and then tell webpack to noParse this file
		// so that it is properly require'd in the node build.

		module.exports = __webpack_require__(48);

		/***/
	},
	/* 25 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var URL_VALIDATOR = __webpack_require__(26);

		module.exports = new (function () {
			function PathValidator() {
				_classCallCheck(this, PathValidator);
			}

			_createClass(PathValidator, [{
				key: 'requestMiddlewareAsync',
				value: function requestMiddlewareAsync(input, cb) {
					var path = input.path;

					if (!URL_VALIDATOR.test(path)) {
						var err = 'Octokat BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=' + path;
						console.warn(err);
					}
					return cb(null, input);
				}
			}]);

			return PathValidator;
		}())();

		/***/
	},
	/* 26 */
	/***/function (module, exports) {

		module.exports = /^(https:\/\/status.github.com\/api\/(status.json|last-message.json|messages.json)$)|(https?:\/\/[^\/]+)?(\/api\/v3)?\/(zen|octocat|users|organizations|issues|gists|emojis|markdown|meta|rate_limit|feeds|events|notifications|notifications\/threads(\/[^\/]+)|notifications\/threads(\/[^\/]+)\/subscription|gitignore\/templates(\/[^\/]+)?|user(\/\d+)?|user(\/\d+)?\/(|repos|orgs|followers|following(\/[^\/]+)?|emails(\/[^\/]+)?|issues|starred|starred(\/[^\/]+){2}|teams)|orgs\/[^\/]+|orgs\/[^\/]+\/(repos|issues|members|events|teams)|teams\/[^\/]+|teams\/[^\/]+\/(members(\/[^\/]+)?|memberships\/[^\/]+|repos|repos(\/[^\/]+){2})|users\/[^\/]+|users\/[^\/]+\/(repos|orgs|gists|followers|following(\/[^\/]+){0,2}|keys|starred|received_events(\/public)?|events(\/public)?|events\/orgs\/[^\/]+)|search\/(repositories|issues|users|code)|gists\/(public|starred|([a-f0-9]{20}|[0-9]+)|([a-f0-9]{20}|[0-9]+)\/forks|([a-f0-9]{20}|[0-9]+)\/comments(\/[0-9]+)?|([a-f0-9]{20}|[0-9]+)\/star)|repos(\/[^\/]+){2}|repos(\/[^\/]+){2}\/(readme|tarball(\/[^\/]+)?|zipball(\/[^\/]+)?|compare\/([^\.{3}]+)\.{3}([^\.{3}]+)|deployments(\/[0-9]+)?|deployments\/[0-9]+\/statuses(\/[0-9]+)?|hooks|hooks\/[^\/]+|hooks\/[^\/]+\/tests|assignees|languages|teams|tags|branches(\/[^\/]+){0,2}|contributors|subscribers|subscription|stargazers|comments(\/[0-9]+)?|downloads(\/[0-9]+)?|forks|milestones|milestones\/[0-9]+|milestones\/[0-9]+\/labels|labels(\/[^\/]+)?|releases|releases\/([0-9]+)|releases\/([0-9]+)\/assets|releases\/latest|releases\/tags\/([^\/]+)|releases\/assets\/([0-9]+)|events|notifications|merges|statuses\/[a-f0-9]{40}|pages|pages\/builds|pages\/builds\/latest|commits|commits\/[a-f0-9]{40}|commits\/[a-f0-9]{40}\/(comments|status|statuses)?|contents\/|contents(\/[^\/]+)*|collaborators(\/[^\/]+)?|(issues|pulls)|(issues|pulls)\/(events|events\/[0-9]+|comments(\/[0-9]+)?|[0-9]+|[0-9]+\/events|[0-9]+\/comments|[0-9]+\/labels(\/[^\/]+)?)|pulls\/[0-9]+\/(files|commits|merge)|git\/(refs|refs\/(.+|heads(\/[^\/]+)?|tags(\/[^\/]+)?)|trees(\/[^\/]+)?|blobs(\/[a-f0-9]{40}$)?|commits(\/[a-f0-9]{40}$)?)|stats\/(contributors|commit_activity|code_frequency|participation|punch_card))|licenses|licenses\/([^\/]+)|authorizations|authorizations\/((\d+)|clients\/([^\/]{20})|clients\/([^\/]{20})\/([^\/]+))|applications\/([^\/]{20})\/tokens|applications\/([^\/]{20})\/tokens\/([^\/]+)|enterprise\/(settings\/license|stats\/(issues|hooks|milestones|orgs|comments|pages|users|gists|pulls|repos|all))|staff\/indexing_jobs|users\/[^\/]+\/(site_admin|suspended)|setup\/api\/(start|upgrade|configcheck|configure|settings(authorized-keys)?|maintenance))(\?.*)?$/;

		/***/
	},
	/* 27 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var base64encode = __webpack_require__(28);

		module.exports = new (function () {
			function Authorization() {
				_classCallCheck(this, Authorization);
			}

			_createClass(Authorization, [{
				key: 'requestMiddlewareAsync',
				value: function requestMiddlewareAsync(input, cb) {
					if (input.headers == null) {
						input.headers = {};
					}
					var headers = input.headers,
					    _input$clientOptions = input.clientOptions,
					    token = _input$clientOptions.token,
					    username = _input$clientOptions.username,
					    password = _input$clientOptions.password;

					if (token || username && password) {
						if (token) {
							var auth = 'token ' + token;
						} else {
							var auth = 'Basic ' + base64encode(username + ':' + password);
						}
						input.headers['Authorization'] = auth;
					}
					return cb(null, input);
				}
			}]);

			return Authorization;
		}())();

		/***/
	},
	/* 28 */
	/***/function (module, exports) {

		/* WEBPACK VAR INJECTION */(function (global) {
			'use strict';

			// Base64 Encoder
			// ===============================
			//
			// Used for sending binary files and encoding the auth username/password

			if (typeof window !== 'undefined' && window !== null) {
				var base64encode = window.btoa;
				// Use the `Buffer` if available (NodeJS)
			} else if (__guard__(global, function (x) {
				return x['Buffer'];
			})) {
				var base64encode = function base64encode(str) {
					var buffer = new global['Buffer'](str, 'binary');
					return buffer.toString('base64');
				};
			} else {
				throw new Error('Native btoa function or Buffer is missing');
			}

			module.exports = base64encode;

			function __guard__(value, transform) {
				return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
			}
			/* WEBPACK VAR INJECTION */
		}).call(exports, function () {
			return this;
		}());

		/***/
	},
	/* 29 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var PREVIEW_HEADERS = __webpack_require__(30);

		var DEFAULT_HEADER = function DEFAULT_HEADER(url) {
			for (var key in PREVIEW_HEADERS) {
				var val = PREVIEW_HEADERS[key];
				if (val.test(url)) {
					return key;
				}
			}
		};

		// Use the preview API header if one of the routes match the preview APIs
		module.exports = new (function () {
			function PreviewApis() {
				_classCallCheck(this, PreviewApis);
			}

			_createClass(PreviewApis, [{
				key: 'requestMiddlewareAsync',
				value: function requestMiddlewareAsync(input, cb) {
					var path = input.path;

					var acceptHeader = DEFAULT_HEADER(path);
					if (acceptHeader) {
						input.headers['Accept'] = acceptHeader;
					}

					return cb(null, input);
				}
			}]);

			return PreviewApis;
		}())();

		/***/
	},
	/* 30 */
	/***/function (module, exports) {

		module.exports = {
			'application/vnd.github.drax-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/licenses|\/licenses\/([^\/]+)|\/repos\/([^\/]+)\/([^\/]+))$/,
			'application/vnd.github.v3.star+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/([^\/]+)\/starred$/
		};

		/***/
	},
	/* 31 */
	/***/function (module, exports) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		module.exports = new (function () {
			function UsePostInsteadOfPatch() {
				_classCallCheck(this, UsePostInsteadOfPatch);
			}

			_createClass(UsePostInsteadOfPatch, [{
				key: 'requestMiddlewareAsync',
				value: function requestMiddlewareAsync(input, cb) {
					var usePostInsteadOfPatch = input.clientOptions.usePostInsteadOfPatch,
					    method = input.method;

					if (usePostInsteadOfPatch && method === 'PATCH') {
						input.method = 'POST';
					}
					return cb(null, input);
				}
			}]);

			return UsePostInsteadOfPatch;
		}())();

		/***/
	},
	/* 32 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var toQueryString = __webpack_require__(12);

		var pushAll = function pushAll(target, source) {
			if (!Array.isArray(source)) {
				throw new Error('Octokat Error: Calling fetchAll on a request that does not yield an array');
			}
			return target.push.apply(target, source);
		};

		var getMore = function getMore(fetchable, requester, acc, cb) {
			var doStuff = function doStuff(err, results) {
				if (err) {
					return cb(err);
				}
				pushAll(acc, results.items);
				return getMore(results, requester, acc, cb);
			};

			if (!fetchNextPage(fetchable, requester, doStuff)) {
				return cb(null, acc);
			}
		};

		// TODO: HACK to handle camelCase and hypermedia plugins
		var fetchNextPage = function fetchNextPage(obj, requester, cb) {
			if (typeof obj.next_page_url === 'string') {
				requester.request('GET', obj.next_page, null, null, cb);
				return true;
			} else if (obj.next_page) {
				obj.next_page.fetch(cb);
				return true;
			} else if (typeof obj.nextPageUrl === 'string') {
				requester.request('GET', obj.nextPageUrl, null, null, cb);
				return true;
			} else if (obj.nextPage) {
				obj.nextPage.fetch(cb);
				return true;
			} else {
				return false;
			}
		};

		// new class FetchAll
		module.exports = {
			asyncVerbs: {
				fetchAll: function fetchAll(requester, path) {
					return function (cb, query) {
						return (
							// TODO: Pass in the instance so we can just call fromUrl maybe? and we don't rely on hypermedia to create nextPage
							requester.request('GET', '' + path + toQueryString(query), null, null, function (err, results) {
								if (err) {
									return cb(err);
								}
								var acc = [];
								pushAll(acc, results.items);
								// TODO: handle `items.next_page = string/function`, `items.nextPage = string/function`
								return getMore(results, requester, acc, cb);
							})
						);
					};
				}
			}
		};

		/***/
	},
	/* 33 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var toQueryString = __webpack_require__(12);

		module.exports = new (function () {
			function ReadBinary() {
				_classCallCheck(this, ReadBinary);

				this.verbs = {
					readBinary: function readBinary(path, query) {
						return { method: 'GET', path: '' + path + toQueryString(query), options: { isRaw: true, isBase64: true } };
					}
				};
			}

			_createClass(ReadBinary, [{
				key: 'requestMiddlewareAsync',
				value: function requestMiddlewareAsync(input, cb) {
					var options = input.options;

					if (options) {
						var isBase64 = options.isBase64;

						if (isBase64) {
							input.headers['Accept'] = 'application/vnd.github.raw';
							input.mimeType = 'text/plain; charset=x-user-defined';
						}
					}
					return cb(null, input);
				}
			}, {
				key: 'responseMiddlewareAsync',
				value: function responseMiddlewareAsync(input, cb) {
					var options = input.options,
					    data = input.data;

					if (options) {
						var isBase64 = options.isBase64;
						// Convert the response to a Base64 encoded string

						if (isBase64) {
							// Convert raw data to binary chopping off the higher-order bytes in each char.
							// Useful for Base64 encoding.
							var converted = '';
							var iterable = __range__(0, data.length, false);
							for (var j = 0; j < iterable.length; j++) {
								var i = iterable[j];
								converted += String.fromCharCode(data.charCodeAt(i) & 0xff);
							}

							input.data = converted; // or throw new Error('BUG! Expected JSON data to exist')
						}
					}
					return cb(null, input);
				}
			}]);

			return ReadBinary;
		}())();

		function __range__(left, right, inclusive) {
			var range = [];
			var ascending = left < right;
			var end = !inclusive ? right : ascending ? right + 1 : right - 1;
			for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
				range.push(i);
			}
			return range;
		}

		/***/
	},
	/* 34 */
	/***/function (module, exports) {

		var Pagination;

		module.exports = new (Pagination = function () {
			function Pagination() {}

			Pagination.prototype.responseMiddlewareAsync = function (input, cb) {
				var data, discard, href, i, jqXHR, len, links, part, ref, ref1, rel;
				jqXHR = input.jqXHR, data = input.data;
				if (!jqXHR) {
					return cb(null, input);
				}
				if (Array.isArray(data)) {
					data = {
						items: data.slice(0)
					};
					links = jqXHR.getResponseHeader('Link');
					ref = (links != null ? links.split(',') : void 0) || [];
					for (i = 0, len = ref.length; i < len; i++) {
						part = ref[i];
						ref1 = part.match(/<([^>]+)>;\ rel="([^"]+)"/), discard = ref1[0], href = ref1[1], rel = ref1[2];
						data[rel + "_page_url"] = href;
					}
					input.data = data;
				}
				return cb(null, input);
			};

			return Pagination;
		}())();

		/***/
	},
	/* 35 */
	/***/function (module, exports) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		module.exports = new (function () {
			function CacheHandler() {
				_classCallCheck(this, CacheHandler);

				this._cachedETags = {};
			}

			// Default cacheHandler methods


			_createClass(CacheHandler, [{
				key: 'get',
				value: function get(method, path) {
					return this._cachedETags[method + ' ' + path];
				}
			}, {
				key: 'add',
				value: function add(method, path, eTag, data, status) {
					return this._cachedETags[method + ' ' + path] = { eTag: eTag, data: data, status: status };
				}
			}, {
				key: 'requestMiddlewareAsync',
				value: function requestMiddlewareAsync(input, cb) {
					var clientOptions = input.clientOptions,
					    method = input.method,
					    path = input.path;

					if (input.headers == null) {
						input.headers = {};
					}
					var cacheHandler = clientOptions.cacheHandler || this;
					// Send the ETag if re-requesting a URL
					if (cacheHandler.get(method, path)) {
						input.headers['If-None-Match'] = cacheHandler.get(method, path).eTag;
					} else {
						// The browser will sneak in a 'If-Modified-Since' header if the GET has been requested before
						// but for some reason the cached response does not seem to be available
						// in the jqXHR object.
						// So, the first time a URL is requested set this date to 0 so we always get a response the 1st time
						// a URL is requested.
						input.headers['If-Modified-Since'] = 'Thu, 01 Jan 1970 00:00:00 GMT';
					}

					return cb(null, input);
				}
			}, {
				key: 'responseMiddlewareAsync',
				value: function responseMiddlewareAsync(input, cb) {
					var clientOptions = input.clientOptions,
					    request = input.request,
					    status = input.status,
					    jqXHR = input.jqXHR,
					    data = input.data;

					if (!jqXHR) {
						return cb(null, input);
					} // The plugins are all used in `octo.parse()` which does not have a jqXHR

					// Since this can be called via `octo.parse`, skpi caching when there is no jqXHR
					if (jqXHR) {
						var method = request.method,
						    path = request.path; // This is also not defined when octo.parse is called

						var cacheHandler = clientOptions.cacheHandler || this;
						if (status === 304 || status === 0) {
							var ref = cacheHandler.get(method, path);
							if (ref) {
								var eTag;

								// Set a flag on the object so users know this is a cached response
								data = ref.data;
								status = ref.status;
								eTag = ref.eTag;
								data.__IS_CACHED = eTag || true;
							} else {
								throw new Error('ERROR: Bug in Octokat cacheHandler. It had an eTag but not the cached response');
							}
						} else {
							// Cache the response to reuse later
							if (method === 'GET' && jqXHR.getResponseHeader('ETag')) {
								var eTag = jqXHR.getResponseHeader('ETag');
								cacheHandler.add(method, path, eTag, data, jqXHR.status);
							}
						}

						input.data = data;
						input.status = status;
						return cb(null, input);
					}
				}
			}]);

			return CacheHandler;
		}())();

		/***/
	},
	/* 36 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var plus = __webpack_require__(4);

		module.exports = new (function () {
			function CamelCase() {
				_classCallCheck(this, CamelCase);
			}

			_createClass(CamelCase, [{
				key: 'responseMiddlewareAsync',
				value: function responseMiddlewareAsync(input, cb) {
					var data = input.data;

					data = this.replace(data);
					input.data = data; // or throw new Error('BUG! Expected JSON data to exist')
					return cb(null, input);
				}
			}, {
				key: 'replace',
				value: function replace(data) {
					if (Array.isArray(data)) {
						return this._replaceArray(data);
					} else if (typeof data === 'function') {
						return data;
					} else if (data instanceof Date) {
						return data;
					} else if (data === Object(data)) {
						return this._replaceObject(data);
					} else {
						return data;
					}
				}
			}, {
				key: '_replaceObject',
				value: function _replaceObject(orig) {
					var acc = {};
					var iterable = Object.keys(orig);
					for (var i = 0; i < iterable.length; i++) {
						var key = iterable[i];
						var value = orig[key];
						this._replaceKeyValue(acc, key, value);
					}

					return acc;
				}
			}, {
				key: '_replaceArray',
				value: function _replaceArray(orig) {
					var _this = this;

					var arr = orig.map(function (item) {
						return _this.replace(item);
					});
					// Convert the nextPage methods for paged results
					var iterable = Object.keys(orig);
					for (var i = 0; i < iterable.length; i++) {
						var key = iterable[i];
						var value = orig[key];
						this._replaceKeyValue(arr, key, value);
					}
					return arr;
				}

				// Convert things that end in `_url` to methods which return a Promise

			}, {
				key: '_replaceKeyValue',
				value: function _replaceKeyValue(acc, key, value) {
					return acc[plus.camelize(key)] = this.replace(value);
				}
			}]);

			return CamelCase;
		}())();

		/***/
	}
	/******/]);

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	module.exports = window.XMLHTTPRequest;

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	module.exports = window.Promise;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);

	__webpack_require__(51);

	__webpack_require__(52);

	__webpack_require__(53);

	__webpack_require__(54);

	__webpack_require__(55);

	__webpack_require__(56);

	__webpack_require__(57);

	__webpack_require__(58);


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_github_login, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo, test_github_login = ref.test_github_login;

	describe('Commit Comments', function() {
	  this.timeout(LONG_TIMEOUT);
	  it('returns a list of all commit comments', function() {
	    return client.repos("sferik/rails_admin").comments.fetch();
	  });
	  it("returns a list of comments for a specific commit", function() {
	    return client.repos("sferik/rails_admin").commits("629e9fd9d4df25528e84d31afdc8ebeb0f56fbb3").comments.fetch().then(function(arg) {
	      var items;
	      items = arg.items;
	      return expect(items[0].user.login).to.equal("bbenezech");
	    });
	  });
	  it("returns a single commit comment", function() {
	    return client.repos("sferik/rails_admin").comments("861907").fetch().then(function(commit) {
	      return expect(commit.user.login).to.equal("bbenezech");
	    });
	  });
	  return context("with commit comment", function() {
	    before(function() {
	      return client.repos(test_repo).commits.fetch().then((function(_this) {
	        return function(arg) {
	          var items;
	          items = arg.items;
	          _this.commit = items[0];
	          return client.repos(test_repo).commits(_this.commit.sha).comments.create({
	            body: ":metal:\n:sparkles:\n:cake:"
	          }).then(function(commit_comment) {
	            _this.commit_comment = commit_comment;
	          });
	        };
	      })(this));
	    });
	    after(function() {
	      return this.commit_comment.remove();
	    });
	    it("creates a commit comment", function() {
	      return expect(this.commit_comment.user.login).to.equal(test_github_login);
	    });
	    it("updates a commit comment", function() {
	      return this.commit_comment.update({
	        body: ":penguin:"
	      }).then(null, function(err) {
	        return console.error(err);
	      }).then(function(updated_comment) {
	        return expect(updated_comment.body).to.equal(":penguin:");
	      });
	    });
	    return it("deletes a commit comment", function() {
	      return this.commit_comment.remove().then(function(result) {
	        return expect(result).to.equal(true);
	      });
	    });
	  });
	});


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo;

	describe('Commits', function() {
	  this.timeout(LONG_TIMEOUT);
	  it("returns all commits", function() {
	    return client.repos("sferik/rails_admin").commits.fetch().then(function(arg) {
	      var items;
	      items = arg.items;
	      return expect(items[0].author).to.be.ok;
	    });
	  });
	  it("handles the sha option", function() {
	    return client.repos("sferik/rails_admin").commits.fetch({
	      sha: "master"
	    });
	  });
	  it("returns all commits on the specified date", function() {
	    return client.repos("sferik/rails_admin").commits.fetch({
	      since: "2011-01-20"
	    }).then(function(arg) {
	      var items;
	      items = arg.items;
	      return expect(items).to.be.an.Array;
	    });
	  });
	  it("returns a commit", function() {
	    return client.repos("sferik/rails_admin").commits("3cdfabd973bc3caac209cba903cfdb3bf6636bcd").fetch().then(function(commit) {
	      return expect(commit.author.login).to.equal('caboteria');
	    });
	  });
	  it("returns a detailed git commit", function() {
	    return client.repos("octokit/octokit.rb").git.commits("2bfca14ed8ebc3dad75082ff175e6703aed7ccc0").fetch().then(function(commit) {
	      return expect(commit.author.name).to.equal('Joey Wendt');
	    });
	  });
	  it("creates a commit", function() {
	    return client.repos(test_repo).commits.fetch().then(function(arg) {
	      var items, last_commit;
	      items = arg.items;
	      last_commit = items[items.length - 1];
	      return client.repos(test_repo).git.commits.create({
	        message: "My commit message",
	        tree: last_commit.commit.tree.sha,
	        parents: [last_commit.sha]
	      });
	    });
	  });
	  it("merges a branch into another", function() {
	    var afterRemove;
	    afterRemove = function() {
	      var repo;
	      repo = client.repos(test_repo);
	      return repo.commits.fetch().then(function(arg) {
	        var items, last_commit;
	        items = arg.items;
	        last_commit = items[items.length - 1];
	        return repo.git.refs.create({
	          ref: "refs/heads/branch-to-merge",
	          sha: last_commit.sha
	        }).then(function(v) {
	          var base, commitMessage, head;
	          head = 'master';
	          base = 'branch-to-merge';
	          commitMessage = "Testing the merge API";
	          return client.repos(test_repo).merges.create({
	            base: base,
	            head: head,
	            commitMessage: commitMessage
	          });
	        });
	      });
	    };
	    return client.repos(test_repo).git.refs.heads('branch-to-merge').remove().then(afterRemove, afterRemove);
	  });
	  return it("returns a comparison", function() {
	    return client.repos("gvaughn/octokit").compare('0e0d7ae299514da692eb1cab741562c253d44188', 'b7b37f75a80b8e84061cd45b246232ad958158f5').fetch().then(function(comparison) {
	      expect(comparison.baseCommit.sha).to.equal('0e0d7ae299514da692eb1cab741562c253d44188');
	      return expect(comparison.mergeBaseCommit.sha).to.equal('b7b37f75a80b8e84061cd45b246232ad958158f5');
	    });
	  });
	});


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, btoa, client, expect, ref, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo;

	btoa = (typeof window !== "undefined" && window !== null ? window.btoa : void 0) || function(str) {
	  var buffer;
	  buffer = new this.Buffer(str, 'binary');
	  return buffer.toString('base64');
	};

	describe('Contents', function() {
	  this.timeout(LONG_TIMEOUT);
	  it("returns the default readme", function() {
	    return client.repos('octokit/octokit.rb').readme.read().then(function(readme) {});
	  });
	  it("returns the contents of a file", function() {
	    return client.repos('octokit/octokit.rb').contents("lib/octokit.rb").read().then(function(contents) {});
	  });
	  return context('With a file', function() {
	    before(function(done) {
	      var removeFile;
	      removeFile = function(content) {
	        var config;
	        console.log('removing file');
	        config = {
	          sha: content.sha,
	          message: 'Removing as prep for testing'
	        };
	        client.repos(test_repo).contents("test_create.txt").remove(config);
	        return done();
	      };
	      client.repos(test_repo).contents("test_create.txt").fetch().then(removeFile, function(err) {
	        return done();
	      });
	      return null;
	    });
	    it("creates repository contents at a path", function() {
	      var config;
	      config = {
	        message: "I am commit-ing",
	        content: btoa("Here be the content\n")
	      };
	      return client.repos(test_repo).contents("test_create.txt").add(config).then(null, function(err) {
	        console.log(err);
	        throw new Error(err);
	      }).then((function(_this) {
	        return function(response) {
	          _this.content = response;
	          return expect(_this.content.commit.sha).to.match(/[a-z0-9]{40}/);
	        };
	      })(this));
	    });
	    it("updates repository contents at a path", function() {
	      var config;
	      config = {
	        sha: this.content.content.sha,
	        message: "I am commit-ing",
	        content: btoa("Here be moar content")
	      };
	      return client.repos(test_repo).contents("test_create.txt").add(config).then((function(_this) {
	        return function(response) {
	          _this.updated_content = response;
	          return expect(response.commit.sha).to.match(/[a-z0-9]{40}/);
	        };
	      })(this));
	    });
	    return it("deletes repository contents at a path", function() {
	      var config;
	      config = {
	        sha: this.updated_content.content.sha,
	        message: "I am rm-ing"
	      };
	      return client.repos(test_repo).contents("test_create.txt").remove(config).then(function(response) {});
	    });
	  });
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo;

	describe('Deployments', function() {
	  return this.timeout(LONG_TIMEOUT);
	});


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo;

	describe('Downloads', function() {
	  this.timeout(LONG_TIMEOUT);
	  it("lists available downloads", function() {
	    return client.repos("github/hubot").downloads.fetch().then(function(arg) {
	      var items;
	      items = arg.items;
	      return expect(items[items.length - 1].description).to.equal("Version 1.0.0 of the Hubot Campfire Bot");
	    });
	  });
	  return it("gets a single download", function() {
	    return client.repos("github/hubot").downloads(165347).fetch().then(function(download) {
	      return expect(download.name).to.equal("hubot-2.1.0.tar.gz");
	    });
	  });
	});


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo;

	describe('Events', function() {
	  this.timeout(LONG_TIMEOUT);
	  it("returns all public events", function() {
	    return client.events.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("returns all user events", function() {
	    return client.users('sferik').events.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("returns public events performed by a user", function() {
	    return client.users('sferik').events["public"].fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("returns all user received events", function() {
	    return client.users('api-padawan').receivedEvents.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("returns public user received events", function() {
	    return client.users('api-padawan').receivedEvents["public"].fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("returns events for a repository", function() {
	    return client.repos('sferik/rails_admin').events.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("returns an organization's public events", function() {
	    return client.orgs('github').events.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("lists issue events for a repository", function() {
	    return client.repos('octokit/octokit.rb').issues.events.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  it("lists issue events for a repository", function() {
	    return client.repos('octokit/octokit.rb').issues(4).events.fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	  return it("lists issue events for a repository", function() {
	    return client.repos('octokit/octokit.rb').issues.events(37786228).fetch().then(function(events) {
	      return expect(events).to.be.an.Array;
	    });
	  });
	});


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_github_login, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo, test_github_login = ref.test_github_login;

	describe('Gists', function() {
	  this.timeout(LONG_TIMEOUT);
	  before(function() {
	    var new_gist;
	    new_gist = {
	      description: "A gist from Octokit",
	      "public": true,
	      files: {
	        "zen.text": {
	          content: "Keep it logically awesome."
	        }
	      }
	    };
	    return client.gists.create(new_gist).then((function(_this) {
	      return function(gist1) {
	        _this.gist = gist1;
	        return _this.gist.comments.create({
	          body: ':metal:'
	        }).then(function(gist_comment) {
	          _this.gist_comment = gist_comment;
	        });
	      };
	    })(this));
	  });
	  it("creates a new gist", function() {
	    expect(this.gist.owner.login).to.equal(test_github_login);
	    return expect(this.gist.files['zen.text']).to.be.ok;
	  });
	  it("creates a new gist comment", function() {
	    return expect(this.gist_comment.user.login).to.equal(test_github_login);
	  });
	  it("edit an existing gist", function() {
	    return this.gist.update({
	      description: "GitHub Zen"
	    });
	  });
	  it("stars an existing gist", function() {
	    return this.gist.star.add().then(function(flag) {
	      return expect(flag).to.be["true"];
	    });
	  });
	  it("unstars an existing gist", function() {
	    return this.gist.star.remove().then(function(flag) {
	      return expect(flag).to.be["true"];
	    });
	  });
	  it("is not starred", function() {
	    return this.gist.star.contains().then(function(flag) {
	      return expect(flag).to.be["false"];
	    });
	  });
	  it("forks an existing gist", function() {
	    return client.gists('839d32ef87bc22ba5231').forks.create().then((function(_this) {
	      return function(gist) {
	        return gist.remove();
	      };
	    })(this));
	  });
	  it("returns the list of gist comments", function() {
	    return this.gist.comments.fetch().then((function(_this) {
	      return function(comments) {
	        return expect(comments).to.be.an.Array;
	      };
	    })(this));
	  });
	  it("returns a gist comment", function() {
	    return this.gist.comments(this.gist_comment.id).fetch().then(null, function(e) {
	      return console.error(e);
	    });
	  });
	  it("updates a gist comment", function() {
	    return this.gist.comments(this.gist_comment.id).update({
	      body: ':heart:'
	    });
	  });
	  it("deletes a gist comment", function() {
	    return this.gist.comments(this.gist_comment.id).remove();
	  });
	  it("deletes a gist", function() {
	    return this.gist.remove();
	  });
	  return describe('Unauthenticated Gists', function() {
	    it("returns public gists", function() {
	      return client.gists["public"].fetch().then(function(gists) {
	        return expect(gists).to.be.an.Array;
	      });
	    });
	    it("without a username passed", function() {
	      return client.gists.fetch().then(null, function(e) {
	        return console.error(e);
	      }).then(function(gists) {
	        return expect(gists).to.be.an.Array;
	      });
	    });
	    it("returns the gist by ID", function() {
	      return client.gists(790381).fetch().then(function(gist) {
	        return expect(gist.owner.login).to.equal('jmccartie');
	      });
	    });
	    return it("returns the user's starred gists", function() {
	      return client.gists.starred.fetch().then(null, function(e) {
	        return console.error(e);
	      }).then(function(gists) {
	        return expect(gists).to.be.an.Array;
	      });
	    });
	  });
	});


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_github_login, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo, test_github_login = ref.test_github_login;

	if (typeof window !== "undefined" && window !== null) {
	  it('is skipping status tests in the browser because of CORS', function() {});
	} else {
	  describe('Status', function() {
	    this.timeout(LONG_TIMEOUT);
	    it("returns the current system status", function() {
	      return client.status();
	    });
	    it("returns the last human message", function() {
	      return client.status.lastMessage();
	    });
	    return it("returns the most recent status messages", function() {
	      return client.status.messages();
	    });
	  });
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var LONG_TIMEOUT, client, expect, ref, test_github_login, test_repo;

	expect = __webpack_require__(4).expect;

	ref = __webpack_require__(44), client = ref.client, LONG_TIMEOUT = ref.LONG_TIMEOUT, test_repo = ref.test_repo, test_github_login = ref.test_github_login;

	describe('Stats', function() {
	  this.timeout(LONG_TIMEOUT);
	  it("returns contributors and their contribution stats", function() {
	    return client.repos('octokit/octokit.rb').stats.contributors.fetch();
	  });
	  it("returns the commit activity stats", function() {
	    return client.repos('octokit/octokit.rb').stats.commitActivity.fetch();
	  });
	  it("returns the owner and contributor participation stats", function() {
	    return client.repos('octokit/octokit.rb').stats.participation.fetch();
	  });
	  return it("returns commit count by hour punch card stats", function() {
	    return client.repos('octokit/octokit.rb').stats.punchCard.fetch();
	  });
	});


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var ANOTHER_USER, BRANCH, COMMENT, DEFAULT_BRANCH, GH, GIST, ISSUE, LONG_TIMEOUT, ME, ORG, ORG_NAME, OTHER_HOMEPAGE, OTHER_USERNAME, Octokat, REPO, REPO_HOMEPAGE, REPO_NAME, REPO_USER, SHORT_TIMEOUT, STATE, TOKEN, USER, USERNAME, arrayContainsKey, assert, btoa, client, expect, ref, ref1, some, trapFail,
	  slice = [].slice;

	ref = __webpack_require__(4), assert = ref.assert, expect = ref.expect;

	ref1 = __webpack_require__(44), Octokat = ref1.Octokat, client = ref1.client, USERNAME = ref1.USERNAME, TOKEN = ref1.TOKEN, ORG_NAME = ref1.ORG_NAME, REPO_USER = ref1.REPO_USER, REPO_NAME = ref1.REPO_NAME, REPO_HOMEPAGE = ref1.REPO_HOMEPAGE, OTHER_HOMEPAGE = ref1.OTHER_HOMEPAGE, OTHER_USERNAME = ref1.OTHER_USERNAME, DEFAULT_BRANCH = ref1.DEFAULT_BRANCH, LONG_TIMEOUT = ref1.LONG_TIMEOUT, SHORT_TIMEOUT = ref1.SHORT_TIMEOUT;

	btoa = this.btoa || function(str) {
	  var buffer;
	  buffer = new Buffer(str, 'binary');
	  return buffer.toString('base64');
	};

	trapFail = function(promise) {
	  var onError;
	  onError = function(err) {
	    console.error(JSON.stringify(err));
	    return assert["catch"](err);
	  };
	  promise.then(null, onError);
	  return promise;
	};

	some = function(arr, fn) {
	  var entry, fn1, i, len;
	  fn1 = function(entry) {
	    if (fn(entry) === true) {
	      return true;
	    }
	  };
	  for (i = 0, len = arr.length; i < len; i++) {
	    entry = arr[i];
	    fn1(entry);
	  }
	  return false;
	};

	arrayContainsKey = function(arr, key, value) {
	  return some(arr, function(entry) {
	    return entry[key] === value;
	  });
	};

	GH = 'octo';

	REPO = 'myRepo';

	USER = 'someUser';

	ME = 'myUser';

	BRANCH = 'BRANCH';

	ANOTHER_USER = 'ANOTHER_USER';

	ORG = 'someOrg';

	GIST = 'someGist';

	ISSUE = 'someIssue';

	COMMENT = 'someComment';

	STATE = {};

	describe(GH + " = new Octokat({token: ...})", function() {
	  var itIs, itIsArray, itIsBoolean, itIsFalse, itIsOk, stringifyAry;
	  this.timeout(LONG_TIMEOUT);
	  stringifyAry = function(args) {
	    var arg, arr;
	    if (!Array.isArray(args)) {
	      args = [args];
	    }
	    if (!args.length) {
	      return '';
	    }
	    arr = (function() {
	      var i, len, results1;
	      results1 = [];
	      for (i = 0, len = args.length; i < len; i++) {
	        arg = args[i];
	        results1.push(JSON.stringify(arg));
	      }
	      return results1;
	    })();
	    return arr.join(', ');
	  };
	  itIs = function(obj, msg, args, cb) {
	    var arg, code, constructMethod, i, isFuncArgs, len;
	    code = '';
	    isFuncArgs = false;
	    for (i = 0, len = args.length; i < len; i++) {
	      arg = args[i];
	      if (isFuncArgs) {
	        code += "(" + (stringifyAry(arg)) + ")";
	      } else {
	        code += '.' + arg;
	      }
	      isFuncArgs = !isFuncArgs;
	    }
	    if (isFuncArgs) {
	      code += '()';
	    }
	    constructMethod = function() {
	      var context, field, finalArgs, isLast, j, k, len1, len2, names;
	      context = STATE[obj];
	      isFuncArgs = false;
	      finalArgs = [];
	      for (j = 0, len1 = args.length; j < len1; j++) {
	        arg = args[j];
	        isLast = arg === args[args.length - 1];
	        if (isFuncArgs) {
	          if (!Array.isArray(arg)) {
	            arg = [arg];
	          }
	          if (isLast) {
	            finalArgs = arg;
	          } else {
	            context = context.apply(null, arg);
	          }
	        } else {
	          names = arg.split('.');
	          for (k = 0, len2 = names.length; k < len2; k++) {
	            field = names[k];
	            context = context[field];
	          }
	        }
	        isFuncArgs = !isFuncArgs;
	      }
	      return {
	        finalArgs: finalArgs,
	        context: context
	      };
	    };
	    it("" + obj + code, function() {
	      var context, finalArgs, ref2;
	      ref2 = constructMethod(), finalArgs = ref2.finalArgs, context = ref2.context;
	      if (isFuncArgs) {
	        return context().then(cb);
	      } else {
	        return context.apply(null, finalArgs).then(cb);
	      }
	    });
	    return it("" + obj + code + " (callback ver)", function() {
	      var context, finalArgs, ref2;
	      ref2 = constructMethod(), finalArgs = ref2.finalArgs, context = ref2.context;
	      return context.apply(null, slice.call(finalArgs).concat([function(err, val) {
	        if (err) {
	          return assert.fail(err);
	        }
	        return cb(val);
	      }]));
	    });
	  };
	  itIsOk = function() {
	    var args, obj;
	    obj = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return itIs(obj, '', args, function(val) {
	      return expect(val).to.be.ok;
	    });
	  };
	  itIsArray = function() {
	    var args, obj;
	    obj = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return itIs(obj, ' yields Array', args, function(val) {
	      return expect(val).to.be.an.array;
	    });
	  };
	  itIsFalse = function() {
	    var args, obj;
	    obj = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return itIs(obj, ' yields False', args, function(val) {
	      return expect(val).to.be["false"];
	    });
	  };
	  itIsBoolean = function() {
	    var args, obj;
	    obj = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return itIs(obj, '', args, function(val) {
	      return expect(val === true || val === false).to.be["true"];
	    });
	  };
	  before(function() {
	    return STATE[GH] = client;
	  });
	  describe('Synchronous methods', function() {
	    it("supports octo.fromUrl('https://api.github.com/repos/" + REPO_USER + "/" + REPO_NAME + "')", function() {
	      return client.fromUrl("https://api.github.com/repos/" + REPO_USER + "/" + REPO_NAME).fetch().then(function(val) {
	        return expect(val).to.not.be["null"];
	      });
	    });
	    return it("supports octo.fromUrl('/repos/" + REPO_USER + "/" + REPO_NAME + "')", function() {
	      return client.fromUrl("/repos/" + REPO_USER + "/" + REPO_NAME).fetch().then(function(val) {
	        return expect(val).to.not.be["null"];
	      });
	    });
	  });
	  it('supports octo.parse(json)', function(done) {
	    var json;
	    json = {
	      url: 'https://api.github.com/repos/philschatz/octokat.js',
	      foo_url: 'http://philschatz.com',
	      field: 'Hello there!',
	      bar: {
	        baz_url: 'http://philschatz.com'
	      }
	    };
	    return client.parse(json, function(err, ret) {
	      expect(ret.field).to.equal(json.field);
	      expect(ret.url).to.equal(json.url);
	      expect(ret.foo.url).to.equal(json.foo_url);
	      expect(ret.bar.baz.url).to.equal(json.bar.baz_url);
	      expect(ret.fetch).to.not.be["null"];
	      expect(ret.issues).to.not.be["null"];
	      return done();
	    });
	  });
	  describe('Miscellaneous APIs', function() {
	    itIsOk(GH, 'zen.read');
	    itIsOk(GH, 'octocat.read');
	    itIsOk(GH, 'octocat.read', {
	      s: 'There is no need to be upset'
	    });
	    itIsOk(GH, 'emojis.fetch');
	    itIsOk(GH, 'gitignore.templates.fetch');
	    itIsOk(GH, 'gitignore.templates', 'C', 'read');
	    itIsOk(GH, 'meta.fetch');
	    itIsOk(GH, 'rateLimit.fetch');
	    return itIsOk(GH, 'feeds.fetch');
	  });
	  itIsArray(GH, 'users.fetch');
	  itIsArray(GH, 'gists.public.fetch');
	  itIsArray(GH, 'search.repositories.fetch', {
	    q: 'github'
	  });
	  itIsArray(GH, 'search.issues.fetch', {
	    q: 'github'
	  });
	  itIsArray(GH, 'search.users.fetch', {
	    q: 'github'
	  });
	  itIsOk(GH, 'users', REPO_USER, 'fetch');
	  itIsOk(GH, 'orgs', ORG_NAME, 'fetch');
	  itIsOk(GH, 'repos', [REPO_USER, REPO_NAME], 'fetch');
	  itIsArray(GH, 'issues.fetch');
	  describe('Paged Results', function() {
	    describe('Deprecated Notation', function() {
	      it(GH + ".gists.public.fetch().then(results) -> results.nextPage()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(arg1) {
	          var nextPage;
	          nextPage = arg1.nextPage;
	          return nextPage().then(function(arg2) {
	            var items;
	            items = arg2.items;
	            expect(items).to.be.an('array');
	            return expect(items).to.have.length.at.least(1);
	          });
	        });
	      });
	      it(GH + ".gists.public.fetch().then(results) -> results.prevPage()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(arg1) {
	          var nextPage;
	          nextPage = arg1.nextPage;
	          return nextPage().then(function(arg2) {
	            var prevPage;
	            prevPage = arg2.prevPage;
	            return prevPage().then(function() {});
	          });
	        });
	      });
	      it(GH + ".gists.public.fetch().then(results) -> results.firstPage()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(arg1) {
	          var nextPage;
	          nextPage = arg1.nextPage;
	          return nextPage().then(function(arg2) {
	            var firstPage;
	            firstPage = arg2.firstPage;
	            return firstPage().then(function() {});
	          });
	        });
	      });
	      return it(GH + ".gists.public.fetch().then(results) -> results.lastPage()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(arg1) {
	          var lastPage;
	          lastPage = arg1.lastPage;
	          return lastPage();
	        });
	      });
	    });
	    return describe('New Notation', function() {
	      it(GH + ".gists.public.fetch().then(results) -> results.nextPage.fetch()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(arg1) {
	          var nextPage;
	          nextPage = arg1.nextPage;
	          return nextPage.fetch().then(function(arg2) {
	            var items;
	            items = arg2.items;
	            expect(items).to.be.an('array');
	            return expect(items).to.have.length.at.least(1);
	          });
	        });
	      });
	      it(GH + ".gists.public.fetch().then(results) -> results.prevPage.fetch()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(arg1) {
	          var nextPage;
	          nextPage = arg1.nextPage;
	          return nextPage.fetch().then(function(arg2) {
	            var prevPage;
	            prevPage = arg2.prevPage;
	            return prevPage.fetch().then(function() {});
	          });
	        });
	      });
	      it(GH + ".gists.public.fetch().then(results) -> results.firstPage.fetch()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(results) {
	          return results.nextPage.fetch().then(function(moreResults) {
	            return moreResults.firstPage.fetch().then(function() {});
	          });
	        });
	      });
	      return it(GH + ".gists.public.fetch().then(results) -> results.lastPage.fetch()", function() {
	        return trapFail(STATE[GH].gists["public"].fetch()).then(function(results) {
	          return results.lastPage.fetch();
	        });
	      });
	    });
	  });
	  describe(REPO + " = " + GH + ".repos(OWNER, NAME)", function() {
	    before(function() {
	      return STATE[REPO] = STATE[GH].repos(REPO_USER, REPO_NAME);
	    });
	    itIsOk(REPO, 'fetch');
	    itIsArray(REPO, 'collaborators.fetch');
	    itIsOk(REPO, 'readme.read');
	    itIsArray(REPO, 'hooks.fetch');
	    itIsArray(REPO, 'assignees.fetch');
	    itIsArray(REPO, 'languages.fetch');
	    itIsArray(REPO, 'teams.fetch');
	    itIsArray(REPO, 'tags.fetch');
	    itIsArray(REPO, 'branches.fetch');
	    itIsArray(REPO, 'contributors.fetch');
	    itIsArray(REPO, 'subscribers.fetch');
	    itIsArray(REPO, 'subscription.fetch');
	    itIsArray(REPO, 'comments.fetch');
	    itIsArray(REPO, 'downloads.fetch');
	    itIsArray(REPO, 'milestones.fetch');
	    itIsArray(REPO, 'labels.fetch');
	    itIsArray(REPO, 'stargazers.fetch');
	    itIsArray(REPO, 'forks.fetch');
	    it("camelCases URL fields that are not templated (ie " + REPO + ".htmlUrl)", function() {
	      return STATE[REPO].fetch().then(function(repo) {
	        return expect(repo.htmlUrl).to.be.a('string');
	      });
	    });
	    describe(REPO + ".issues...", function() {
	      itIsArray(REPO, 'issues.fetch');
	      itIsArray(REPO, 'issues.events.fetch');
	      itIsArray(REPO, 'issues.comments.fetch');
	      itIsOk(REPO, 'issues.create', {
	        title: 'Test Issue'
	      });
	      return itIsOk(REPO, 'issues', 1, 'fetch');
	    });
	    describe(REPO + ".stats...", function() {
	      itIsOk(REPO, 'stats.contributors.fetch');
	      itIsOk(REPO, 'stats.commitActivity.fetch');
	      itIsOk(REPO, 'stats.participation.fetch');
	      return itIsOk(REPO, 'stats.punchCard.fetch');
	    });
	    describe(REPO + ".git... (Git Data)", function() {
	      itIsArray(REPO, 'git.refs.fetch');
	      itIsArray(REPO, 'git.refs.heads.fetch');
	      itIsOk(REPO, 'git.trees', 'c18ba7dc333132c035a980153eb520db6e813d57', 'fetch');
	      it('.git.refs.tags.fetch()', function() {
	        return STATE[GH].repos('philschatz', 'octokat.js').git.refs.tags.fetch().then(function(arg1) {
	          var items;
	          items = arg1.items;
	          expect(items).to.be.a('array');
	          return expect(items.length).to.equal(17);
	        });
	      });
	      it('.git.refs.tags("v0.1.1").fetch()', function() {
	        return STATE[GH].repos('philschatz', 'octokat.js').git.refs.tags('v0.1.1').fetch().then(function(tag) {
	          return expect(tag).to.be.a('object');
	        });
	      });
	      it('.git.refs("any/path").fetch() like pull/2/head refs on github', function() {
	        return STATE[GH].repos('philschatz', 'octokat.js').git.refs('pull/2/head').fetch().then(function(pullRef) {
	          return expect(pullRef).to.be.a('object');
	        });
	      });
	      it('.git.blobs.create("Hello")   and .blobs(sha).read()', function() {
	        return STATE[REPO].git.blobs.create({
	          content: 'Hello',
	          encoding: 'utf-8'
	        }).then(function(arg1) {
	          var sha;
	          sha = arg1.sha;
	          expect(sha).to.be.ok;
	          return STATE[REPO].git.blobs(sha).read().then(function(v) {
	            return expect(v).to.equal('Hello');
	          });
	        });
	      });
	      return it('.git.blobs.create(...) and .blobs(...).readBinary()', function() {
	        return STATE[REPO].git.blobs.create({
	          content: btoa('Hello'),
	          encoding: 'base64'
	        }).then(function(arg1) {
	          var sha;
	          sha = arg1.sha;
	          expect(sha).to.be.ok;
	          return STATE[REPO].git.blobs(sha).readBinary().then(function(v) {
	            return expect(v).to.have.string('Hello');
	          });
	        });
	      });
	    });
	    return describe('Collaborator changes', function() {
	      it('gets a list of collaborators', function() {
	        return trapFail(STATE[REPO].collaborators.fetch()).then(function(v) {
	          return expect(v).to.be.an.array;
	        });
	      });
	      it('tests membership', function() {
	        return trapFail(STATE[REPO].collaborators.contains(REPO_USER)).then(function(v) {
	          return expect(v).to.be["true"];
	        });
	      });
	      return it('adds and removes a collaborator', function() {
	        return trapFail(STATE[REPO].collaborators(OTHER_USERNAME).add()).then(function(v) {
	          expect(v).to.be.ok;
	          return trapFail(STATE[REPO].collaborators(OTHER_USERNAME).remove()).then(function(v) {
	            return expect(v).to.be["true"];
	          });
	        });
	      });
	    });
	  });
	  describe(USER + " = " + GH + ".users(USERNAME)", function() {
	    before(function() {
	      return STATE[USER] = STATE[GH].users(USERNAME);
	    });
	    itIsOk(USER, 'fetch');
	    itIsArray(USER, 'repos.fetch');
	    itIsArray(USER, 'orgs.fetch');
	    itIsArray(USER, 'gists.fetch');
	    itIsArray(USER, 'followers.fetch');
	    itIsArray(USER, 'following.fetch');
	    itIsFalse(USER, 'following.contains', 'defunkt');
	    itIsArray(USER, 'keys.fetch');
	    itIsArray(USER, 'events.fetch');
	    itIsArray(USER, 'receivedEvents.fetch');
	    itIsArray(USER, 'starred.fetch');
	    return it("camelCases URL fields that are not templated (ie " + USER + ".avatarUrl)", function() {
	      return STATE[USER].fetch().then(function(repo) {
	        expect(repo.htmlUrl).to.be.a('string');
	        return expect(repo.avatarUrl).to.be.a('string');
	      });
	    });
	  });
	  describe(ORG + " = " + GH + ".orgs(ORG_NAME)", function() {
	    before(function() {
	      return STATE[ORG] = STATE[GH].orgs(ORG_NAME);
	    });
	    itIsArray(ORG, 'fetch');
	    itIsArray(ORG, 'members.fetch');
	    itIsArray(ORG, 'repos.fetch');
	    return itIsArray(ORG, 'issues.fetch');
	  });
	  describe(ME + " = " + GH + ".me (the authenticated user)", function() {
	    before(function() {
	      return STATE[ME] = STATE[GH].me;
	    });
	    itIsArray(ME, 'repos.fetch');
	    itIsArray(ME, 'orgs.fetch');
	    itIsArray(ME, 'followers.fetch');
	    itIsArray(ME, 'following.fetch');
	    itIsFalse(ME, 'following.contains', 'defunkt');
	    itIsArray(ME, 'emails.fetch');
	    itIsFalse(ME, 'emails.contains', 'invalid@email.com');
	    itIsArray(ME, 'issues.fetch');
	    itIsArray(ME, 'starred.fetch');
	    itIsBoolean(ME, 'starred.contains', 'philschatz/octokat.js');
	    return describe('Multistep operations', function() {
	      return it('.starred.add(OWNER, REPO), .starred.is(...), and then .starred.remove(...)', function() {
	        return trapFail(STATE[ME].starred(REPO_USER, REPO_NAME).add()).then(function() {
	          return STATE[ME].starred.contains(REPO_USER, REPO_NAME).then(function(isStarred) {
	            expect(isStarred).to.be["true"];
	            return STATE[ME].starred(REPO_USER, REPO_NAME).remove().then(function(v) {
	              return expect(v).to.be["true"];
	            });
	          });
	        });
	      });
	    });
	  });
	  describe(GIST + " = " + GH + ".gist(GIST_ID)", function() {
	    before(function() {
	      var config;
	      config = {
	        description: "Test Gist",
	        'public': false,
	        files: {
	          "hello.txt": {
	            content: "Hello World"
	          }
	        }
	      };
	      return STATE[GH].gists.create(config).then(function(gist) {
	        return STATE[GIST] = gist;
	      });
	    });
	    return it('can be .starred.add() and .starred.remove()', function() {
	      return STATE[GIST].star.add().then(function() {
	        return STATE[GIST].star.remove();
	      });
	    });
	  });
	  return describe(ISSUE + " = " + REPO + ".issues(1)", function() {
	    before(function() {
	      return STATE[ISSUE] = STATE[REPO].issues(1);
	    });
	    itIsOk(ISSUE, 'fetch');
	    itIsOk(ISSUE, 'update', {
	      title: 'New Title',
	      state: 'closed'
	    });
	    return describe('Comment methods (Some are on the repo, issue, or comment)', function() {
	      itIsArray(ISSUE, 'comments.fetch');
	      itIsOk(ISSUE, 'comments.create', {
	        body: 'Test comment'
	      });
	      return itIsOk(REPO, 'issues.comments', 43218269, 'fetch');
	    });
	  });
	});

	describe('Cache Handler', function() {
	  return it(' is called when refetching a URL', function() {
	    var CacheHandler, cacheHandler, retreivedFromCache;
	    retreivedFromCache = false;
	    cacheHandler = new (CacheHandler = (function() {
	      function CacheHandler() {
	        this._cachedETags = {};
	      }

	      CacheHandler.prototype.get = function(method, path) {
	        retreivedFromCache = !!this._cachedETags[method + " " + path];
	        return this._cachedETags[method + " " + path];
	      };

	      CacheHandler.prototype.add = function(method, path, eTag, data, status) {
	        return this._cachedETags[method + " " + path] = {
	          eTag: eTag,
	          data: data,
	          status: status
	        };
	      };

	      return CacheHandler;

	    })());
	    client = new Octokat({
	      cacheHandler: cacheHandler
	    });
	    return client.repos(REPO_USER, REPO_NAME).fetch().then(function(repo1) {
	      return client.repos(REPO_USER, REPO_NAME).fetch().then(function(repo2) {
	        expect(JSON.stringify(repo1) === JSON.stringify(repo2)).to.be["true"];
	        return expect(retreivedFromCache).to.be["true"];
	      });
	    });
	  });
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var DEFAULT_BRANCH, LONG_TIMEOUT, ORG_NAME, OTHER_HOMEPAGE, OTHER_USERNAME, Octokat, REPO_HOMEPAGE, REPO_NAME, REPO_USER, SHORT_TIMEOUT, TOKEN, USERNAME, assert, client, expect, ref, ref1;

	ref = __webpack_require__(4), assert = ref.assert, expect = ref.expect;

	ref1 = __webpack_require__(44), Octokat = ref1.Octokat, client = ref1.client, USERNAME = ref1.USERNAME, TOKEN = ref1.TOKEN, ORG_NAME = ref1.ORG_NAME, REPO_USER = ref1.REPO_USER, REPO_NAME = ref1.REPO_NAME, REPO_HOMEPAGE = ref1.REPO_HOMEPAGE, OTHER_HOMEPAGE = ref1.OTHER_HOMEPAGE, OTHER_USERNAME = ref1.OTHER_USERNAME, DEFAULT_BRANCH = ref1.DEFAULT_BRANCH, LONG_TIMEOUT = ref1.LONG_TIMEOUT, SHORT_TIMEOUT = ref1.SHORT_TIMEOUT;

	describe('Returned Objects', function() {
	  it('has the same methods on octo.repos(REPO_ID).fetch().then(repo) as octo.me.repos.fetch().then(repos[0])', function() {
	    return client.me.repos.fetch().then(function(arg) {
	      var items;
	      items = arg.items;
	      expect(items).to.not.be.empty;
	      return items[0].forks.fetch();
	    });
	  });
	  it('has the same methods on octo.gists(ID).fetch().then(gist) as octo.gists.public.fetch().then(gists[0])', function() {
	    return client.gists["public"].fetch().then(function(arg) {
	      var items;
	      items = arg.items;
	      expect(items).to.not.be.empty;
	      return expect(items[0].star.contains).to.be.a["function"];
	    });
	  });
	  it('has the same methods on octo.users(ID).fetch().then(user) as octo.users.fetch().then(users[0])', function() {
	    return client.users.fetch().then(function(arg) {
	      var items;
	      items = arg.items;
	      expect(items).to.not.be.empty;
	      return expect(items[0].gists.fetch).to.be.a["function"];
	    });
	  });
	  return it('has does not add the root context to returned objects', function() {
	    return client.repos(REPO_USER, REPO_NAME).issues(1).fetch().then(function(issue) {
	      expect(issue.user.avatar.url).to.not.be["null"];
	      return expect(issue.user.avatar.url).to.be.a.string;
	    });
	  });
	});


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var REPO_NAME, REPO_USER, assert, client, expect, ref, ref1;

	ref = __webpack_require__(4), assert = ref.assert, expect = ref.expect;

	ref1 = __webpack_require__(44), client = ref1.client, REPO_USER = ref1.REPO_USER, REPO_NAME = ref1.REPO_NAME;

	describe('URL Hypermedia Patterns', function() {
	  it('supports hypermedia URLs with optional URL and querystring params', function() {
	    var expected, params, template, url;
	    template = '/repos/{repoName}{/user}{/foo}/releases/1/assets{?name,title,label}';
	    expected = '/repos/AAA/BBB/releases/1/assets?name=CCC&label=DDD';
	    params = {
	      repoName: 'AAA',
	      user: 'BBB',
	      name: 'CCC',
	      label: 'DDD'
	    };
	    url = client.fromUrl(template, params).url;
	    return expect(url).to.equal(expected);
	  });
	  it('supports hypermedia URLs with missing querystring params', function() {
	    var expected, params, template, url;
	    template = '/repos{?label,title}';
	    expected = '/repos';
	    params = {};
	    url = client.fromUrl(template, params).url;
	    return expect(url).to.equal(expected);
	  });
	  it('supports fetching from a hypermedia-constructed URL', function() {
	    var params, template;
	    template = '/repos/{repoUser}{/repoName}';
	    params = {
	      repoUser: REPO_USER,
	      repoName: REPO_NAME
	    };
	    return client.fromUrl(template, params).fetch().then(function(repo) {
	      return expect(repo.name).to.equal(REPO_NAME);
	    });
	  });
	  it('supports & in templates', function() {
	    var expected, params, template, url;
	    template = 'https://api.github.com/search/code?q={query}{&page,per_page,sort,order}';
	    expected = 'https://api.github.com/search/code?q=octokat&per_page=100';
	    params = {
	      query: 'octokat',
	      per_page: 100
	    };
	    url = client.fromUrl(template, params).url;
	    return expect(url).to.equal(expected);
	  });
	  return it('throws error if a required field is missing', function() {
	    var fn, params, template;
	    template = 'https://api.github.com/search/code?q={query}{&page,per_page,sort,order}';
	    params = {
	      per_page: 100
	    };
	    fn = function() {
	      return client.fromUrl(template, params);
	    };
	    return assert["throw"](fn, Error, 'Octokat Error: Required parameter is missing: query');
	  });
	});

	describe('Hypermedia type conversion', function() {
	  it('converts date strings to dates (parse)', function() {
	    var expectedMs, json;
	    json = {
	      created_at: '2016-01-01'
	    };
	    expectedMs = Date.parse(json.created_at);
	    return client.parse(json).then(function(val) {
	      var actualMs;
	      actualMs = val.createdAt.getTime();
	      return expect(actualMs).to.equal(expectedMs);
	    });
	  });
	  return it('converts date strings to dates (fetch)', function() {
	    return client.repos(REPO_USER, REPO_NAME).fetch().then(function(info) {
	      return expect(info.createdAt).to.be.an["instanceof"](Date);
	    });
	  });
	});


/***/ }
/******/ ]);
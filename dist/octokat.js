(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Octokat"] = factory();
	else
		root["Octokat"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	var deprecate = __webpack_require__(2);
	var OctokatBase = __webpack_require__(3);

	var HypermediaPlugin = __webpack_require__(18);

	var ALL_PLUGINS = [__webpack_require__(19), // re-chain methods when we detect an object (issue, comment, user, etc)
	__webpack_require__(21), __webpack_require__(25), __webpack_require__(27), __webpack_require__(29), __webpack_require__(31), __webpack_require__(12), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34),
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (message) {
	  if (console && console.warn) {
	    console.warn("Octokat Deprecation: " + message);
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var plus = __webpack_require__(4);
	var deprecate = __webpack_require__(2);
	var TREE_OPTIONS = __webpack_require__(8);
	var Chainer = __webpack_require__(9);

	var _require = __webpack_require__(10),
	    VerbMethods = _require.VerbMethods,
	    toPromise = _require.toPromise;

	// Use the following plugins by default (they should be neglegible additional code)


	var SimpleVerbsPlugin = __webpack_require__(12);
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
	    var data = context.data,
	        requester = context.requester;

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
	        return target[key] = source[key];
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

/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Chainer, plus,
	  slice = [].slice;

	plus = __webpack_require__(4);

	module.exports = Chainer = (function() {
	  function Chainer(_verbMethods) {
	    this._verbMethods = _verbMethods;
	  }

	  Chainer.prototype.chain = function(path, name, contextTree, fn) {
	    var fn1;
	    if (fn == null) {
	      fn = (function(_this) {
	        return function() {
	          var args, separator;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          if (!args.length) {
	            throw new Error('BUG! must be called with at least one argument');
	          }
	          if (name === 'compare') {
	            separator = '...';
	          } else {
	            separator = '/';
	          }
	          return _this.chain(path + "/" + (args.join(separator)), name, contextTree);
	        };
	      })(this);
	    }
	    this._verbMethods.injectVerbMethods(path, fn);
	    if (typeof fn === 'function' || typeof fn === 'object') {
	      fn1 = (function(_this) {
	        return function(name) {
	          delete fn[plus.camelize(name)];
	          return Object.defineProperty(fn, plus.camelize(name), {
	            configurable: true,
	            enumerable: true,
	            get: function() {
	              return _this.chain(path + "/" + name, name, contextTree[name]);
	            }
	          });
	        };
	      })(this);
	      for (name in contextTree || {}) {
	        fn1(name);
	      }
	    }
	    return fn;
	  };

	  return Chainer;

	})();

	module.exports = Chainer;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(4),
	    filter = _require.filter,
	    forOwn = _require.forOwn,
	    extend = _require.extend;

	var toQueryString = __webpack_require__(11);

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
	      var plugin = iterable1[j];
	      extend(this._asyncVerbs, plugin.asyncVerbs);
	    }
	  }

	  // Injects verb methods onto `obj`


	  _createClass(VerbMethods, [{
	    key: 'injectVerbMethods',
	    value: function injectVerbMethods(path, obj) {
	      var _this = this;

	      if (this._promisePlugin) {
	        var _promisePlugin$promis = this._promisePlugin.promiseCreator,
	            newPromise = _promisePlugin$promis.newPromise,
	            allPromises = _promisePlugin$promis.allPromises;
	      }

	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') {
	        obj.url = path; // Mostly for testing
	        forOwn(this._syncVerbs, function (verbFunc, verbName) {
	          return obj[verbName] = function () {
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
	          return obj[verbName] = function () {
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

/***/ },
/* 11 */
/***/ function(module, exports) {

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toQueryString = __webpack_require__(11);

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// new class UseNativePromises
	module.exports = {
	  promiseCreator: __webpack_require__(14)
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var require;var Requester, ajax, eventId, extend, filter, forEach, map, ref, waterfall;

	ref = __webpack_require__(4), filter = ref.filter, forEach = ref.forEach, extend = ref.extend, map = ref.map, waterfall = ref.waterfall;

	ajax = function(options, cb) {
	  var XMLHttpRequest, name, ref1, req, value, xhr;
	  if (typeof window !== "undefined" && window !== null) {
	    XMLHttpRequest = window.XMLHttpRequest;
	  } else {
	    req = require;
	    XMLHttpRequest = __webpack_require__(16).XMLHttpRequest;
	  }
	  xhr = new XMLHttpRequest();
	  xhr.dataType = options.dataType;
	  if (typeof xhr.overrideMimeType === "function") {
	    xhr.overrideMimeType(options.mimeType);
	  }
	  xhr.open(options.type, options.url);
	  if (options.data && options.type !== 'GET') {
	    xhr.setRequestHeader('Content-Type', options.contentType);
	  }
	  ref1 = options.headers;
	  for (name in ref1) {
	    value = ref1[name];
	    xhr.setRequestHeader(name, value);
	  }
	  xhr.onreadystatechange = function() {
	    var name1, ref2;
	    if (4 === xhr.readyState) {
	      if ((ref2 = options.statusCode) != null) {
	        if (typeof ref2[name1 = xhr.status] === "function") {
	          ref2[name1]();
	        }
	      }
	      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 302 || xhr.status === 0) {
	        return cb(null, xhr);
	      } else {
	        return cb(xhr);
	      }
	    }
	  };
	  return xhr.send(options.data);
	};

	eventId = 0;

	module.exports = Requester = (function() {
	  function Requester(_instance, _clientOptions, plugins) {
	    var base, base1, base2;
	    this._instance = _instance;
	    this._clientOptions = _clientOptions != null ? _clientOptions : {};
	    if ((base = this._clientOptions).rootURL == null) {
	      base.rootURL = 'https://api.github.com';
	    }
	    if ((base1 = this._clientOptions).useETags == null) {
	      base1.useETags = true;
	    }
	    if ((base2 = this._clientOptions).usePostInsteadOfPatch == null) {
	      base2.usePostInsteadOfPatch = false;
	    }
	    if (typeof this._clientOptions.emitter === 'function') {
	      this._emit = this._clientOptions.emitter;
	    }
	    this._pluginMiddlewareAsync = map(filter(plugins, function(arg) {
	      var requestMiddlewareAsync;
	      requestMiddlewareAsync = arg.requestMiddlewareAsync;
	      return requestMiddlewareAsync;
	    }), function(plugin) {
	      return plugin.requestMiddlewareAsync.bind(plugin);
	    });
	    this._plugins = plugins;
	  }

	  Requester.prototype.request = function(method, path, data, options, cb) {
	    var acc, headers, initial, pluginsPlusInitial;
	    if (options == null) {
	      options = {
	        isRaw: false,
	        isBase64: false,
	        isBoolean: false,
	        contentType: 'application/json'
	      };
	    }
	    if (options == null) {
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
	    if (!/^http/.test(path)) {
	      path = "" + this._clientOptions.rootURL + path;
	    }
	    headers = {
	      'Accept': this._clientOptions.acceptHeader || 'application/json'
	    };
	    if (typeof window === "undefined" || window === null) {
	      headers['User-Agent'] = 'octokat.js';
	    }
	    acc = {
	      method: method,
	      path: path,
	      headers: headers,
	      options: options,
	      clientOptions: this._clientOptions
	    };
	    initial = function(cb) {
	      return cb(null, acc);
	    };
	    pluginsPlusInitial = [initial].concat(this._pluginMiddlewareAsync);
	    return waterfall(pluginsPlusInitial, (function(_this) {
	      return function(err, acc) {
	        var ajaxConfig, mimeType;
	        if (err) {
	          return cb(err, acc);
	        }
	        method = acc.method, headers = acc.headers, mimeType = acc.mimeType;
	        if (options.isRaw) {
	          headers['Accept'] = 'application/vnd.github.raw';
	        }
	        ajaxConfig = {
	          url: path,
	          type: method,
	          contentType: options.contentType,
	          mimeType: mimeType,
	          headers: headers,
	          processData: false,
	          data: !options.isRaw && data && JSON.stringify(data) || data,
	          dataType: !options.isRaw ? 'json' : void 0
	        };
	        if (options.isBoolean) {
	          ajaxConfig.statusCode = {
	            204: function() {
	              return cb(null, true);
	            },
	            404: function() {
	              return cb(null, false);
	            }
	          };
	        }
	        eventId++;
	        if (typeof _this._emit === "function") {
	          _this._emit('start', eventId, {
	            method: method,
	            path: path,
	            data: data,
	            options: options
	          });
	        }
	        return ajax(ajaxConfig, function(err, val) {
	          var emitterRate, jqXHR, json, rateLimit, rateLimitRemaining, rateLimitReset;
	          jqXHR = err || val;
	          if (_this._emit) {
	            if (jqXHR.getResponseHeader('X-RateLimit-Limit')) {
	              rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'));
	              rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'));
	              rateLimitReset = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Reset'));
	              emitterRate = {
	                remaining: rateLimitRemaining,
	                limit: rateLimit,
	                reset: rateLimitReset
	              };
	              if (jqXHR.getResponseHeader('X-OAuth-Scopes')) {
	                emitterRate.scopes = jqXHR.getResponseHeader('X-OAuth-Scopes').split(', ');
	              }
	            }
	            _this._emit('end', eventId, {
	              method: method,
	              path: path,
	              data: data,
	              options: options
	            }, jqXHR.status, emitterRate);
	          }
	          if (!err) {
	            if (jqXHR.status === 302) {
	              return cb(null, jqXHR.getResponseHeader('Location'));
	            } else if (!(jqXHR.status === 204 && options.isBoolean)) {
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
	                jqXHR: jqXHR,
	                status: jqXHR.status,
	                request: acc,
	                requester: _this,
	                instance: _this._instance
	              };
	              return _this._instance._parseWithContext('', acc, function(err, val) {
	                if (err) {
	                  return cb(err, val);
	                }
	                return cb(null, val, jqXHR.status, jqXHR);
	              });
	            }
	          } else {
	            if (options.isBoolean && jqXHR.status === 404) {

	            } else {
	              err = new Error(jqXHR.responseText);
	              err.status = jqXHR.status;
	              if (jqXHR.getResponseHeader('Content-Type') === 'application/json; charset=utf-8') {
	                if (jqXHR.responseText) {
	                  try {
	                    json = JSON.parse(jqXHR.responseText);
	                  } catch (error) {
	                    cb({
	                      message: 'Error Parsing Response'
	                    });
	                  }
	                } else {
	                  json = '';
	                }
	                err.json = json;
	              }
	              return cb(err);
	            }
	          }
	        });
	      };
	    })(this));
	  };

	  return Requester;

	})();


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	module.exports = window.XMLHTTPRequest;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toQueryString = __webpack_require__(11);
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {
	  'repos': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+$/,
	  'gists': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/gists\/[^\/]+$/,
	  'issues': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/(issues|pulls)\/[^\/]+$/,
	  'users': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/[^\/]+$/,
	  'orgs': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/orgs\/[^\/]+$/,
	  'teams': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/teams\/[^\/]+$/,
	  'repos.comments': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/comments\/[^\/]+$/
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var require;'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var req = require; // Hack so requireJS does not try to load `es6-promise` in the browser
	// Use native promises if Harmony is on
	var Promise = undefined.Promise || __webpack_require__(24).Promise;
	var newPromise = function newPromise(fn) {
	  return new Promise(fn);
	};
	var allPromises = function allPromises(promises) {
	  return Promise.all(promises);
	};

	exports.newPromise = newPromise;
	exports.allPromises = allPromises;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	module.exports = window.Promise;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = /^(https:\/\/status.github.com\/api\/(status.json|last-message.json|messages.json)$)|(https?:\/\/[^\/]+)?(\/api\/v3)?\/(zen|octocat|users|organizations|issues|gists|emojis|markdown|meta|rate_limit|feeds|events|notifications|notifications\/threads(\/[^\/]+)|notifications\/threads(\/[^\/]+)\/subscription|gitignore\/templates(\/[^\/]+)?|user(\/\d+)?|user(\/\d+)?\/(|repos|orgs|followers|following(\/[^\/]+)?|emails(\/[^\/]+)?|issues|starred|starred(\/[^\/]+){2}|teams)|orgs\/[^\/]+|orgs\/[^\/]+\/(repos|issues|members|events|teams)|teams\/[^\/]+|teams\/[^\/]+\/(members(\/[^\/]+)?|memberships\/[^\/]+|repos|repos(\/[^\/]+){2})|users\/[^\/]+|users\/[^\/]+\/(repos|orgs|gists|followers|following(\/[^\/]+){0,2}|keys|starred|received_events(\/public)?|events(\/public)?|events\/orgs\/[^\/]+)|search\/(repositories|issues|users|code)|gists\/(public|starred|([a-f0-9]{20}|[0-9]+)|([a-f0-9]{20}|[0-9]+)\/forks|([a-f0-9]{20}|[0-9]+)\/comments(\/[0-9]+)?|([a-f0-9]{20}|[0-9]+)\/star)|repos(\/[^\/]+){2}|repos(\/[^\/]+){2}\/(readme|tarball(\/[^\/]+)?|zipball(\/[^\/]+)?|compare\/([^\.{3}]+)\.{3}([^\.{3}]+)|deployments(\/[0-9]+)?|deployments\/[0-9]+\/statuses(\/[0-9]+)?|hooks|hooks\/[^\/]+|hooks\/[^\/]+\/tests|assignees|languages|teams|tags|branches(\/[^\/]+){0,2}|contributors|subscribers|subscription|stargazers|comments(\/[0-9]+)?|downloads(\/[0-9]+)?|forks|milestones|milestones\/[0-9]+|milestones\/[0-9]+\/labels|labels(\/[^\/]+)?|releases|releases\/([0-9]+)|releases\/([0-9]+)\/assets|releases\/latest|releases\/tags\/([^\/]+)|releases\/assets\/([0-9]+)|events|notifications|merges|statuses\/[a-f0-9]{40}|pages|pages\/builds|pages\/builds\/latest|commits|commits\/[a-f0-9]{40}|commits\/[a-f0-9]{40}\/(comments|status|statuses)?|contents\/|contents(\/[^\/]+)*|collaborators(\/[^\/]+)?|(issues|pulls)|(issues|pulls)\/(events|events\/[0-9]+|comments(\/[0-9]+)?|[0-9]+|[0-9]+\/events|[0-9]+\/comments|[0-9]+\/labels(\/[^\/]+)?)|pulls\/[0-9]+\/(files|commits|merge)|git\/(refs|refs\/(.+|heads(\/[^\/]+)?|tags(\/[^\/]+)?)|trees(\/[^\/]+)?|blobs(\/[a-f0-9]{40}$)?|commits(\/[a-f0-9]{40}$)?)|stats\/(contributors|commit_activity|code_frequency|participation|punch_card))|licenses|licenses\/([^\/]+)|authorizations|authorizations\/((\d+)|clients\/([^\/]{20})|clients\/([^\/]{20})\/([^\/]+))|applications\/([^\/]{20})\/tokens|applications\/([^\/]{20})\/tokens\/([^\/]+)|enterprise\/(settings\/license|stats\/(issues|hooks|milestones|orgs|comments|pages|users|gists|pulls|repos|all))|staff\/indexing_jobs|users\/[^\/]+\/(site_admin|suspended)|setup\/api\/(start|upgrade|configcheck|configure|settings(authorized-keys)?|maintenance))(\?.*)?$/;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 28 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {
	  'application/vnd.github.drax-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/licenses|\/licenses\/([^\/]+)|\/repos\/([^\/]+)\/([^\/]+))$/,
	  'application/vnd.github.v3.star+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/([^\/]+)\/starred$/
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toQueryString = __webpack_require__(11);

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

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var toQueryString = __webpack_require__(11);

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

/***/ },
/* 34 */
/***/ function(module, exports) {

	var Pagination;

	module.exports = new (Pagination = (function() {
	  function Pagination() {}

	  Pagination.prototype.responseMiddlewareAsync = function(input, cb) {
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

	})());


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ }
/******/ ])
});
;
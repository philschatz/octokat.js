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

	var ALL_PLUGINS, HypermediaPlugin, Octokat, OctokatBase, deprecate;

	deprecate = __webpack_require__(2);

	OctokatBase = __webpack_require__(3);

	HypermediaPlugin = __webpack_require__(13);

	ALL_PLUGINS = [__webpack_require__(14), __webpack_require__(19), __webpack_require__(21), __webpack_require__(23), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), HypermediaPlugin, __webpack_require__(31)];

	Octokat = function(clientOptions) {
	  var instance;
	  if (clientOptions == null) {
	    clientOptions = {};
	  }
	  if (clientOptions.plugins == null) {
	    clientOptions.plugins = ALL_PLUGINS;
	  }
	  if (clientOptions.disableHypermedia) {
	    deprecate('Please use the clientOptions.plugins array and just do not include the hypermedia plugin');
	    clientOptions.plugins = clientOptions.plugins.filter(function(plugin) {
	      return plugin !== HypermediaPlugin;
	    });
	  }
	  instance = new OctokatBase(clientOptions);
	  return instance;
	};

	module.exports = Octokat;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(message) {
	  return typeof console !== "undefined" && console !== null ? typeof console.warn === "function" ? console.warn("Octokat Deprecation: " + message) : void 0 : void 0;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Chainer, OctokatBase, Request, TREE_OPTIONS, VerbMethods, applyHypermedia, deprecate, plus, uncamelizeObj,
	  slice = [].slice;

	plus = __webpack_require__(4);

	deprecate = __webpack_require__(2);

	TREE_OPTIONS = __webpack_require__(5);

	Chainer = __webpack_require__(6);

	VerbMethods = __webpack_require__(8);

	Request = __webpack_require__(10);

	applyHypermedia = __webpack_require__(12);

	uncamelizeObj = function(obj) {
	  var i, j, key, len, o, ref, value;
	  if (Array.isArray(obj)) {
	    return (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = obj.length; j < len; j++) {
	        i = obj[j];
	        results.push(uncamelizeObj(i));
	      }
	      return results;
	    })();
	  } else if (obj === Object(obj)) {
	    o = {};
	    ref = Object.keys(obj);
	    for (j = 0, len = ref.length; j < len; j++) {
	      key = ref[j];
	      value = obj[key];
	      o[plus.uncamelize(key)] = uncamelizeObj(value);
	    }
	    return o;
	  } else {
	    return obj;
	  }
	};

	OctokatBase = function(clientOptions) {
	  var disableHypermedia, instance, plugins, request, verbMethods;
	  if (clientOptions == null) {
	    clientOptions = {};
	  }
	  plugins = clientOptions.plugins || [];
	  disableHypermedia = clientOptions.disableHypermedia;
	  if (disableHypermedia == null) {
	    disableHypermedia = false;
	  }
	  instance = {};
	  request = function(method, path, data, options, cb) {
	    var _request, ref;
	    if (options == null) {
	      options = {
	        raw: false,
	        isBase64: false,
	        isBoolean: false
	      };
	    }
	    if (data && !(typeof global !== "undefined" && global !== null ? (ref = global['Buffer']) != null ? ref.isBuffer(data) : void 0 : void 0)) {
	      data = uncamelizeObj(data);
	    }
	    _request = Request(instance, clientOptions, plugins);
	    return _request(method, path, data, options, function(err, val) {
	      var context, obj;
	      if (err) {
	        return cb(err);
	      }
	      if (options.raw) {
	        return cb(null, val);
	      }
	      if (!disableHypermedia) {
	        context = {
	          data: val,
	          requestFn: _request,
	          instance: instance,
	          clientOptions: clientOptions
	        };
	        obj = instance._parseWithContext(path, context);
	        return cb(null, obj);
	      } else {
	        return cb(null, val);
	      }
	    });
	  };
	  verbMethods = new VerbMethods(plugins, request);
	  (new Chainer(verbMethods)).chain('', null, TREE_OPTIONS, instance);
	  instance.me = instance.user;
	  instance.parse = function(data) {
	    var context;
	    context = {
	      requestFn: request,
	      data: data,
	      instance: instance,
	      clientOptions: clientOptions
	    };
	    return instance._parseWithContext('', context);
	  };
	  instance._parseWithContext = function(path, context) {
	    var chainer, data, datum, j, k, len, len1, plugin, requestFn, url;
	    data = context.data, requestFn = context.requestFn;
	    url = data.url || path;
	    if (context.options == null) {
	      context.options = {};
	    }
	    for (j = 0, len = plugins.length; j < len; j++) {
	      plugin = plugins[j];
	      if (plugin.responseMiddleware) {
	        plus.extend(context, plugin.responseMiddleware(context));
	      }
	    }
	    data = context.data;
	    verbMethods = new VerbMethods(plugins, requestFn);
	    chainer = new Chainer(verbMethods);
	    if (url) {
	      chainer.chain(url, true, {}, data);
	      chainer.chainChildren(url, data);
	    } else {
	      chainer.chain('', null, TREE_OPTIONS, data);
	      if (Array.isArray(data)) {
	        for (k = 0, len1 = data.length; k < len1; k++) {
	          datum = data[k];
	          chainer.chainChildren(datum.url, datum);
	        }
	      }
	    }
	    return data;
	  };
	  instance._fromUrlWithDefault = function() {
	    var args, defaultFn, path;
	    path = arguments[0], defaultFn = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	    path = applyHypermedia.apply(null, [path].concat(slice.call(args)));
	    verbMethods.injectVerbMethods(path, defaultFn);
	    return defaultFn;
	  };
	  instance.fromUrl = function() {
	    var args, defaultFn, path;
	    path = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    defaultFn = function() {
	      var args;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      deprecate('call ....fetch() explicitly instead of ...()');
	      return defaultFn.fetch.apply(defaultFn, args);
	    };
	    return instance._fromUrlWithDefault.apply(instance, [path, defaultFn].concat(slice.call(args)));
	  };
	  instance._fromUrlCurried = function(path, defaultFn) {
	    var fn;
	    fn = function() {
	      var templateArgs;
	      templateArgs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      if (defaultFn && templateArgs.length === 0) {
	        return defaultFn.apply(fn);
	      } else {
	        return instance.fromUrl.apply(instance, [path].concat(slice.call(templateArgs)));
	      }
	    };
	    if (!/\{/.test(path)) {
	      verbMethods.injectVerbMethods(path, fn);
	    }
	    return fn;
	  };
	  instance.status = instance.fromUrl('https://status.github.com/api/status.json');
	  instance.status.api = instance.fromUrl('https://status.github.com/api.json');
	  instance.status.lastMessage = instance.fromUrl('https://status.github.com/api/last-message.json');
	  instance.status.messages = instance.fromUrl('https://status.github.com/api/messages.json');
	  return instance;
	};

	module.exports = OctokatBase;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	var plus;

	plus = {
	  camelize: function(string) {
	    if (string) {
	      return string.replace(/[_-]+(\w)/g, function(m) {
	        return m[1].toUpperCase();
	      });
	    } else {
	      return '';
	    }
	  },
	  uncamelize: function(string) {
	    if (!string) {
	      return '';
	    }
	    return string.replace(/([A-Z])+/g, function(match, letter) {
	      if (letter == null) {
	        letter = '';
	      }
	      return "_" + (letter.toLowerCase());
	    });
	  },
	  dasherize: function(string) {
	    if (!string) {
	      return '';
	    }
	    string = string[0].toLowerCase() + string.slice(1);
	    return string.replace(/([A-Z])|(_)/g, function(m, letter) {
	      if (letter) {
	        return '-' + letter.toLowerCase();
	      } else {
	        return '-';
	      }
	    });
	  },
	  extend: function(target, source) {
	    var i, key, len, ref, results;
	    if (source) {
	      ref = Object.keys(source);
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        key = ref[i];
	        results.push(target[key] = source[key]);
	      }
	      return results;
	    }
	  }
	};

	module.exports = plus;


/***/ },
/* 5 */
/***/ function(module, exports) {

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
	  'setup': {
	    'api': {
	      'start': false,
	      'upgrade': false,
	      'configcheck': false,
	      'configure': false,
	      'settings': {
	        'authorized-keys': false
	      },
	      'maintenance': false
	    }
	  }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Chainer, OBJECT_MATCHER, TREE_OPTIONS, VerbMethods, plus,
	  slice = [].slice;

	TREE_OPTIONS = __webpack_require__(5);

	OBJECT_MATCHER = __webpack_require__(7);

	plus = __webpack_require__(4);

	VerbMethods = __webpack_require__(8);

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

	  Chainer.prototype.chainChildren = function(url, obj) {
	    var context, i, k, key, len, re, ref;
	    for (key in OBJECT_MATCHER) {
	      re = OBJECT_MATCHER[key];
	      if (re.test(obj.url)) {
	        context = TREE_OPTIONS;
	        ref = key.split('.');
	        for (i = 0, len = ref.length; i < len; i++) {
	          k = ref[i];
	          context = context[k];
	        }
	        this.chain(url, k, context, obj);
	      }
	    }
	    return obj;
	  };

	  return Chainer;

	})();

	module.exports = Chainer;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	  'repos': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+$/,
	  'gists': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/gists\/[^\/]+$/,
	  'issues': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/(issues|pulls)[^\/]+$/,
	  'users': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/[^\/]+$/,
	  'orgs': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/orgs\/[^\/]+$/,
	  'repos.comments': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/comments\/[^\/]+$/
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var VerbMethods, extend, filter, forOwn, toPromise, toQueryString,
	  slice = [].slice;

	filter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lodash/collection/filter\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	forOwn = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lodash/object/forOwn\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	extend = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lodash/object/extend\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	toQueryString = __webpack_require__(9);

	toPromise = function(orig, newPromise) {
	  return function() {
	    var args, last;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    last = args[args.length - 1];
	    if (typeof last === 'function') {
	      args.pop();
	      return orig.apply(null, [last].concat(slice.call(args)));
	    } else if (newPromise) {
	      return newPromise(function(resolve, reject) {
	        var cb;
	        cb = function(err, val) {
	          if (err) {
	            return reject(err);
	          }
	          return resolve(val);
	        };
	        return orig.apply(null, [cb].concat(slice.call(args)));
	      });
	    } else {
	      throw new Error('You must specify a callback or have a promise library loaded');
	    }
	  };
	};

	VerbMethods = (function() {
	  function VerbMethods(plugins, _requestFn) {
	    var i, j, len, len1, plugin, promisePlugins, ref, ref1;
	    this._requestFn = _requestFn;
	    if (!this._requestFn) {
	      throw new Error('Octokat BUG: request is required');
	    }
	    promisePlugins = filter(plugins, function(arg) {
	      var promiseCreator;
	      promiseCreator = arg.promiseCreator;
	      return promiseCreator;
	    });
	    if (promisePlugins) {
	      this._promisePlugin = promisePlugins[0];
	    }
	    this._syncVerbs = {};
	    ref = filter(plugins, function(arg) {
	      var verbs;
	      verbs = arg.verbs;
	      return verbs;
	    });
	    for (i = 0, len = ref.length; i < len; i++) {
	      plugin = ref[i];
	      extend(this._syncVerbs, plugin.verbs);
	    }
	    this._asyncVerbs = {};
	    ref1 = filter(plugins, function(arg) {
	      var asyncVerbs;
	      asyncVerbs = arg.asyncVerbs;
	      return asyncVerbs;
	    });
	    for (j = 0, len1 = ref1.length; j < len1; j++) {
	      plugin = ref1[j];
	      extend(this._asyncVerbs, plugin.asyncVerbs);
	    }
	  }

	  VerbMethods.prototype.injectVerbMethods = function(path, obj) {
	    var allPromises, newPromise, ref;
	    if (this._promisePlugin) {
	      ref = this._promisePlugin.promiseCreator, newPromise = ref.newPromise, allPromises = ref.allPromises;
	    }
	    obj.url = path;
	    forOwn(this._syncVerbs, (function(_this) {
	      return function(verbFunc, verbName) {
	        return obj[verbName] = function() {
	          var args, makeRequest;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          makeRequest = function() {
	            var cb, data, method, options, originalArgs, ref1;
	            cb = arguments[0], originalArgs = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	            ref1 = verbFunc.apply(null, [path].concat(slice.call(originalArgs))), method = ref1.method, path = ref1.path, data = ref1.data, options = ref1.options;
	            return _this._requestFn(method, path, data, options, cb);
	          };
	          return toPromise(makeRequest, newPromise).apply(null, args);
	        };
	      };
	    })(this));
	    return forOwn(this._asyncVerbs, (function(_this) {
	      return function(verbFunc, verbName) {
	        return obj[verbName] = function() {
	          var args, makeRequest;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          makeRequest = verbFunc(_this._requestFn, path);
	          return toPromise(makeRequest, newPromise).apply(null, args);
	        };
	      };
	    })(this));
	  };

	  return VerbMethods;

	})();

	module.exports = VerbMethods;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var toQueryString;

	toQueryString = function(options, omitQuestionMark) {
	  var key, params, ref, value;
	  if (!options || options === {}) {
	    return '';
	  }
	  params = [];
	  ref = options || {};
	  for (key in ref) {
	    value = ref[key];
	    if (value) {
	      params.push(key + "=" + (encodeURIComponent(value)));
	    }
	  }
	  if (params.length) {
	    if (omitQuestionMark) {
	      return "&" + (params.join('&'));
	    } else {
	      return "?" + (params.join('&'));
	    }
	  } else {
	    return '';
	  }
	};

	module.exports = toQueryString;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var require;var DEFAULT_CACHE_HANDLER, Request, _cachedETags, ajax, plus, userAgent;

	plus = __webpack_require__(4);

	if (typeof window === "undefined" || window === null) {
	  userAgent = 'octokat.js';
	}

	ajax = function(options, cb) {
	  var XMLHttpRequest, name, ref, req, value, xhr;
	  if (typeof window !== "undefined" && window !== null) {
	    XMLHttpRequest = window.XMLHttpRequest;
	  } else {
	    req = require;
	    XMLHttpRequest = __webpack_require__(11).XMLHttpRequest;
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
	  ref = options.headers;
	  for (name in ref) {
	    value = ref[name];
	    xhr.setRequestHeader(name, value);
	  }
	  xhr.onreadystatechange = function() {
	    var name1, ref1;
	    if (4 === xhr.readyState) {
	      if ((ref1 = options.statusCode) != null) {
	        if (typeof ref1[name1 = xhr.status] === "function") {
	          ref1[name1]();
	        }
	      }
	      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 302) {
	        return cb(null, xhr);
	      } else {
	        return cb(xhr);
	      }
	    }
	  };
	  return xhr.send(options.data);
	};

	_cachedETags = {};

	DEFAULT_CACHE_HANDLER = {
	  get: function(method, path) {
	    return _cachedETags[method + " " + path];
	  },
	  add: function(method, path, eTag, data, status) {
	    return _cachedETags[method + " " + path] = new ETagResponse(eTag, data, status);
	  }
	};

	Request = function(instance, clientOptions, ALL_PLUGINS) {
	  var emitter, requestFn;
	  if (clientOptions == null) {
	    clientOptions = {};
	  }
	  if (clientOptions.rootURL == null) {
	    clientOptions.rootURL = 'https://api.github.com';
	  }
	  if (clientOptions.useETags == null) {
	    clientOptions.useETags = true;
	  }
	  if (clientOptions.usePostInsteadOfPatch == null) {
	    clientOptions.usePostInsteadOfPatch = false;
	  }
	  emitter = clientOptions.emitter;
	  requestFn = function(method, path, data, options, cb) {
	    var acc, ajaxConfig, headers, i, len, mimeType, plugin, ref;
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
	      path = "" + clientOptions.rootURL + path;
	    }
	    headers = {
	      'Accept': clientOptions.acceptHeader,
	      'User-Agent': userAgent || void 0
	    };
	    acc = {
	      method: method,
	      path: path,
	      clientOptions: clientOptions,
	      headers: headers,
	      options: options
	    };
	    for (i = 0, len = ALL_PLUGINS.length; i < len; i++) {
	      plugin = ALL_PLUGINS[i];
	      if (plugin.requestMiddleware) {
	        ref = plugin.requestMiddleware(acc) || {}, method = ref.method, headers = ref.headers, mimeType = ref.mimeType;
	        if (method) {
	          acc.method = method;
	        }
	        if (mimeType) {
	          acc.mimeType = mimeType;
	        }
	        plus.extend(acc.headers, headers);
	      }
	    }
	    method = acc.method, headers = acc.headers, mimeType = acc.mimeType;
	    if (options.isRaw) {
	      headers['Accept'] = 'application/vnd.github.raw';
	    }
	    if (cacheHandler.get(method, path)) {
	      headers['If-None-Match'] = cacheHandler.get(method, path).eTag;
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
	        204: (function(_this) {
	          return function() {
	            return cb(null, true);
	          };
	        })(this),
	        404: (function(_this) {
	          return function() {
	            return cb(null, false);
	          };
	        })(this)
	      };
	    }
	    if (emitter != null) {
	      emitter.emit('start', method, path, data, options);
	    }
	    return ajax(ajaxConfig, function(err, val) {
	      var emitterRate, jqXHR, json, rateLimit, rateLimitRemaining, rateLimitReset;
	      jqXHR = err || val;
	      if (emitter) {
	        rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'));
	        rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'));
	        rateLimitReset = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Reset'));
	        emitterRate = {
	          rate: {
	            remaining: rateLimitRemaining,
	            limit: rateLimit,
	            reset: rateLimitReset
	          }
	        };
	        if (jqXHR.getResponseHeader('X-OAuth-Scopes')) {
	          emitterRate.scopes = jqXHR.getResponseHeader('X-OAuth-Scopes').split(', ');
	        }
	        emitter.emit('request', emitterRate, method, path, data, options, jqXHR.status);
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
	            clientOptions: clientOptions,
	            data: data,
	            options: options,
	            jqXHR: jqXHR,
	            status: jqXHR.status,
	            request: acc,
	            requestFn: requestFn,
	            instance: instance
	          };
	          data = instance._parseWithContext('', acc);
	          return cb(null, data, jqXHR.status, jqXHR);
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
	  return requestFn;
	};

	module.exports = Request;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = window.XMLHTTPRequest;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var deprecate, toQueryString,
	  slice = [].slice;

	toQueryString = __webpack_require__(9);

	deprecate = __webpack_require__(2);

	module.exports = function() {
	  var args, fieldName, fieldValue, i, j, k, len, len1, m, match, optionalNames, optionalParams, param, templateParams, url;
	  url = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	  if (args.length === 0) {
	    templateParams = {};
	  } else {
	    if (args.length > 1) {
	      deprecate('When filling in a template URL pass all the field to fill in 1 object instead of comma-separated args');
	    }
	    templateParams = args[0];
	  }
	  i = 0;
	  while (m = /(\{[^\}]+\})/.exec(url)) {
	    match = m[1];
	    param = '';
	    switch (match[1]) {
	      case '/':
	        fieldName = match.slice(2, match.length - 1);
	        fieldValue = templateParams[fieldName];
	        if (fieldValue) {
	          if (/\//.test(fieldValue)) {
	            throw new Error("Octokat Error: this field must not contain slashes: " + fieldName);
	          }
	          param = "/" + fieldValue;
	        }
	        break;
	      case '+':
	        fieldName = match.slice(2, match.length - 1);
	        fieldValue = templateParams[fieldName];
	        if (fieldValue) {
	          param = fieldValue;
	        }
	        break;
	      case '?':
	        optionalNames = match.slice(2, -1).split(',');
	        optionalParams = {};
	        for (j = 0, len = optionalNames.length; j < len; j++) {
	          fieldName = optionalNames[j];
	          optionalParams[fieldName] = templateParams[fieldName];
	        }
	        param = toQueryString(optionalParams);
	        break;
	      case '&':
	        optionalNames = match.slice(2, -1).split(',');
	        optionalParams = {};
	        for (k = 0, len1 = optionalNames.length; k < len1; k++) {
	          fieldName = optionalNames[k];
	          optionalParams[fieldName] = templateParams[fieldName];
	        }
	        param = toQueryString(optionalParams, true);
	        break;
	      default:
	        fieldName = match.slice(1, match.length - 1);
	        if (templateParams[fieldName]) {
	          param = templateParams[fieldName];
	        } else {
	          throw new Error("Octokat Error: Required parameter is missing: " + fieldName);
	        }
	    }
	    url = url.replace(match, param);
	    i++;
	  }
	  return url;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var HyperMedia, deprecate,
	  slice = [].slice;

	deprecate = __webpack_require__(2);

	module.exports = new (HyperMedia = (function() {
	  function HyperMedia() {}

	  HyperMedia.prototype.replace = function(instance, requestFn, data) {
	    if (Array.isArray(data)) {
	      return this._replaceArray(instance, requestFn, data);
	    } else if (typeof data === 'function') {
	      return data;
	    } else if (data === Object(data)) {
	      return this._replaceObject(instance, requestFn, data);
	    } else {
	      return data;
	    }
	  };

	  HyperMedia.prototype._replaceObject = function(instance, requestFn, orig) {
	    var acc, i, key, len, ref, value;
	    acc = {};
	    ref = Object.keys(orig);
	    for (i = 0, len = ref.length; i < len; i++) {
	      key = ref[i];
	      value = orig[key];
	      this._replaceKeyValue(instance, requestFn, acc, key, value);
	    }
	    return acc;
	  };

	  HyperMedia.prototype._replaceArray = function(instance, requestFn, orig) {
	    var arr, i, item, key, len, ref, value;
	    arr = (function() {
	      var i, len, results;
	      results = [];
	      for (i = 0, len = orig.length; i < len; i++) {
	        item = orig[i];
	        results.push(this.replace(instance, requestFn, item));
	      }
	      return results;
	    }).call(this);
	    ref = Object.keys(orig);
	    for (i = 0, len = ref.length; i < len; i++) {
	      key = ref[i];
	      value = orig[key];
	      this._replaceKeyValue(instance, requestFn, arr, key, value);
	    }
	    return arr;
	  };

	  HyperMedia.prototype._replaceKeyValue = function(instance, requestFn, acc, key, value) {
	    var defaultFn, fn, newKey;
	    if (/_url$/.test(key)) {
	      if (/^upload_url$/.test(key)) {
	        defaultFn = function() {
	          var args;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          deprecate('call .upload({name, label}).create(data, contentType)' + ' instead of .upload(name, data, contentType)');
	          return defaultFn.create.apply(defaultFn, args);
	        };
	        fn = function() {
	          var args;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          return instance._fromUrlWithDefault.apply(instance, [value, defaultFn].concat(slice.call(args)))();
	        };
	      } else {
	        defaultFn = function() {
	          deprecate('instead of directly calling methods like .nextPage(), use .nextPage.fetch()');
	          return this.fetch();
	        };
	        fn = instance._fromUrlCurried(value, defaultFn);
	      }
	      newKey = key.substring(0, key.length - '_url'.length);
	      acc[newKey] = fn;
	      if (!/\{/.test(value)) {
	        return acc[key] = value;
	      }
	    } else if (/_at$/.test(key)) {
	      return acc[key] = value ? new Date(value) : null;
	    } else {
	      return acc[key] = this.replace(instance, requestFn, value);
	    }
	  };

	  HyperMedia.prototype.responseMiddleware = function(arg) {
	    var data, instance, requestFn;
	    instance = arg.instance, requestFn = arg.requestFn, data = arg.data;
	    data = this.replace(instance, requestFn, data);
	    return {
	      data: data
	    };
	  };

	  return HyperMedia;

	})());


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var allPromises, newPromise, ref, ref1, ref2;

	ref = __webpack_require__(15), newPromise = ref.newPromise, allPromises = ref.allPromises;

	if (!(newPromise && allPromises)) {
	  ref1 = __webpack_require__(16), newPromise = ref1.newPromise, allPromises = ref1.allPromises;
	}

	if (!((typeof window !== "undefined" && window !== null) || newPromise)) {
	  ref2 = __webpack_require__(17), newPromise = ref2.newPromise, allPromises = ref2.allPromises;
	}

	if ((typeof window !== "undefined" && window !== null) && !newPromise) {
	  if (typeof console !== "undefined" && console !== null) {
	    if (typeof console.warn === "function") {
	      console.warn('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise');
	    }
	  }
	} else if ((typeof window === "undefined" || window === null) && !newPromise) {
	  throw new Error('Could not find a promise lib for node. Seems like a bug');
	}

	module.exports = {
	  promiseCreator: {
	    newPromise: newPromise,
	    allPromises: allPromises
	  }
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	var allPromises, injector, newPromise, ref,
	  slice = [].slice;

	if (typeof window !== "undefined" && window !== null) {
	  if (window.Q) {
	    newPromise = (function(_this) {
	      return function(fn) {
	        var deferred, reject, resolve;
	        deferred = window.Q.defer();
	        resolve = function(val) {
	          return deferred.resolve(val);
	        };
	        reject = function(err) {
	          return deferred.reject(err);
	        };
	        fn(resolve, reject);
	        return deferred.promise;
	      };
	    })(this);
	    allPromises = function(promises) {
	      return window.Q.all(promises);
	    };
	  } else if (window.angular) {
	    newPromise = null;
	    allPromises = null;
	    injector = angular.injector(['ng']);
	    injector.invoke(function($q) {
	      newPromise = function(fn) {
	        var deferred, reject, resolve;
	        deferred = $q.defer();
	        resolve = function(val) {
	          return deferred.resolve(val);
	        };
	        reject = function(err) {
	          return deferred.reject(err);
	        };
	        fn(resolve, reject);
	        return deferred.promise;
	      };
	      return allPromises = function(promises) {
	        return $q.all(promises);
	      };
	    });
	  } else if ((ref = window.jQuery) != null ? ref.Deferred : void 0) {
	    newPromise = (function(_this) {
	      return function(fn) {
	        var promise, reject, resolve;
	        promise = window.jQuery.Deferred();
	        resolve = function(val) {
	          return promise.resolve(val);
	        };
	        reject = function(val) {
	          return promise.reject(val);
	        };
	        fn(resolve, reject);
	        return promise.promise();
	      };
	    })(this);
	    allPromises = (function(_this) {
	      return function(promises) {
	        var ref1;
	        return (ref1 = window.jQuery).when.apply(ref1, promises).then(function() {
	          var promises;
	          promises = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          return promises;
	        });
	      };
	    })(this);
	  }
	}

	module.exports = {
	  newPromise: newPromise,
	  allPromises: allPromises
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	var allPromises, newPromise;

	if (typeof Promise !== "undefined" && Promise !== null) {
	  newPromise = (function(_this) {
	    return function(fn) {
	      return new Promise(function(resolve, reject) {
	        if (resolve.fulfill) {
	          return fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve));
	        } else {
	          return fn.apply(null, arguments);
	        }
	      });
	    };
	  })(this);
	  allPromises = (function(_this) {
	    return function(promises) {
	      return Promise.all(promises);
	    };
	  })(this);
	}

	module.exports = {
	  newPromise: newPromise,
	  allPromises: allPromises
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var require;var Promise, allPromises, newPromise, req;

	req = require;

	Promise = this.Promise || __webpack_require__(18).Promise;

	newPromise = function(fn) {
	  return new Promise(fn);
	};

	allPromises = function(promises) {
	  return Promise.all(promises);
	};

	module.exports = {
	  newPromise: newPromise,
	  allPromises: allPromises
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = window.Promise;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var URL_VALIDATOR;

	URL_VALIDATOR = __webpack_require__(20);

	module.exports = {
	  requestMiddleware: function(arg) {
	    var err, path;
	    path = arg.path;
	    if (!URL_VALIDATOR.test(path)) {
	      err = "Octokat BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=" + path;
	      return console.warn(err);
	    }
	  }
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = /^(https:\/\/status.github.com\/api\/(status.json|last-message.json|messages.json)$)|(https?:\/\/[^\/]+)?(\/api\/v3)?\/(zen|octocat|users|organizations|issues|gists|emojis|markdown|meta|rate_limit|feeds|events|notifications|notifications\/threads(\/[^\/]+)|notifications\/threads(\/[^\/]+)\/subscription|gitignore\/templates(\/[^\/]+)?|user(\/\d+)?|user(\/\d+)?\/(|repos|orgs|followers|following(\/[^\/]+)?|emails(\/[^\/]+)?|issues|starred|starred(\/[^\/]+){2}|teams)|orgs\/[^\/]+|orgs\/[^\/]+\/(repos|issues|members|events|teams)|teams\/[^\/]+|teams\/[^\/]+\/(members(\/[^\/]+)?|memberships\/[^\/]+|repos|repos(\/[^\/]+){2})|users\/[^\/]+|users\/[^\/]+\/(repos|orgs|gists|followers|following(\/[^\/]+){0,2}|keys|starred|received_events(\/public)?|events(\/public)?|events\/orgs\/[^\/]+)|search\/(repositories|issues|users|code)|gists\/(public|starred|([a-f0-9]{20}|[0-9]+)|([a-f0-9]{20}|[0-9]+)\/forks|([a-f0-9]{20}|[0-9]+)\/comments(\/[0-9]+)?|([a-f0-9]{20}|[0-9]+)\/star)|repos(\/[^\/]+){2}|repos(\/[^\/]+){2}\/(readme|tarball(\/[^\/]+)?|zipball(\/[^\/]+)?|compare\/([^\.{3}]+)\.{3}([^\.{3}]+)|deployments(\/[0-9]+)?|deployments\/[0-9]+\/statuses(\/[0-9]+)?|hooks|hooks\/[^\/]+|hooks\/[^\/]+\/tests|assignees|languages|teams|tags|branches(\/[^\/]+){0,2}|contributors|subscribers|subscription|stargazers|comments(\/[0-9]+)?|downloads(\/[0-9]+)?|forks|milestones|milestones\/[0-9]+|milestones\/[0-9]+\/labels|labels(\/[^\/]+)?|releases|releases\/([0-9]+)|releases\/([0-9]+)\/assets|releases\/latest|releases\/tags\/([^\/]+)|releases\/assets\/([0-9]+)|events|notifications|merges|statuses\/[a-f0-9]{40}|pages|pages\/builds|pages\/builds\/latest|commits|commits\/[a-f0-9]{40}|commits\/[a-f0-9]{40}\/(comments|status|statuses)?|contents\/|contents(\/[^\/]+)*|collaborators(\/[^\/]+)?|(issues|pulls)|(issues|pulls)\/(events|events\/[0-9]+|comments(\/[0-9]+)?|[0-9]+|[0-9]+\/events|[0-9]+\/comments|[0-9]+\/labels(\/[^\/]+)?)|pulls\/[0-9]+\/(files|commits)|git\/(refs|refs\/(.+|heads(\/[^\/]+)?|tags(\/[^\/]+)?)|trees(\/[^\/]+)?|blobs(\/[a-f0-9]{40}$)?|commits(\/[a-f0-9]{40}$)?)|stats\/(contributors|commit_activity|code_frequency|participation|punch_card))|licenses|licenses\/([^\/]+)|authorizations|authorizations\/((\d+)|clients\/([^\/]{20})|clients\/([^\/]{20})\/([^\/]+))|applications\/([^\/]{20})\/tokens|applications\/([^\/]{20})\/tokens\/([^\/]+)|enterprise\/(settings\/license|stats\/(issues|hooks|milestones|orgs|comments|pages|users|gists|pulls|repos|all))|staff\/indexing_jobs|users\/[^\/]+\/(site_admin|suspended)|setup\/api\/(start|upgrade|configcheck|configure|settings(authorized-keys)?|maintenance))(\?.*)?$/;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var base64encode;

	base64encode = __webpack_require__(22);

	module.exports = {
	  requestMiddleware: function(arg) {
	    var auth, password, ref, token, username;
	    ref = arg.clientOptions, token = ref.token, username = ref.username, password = ref.password;
	    if (token || (username && password)) {
	      if (token) {
	        auth = "token " + token;
	      } else {
	        auth = 'Basic ' + base64encode(username + ":" + password);
	      }
	      return {
	        headers: {
	          'Authorization': auth
	        }
	      };
	    }
	  }
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var base64encode;

	if (typeof window !== "undefined" && window !== null) {
	  base64encode = window.btoa;
	} else if (typeof global !== "undefined" && global !== null ? global['Buffer'] : void 0) {
	  base64encode = function(str) {
	    var buffer;
	    buffer = new global['Buffer'](str, 'binary');
	    return buffer.toString('base64');
	  };
	} else {
	  throw new Error('Native btoa function or Buffer is missing');
	}

	module.exports = base64encode;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var DEFAULT_HEADER, PREVIEW_HEADERS;

	PREVIEW_HEADERS = __webpack_require__(24);

	DEFAULT_HEADER = function(url) {
	  var key, val;
	  for (key in PREVIEW_HEADERS) {
	    val = PREVIEW_HEADERS[key];
	    if (val.test(url)) {
	      return key;
	    }
	  }
	};

	module.exports = {
	  requestMiddleware: function(arg) {
	    var acceptHeader, path;
	    path = arg.path;
	    acceptHeader = DEFAULT_HEADER(path);
	    if (acceptHeader) {
	      return {
	        headers: {
	          'Accept': acceptHeader
	        }
	      };
	    }
	  }
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = {
	  'application/vnd.github.drax-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/licenses|\/licenses\/([^\/]+)|\/repos\/([^\/]+)\/([^\/]+))$/,
	  'application/vnd.github.v3.star+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/([^\/]+)\/starred$/,
	  'application/vnd.github.mirage-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/authorizations|\/authorizations\/clients\/([^\/]{20})|\/authorizations\/clients\/([^\/]{20})\/([^\/]+)|\/authorizations\/([\d]+)|\/applications\/([^\/]{20})\/tokens|\/applications\/([^\/]{20})\/tokens\/([^\/]+))$/
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
	  requestMiddleware: function(arg) {
	    var method, ref, usePostInsteadOfPatch;
	    (ref = arg.clientOptions, usePostInsteadOfPatch = ref.usePostInsteadOfPatch), method = arg.method;
	    if (usePostInsteadOfPatch && method === 'PATCH') {
	      return {
	        method: 'POST'
	      };
	    }
	  }
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var toQueryString,
	  slice = [].slice;

	toQueryString = __webpack_require__(9);

	module.exports = {
	  verbs: {
	    fetch: function(path, query) {
	      return {
	        method: 'GET',
	        path: "" + path + (toQueryString(query))
	      };
	    },
	    read: function(path, query) {
	      return {
	        method: 'GET',
	        path: "" + path + (toQueryString(query)),
	        options: {
	          isRaw: true
	        }
	      };
	    },
	    remove: function(path, data) {
	      return {
	        method: 'DELETE',
	        path: path,
	        data: data,
	        options: {
	          isBoolean: true
	        }
	      };
	    },
	    create: function(path, data, contentType) {
	      if (contentType) {
	        return {
	          method: 'POST',
	          path: path,
	          data: data,
	          options: {
	            isRaw: true,
	            contentType: contentType
	          }
	        };
	      } else {
	        return {
	          method: 'POST',
	          path: path,
	          data: data
	        };
	      }
	    },
	    update: function(path, data) {
	      return {
	        method: 'PATCH',
	        path: path,
	        data: data
	      };
	    },
	    add: function(path, data) {
	      return {
	        method: 'PUT',
	        path: path,
	        data: data,
	        options: {
	          isBoolean: true
	        }
	      };
	    },
	    contains: function() {
	      var args, path;
	      path = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      return {
	        method: 'GET',
	        path: path + "/" + (args.join('/')),
	        options: {
	          isBoolean: true
	        }
	      };
	    }
	  }
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	var fetchNextPage, getMore, pushAll;

	pushAll = function(target, source) {
	  return target.push.apply(target, source);
	};

	getMore = function(fetchable, requestFn, acc, cb) {
	  var doStuff;
	  doStuff = function(err, items) {
	    if (err) {
	      return cb(err);
	    }
	    pushAll(acc, items);
	    return getMore(items, requestFn, acc, cb);
	  };
	  if (!fetchNextPage(fetchable, requestFn, doStuff)) {
	    return cb(null, acc);
	  }
	};

	fetchNextPage = function(obj, requestFn, cb) {
	  if (typeof obj.next_page === 'string') {
	    requestFn('GET', obj.next_page, null, null, cb);
	    return true;
	  } else if (obj.next_page) {
	    obj.next_page.fetch(cb);
	    return true;
	  } else if (typeof obj.nextPage === 'string') {
	    requestFn('GET', obj.nextPage, null, null, cb);
	    return true;
	  } else if (obj.nextPage) {
	    obj.nextPage.fetch(cb);
	    return true;
	  } else {
	    return false;
	  }
	};

	module.exports = {
	  asyncVerbs: {
	    fetchAll: function(requestFn, path) {
	      return function(cb, query) {
	        return requestFn('GET', path, query, null, function(err, items) {
	          var acc;
	          if (err) {
	            return cb(err);
	          }
	          acc = [];
	          pushAll(acc, items);
	          return getMore(items, requestFn, acc, cb);
	        });
	      };
	    }
	  }
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var ReadBinary, toQueryString;

	toQueryString = __webpack_require__(9);

	module.exports = new (ReadBinary = (function() {
	  function ReadBinary() {}

	  ReadBinary.prototype.verbs = {
	    readBinary: function(path, query) {
	      return {
	        method: 'GET',
	        path: "" + path + (toQueryString(query)),
	        options: {
	          isRaw: true,
	          isBase64: true
	        }
	      };
	    }
	  };

	  ReadBinary.prototype.requestMiddleware = function(arg) {
	    var isBase64, options;
	    options = arg.options;
	    isBase64 = options.isBase64;
	    if (isBase64) {
	      return {
	        headers: {
	          Accept: 'application/vnd.github.raw'
	        },
	        mimeType: 'text/plain; charset=x-user-defined'
	      };
	    }
	  };

	  ReadBinary.prototype.responseMiddleware = function(arg) {
	    var converted, data, i, isBase64, j, options, ref;
	    options = arg.options, data = arg.data;
	    isBase64 = options.isBase64;
	    if (isBase64) {
	      converted = '';
	      for (i = j = 0, ref = data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        converted += String.fromCharCode(data.charCodeAt(i) & 0xff);
	      }
	      return {
	        data: converted
	      };
	    }
	  };

	  return ReadBinary;

	})());


/***/ },
/* 29 */
/***/ function(module, exports) {

	var Pagination;

	module.exports = new (Pagination = (function() {
	  function Pagination() {}

	  Pagination.prototype.responseMiddleware = function(arg) {
	    var data, discard, href, i, jqXHR, len, links, part, ref, ref1, rel;
	    jqXHR = arg.jqXHR, data = arg.data;
	    if (!jqXHR) {
	      return;
	    }
	    if (Array.isArray(data)) {
	      data = data.slice(0);
	      links = jqXHR.getResponseHeader('Link');
	      ref = (links != null ? links.split(',') : void 0) || [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        part = ref[i];
	        ref1 = part.match(/<([^>]+)>;\ rel="([^"]+)"/), discard = ref1[0], href = ref1[1], rel = ref1[2];
	        data[rel + "_page_url"] = href;
	      }
	      return {
	        data: data
	      };
	    }
	  };

	  return Pagination;

	})());


/***/ },
/* 30 */
/***/ function(module, exports) {

	var CacheMiddleware;

	module.exports = new (CacheMiddleware = (function() {
	  function CacheMiddleware() {
	    this._cachedETags = {};
	  }

	  CacheMiddleware.prototype.get = function(method, path) {
	    return this._cachedETags[method + " " + path];
	  };

	  CacheMiddleware.prototype.add = function(method, path, eTag, data, status) {
	    return this._cachedETags[method + " " + path] = {
	      eTag: eTag,
	      data: data,
	      status: status
	    };
	  };

	  CacheMiddleware.prototype.requestMiddleware = function(arg) {
	    var cacheHandler, clientOptions, headers, method, path;
	    clientOptions = arg.clientOptions, method = arg.method, path = arg.path;
	    headers = {};
	    cacheHandler = clientOptions.cacheHandler || this;
	    if (cacheHandler.get(method, path)) {
	      headers['If-None-Match'] = cacheHandler.get(method, path).eTag;
	    } else {
	      headers['If-Modified-Since'] = 'Thu, 01 Jan 1970 00:00:00 GMT';
	    }
	    return {
	      headers: headers
	    };
	  };

	  CacheMiddleware.prototype.responseMiddleware = function(arg) {
	    var cacheHandler, clientOptions, data, eTag, jqXHR, method, path, ref, request, status;
	    clientOptions = arg.clientOptions, request = arg.request, status = arg.status, jqXHR = arg.jqXHR, data = arg.data;
	    if (!jqXHR) {
	      return;
	    }
	    if (jqXHR) {
	      method = request.method, path = request.path;
	      cacheHandler = clientOptions.cacheHandler || this;
	      if (status === 304) {
	        ref = cacheHandler.get(method, path), data = ref.data, status = ref.status;
	      } else {
	        if (method === 'GET' && jqXHR.getResponseHeader('ETag')) {
	          eTag = jqXHR.getResponseHeader('ETag');
	          cacheHandler.add(method, path, eTag, data, jqXHR.status);
	        }
	      }
	      return {
	        data: data,
	        status: status
	      };
	    }
	  };

	  return CacheMiddleware;

	})());


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var CamelCase, plus;

	plus = __webpack_require__(4);

	module.exports = new (CamelCase = (function() {
	  function CamelCase() {}

	  CamelCase.prototype.responseMiddleware = function(arg) {
	    var data;
	    data = arg.data;
	    data = this.replace(data);
	    return {
	      data: data
	    };
	  };

	  CamelCase.prototype.replace = function(data) {
	    if (Array.isArray(data)) {
	      return this._replaceArray(data);
	    } else if (typeof data === 'function') {
	      return data;
	    } else if (data === Object(data)) {
	      return this._replaceObject(data);
	    } else {
	      return data;
	    }
	  };

	  CamelCase.prototype._replaceObject = function(orig) {
	    var acc, i, key, len, ref, value;
	    acc = {};
	    ref = Object.keys(orig);
	    for (i = 0, len = ref.length; i < len; i++) {
	      key = ref[i];
	      value = orig[key];
	      this._replaceKeyValue(acc, key, value);
	    }
	    return acc;
	  };

	  CamelCase.prototype._replaceArray = function(orig) {
	    var arr, i, item, key, len, ref, value;
	    arr = (function() {
	      var i, len, results;
	      results = [];
	      for (i = 0, len = orig.length; i < len; i++) {
	        item = orig[i];
	        results.push(this.replace(item));
	      }
	      return results;
	    }).call(this);
	    ref = Object.keys(orig);
	    for (i = 0, len = ref.length; i < len; i++) {
	      key = ref[i];
	      value = orig[key];
	      this._replaceKeyValue(arr, key, value);
	    }
	    return arr;
	  };

	  CamelCase.prototype._replaceKeyValue = function(acc, key, value) {
	    return acc[plus.camelize(key)] = this.replace(value);
	  };

	  return CamelCase;

	})());


/***/ }
/******/ ])
});
;
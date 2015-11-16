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

	/* WEBPACK VAR INJECTION */(function(global) {var Chainer, OBJECT_MATCHER, Octokat, Replacer, Request, TREE_OPTIONS, injectVerbMethods, parse, plus, reChainChildren, ref, toPromise;

	plus = __webpack_require__(2);

	ref = __webpack_require__(3), TREE_OPTIONS = ref.TREE_OPTIONS, OBJECT_MATCHER = ref.OBJECT_MATCHER;

	Chainer = __webpack_require__(4);

	injectVerbMethods = __webpack_require__(5);

	Replacer = __webpack_require__(13);

	Request = __webpack_require__(14);

	toPromise = __webpack_require__(6).toPromise;

	reChainChildren = function(request, url, obj) {
	  var context, i, k, key, len, re, ref1;
	  for (key in OBJECT_MATCHER) {
	    re = OBJECT_MATCHER[key];
	    if (re.test(obj.url)) {
	      context = TREE_OPTIONS;
	      ref1 = key.split('.');
	      for (i = 0, len = ref1.length; i < len; i++) {
	        k = ref1[i];
	        context = context[k];
	      }
	      Chainer(request, url, k, context, obj);
	    }
	  }
	  return obj;
	};

	parse = function(obj, path, request) {
	  var replacer, url;
	  url = obj.url || path;
	  if (url) {
	    replacer = new Replacer(request);
	    obj = replacer.replace(obj);
	    Chainer(request, url, true, {}, obj);
	    reChainChildren(request, url, obj);
	  } else {
	    Chainer(request, '', null, TREE_OPTIONS, obj);
	  }
	  return obj;
	};

	Octokat = function(clientOptions) {
	  var disableHypermedia, obj, request;
	  if (clientOptions == null) {
	    clientOptions = {};
	  }
	  disableHypermedia = clientOptions.disableHypermedia;
	  if (disableHypermedia == null) {
	    disableHypermedia = false;
	  }
	  request = function(method, path, data, options, cb) {
	    var _request, ref1, replacer;
	    if (options == null) {
	      options = {
	        raw: false,
	        isBase64: false,
	        isBoolean: false
	      };
	    }
	    replacer = new Replacer(request);
	    if (data && !(typeof global !== "undefined" && global !== null ? (ref1 = global['Buffer']) != null ? ref1.isBuffer(data) : void 0 : void 0)) {
	      data = replacer.uncamelize(data);
	    }
	    _request = Request(clientOptions);
	    return _request(method, path, data, options, function(err, val) {
	      var obj;
	      if (err) {
	        return cb(err);
	      }
	      if (options.raw) {
	        return cb(null, val);
	      }
	      if (!disableHypermedia) {
	        obj = parse(val, path, request);
	        return cb(null, obj);
	      } else {
	        return cb(null, val);
	      }
	    });
	  };
	  obj = {};
	  Chainer(request, '', null, TREE_OPTIONS, obj);
	  obj.me = obj.user;
	  obj.parse = function(jsonObj) {
	    return parse(jsonObj, '', request);
	  };
	  obj.fromUrl = function(path) {
	    var ret;
	    ret = {};
	    injectVerbMethods(request, path, ret);
	    return ret;
	  };
	  obj.status = toPromise(function(cb) {
	    return request('GET', 'https://status.github.com/api/status.json', null, null, cb);
	  });
	  obj.status.api = toPromise(function(cb) {
	    return request('GET', 'https://status.github.com/api.json', null, null, cb);
	  });
	  obj.status.lastMessage = toPromise(function(cb) {
	    return request('GET', 'https://status.github.com/api/last-message.json', null, null, cb);
	  });
	  obj.status.messages = toPromise(function(cb) {
	    return request('GET', 'https://status.github.com/api/messages.json', null, null, cb);
	  });
	  return obj;
	};

	module.exports = Octokat;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
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
	  }
	};

	module.exports = plus;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var DEFAULT_HEADER, OBJECT_MATCHER, PREVIEW_HEADERS, TREE_OPTIONS, URL_VALIDATOR;

	URL_VALIDATOR = /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/(zen|octocat|users|organizations|issues|gists|emojis|markdown|meta|rate_limit|feeds|events|notifications|notifications\/threads(\/[^\/]+)|notifications\/threads(\/[^\/]+)\/subscription|gitignore\/templates(\/[^\/]+)?|user|user\/(repos|orgs|followers|following(\/[^\/]+)?|emails(\/[^\/]+)?|issues|starred|starred(\/[^\/]+){2}|teams)|orgs\/[^\/]+|orgs\/[^\/]+\/(repos|issues|members|events|teams)|teams\/[^\/]+|teams\/[^\/]+\/(members(\/[^\/]+)?|memberships\/[^\/]+|repos|repos(\/[^\/]+){2})|users\/[^\/]+|users\/[^\/]+\/(repos|orgs|gists|followers|following(\/[^\/]+){0,2}|keys|starred|received_events(\/public)?|events(\/public)?|events\/orgs\/[^\/]+)|search\/(repositories|issues|users|code)|gists\/(public|starred|([a-f0-9]{20}|[0-9]+)|([a-f0-9]{20}|[0-9]+)\/forks|([a-f0-9]{20}|[0-9]+)\/comments(\/[0-9]+)?|([a-f0-9]{20}|[0-9]+)\/star)|repos(\/[^\/]+){2}|repos(\/[^\/]+){2}\/(readme|tarball(\/[^\/]+)?|zipball(\/[^\/]+)?|compare\/([^\.{3}]+)\.{3}([^\.{3}]+)|deployments(\/[0-9]+)?|deployments\/[0-9]+\/statuses(\/[0-9]+)?|hooks|hooks\/[^\/]+|hooks\/[^\/]+\/tests|hooks\/[^\/]+\/pings|assignees|languages|teams|tags|branches(\/[^\/]+){0,2}|contributors|subscribers|subscription|stargazers|comments(\/[0-9]+)?|downloads(\/[0-9]+)?|forks|milestones|milestones\/[0-9]+|milestones\/[0-9]+\/labels|labels(\/[^\/]+)?|releases|releases\/([0-9]+)|releases\/([0-9]+)\/assets|releases\/latest|releases\/tags\/([^\/]+)|releases\/assets\/([0-9]+)|events|notifications|merges|statuses\/[^\/]+|pages|pages\/builds|pages\/builds\/latest|commits|commits\/[^\/]+|commits\/[^\/]+\/(comments|status|statuses)?|contents\/|contents(\/[^\/]+)*|collaborators(\/[^\/]+)?|(issues|pulls)|(issues|pulls)\/(events|events\/[0-9]+|comments(\/[0-9]+)?|[0-9]+|[0-9]+\/events|[0-9]+\/comments|[0-9]+\/labels(\/[^\/]+)?)|pulls\/[0-9]+\/(files|commits|merge)|git\/(refs|refs\/(.+|heads(\/[^\/]+)?|tags(\/[^\/]+)?)|trees(\/[^\/]+)?|blobs(\/[a-f0-9]{40}$)?|commits(\/[a-f0-9]{40}$)?)|stats\/(contributors|commit_activity|code_frequency|participation|punch_card))|licenses|licenses\/([^\/]+)|authorizations|authorizations\/((\d+)|clients\/([^\/]{20})|clients\/([^\/]{20})\/([^\/]+))|applications\/([^\/]{20})\/tokens|applications\/([^\/]{20})\/tokens\/([^\/]+)|enterprise\/(settings\/license|stats\/(issues|hooks|milestones|orgs|comments|pages|users|gists|pulls|repos|all))|staff\/indexing_jobs|users\/[^\/]+\/(site_admin|suspended)|setup\/api\/(start|upgrade|configcheck|configure|settings(authorized-keys)?|maintenance))$/;

	TREE_OPTIONS = {
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
	      'tests': false,
	      'pings': false
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

	OBJECT_MATCHER = {
	  'repos': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+$/,
	  'gists': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/gists\/[^\/]+$/,
	  'issues': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/(issues|pulls)[^\/]+$/,
	  'users': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/[^\/]+$/,
	  'orgs': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/orgs\/[^\/]+$/,
	  'repos.comments': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/comments\/[^\/]+$/
	};

	PREVIEW_HEADERS = {
	  'application/vnd.github.drax-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/licenses|\/licenses\/([^\/]+)|\/repos\/([^\/]+)\/([^\/]+))$/,
	  'application/vnd.github.v3.star+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/([^\/]+)\/starred$/,
	  'application/vnd.github.mirage-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/authorizations|\/authorizations\/clients\/([^\/]{20})|\/authorizations\/clients\/([^\/]{20})\/([^\/]+)|\/authorizations\/([\d]+)|\/applications\/([^\/]{20})\/tokens|\/applications\/([^\/]{20})\/tokens\/([^\/]+))$/
	};

	DEFAULT_HEADER = function(url) {
	  var key, val;
	  for (key in PREVIEW_HEADERS) {
	    val = PREVIEW_HEADERS[key];
	    if (val.test(url)) {
	      return key;
	    }
	  }
	  return 'application/vnd.github.v3+json';
	};

	module.exports = {
	  URL_VALIDATOR: URL_VALIDATOR,
	  TREE_OPTIONS: TREE_OPTIONS,
	  OBJECT_MATCHER: OBJECT_MATCHER,
	  DEFAULT_HEADER: DEFAULT_HEADER
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Chainer, injectVerbMethods, plus,
	  slice = [].slice;

	plus = __webpack_require__(2);

	injectVerbMethods = __webpack_require__(5);

	Chainer = function(request, path, name, contextTree, fn) {
	  var fn1;
	  if (fn == null) {
	    fn = function() {
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
	      return Chainer(request, path + "/" + (args.join(separator)), name, contextTree);
	    };
	  }
	  injectVerbMethods(request, path, fn);
	  if (typeof fn === 'function' || typeof fn === 'object') {
	    fn1 = function(name) {
	      delete fn[plus.camelize(name)];
	      return Object.defineProperty(fn, plus.camelize(name), {
	        configurable: true,
	        enumerable: true,
	        get: function() {
	          return Chainer(request, path + "/" + name, name, contextTree[name]);
	        }
	      });
	    };
	    for (name in contextTree || {}) {
	      fn1(name);
	    }
	  }
	  return fn;
	};

	module.exports = Chainer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var URL_TESTER, URL_VALIDATOR, injectVerbMethods, toPromise, toQueryString,
	  slice = [].slice;

	URL_VALIDATOR = __webpack_require__(3).URL_VALIDATOR;

	toPromise = __webpack_require__(6).toPromise;

	toQueryString = __webpack_require__(12);

	URL_TESTER = function(path) {
	  var err;
	  if (!URL_VALIDATOR.test(path)) {
	    err = "BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=" + path;
	    return console.warn(err);
	  }
	};

	injectVerbMethods = function(request, path, obj) {
	  var results, verbFunc, verbName, verbs;
	  verbs = {
	    fetch: function(cb, config) {
	      return request('GET', "" + path + (toQueryString(config)), null, {}, cb);
	    },
	    read: function(cb, config) {
	      return request('GET', "" + path + (toQueryString(config)), null, {
	        raw: true
	      }, cb);
	    },
	    readBinary: function(cb, config) {
	      return request('GET', "" + path + (toQueryString(config)), null, {
	        raw: true,
	        isBase64: true
	      }, cb);
	    },
	    remove: function(cb, config) {
	      return request('DELETE', path, config, {
	        isBoolean: true
	      }, cb);
	    },
	    create: function(cb, config, isRaw) {
	      return request('POST', path, config, {
	        raw: isRaw
	      }, cb);
	    },
	    update: function(cb, config) {
	      return request('PATCH', path, config, null, cb);
	    },
	    add: function(cb, config) {
	      return request('PUT', path, config, {
	        isBoolean: true
	      }, cb);
	    },
	    contains: function() {
	      var args, cb;
	      cb = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      return request('GET', path + "/" + (args.join('/')), null, {
	        isBoolean: true
	      }, cb);
	    }
	  };
	  results = [];
	  for (verbName in verbs) {
	    verbFunc = verbs[verbName];
	    results.push((function(verbName, verbFunc) {
	      return obj[verbName] = function() {
	        var args;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        URL_TESTER(path);
	        return toPromise(verbFunc).apply(null, args);
	      };
	    })(verbName, verbFunc));
	  }
	  return results;
	};

	module.exports = injectVerbMethods;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var require;var Promise, allPromises, injector, newPromise, ref, req, toPromise,
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
	  } else if (window.Promise) {
	    newPromise = (function(_this) {
	      return function(fn) {
	        return new window.Promise(function(resolve, reject) {
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
	        return window.Promise.all(promises);
	      };
	    })(this);
	  } else {
	    if (typeof console !== "undefined" && console !== null) {
	      if (typeof console.warn === "function") {
	        console.warn('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise');
	      }
	    }
	  }
	} else {
	  req = require;
	  Promise = this.Promise || __webpack_require__(7).Promise;
	  newPromise = function(fn) {
	    return new Promise(fn);
	  };
	  allPromises = function(promises) {
	    return Promise.all(promises);
	  };
	}

	toPromise = function(orig) {
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

	module.exports = {
	  newPromise: newPromise,
	  allPromises: allPromises,
	  toPromise: toPromise
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(10);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(11)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), (function() { return this; }()), __webpack_require__(9)(module)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 12 */
/***/ function(module, exports) {

	var toQueryString;

	toQueryString = function(options) {
	  var key, params, ref, value;
	  if (!options || options === {}) {
	    return '';
	  }
	  params = [];
	  ref = options || {};
	  for (key in ref) {
	    value = ref[key];
	    params.push(key + "=" + (encodeURIComponent(value)));
	  }
	  return "?" + (params.join('&'));
	};

	module.exports = toQueryString;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Chainer, OBJECT_MATCHER, Replacer, TREE_OPTIONS, plus, ref, toPromise, toQueryString,
	  slice = [].slice;

	plus = __webpack_require__(2);

	toPromise = __webpack_require__(6).toPromise;

	toQueryString = __webpack_require__(12);

	ref = __webpack_require__(3), TREE_OPTIONS = ref.TREE_OPTIONS, OBJECT_MATCHER = ref.OBJECT_MATCHER;

	Chainer = __webpack_require__(4);

	Replacer = (function() {
	  function Replacer(_request) {
	    this._request = _request;
	  }

	  Replacer.prototype.uncamelize = function(obj) {
	    var i, j, key, len, o, ref1, value;
	    if (Array.isArray(obj)) {
	      return (function() {
	        var j, len, results;
	        results = [];
	        for (j = 0, len = obj.length; j < len; j++) {
	          i = obj[j];
	          results.push(this.uncamelize(i));
	        }
	        return results;
	      }).call(this);
	    } else if (obj === Object(obj)) {
	      o = {};
	      ref1 = Object.keys(obj);
	      for (j = 0, len = ref1.length; j < len; j++) {
	        key = ref1[j];
	        value = obj[key];
	        o[plus.uncamelize(key)] = this.uncamelize(value);
	      }
	      return o;
	    } else {
	      return obj;
	    }
	  };

	  Replacer.prototype.replace = function(o) {
	    if (Array.isArray(o)) {
	      return this._replaceArray(o);
	    } else if (o === Object(o)) {
	      return this._replaceObject(o);
	    } else {
	      return o;
	    }
	  };

	  Replacer.prototype._replaceObject = function(orig) {
	    var acc, context, j, k, key, l, len, len1, len2, n, re, ref1, ref2, ref3, url, value;
	    acc = {};
	    ref1 = Object.keys(orig);
	    for (j = 0, len = ref1.length; j < len; j++) {
	      key = ref1[j];
	      value = orig[key];
	      this._replaceKeyValue(acc, key, value);
	    }
	    url = acc.url;
	    if (url) {
	      Chainer(this._request, url, true, null, acc);
	    }
	    ref2 = Object.keys(OBJECT_MATCHER);
	    for (l = 0, len1 = ref2.length; l < len1; l++) {
	      key = ref2[l];
	      re = OBJECT_MATCHER[key];
	      if (re.test(url)) {
	        context = TREE_OPTIONS;
	        ref3 = key.split('.');
	        for (n = 0, len2 = ref3.length; n < len2; n++) {
	          k = ref3[n];
	          context = context[k];
	        }
	        Chainer(this._request, url, k, context, acc);
	      }
	    }
	    return acc;
	  };

	  Replacer.prototype._replaceArray = function(orig) {
	    var arr, item, j, key, len, ref1, value;
	    arr = (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = orig.length; j < len; j++) {
	        item = orig[j];
	        results.push(this.replace(item));
	      }
	      return results;
	    }).call(this);
	    ref1 = Object.keys(orig);
	    for (j = 0, len = ref1.length; j < len; j++) {
	      key = ref1[j];
	      value = orig[key];
	      this._replaceKeyValue(arr, key, value);
	    }
	    return arr;
	  };

	  Replacer.prototype._replaceKeyValue = function(acc, key, value) {
	    var fn, newKey;
	    if (/_url$/.test(key)) {
	      fn = (function(_this) {
	        return function() {
	          var args, cb, contentType, data, i, j, len, m, match, optionalNames, param, paramName, ref1, ref2, url;
	          cb = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	          if (!(/\{/.test(value) || /_page_url$/.test(key))) {
	            console.warn('Deprecation warning: Use the .fooUrl field instead of calling the method');
	          }
	          url = value;
	          i = 0;
	          while (m = /(\{[^\}]+\})/.exec(url)) {
	            match = m[1];
	            if (i < args.length) {
	              param = args[i];
	              switch (match[1]) {
	                case '/':
	                  param = "/" + param;
	                  break;
	                case '?':
	                  optionalNames = match.slice(2, -1).split(',');
	                  if (typeof param === 'object') {
	                    if (Object.keys(param).length === 0) {
	                      console.warn('Must pass in a dictionary with at least one key when there are multiple optional params');
	                    }
	                    ref1 = Object.keys(param);
	                    for (j = 0, len = ref1.length; j < len; j++) {
	                      paramName = ref1[j];
	                      if (optionalNames.indexOf(paramName) < 0) {
	                        console.warn("Invalid parameter '" + paramName + "' passed in as argument");
	                      }
	                    }
	                    param = toQueryString(param);
	                  } else {
	                    param = "?" + optionalNames[0] + "=" + param;
	                  }
	              }
	            } else {
	              param = '';
	              if (match[1] !== '/') {
	                throw new Error("BUG: Missing required parameter " + match);
	              }
	            }
	            url = url.replace(match, param);
	            i++;
	          }
	          if (/upload_url$/.test(key)) {
	            ref2 = args.slice(-2), contentType = ref2[0], data = ref2[1];
	            return _this._request('POST', url, data, {
	              contentType: contentType,
	              raw: true
	            }, cb);
	          } else {
	            return _this._request('GET', url, null, null, cb);
	          }
	        };
	      })(this);
	      fn = toPromise(fn);
	      fn.url = value;
	      newKey = key.substring(0, key.length - '_url'.length);
	      acc[plus.camelize(newKey)] = fn;
	      if (!/\{/.test(value)) {
	        return acc[plus.camelize(key)] = value;
	      }
	    } else if (/_at$/.test(key)) {
	      return acc[plus.camelize(key)] = value ? new Date(value) : null;
	    } else {
	      return acc[plus.camelize(key)] = this.replace(value);
	    }
	  };

	  return Replacer;

	})();

	module.exports = Replacer;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var require;var DEFAULT_CACHE_HANDLER, DEFAULT_HEADER, ETagResponse, Request, _cachedETags, ajax, base64encode, userAgent;

	base64encode = __webpack_require__(15);

	DEFAULT_HEADER = __webpack_require__(3).DEFAULT_HEADER;

	if (typeof window === "undefined" || window === null) {
	  userAgent = 'octokat.js';
	}

	ajax = function(options, cb) {
	  var XMLHttpRequest, name, ref, req, value, xhr;
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

	ETagResponse = (function() {
	  function ETagResponse(eTag1, data1, status1) {
	    this.eTag = eTag1;
	    this.data = data1;
	    this.status = status1;
	  }

	  return ETagResponse;

	})();

	_cachedETags = {};

	DEFAULT_CACHE_HANDLER = {
	  get: function(method, path) {
	    return _cachedETags[method + " " + path];
	  },
	  add: function(method, path, eTag, data, status) {
	    return _cachedETags[method + " " + path] = new ETagResponse(eTag, data, status);
	  }
	};

	Request = function(clientOptions) {
	  var cacheHandler, emitter;
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
	  cacheHandler = clientOptions.cacheHandler || DEFAULT_CACHE_HANDLER;
	  return function(method, path, data, options, cb) {
	    var ajaxConfig, auth, headers, mimeType;
	    if (options == null) {
	      options = {
	        raw: false,
	        isBase64: false,
	        isBoolean: false,
	        contentType: 'application/json'
	      };
	    }
	    if (options == null) {
	      options = {};
	    }
	    if (options.raw == null) {
	      options.raw = false;
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
	    if (method === 'PATCH' && clientOptions.usePostInsteadOfPatch) {
	      method = 'POST';
	    }
	    if (!/^http/.test(path)) {
	      path = "" + clientOptions.rootURL + path;
	    }
	    mimeType = void 0;
	    if (options.isBase64) {
	      mimeType = 'text/plain; charset=x-user-defined';
	    }
	    headers = {
	      'Accept': clientOptions.acceptHeader || DEFAULT_HEADER(path)
	    };
	    if (options.raw) {
	      headers['Accept'] = 'application/vnd.github.raw';
	    }
	    if (userAgent) {
	      headers['User-Agent'] = userAgent;
	    }
	    if (cacheHandler.get(method, path)) {
	      headers['If-None-Match'] = cacheHandler.get(method, path).eTag;
	    }
	    if (clientOptions.token || (clientOptions.username && clientOptions.password)) {
	      if (clientOptions.token) {
	        auth = "token " + clientOptions.token;
	      } else {
	        auth = 'Basic ' + base64encode(clientOptions.username + ":" + clientOptions.password);
	      }
	      headers['Authorization'] = auth;
	    }
	    ajaxConfig = {
	      url: path,
	      type: method,
	      contentType: options.contentType,
	      mimeType: mimeType,
	      headers: headers,
	      processData: false,
	      data: !options.raw && data && JSON.stringify(data) || data,
	      dataType: !options.raw ? 'json' : void 0
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
	      var converted, discard, eTag, eTagResponse, emitterRate, href, i, j, jqXHR, json, k, len, links, part, rateLimit, rateLimitRemaining, rateLimitReset, ref, ref1, ref2, rel;
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
	        if (jqXHR.status === 304) {
	          if (clientOptions.useETags && cacheHandler.get(method, path)) {
	            eTagResponse = cacheHandler.get(method, path);
	            return cb(null, eTagResponse.data, eTagResponse.status, jqXHR);
	          } else {
	            return cb(null, jqXHR.responseText, jqXHR.status, jqXHR);
	          }
	        } else if (jqXHR.status === 302) {
	          return cb(null, jqXHR.getResponseHeader('Location'));
	        } else if (!(jqXHR.status === 204 && options.isBoolean)) {
	          if (jqXHR.responseText && ajaxConfig.dataType === 'json') {
	            data = JSON.parse(jqXHR.responseText);
	            links = jqXHR.getResponseHeader('Link');
	            ref = (links != null ? links.split(',') : void 0) || [];
	            for (j = 0, len = ref.length; j < len; j++) {
	              part = ref[j];
	              ref1 = part.match(/<([^>]+)>;\ rel="([^"]+)"/), discard = ref1[0], href = ref1[1], rel = ref1[2];
	              data[rel + "_page_url"] = href;
	            }
	          } else {
	            data = jqXHR.responseText;
	          }
	          if (method === 'GET' && options.isBase64) {
	            converted = '';
	            for (i = k = 0, ref2 = data.length; 0 <= ref2 ? k < ref2 : k > ref2; i = 0 <= ref2 ? ++k : --k) {
	              converted += String.fromCharCode(data.charCodeAt(i) & 0xff);
	            }
	            data = converted;
	          }
	          if (method === 'GET' && jqXHR.getResponseHeader('ETag') && clientOptions.useETags) {
	            eTag = jqXHR.getResponseHeader('ETag');
	            cacheHandler.add(method, path, eTag, data, jqXHR.status);
	          }
	          return cb(null, data, jqXHR.status, jqXHR);
	        }
	      } else {
	        if (options.isBoolean && jqXHR.status === 404) {

	        } else {
	          err = new Error(jqXHR.responseText);
	          err.status = jqXHR.status;
	          if (jqXHR.getResponseHeader('Content-Type') === 'application/json; charset=utf-8') {
	            if (jqXHR.responseText) {
	              json = JSON.parse(jqXHR.responseText);
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
	};

	module.exports = Request;


/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var x;
	if (typeof window !== 'undefined') {
	  x = window.XMLHTTPRequest;
	} else {
	  x = __webpack_require__(16);
	}

	module.exports = x;


/***/ }
/******/ ])
});
;
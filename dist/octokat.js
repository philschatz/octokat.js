(function(globals) {
var define, requireModule;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function(name) {
    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    var mod = registry[name];
    if (!mod) {
      throw new Error("Module '" + name + "' not found.");
    }

    var deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(deps[i]));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;
  };
})();

define("./chainer", 
  ["./grammar","./plus","./helper-promise","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var URL_VALIDATOR = __dependency1__.URL_VALIDATOR;
    var plus = __dependency2__["default"];
    var toPromise = __dependency3__.toPromise;
    var Chainer, URL_TESTER, toQueryString,
      __slice = [].slice;

    toQueryString = function(options) {
      var key, params, value, _ref;
      if (!options || options === {}) {
        return '';
      }
      params = [];
      _ref = options || {};
      for (key in _ref) {
        value = _ref[key];
        params.push("" + key + "=" + (encodeURIComponent(value)));
      }
      return "?" + (params.join('&'));
    };

    URL_TESTER = function(path) {
      var err;
      if (!URL_VALIDATOR.test(path)) {
        err = "BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=" + path;
        return console.warn(err);
      }
    };

    Chainer = function(request, _path, name, contextTree, fn) {
      var verbFunc, verbName, verbs, _fn;
      if (fn == null) {
        fn = function() {
          var args, separator;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (!args.length) {
            throw new Error('BUG! must be called with at least one argument');
          }
          if (name === 'compare') {
            separator = '...';
          } else {
            separator = '/';
          }
          return Chainer(request, "" + _path + "/" + (args.join(separator)), name, contextTree);
        };
      }
      verbs = {
        fetch: function(cb, config) {
          URL_TESTER(_path);
          return request('GET', "" + _path + (toQueryString(config)), null, {}, cb);
        },
        read: function(cb, config) {
          URL_TESTER(_path);
          return request('GET', "" + _path + (toQueryString(config)), null, {
            raw: true
          }, cb);
        },
        readBinary: function(cb, config) {
          URL_TESTER(_path);
          return request('GET', "" + _path + (toQueryString(config)), null, {
            raw: true,
            isBase64: true
          }, cb);
        },
        remove: function(cb, config) {
          URL_TESTER(_path);
          return request('DELETE', _path, config, {
            isBoolean: true
          }, cb);
        },
        create: function(cb, config, isRaw) {
          URL_TESTER(_path);
          return request('POST', _path, config, {
            raw: isRaw
          }, cb);
        },
        update: function(cb, config) {
          URL_TESTER(_path);
          return request('PATCH', _path, config, null, cb);
        },
        add: function(cb, config) {
          URL_TESTER(_path);
          return request('PUT', _path, config, {
            isBoolean: true
          }, cb);
        },
        contains: function() {
          var args, cb;
          cb = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          URL_TESTER(_path);
          return request('GET', "" + _path + "/" + (args.join('/')), null, {
            isBoolean: true
          }, cb);
        }
      };
      if (name) {
        for (verbName in verbs) {
          verbFunc = verbs[verbName];
          fn[verbName] = toPromise(verbFunc);
        }
      }
      _fn = function(name) {
        return fn.__defineGetter__(plus.camelize(name), function() {
          return Chainer(request, "" + _path + "/" + name, name, contextTree[name]);
        });
      };
      for (name in contextTree || {}) {
        _fn(name);
      }
      return fn;
    };

    __exports__["default"] = Chainer;
  });
define("./grammar", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var OBJECT_MATCHER, TREE_OPTIONS, URL_VALIDATOR;

    URL_VALIDATOR = /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/(zen|octocat|users|issues|gists|emojis|meta|rate_limit|feeds|events|gitignore\/templates(\/[^\/]+)?|user|user\/(repos|orgs|followers|following(\/[^\/]+)?|emails(\/[^\/]+)?|issues|starred(\/[^\/]+){0,2})|orgs\/[^\/]+|orgs\/[^\/]+\/(repos|issues|members|events)|users\/[^\/]+|users\/[^\/]+\/(repos|orgs|gists|followers|following(\/[^\/]+){0,2}|keys|received_events(\/public)?|events(\/public)?|events\/orgs\/[^\/]+)|search\/(repositories|issues|users|code)|gists\/(public|starred|([a-f0-9]{20}|[0-9]+)|([a-f0-9]{20}|[0-9]+)\/forks|([a-f0-9]{20}|[0-9]+)\/comments(\/[0-9]+)?|([a-f0-9]{20}|[0-9]+)\/star)|repos(\/[^\/]+){2}|repos(\/[^\/]+){2}\/(readme|tarball(\/[^\/]+)?|zipball(\/[^\/]+)?|compare\/[a-f0-9]{40}\.{3}[a-f0-9]{40}|deployments|deployments\/[0-9]+\/statuses([0-9]+)?|hooks|hooks\/[^\/]+|hooks\/[^\/]+\/tests|assignees|languages|branches|contributors|subscribers|subscription|comments(\/[0-9]+)?|downloads(\/[0-9]+)?|milestones|labels|releases|events|merges|pages|pages\/builds|pages\/builds\/latest|commits|commits\/[a-f0-9]{40}|commits\/[a-f0-9]{40}\/comments|contents(\/[^\/]+)*|collaborators(\/[^\/]+)?|(issues|pulls)|(issues|pulls)\/(|events|events\/[0-9]+|comments(\/[0-9]+)?|[0-9]+|[0-9]+\/events|[0-9]+\/comments)|pulls\/[0-9]+\/(files|commits)|git\/(refs|refs\/heads(\/[^\/]+)?|trees(\/[^\/]+)?|blobs(\/[a-f0-9]{40}$)?|commits(\/[a-f0-9]{40}$)?)|stats\/(contributors|commit_activity|code_frequency|participation|punch_card)))$/;

    TREE_OPTIONS = {
      'zen': false,
      'octocat': false,
      'issues': false,
      'emojis': false,
      'meta': false,
      'rate_limit': false,
      'feeds': false,
      'events': false,
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
        'starred': false
      },
      'orgs': {
        'repos': false,
        'issues': false,
        'members': false,
        'events': false
      },
      'users': {
        'repos': false,
        'orgs': false,
        'gists': false,
        'followers': false,
        'following': false,
        'keys': false,
        'received_events': {
          'public': false
        },
        'events': {
          'public': false,
          'orgs': false
        }
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
        'branches': false,
        'contributors': false,
        'subscribers': false,
        'subscription': false,
        'comments': false,
        'downloads': false,
        'milestones': false,
        'labels': false,
        'releases': false,
        'events': false,
        'merges': false,
        'pulls': {
          'merge': false,
          'comments': false,
          'commits': false,
          'files': false
        },
        'pages': {
          'builds': {
            'latest': false
          }
        },
        'commits': {
          'comments': false
        },
        'contents': false,
        'collaborators': false,
        'issues': {
          'events': false,
          'comments': false
        },
        'git': {
          'refs': {
            'heads': false
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

    __exports__.URL_VALIDATOR = URL_VALIDATOR;
    __exports__.TREE_OPTIONS = TREE_OPTIONS;
    __exports__.OBJECT_MATCHER = OBJECT_MATCHER;
  });
define("./helper-base64", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var base64encode;

    if (typeof Buffer !== "undefined" && Buffer !== null) {
      base64encode = function(str) {
        var buffer;
        buffer = new Buffer(str, 'binary');
        return buffer.toString('base64');
      };
    } else {
      if (!this.btoa) {
        throw new Error('Native btoa function is missing');
      }
      base64encode = this.btoa;
    }

    __exports__["default"] = base64encode;
  });
define("./helper-promise", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Promise, allPromises, injector, newPromise, req, toPromise, _ref,
      _this = this,
      __slice = [].slice;

    if (typeof window !== "undefined" && window !== null) {
      if (this.Q) {
        newPromise = function(fn) {
          var deferred, reject, resolve;
          deferred = _this.Q.defer();
          resolve = function(val) {
            return deferred.resolve(val);
          };
          reject = function(err) {
            return deferred.reject(err);
          };
          fn(resolve, reject);
          return deferred.promise;
        };
        allPromises = function(promises) {
          return this.Q.all(promises);
        };
      } else if (this.angular) {
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
      } else if ((_ref = this.jQuery) != null ? _ref.Deferred : void 0) {
        newPromise = function(fn) {
          var promise, reject, resolve;
          promise = _this.jQuery.Deferred();
          resolve = function(val) {
            return promise.resolve(val);
          };
          reject = function(val) {
            return promise.reject(val);
          };
          fn(resolve, reject);
          return promise.promise();
        };
        allPromises = function(promises) {
          var _ref1;
          return (_ref1 = _this.jQuery).when.apply(_ref1, promises).then(function() {
            var promises;
            promises = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return promises;
          });
        };
      } else if (this.Promise) {
        newPromise = function(fn) {
          return new _this.Promise(function(resolve, reject) {
            if (resolve.fulfill) {
              return fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve));
            } else {
              return fn.apply(null, arguments);
            }
          });
        };
        allPromises = function(promises) {
          return _this.Promise.all(promises);
        };
      } else {
        if (typeof console !== "undefined" && console !== null) {
          if (typeof console.warn === "function") {
            console.warn('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise');
          }
        }
      }
    } else {
      req = require;
      Promise = this.Promise || req('es6-promise').Promise;
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
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        last = args[args.length - 1];
        if (typeof last === 'function') {
          args.pop();
          return orig.apply(null, [last].concat(__slice.call(args)));
        } else if (newPromise) {
          return newPromise(function(resolve, reject) {
            var cb;
            cb = function(err, val) {
              if (err) {
                return reject(err);
              }
              return resolve(val);
            };
            return orig.apply(null, [cb].concat(__slice.call(args)));
          });
        } else {
          throw new Error('You must specify a callback or have a promise library loaded');
        }
      };
    };

    __exports__.newPromise = newPromise;
    __exports__.allPromises = allPromises;
    __exports__.toPromise = toPromise;
  });
define("./octokat", 
  ["./plus","./grammar","./chainer","./replacer","./request","./helper-promise","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __exports__) {
    "use strict";
    var plus = __dependency1__["default"];
    var TREE_OPTIONS = __dependency2__.TREE_OPTIONS;
    var OBJECT_MATCHER = __dependency2__.OBJECT_MATCHER;
    var Chainer = __dependency3__["default"];
    var Replacer = __dependency4__["default"];
    var Request = __dependency5__["default"];
    var toPromise = __dependency6__.toPromise;
    var Octokat;

    Octokat = function(clientOptions) {
      var obj, path, request, _request;
      if (clientOptions == null) {
        clientOptions = {};
      }
      _request = Request(clientOptions);
      request = function(method, path, data, options, cb) {
        var replacer;
        if (options == null) {
          options = {
            raw: false,
            isBase64: false,
            isBoolean: false
          };
        }
        replacer = new Replacer(request);
        if (data) {
          data = replacer.uncamelize(data);
        }
        return _request(method, path, data, options, function(err, val) {
          var context, k, key, obj, re, url, _i, _len, _ref;
          if (err) {
            return cb(err);
          }
          if (options.raw) {
            return cb(null, val);
          }
          obj = replacer.replace(val);
          url = obj.url || path;
          for (key in OBJECT_MATCHER) {
            re = OBJECT_MATCHER[key];
            if (re.test(url)) {
              context = TREE_OPTIONS;
              _ref = key.split('.');
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                k = _ref[_i];
                context = context[k];
              }
              Chainer(request, url, k, context, obj);
            }
          }
          return cb(null, obj);
        });
      };
      path = '';
      obj = {};
      Chainer(request, path, null, TREE_OPTIONS, obj);
      obj.me = obj.user;
      delete obj.user;
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

    __exports__["default"] = Octokat;
  });
define("./plus", 
  ["exports"],
  function(__exports__) {
    "use strict";
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

    __exports__["default"] = plus;
  });
define("./replacer", 
  ["./plus","./helper-promise","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var plus = __dependency1__["default"];
    var toPromise = __dependency2__.toPromise;
    var Replacer,
      __slice = [].slice;

    Replacer = (function() {
      function Replacer(_request) {
        this._request = _request;
      }

      Replacer.prototype.uncamelize = function(obj) {
        var i, key, o, value;
        if (Array.isArray(obj)) {
          return (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = obj.length; _i < _len; _i++) {
              i = obj[_i];
              _results.push(this.uncamelize(i));
            }
            return _results;
          }).call(this);
        } else if (obj === Object(obj)) {
          o = {};
          for (key in obj) {
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
        var acc, key, value;
        acc = {};
        for (key in orig) {
          value = orig[key];
          this._replaceKeyValue(acc, key, value);
        }
        return acc;
      };

      Replacer.prototype._replaceArray = function(orig) {
        var arr, item, key, value;
        arr = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = orig.length; _i < _len; _i++) {
            item = orig[_i];
            _results.push(this.replace(item));
          }
          return _results;
        }).call(this);
        for (key in orig) {
          value = orig[key];
          if (typeof key === 'string') {
            this._replaceKeyValue(arr, key, value);
          }
        }
        return arr;
      };

      Replacer.prototype._replaceKeyValue = function(acc, key, value) {
        var fn, newKey,
          _this = this;
        if (/_url$/.test(key)) {
          fn = function() {
            var args, cb, i, m, match, param;
            cb = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            i = 0;
            while (m = /(\{[^\}]+\})/.exec(value)) {
              match = m[1];
              if (i < args.length) {
                param = args[i];
                if (match[1] === '/') {
                  param = "/" + param;
                }
              } else {
                param = '';
                if (match[1] !== '/') {
                  throw new Error("BUG: Missing required parameter " + match);
                }
              }
              value = value.replace(match, param);
              i++;
            }
            return _this._request('GET', value, null, null, cb);
          };
          fn = toPromise(fn);
          fn.url = value;
          newKey = key.substring(0, key.length - '_url'.length);
          return acc[plus.camelize(newKey)] = fn;
        } else if (/_at$/.test(key)) {
          return acc[plus.camelize(key)] = new Date(value);
        } else {
          return acc[plus.camelize(key)] = this.replace(value);
        }
      };

      return Replacer;

    })();

    __exports__["default"] = Replacer;
  });
define("./request", 
  ["./helper-base64","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var base64encode = __dependency1__["default"];
    var ETagResponse, Request, ajax, userAgent;

    if (typeof window === "undefined" || window === null) {
      userAgent = 'octokat.js';
    }

    ajax = function(options, cb) {
      var XMLHttpRequest, name, req, value, xhr, _ref;
      if (typeof window !== "undefined" && window !== null) {
        XMLHttpRequest = window.XMLHttpRequest;
      } else {
        req = require;
        XMLHttpRequest = req('xmlhttprequest').XMLHttpRequest;
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
      _ref = options.headers;
      for (name in _ref) {
        value = _ref[name];
        xhr.setRequestHeader(name, value);
      }
      xhr.onreadystatechange = function() {
        var _name, _ref1;
        if (4 === xhr.readyState) {
          if ((_ref1 = options.statusCode) != null) {
            if (typeof _ref1[_name = xhr.status] === "function") {
              _ref1[_name]();
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
      function ETagResponse(eTag, data, status) {
        this.eTag = eTag;
        this.data = data;
        this.status = status;
      }

      return ETagResponse;

    })();

    Request = function(clientOptions) {
      var _cachedETags, _listeners;
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
      _listeners = [];
      _cachedETags = {};
      return function(method, path, data, options, cb) {
        var ajaxConfig, auth, headers, mimeType,
          _this = this;
        if (options == null) {
          options = {
            raw: false,
            isBase64: false,
            isBoolean: false
          };
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
          'Accept': 'application/vnd.github.v3+json'
        };
        if (options.raw) {
          headers['Accept'] = 'application/vnd.github.raw';
        }
        if (userAgent) {
          headers['User-Agent'] = userAgent;
        }
        if (("" + method + " " + path) in _cachedETags) {
          headers['If-None-Match'] = _cachedETags["" + method + " " + path].eTag;
        } else {
          headers['If-Modified-Since'] = 'Thu, 01 Jan 1970 00:00:00 GMT';
        }
        if (clientOptions.token || (clientOptions.username && clientOptions.password)) {
          if (clientOptions.token) {
            auth = "token " + clientOptions.token;
          } else {
            auth = 'Basic ' + base64encode("" + clientOptions.username + ":" + clientOptions.password);
          }
          headers['Authorization'] = auth;
        }
        ajaxConfig = {
          url: path,
          type: method,
          contentType: 'application/json',
          mimeType: mimeType,
          headers: headers,
          processData: false,
          data: !options.raw && data && JSON.stringify(data) || data,
          dataType: !options.raw ? 'json' : void 0
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
        return ajax(ajaxConfig, function(err, val) {
          var converted, discard, eTag, eTagResponse, href, i, jqXHR, json, links, listener, part, rateLimit, rateLimitRemaining, rel, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2;
          jqXHR = err || val;
          rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'));
          rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'));
          for (_i = 0, _len = _listeners.length; _i < _len; _i++) {
            listener = _listeners[_i];
            listener(rateLimitRemaining, rateLimit, method, path, data, options);
          }
          if (!err) {
            if (jqXHR.status === 304) {
              if (clientOptions.useETags && _cachedETags["" + method + " " + path]) {
                eTagResponse = _cachedETags["" + method + " " + path];
                return cb(null, eTagResponse.data, eTagResponse.status, jqXHR);
              } else {
                return cb(null, jqXHR.responseText, status, jqXHR);
              }
            } else if (jqXHR.status === 204 && options.isBoolean) {

            } else if (jqXHR.status === 302) {
              return cb(null, jqXHR.getResponseHeader('Location'));
            } else {
              if (jqXHR.responseText && ajaxConfig.dataType === 'json') {
                data = JSON.parse(jqXHR.responseText);
                links = jqXHR.getResponseHeader('Link');
                _ref = (links != null ? links.split(',') : void 0) || [];
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                  part = _ref[_j];
                  _ref1 = part.match(/<([^>]+)>;\ rel="([^"]+)"/), discard = _ref1[0], href = _ref1[1], rel = _ref1[2];
                  data["" + rel + "_page_url"] = href;
                }
              } else {
                data = jqXHR.responseText;
              }
              if (method === 'GET' && options.isBase64) {
                converted = '';
                for (i = _k = 0, _ref2 = data.length; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
                  converted += String.fromCharCode(data.charCodeAt(i) & 0xff);
                }
                data = converted;
              }
              if (method === 'GET' && jqXHR.getResponseHeader('ETag') && clientOptions.useETags) {
                eTag = jqXHR.getResponseHeader('ETag');
                _cachedETags["" + method + " " + path] = new ETagResponse(eTag, data, jqXHR.status);
              }
              return cb(null, data, jqXHR.status, jqXHR);
            }
          } else {
            if (options.isBoolean && jqXHR.status === 404) {

            } else {
              if (jqXHR.getResponseHeader('Content-Type') !== 'application/json; charset=utf-8') {
                return cb(new Error({
                  error: jqXHR.responseText,
                  status: jqXHR.status,
                  _jqXHR: jqXHR
                }));
              } else {
                if (jqXHR.responseText) {
                  json = JSON.parse(jqXHR.responseText);
                } else {
                  json = '';
                }
                return cb(new Error({
                  error: json,
                  status: jqXHR.status,
                  _jqXHR: jqXHR
                }));
              }
            }
          }
        });
      };
    };

    __exports__["default"] = Request;
  });
window.Octokat = requireModule("./octokat")["default"];

if (typeof define === "function") {
  define('octokat', function() {
    return requireModule("./octokat")["default"];
  });
}
})(window);
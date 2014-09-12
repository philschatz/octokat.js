# Octokat.js [![Build Status](https://travis-ci.org/philschatz/octokat.js.png)](https://travis-ci.org/philschatz/octokat.js)

Octokat.js provides a minimal higher-level wrapper around [GitHub's API](https://developer.github.com).
It is being developed in the context of [github-bookeditor](https://github.com/oerpub/github-bookeditor),
an EPUB3 Textbook editor for GitHub.

This package can also be used in `nodejs` **or** as an AMD module in the browser.

# Key Features

- Works in `nodejs`, an AMD module in the browser, and as a [bower](https://github.com/bower/bower) library
- Handles text _and_ binary files
- Exposes everything available via the GitHub API (repos, teams, events, hooks, emojis, etc.)
- Supports `ETag` caching
- Paged results
- Node-style callbacks as well as optional Promises (to avoid those debates)
- 100% of the GitHub API
  - Starring and Following repositories, users, and organizations
  - Editing Team and Organization Membership
  - User/Org/Repo events and notifications
  - Listeners for rate limit changes
  - Public Keys
  - Hooks (commit, comment, etc.)
  - Uses Angular, jQuery, or native promises if available
  - Markdown generation
  - Preview APIs (Deployments, Teams, etc)
  - Enterprise APIs

For the full list of supported methods see the [Travis tests](https://travis-ci.org/philschatz/octokat.js),
the [./test](./test/) directory, or [./src/grammar.coffee](./src/grammar.coffee).

# Usage

All asynchronous methods accept a Node.js-style callback
**and** return a [Common-JS Promise](http://wiki.commonjs.org/wiki/Promises/A).

## In a browser without RequireJS

Create an Octokat instance.

```js
var octo = new Octokat({
  username: "USER_NAME",
  password: "PASSWORD"
});

var cb = function (err, val) { console.log(val); };

octo.zen.read(cb);
octo.repos('philschatz', 'octokat.js').fetch(cb); // Fetch repo info
octo.me.starred('philschatz', 'octokat.js').add(cb); // Star a repo
```

Or if you prefer OAuth:

```js
var octo = new Octokat({
  token: "OAUTH_TOKEN"
});
```

## In a browser using RequireJS

```js
define(['octokat'], function(Octokat) {
  var octo = new Octokat({
    username: "YOU_USER",
    password: "YOUR_PASSWORD"
  });
});
```

## In Node.js

Install instructions:

    npm install octokat --save

```js
var Octokat = require('octokat');
var octo = new Octokat({
  username: "YOU_USER",
  password: "YOUR_PASSWORD"
});

var cb = function (err, val) { console.log(val); };

octo.zen.read(cb);
octo.repos('philschatz', 'octokat.js').fetch(cb);    // Fetch repo info
octo.me.starred('philschatz', 'octokat.js').add(cb); // Star a repo
```

## Using Generators in Node.js 0.11 (or EcmaScript 6 browsers)

This requires Node.js 0.11 with the `--harmony-generators` flag:

```js
var co = require('co');
var Octokat = require('octokat');
var octo = new Octokat();

var fn = function *() {
  var zen  = yield octo.zen.read();
  var info = yield octo.repos('philschatz', 'octokat.js').fetch();

  console.log(zen);
  console.log(info);
};

co(fn)();
```

## Using bower

This file can be included using the bower package manager:

    bower install octokat --save

# Setup

This is all you need to get up and running:

    <script src="../dist/octokat.js"></script>
    <script>
      var octo = new Octokat();
      octo.zen.read(function(err, message) {
        if (err) { throw new Error(err); }
        alert(message);
      });
    </script>

## Promises (Optional)

`octokat.js` has the following **optional** dependencies when used in a browser:

- A Promise API (supports jQuery, AngularJS, or a Promise polyfill)

If you are already using [jQuery](https://api.jquery.com/jQuery.Deferred/)
or [AngularJS](https://docs.angularjs.org/api/ng/service/$q) in your project just be sure to include them before Octokat
and it will use their Promise API.

Otherwise, you can include a Promise polyfill like [jakearchibald/es6-promise](https://github.com/jakearchibald/es6-promise):

    <script src="./node_modules/es6-promise/dist/promise-0.1.2.js"></script>
    <script src="./octokat.js">

# Preview new APIs

To use the APIs available for preview just add a `acceptHeader` when instantiating Octokat.

For example:

```js
var octo = new Octokat({
  token: 'API_TOKEN'
  acceptHeader: 'application/vnd.github.cannonball-preview+json'
});
```

# Enterprise APIs

To use the Enterprise APIs add the root URL when instantiating Octokat:

```js
var octo = new Octokat({
  token: 'API_TOKEN'
  rootUrl: 'https://example.com/api/v3/'
});
```


# Testing

`npm test` will run the mocha tests for Node.js and the browser.
Additionally, they can be run in the browser by starting a web server
and going to [./test/index.html](http://philschatz.com/octokat.js/test).

# About the Library

## Overview

This library closely mirrors the <https://developer.github.com/v3> documentation.

For example, `GET /repos/:owner/:repo` becomes `octo.repos(owner, repo).fetch()`
and `POST /repos/:owner/:repo/issues/:number/comments` becomes `octo.repos(owner, repo).issues(number).comments.create(params)`.

## Promises and Callbacks

This library supports Node.js-style callbacks as well as Promises.

To use a callback, just specify it as the last argument to a method.
To use a Promise, do not specify a callback and the return value will be a Promise.

Example (get information on a repo):

    # Using callbacks
    octo.repos('philschatz', 'octokat.js').fetch (err, repo) ->
      console.error(err) if err
      # Do fancy stuff...

    # Using Promises
    octo.repos('philschatz', 'octokat.js').fetch()
    .then (repo) ->
      # Do fancy stuff
    .then null, (err) -> console.error(err)

## Chaining

You construct the URL by chaining properties and methods together
and an async call is made once a verb method is called (see below).

Example:

    octo = new Octokat()
    repo = octo.repos('philschatz', 'octokat.js')
    # Check if the current user is a collaborator on a repo
    repo.collaborators.contains(USER)
    .then (isCollaborator) ->
      # If not, then star the Repo
      unless isCollaborator
        repo.star.add()
        .then () ->
          # Done!

Or, update a specific comment:

    octo = new Octokat(token: ...)
    octo.repos('philschatz', 'octokat.js').issues(1).comments(123123).update(body: 'Hello')
    .then () ->
      # Done!

The basic structure of these methods is:

- `.foos.fetch({optionalStuff:...})` yields a list of items (possibly paginated)
- `.foos(id).fetch(...)` yields a single item (issue, repo, user)
- `.foos.contains(id)` tests membership in a list (yields true/false)
- `.foos.create(...)` creates a new `foo`
- `.foos(id).add()` adds an existing User/Repo to the list
- `.foos(id).remove()` removes a member from a list or deletes the object and yields a boolean indicating success

## JSON with methods (Hypermedia)

GitHub provides URL patterns in its JSON responses. These are automatically converted into methods.
For example:

    octo.repos('philschatz', 'octokat.js').fetch()
    .then (repo) ->
      # GitHub returns a JSON which contains something like compare_url: 'https://..../compare/{head}...{base}
      # This is converted to a method that accepts 2 arguments
      repo.compare(sha1, sha2).fetch()
      .then (comparison) -> # Done!

## Paged Results

If a `.fetch()` returns paged results then `nextPage()`, `previousPage()`, `firstPage()`
and `lastPage()` are added to the returned JSON. For example:

    octo.repos('philschatz', 'octokat.js').commits.fetch()
    .then (someCommits) ->
      someCommits.nextPage()
      .then (moreCommits) ->
        # Done!

## Development

- Run `npm install`
- Run `grunt dist` to generate the files in the `./dist` directory

The unit tests are named to illustrate examples of using the API.
See [Travis tests](https://travis-ci.org/philschatz/octokat.js) or run `npm test` to see them.

[linkedin/sepia](https://github.com/linkedin/sepia) is used to generate recorded results from GitHub
and [philschatz/sepia.js](https://github.com/philschatz/sepia.js) uses them in the browser.
If you are adding tests be sure to include the updated fixtures in the Pull Request.

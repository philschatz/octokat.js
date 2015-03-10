# Octokat.js [![Build Status](https://travis-ci.org/philschatz/octokat.js.png)](https://travis-ci.org/philschatz/octokat.js)

Octokat.js provides a minimal higher-level wrapper around [GitHub's API](https://developer.github.com).
It is being developed in the context of [github-bookeditor](https://github.com/oerpub/github-bookeditor),
an EPUB3 Textbook editor for GitHub.

This package can also be used in `nodejs` **or** in the browser as an AMD module or using browserify.

# Overview

- [Key Features](#key-features)
- [Usage](#usage)
- [Examples](#examples)
  - [Using Callbacks or Promises](#using-callbacks-or-promises)
  - [Read/Write/Remove a File](#read-write-remove-a-file)
- [Setup](#setup)
  - [Promises (Optional)](#promises-optional)
- [Advanced](#advanced-uses)
  - [Promises or Callbacks](#promises-or-callbacks)
  - [Chaining](#chaining)
  - [Hypermedia](#hypermedia)
  - [Paged Results](#paged-results)
  - [Preview new APIs](#preview-new-apis)
  - [Enterprise APIs](#enterprise-apis)
  - [Uploading Releases](#uploading-releases)
  - [Development](#development)


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
octo.me.starred('philschatz', 'octokat.js').remove(cb); // Un-Star a repo
```

## Using bower

This file can be included using the bower package manager:

    bower install octokat --save


# Examples

Here are some examples for using the library.

## Using Callbacks or Promises

```js
var octo = new Octokat();

// Starring a repository using callbacks
var cb = function (err, val) { console.log(val); };
octo.me.starred('philschatz', 'octokat.js').add(cb);

// Starring a repository using Promises
octo.me.starred('philschatz', 'octokat.js').add()
.then(function(val) {
  console.log('Starred!');
});
```


## Read/Write/Remove a File

To read the contents of a file:

```js
var octo = new Octokat();
var repo = octo.repos('philschatz', 'octokat.js');
repo.contents('README.md').read() // Use `.read` to get the raw file.
.then(function(contents) {        // `.fetch` is used for getting JSON
  console.log(contents);
});
```

To read the contents of a binary file:

```js
var octo = new Octokat();
var repo = octo.repos('philschatz', 'octokat.js');
repo.contents('README.md').readBinary() // Decodes the Base64-encoded content
.then(function(contents) {
  console.log(contents);
});
```

To read the contents of a file and JSON metadata:

```js
var octo = new Octokat();
var repo = octo.repos('philschatz', 'octokat.js');
repo.contents('README.md').fetch()
.then(function(info) {
  console.log(info.sha, info.content);
});
```

To update a file you need the **blob SHA** of the previous commit:

```js
var octo = new Octokat({token: 'API_TOKEN'});
var repo = octo.repos('philschatz', 'octokat.js');
var config = {
  message: 'Updating file',
  content: base64encode('New file contents'),
  sha: '123456789abcdef', // the blob SHA
  // branch: 'gh-pages'
};

repo.contents('README.md').add(config)
.then(function(info) {
  console.log('File Updated. new sha is ', info.commit.sha);
});
```

Creating a new file is the same as updating a file but the `sha` field in the config is omitted.

To remove a file:

```js
var octo = new Octokat({token: 'API_TOKEN'});
var repo = octo.repos('philschatz', 'octokat.js');
var config = {
  message: 'Removing file',
  sha: '123456789abcdef',
  // branch: 'gh-pages'
};

repo.contents('README.md').remove(config)
.then(function() {
  console.log('File Updated');
});
```


# Setup

This is all you need to get up and running:

```html
<script src="../dist/octokat.js"></script>
<script>
  var octo = new Octokat();
  octo.zen.read(function(err, message) {
    if (err) { throw new Error(err); }
    alert(message);
  });
</script>
```

## Promises (Optional)

`octokat.js` has the following **optional** dependencies when used in a browser:

- A Promise API (supports jQuery, AngularJS, or a Promise polyfill)

If you are already using [jQuery](https://api.jquery.com/jQuery.Deferred/)
or [AngularJS](https://docs.angularjs.org/api/ng/service/$q) in your project just be sure to include them before Octokat
and it will use their Promise API.

Otherwise, you can include a Promise polyfill like [jakearchibald/es6-promise](https://github.com/jakearchibald/es6-promise):

```html
<script src="./node_modules/es6-promise/dist/promise-0.1.2.js"></script>
<script src="./octokat.js"></script>
```


# Testing

`npm test` will run the mocha tests for Node.js and the browser.
Additionally, they can be run in the browser by starting a web server
and going to [./test/index.html](http://philschatz.com/octokat.js/test).

# Advanced Uses

## Overview

This library closely mirrors the <https://developer.github.com/v3> documentation.

For example, `GET /repos/:owner/:repo` becomes `octo.repos(owner, repo).fetch()`
and `POST /repos/:owner/:repo/issues/:number/comments` becomes `octo.repos(owner, repo).issues(number).comments.create(params)`.

## Promises or Callbacks

This library supports Node.js-style callbacks as well as Promises.

To use a callback, just specify it as the last argument to a method.
To use a Promise, do not specify a callback and the return value will be a Promise.

Example (get information on a repo):

```coffee
# Using callbacks
octo.repos('philschatz', 'octokat.js').fetch (err, repo) ->
  console.error(err) if err
  # Do fancy stuff...

# Using Promises
octo.repos('philschatz', 'octokat.js').fetch()
.then (repo) ->
  # Do fancy stuff
.then null, (err) -> console.error(err)
```

## Chaining

You construct the URL by chaining properties and methods together
and an async call is made once a verb method is called (see below).

Example:

```coffee
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
```

Or, update a specific comment:

```coffee
octo = new Octokat(token: ...)
octo.repos('philschatz', 'octokat.js').issues(1).comments(123123).update(body: 'Hello')
.then () ->
  # Done!
```
The basic structure of these methods is:

- `.foos.fetch({optionalStuff:...})` yields a list of items (possibly paginated)
- `.foos(id).fetch(...)` yields a single item (issue, repo, user)
- `.foos.contains(id)` tests membership in a list (yields true/false)
- `.foos.create(...)` creates a new `foo`
- `.foos(id).add()` adds an existing User/Repo to the list
- `.foos(id).remove()` removes a member from a list or deletes the object and yields a boolean indicating success

## Hypermedia

GitHub provides URL patterns in its JSON responses. These are automatically converted into methods.
For example:

```coffee
octo.repos('philschatz', 'octokat.js').fetch()
.then (repo) ->
  # GitHub returns a JSON which contains something like compare_url: 'https://..../compare/{head}...{base}
  # This is converted to a method that accepts 2 arguments
  repo.compare(sha1, sha2).fetch()
  .then (comparison) -> # Done!
```

## Paged Results

If a `.fetch()` returns paged results then `nextPage()`, `previousPage()`, `firstPage()`
and `lastPage()` are added to the returned Object. For example:

```coffee
octo.repos('philschatz', 'octokat.js').commits.fetch()
.then (someCommits) ->
  someCommits.nextPage()
  .then (moreCommits) ->
    console.log('2nd page of results', moreCommits)
```

## Preview new APIs

To use the APIs available for preview just add a `acceptHeader` when instantiating Octokat.

For example:

```js
var octo = new Octokat({
  token: 'API_TOKEN',
  acceptHeader: 'application/vnd.github.cannonball-preview+json'
});
```

## Enterprise APIs

To use the Enterprise APIs add the root URL when instantiating Octokat:

```js
var octo = new Octokat({
  token: 'API_TOKEN',
  rootURL: 'https://example.com/api/v3'
});
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

## Uploading Releases

Uploading release assets requires a slightly different syntax because it
involves setting a custom contentType and providing a possibly binary payload.

To upload (tested using nodejs) you can do the following:

```js
contents = fs.readFileSync('./build.js');

repo.releases(123456).fetch()
  .then(function(release) {

    release.upload('build.js', 'application/javascript', contents)
      .then(function(resp) {
        // Success!
      });
  });
```


## Development

- Run `npm install`
- Run `grunt dist` to generate the files in the `./dist` directory

The unit tests are named to illustrate examples of using the API.
See [Travis tests](https://travis-ci.org/philschatz/octokat.js) or run `npm test` to see them.

[linkedin/sepia](https://github.com/linkedin/sepia) is used to generate recorded HTTP fixtures from GitHub
and [philschatz/sepia.js](https://github.com/philschatz/sepia.js) uses them in the browser.
If you are adding tests be sure to include the updated fixtures in the Pull Request.

octo = require('octokat')(/* Config options would go here */)

// Fetch the info for a repository
repoInfo = await octo.repos('philschatz/octokat.js').fetch()

// Fetch all the open issues for a repository (2 methods):

// 1. Directly
//openIssues = await octo.repos('philschatz/octokat.js').issues.fetch({state: 'open'})

// 2. Using Hypermedia (URL patterns from GitHub)
openIssues = await repoInfo.issues.fetch({state: 'open'})

// Output all the issues
openIssues.map(function(issue) { return issue.title; })


// For more examples see https://github.com/philschatz/octokat.js/blob/master/examples

// octo.repos : InputRepos
// octo.repos.create() : Promise<RepoResponse>
// octo.repos('foo/bar') : InputRepo
// octo.repos('foo/bar').fetch() : Promise<RepoResponse>
// octo.repos('foo/bar').issues : InputRepoIssues
// octo.repos('foo/bar').issues.fetch() : Promise<RepoIssueResponse[]>
// octo.repos('foo/bar').issues.create() : Promise<RepoIssueResponse>
// octo.repos('foo/bar').issues.remove() : Promise<void>
//
//
//
// So, we have the following categories:
//
// - Input objects
//   - each one has a subset of verbs that it can execute (read, fetch, add, remove, create)
//   - and each verb yields a response type
//   - may have other Input objects that are underneath it
//   - the verb method has custom arguments that are allowed
// - Response objects

module.exports = [
  {
    typeName: 'InputRepos',
    fnArgs: [{type: 'string'}, {type: 'string'}],
    fnArgsRegexp: [/^\//, /^\//],
    returnType: 'InputRepo',
    children: [],
    verbs: {
      create: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'InputRepo'
      }
    }
  }, {
    typeName: 'InputRepo',
    fnArgs: null,
    children: {
      'issues': 'InputRepoIssues',
      'git': 'InputGit'
    },
    verbs: {
      fetch: {
        fnArgs: [],
        resultType: 'RepoResponse'
      },
      remove: {
        fnArgs: [],
        resultType: 'void'
      }
    }
  }, {
    typeName: 'InputRepoIssues',
    fnArgs: [{type: 'number'}],
    returnType: 'InputRepoIssue',
    children: null,
    verbs: {
      create: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'RepoIssueResponse'
      },
      fetch: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'RepoIssueResponse[]'
      }
    }
  }, {
    typeName: 'InputRepoIssue',
    fnArgs: null,
    returnType: null,
    children: {
      'comments': 'InputIssueComments'
    },
    verbs: {
      update: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'RepoIssueResponse'
      },
      fetch: {
        fnArgs: [],
        resultType: 'RepoIssueResponse'
      },
      remove: {
        fnArgs: [],
        resultType: 'void'
      }
    }
  },
  {
    typeName: 'InputIssueComments',
    fnArgs: [{type: 'number'}],
    returnType: 'InputIssueComment',
    verbs: {
      create: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'IssueCommentResponse'
      },
      fetch: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'IssueCommentResponse[]'
      }
    }
  },
  {
    typeName: 'InputIssueComment',
    verbs: {
      fetch: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'IssueCommentResponse'
      },
      update: {
        fnArgs: ['{Some kind of map}'],
        resultType: 'IssueCommentResponse'
      },
      remove: {
        resultType: 'void'
      }
    }
  },
  {
    typeName: 'InputGit'
  },
// --------------------------------------------------------------------
//
// Responses
//
// --------------------------------------------------------------------
  {typeName: 'RepoIssueResponse'},
  {typeName: 'IssueCommentResponse'},
  {typeName: 'RepoResponse'}
];

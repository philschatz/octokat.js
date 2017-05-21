// octo.repos : InputRepos
// octo.repos.create() : Promise<RepoResponse>
// octo.repos('foo/bar') : InputRepo
// octo.repos('foo/bar').fetch() : Promise<RepoResponse>
// octo.repos('foo/bar').issues : InputRepoIssues
// octo.repos('foo/bar').issues.fetch() : Promise<IssueResponse[]>
// octo.repos('foo/bar').issues.create() : Promise<IssueResponse>
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
    argTypes: ['string', 'string'],
    argTypesRegexp: [/^\//, /^\//],
    returnType: 'InputRepo',
    children: []
  }, {
    typeName: 'InputRepo',
    argTypes: null,
    children: {
      'issues': 'InputRepoIssues',
      'git': 'InputGit'
    },
    verbs: {
      fetch: {
        argTypes: [],
        resultType: 'RepoResponse'
      },
      remove: {
        argTypes: [],
        resultType: 'void'
      }
    }
  }, {
    typeName: 'InputRepoIssues',
    argTypes: ['number'],
    returnType: 'InputRepoIssue',
    children: null,
    verbs: {
      create: {
        argTypes: ['{Some kind of map}'],
        resultType: 'IssueResponse'
      },
      fetch: {
        argTypes: ['{Some kind of map}'],
        resultType: 'IssueResponse[]'
      }
    }
  }, {
    typeName: 'InputRepoIssue',
    argTypes: null,
    returnType: null,
    children: {
      'comments': 'InputRepoIssueComments'
    },
    verbs: {
      update: {
        argTypes: ['{Some kind of map}'],
        resultType: 'IssueResponse'
      },
      fetch: {
        argTypes: [],
        resultType: 'IssueResponse'
      },
      remove: {
        argTypes: [],
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
  {
    typeName: 'IssueResponse'
  },
  {
    typeName: 'RepoResponse'
  }
];

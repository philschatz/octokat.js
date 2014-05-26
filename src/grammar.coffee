# Grammar
# ===============================
# Defines:
# - URL_VALIDATOR : Regular expression to test all URLs before calling GitHub
# - TREE_OPTIONS : Restricts the set of `.foos` (Derived from URL_VALIDATOR)
# - OBJECT_MATCHER : Determines the TYPE of JSON returned from GitHub.
#                    Used to restrict the set of `.foos` on the returned Object

URL_VALIDATOR = /// ^

  (https?://[^/]+)? # Optional protocol, host, and port
  (/api/v3)?        # Optional API root for enterprise GitHub users

  / (
      zen
    | octocat
    | users
    | issues
    | gists
    | emojis
    | meta
    | rate_limit
    | feeds
    | events
    | gitignore/templates (/[^/]+)?

    | user
    | user/ (
        repos
      | orgs
      | followers
      | following (/[^/]+)?
      | emails    (/[^/]+)?
      | issues
      | starred   (/[^/]+){0,2}
    )

    | orgs/  [^/]+
    | orgs/  [^/]+ / (
          repos
        | issues
        | members
        | events
      )

    | users/ [^/]+
    | users/ [^/]+ / (
          repos
        | orgs
        | gists
        | followers
        | following (/[^/]+){0,2}
        | keys
        | received_events (/public)?
        | events          (/public)?
        | events/orgs/ [^/]+
      )

    | search/ (
          repositories
        | issues
        | users
        | code
      )

    | gists/ (
          public
        | starred
        | ([a-f0-9]{20}|[0-9]+)
        | ([a-f0-9]{20}|[0-9]+) /forks
        | ([a-f0-9]{20}|[0-9]+) /comments (/[0-9]+)?
        | ([a-f0-9]{20}|[0-9]+) /star
      )

    | repos (/[^/]+){2}
    | repos (/[^/]+){2} / (
          readme
        | tarball (/[^/]+)?
        | zipball (/[^/]+)?
        | compare / [a-f0-9]{40} \.{3} [a-f0-9]{40}
        | deployments
        | deployments / [0-9]+ / statuses ([0-9]+)?
        | hooks
        | hooks /[^/]+
        | hooks /[^/]+ /tests
        | assignees
        | languages
        | branches
        | contributors
        | subscribers
        | subscription
        | comments (/[0-9]+)?
        | downloads (/[0-9]+)?
        | milestones
        | labels
        | releases
        | events
        | merges
        | pages
        | pages / builds
        | pages / builds / latest
        | commits
        | commits / [a-f0-9]{40}
        | commits / [a-f0-9]{40} / comments
        | contents (/[^/]+)* # The path is allowed in the URL
        | collaborators (/[^/]+)?
        | (issues|pulls)
        | (issues|pulls) / (
            | events
            | events/ [0-9]+
            | comments (/[0-9]+)?
            | [0-9]+
            | [0-9]+ /events
            | [0-9]+ /comments
            )
        | pulls/ [0-9]+ / (
              files
            | commits
            )
        | git/ (
              refs
            | refs / heads (/[^/]+)?
            | trees (/[^/]+)? # Can be a sha or a branch name
            | blobs (/[a-f0-9]{40}$)?
            | commits (/[a-f0-9]{40}$)?
          )
        | stats/ (
              contributors
            | commit_activity
            | code_frequency
            | participation
            | punch_card
          )
      )
  )
  $
///


TREE_OPTIONS =
  'zen'         : false
  'octocat'     : false
  'issues'      : false
  'emojis'      : false
  'meta'        : false
  'rate_limit'  : false
  'feeds'       : false
  'events'      : false
  'gitignore':
    'templates' : false
  'user':
    'repos'     : false
    'orgs'      : false
    'followers' : false
    'following' : false
    'emails'    : false
    'issues'    : false
    'starred'   : false
  'orgs':
    'repos'     : false
    'issues'    : false
    'members'   : false
    'events'    : false
  'users':
    'repos'     : false
    'orgs'      : false
    'gists'     : false
    'followers' : false
    'following' : false
    'keys'      : false
    'received_events':
      'public'  : false
    'events':
      'public'  : false
      'orgs'    : false
  'search':
    'repositories' : false
    'issues'    : false
    'users'     : false
    'code'      : false
  'gists':
    'public'    : false
    'starred'   : false
    'star'      : false
    'comments'  : false
    'forks'     : false
  'repos':
    'readme'        : false
    'tarball'       : false
    'zipball'       : false
    'compare'       : false
    'deployments':
      'statuses'    : false
    'hooks':
      'tests'       : false
    'assignees'     : false
    'languages'     : false
    'branches'      : false
    'contributors'  : false
    'subscribers'   : false
    'subscription'  : false
    'comments'      : false
    'downloads'     : false
    'milestones'    : false
    'labels'        : false
    'releases'      : false
    'events'        : false
    'merges'        : false
    'pulls':
      'merge'       : false
      'comments'    : false
      'commits'     : false
      'files'       : false
    'pages':
      'builds':
        'latest'    : false
    'commits':
      'comments'    : false
    'contents'      : false
    'collaborators' : false
    'issues':
      'events'      : false
      'comments'    : false
    'git':
      'refs':
        'heads'     : false
      'trees'       : false
      'blobs'       : false
      'commits'     : false
    'stats':
      'contributors'    : false
      'commit_activity' : false
      'code_frequency'  : false
      'participation'   : false
      'punch_card'      : false


OBJECT_MATCHER =
  'repos': /// ^
    (https?://[^/]+)? # Optional protocol, host, and port
    (/api/v3)?        # Optional API root for enterprise GitHub users
    /repos/ [^/]+ / [^/]+
    $
  ///
  'gists': /// ^ (https?://[^/]+)? (/api/v3)?
    /gists/ [^/]+
    $
  ///
  'issues': /// ^ (https?://[^/]+)? (/api/v3)?
    /repos/ [^/]+ / [^/]+
    /(issues|pulls) [^/]+
    $
  ///
  'users': /// ^ (https?://[^/]+)? (/api/v3)?
    /users/ [^/]+
    $
  ///
  'orgs': /// ^ (https?://[^/]+)? (/api/v3)?
    /orgs/ [^/]+
    $
  ///
  'repos.comments': /// ^
    (https?://[^/]+)? # Optional protocol, host, and port
    (/api/v3)?        # Optional API root for enterprise GitHub users
    /repos/ [^/]+ / [^/]+
    /comments/ [^/]+
    $
  ///

`export {URL_VALIDATOR, TREE_OPTIONS, OBJECT_MATCHER}`

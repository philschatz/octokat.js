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
      | starred
      | starred   (/[^/]+){2}
      | teams
    )

    | orgs/  [^/]+
    | orgs/  [^/]+ / (
          repos
        | issues
        | members
        | events
        | teams
      )

    | teams/ [^/]+
    | teams/ [^/]+ / (
          members (/[^/]+)?
        | memberships / [^/]+
        | repos
        | repos / ([^/]+) / ([^/]+)
      )

    | users/ [^/]+
    | users/ [^/]+ / (
          repos
        | orgs
        | gists
        | followers
        | following (/[^/]+){0,2}
        | keys
        | starred
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
        | stargazers
        | comments (/[0-9]+)?
        | downloads (/[0-9]+)?
        | forks
        | milestones
        | labels
        | releases
        | events
        | merges
        | statuses / [a-f0-9]{40}
        | pages
        | pages / builds
        | pages / builds / latest
        | commits
        | commits / [a-f0-9]{40}
        | commits / [a-f0-9]{40} / (
              comments
            | status
            | statuses
          )?
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



    # Enterprise routes from https://developer.github.com/v3/enterprise/
    | enterprise/ (
          settings/license
        | stats/ (
                issues
              | hooks
              | milestones
              | orgs
              | comments
              | pages
              | users
              | gists
              | pulls
              | repos
              | all
          )
      )
    | staff/indexing_jobs
    # Special Enterprise route for user admin
    | user/ [^/]+ / (
        site_admin # PUT/DELETE
        suspended # PUT/DELETE
    )
    # These routes MUST NOT be prefixed with /api/v3
    | setup/api/ (
          start # POST
        | upgrade # POST
        | configcheck # GET
        | configure # POST
        | settings ( # GET/PUT
              authorized-keys # GET/POST/DELETE
          )?
        | maintenance # GET/POST
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
    'teams'     : false
    # Enterprise-only:
    'site_admin': false
    'suspended' : false
  'orgs':
    'repos'     : false
    'issues'    : false
    'members'   : false
    'events'    : false
    'teams'     : false
  'teams':
    'members'   : false
    'memberships':false
    'repos'     : false
  'users':
    'repos'     : false
    'orgs'      : false
    'gists'     : false
    'followers' : false
    'following' : false
    'keys'      : false
    'starred'   : false
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
    'stargazers'    : false
    'comments'      : false
    'downloads'     : false
    'forks'         : false
    'milestones'    : false
    'labels'        : false
    'releases'      : false
    'events'        : false
    'merges'        : false
    'statuses'      : false
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
      'status'      : false
      'statuses'    : false
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
    # Enterprise routes
    'enterprise':
      'settings':
        'license'       : false
      'stats':
        'issues'        : false
        'hooks'         : false
        'milestones'    : false
        'orgs'          : false
        'comments'      : false
        'pages'         : false
        'users'         : false
        'gists'         : false
        'pulls'         : false
        'repos'         : false
        'all'           : false
    'staff':
      'indexing_jobs'   : false
    # Enterprise Maintenance routes
    'setup':
      'api':
        'start'         : false # POST
        'upgrade'       : false # POST
        'configcheck'   : false # GET
        'configure'     : false # POST
        'settings':             # GET/PUT
          'authorized-keys': false # GET/POST/DELETE
        'maintenance'   : false # GET/POST



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

module.exports = {URL_VALIDATOR, TREE_OPTIONS, OBJECT_MATCHER}

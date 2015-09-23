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
    | organizations
    | issues
    | gists
    | emojis
    | markdown
    | meta
    | rate_limit
    | feeds
    | events
    | notifications
    | notifications / threads (/[^/]+)
    | notifications / threads (/[^/]+) / subscription
    | gitignore/templates (/[^/]+)?

    | user
    | user/ (
        repos
      | orgs
      | followers
      | following (/[^/]+)?
      | emails    (/[^/]+)? # TODO: Are these additional args valid?
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
        | repos (/[^/]+){2}
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
        | compare / ([^\.{3}]+) \.{3} ([^\.{3}]+)    # Can compare a tag, part of a commit sha, branch (with `/`)
        | deployments (/[0-9]+)?
        | deployments / [0-9]+ / statuses (/[0-9]+)?
        | hooks
        | hooks /[^/]+
        | hooks /[^/]+ /tests
        | assignees
        | languages
        | teams
        | tags
        | branches (/[^/]+){0,2}
        | contributors
        | subscribers
        | subscription
        | stargazers
        | comments (/[0-9]+)?
        | downloads (/[0-9]+)?
        | forks
        | milestones
        | milestones / [0-9]+
        | milestones / [0-9]+ / labels
        | labels (/[^/]+)?
        | releases
        | releases / ([0-9]+)
        | releases / ([0-9]+) / assets
        | releases / latest
        | releases / tags / ([^/]+)
        | releases / assets / ([0-9]+)
        | events
        | notifications
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
        | contents /         # Allow an empty path
        | contents (/[^/]+)* # The path is allowed in the URL
        | collaborators (/[^/]+)?
        | (issues|pulls)
        | (issues|pulls) / (
              events
            | events/ [0-9]+
            | comments (/[0-9]+)?
            | [0-9]+
            | [0-9]+ /events
            | [0-9]+ /comments
            | [0-9]+ /labels (/[^/]+)?
            )
        | pulls/ [0-9]+ / (
              files
            | commits
            )
        | git/ (
              refs
            | refs / (
                .+
                | heads (/[^/]+)?
                | tags (/[^/]+)?
              )
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

    # These (licenses, authorizations, applications) are matched again below
    # to add the custom accept header needed to use these routes.
    | licenses
    | licenses / ([^/]+)

    | authorizations
    | authorizations/ (
        (\d+)
      | clients/ ([^/]{20})
      | clients/ ([^/]{20}) / ([^/]+) # fingerprint
    )

    | applications/ ([^/]{20}) /tokens
    | applications/ ([^/]{20}) /tokens/ ([^/]+)


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
    | users/ [^/]+ / (
          site_admin # PUT/DELETE
        | suspended # PUT/DELETE
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
  'organizations': false
  'issues'      : false
  'emojis'      : false
  'markdown'    : false
  'meta'        : false
  'rate_limit'  : false
  'feeds'       : false
  'events'      : false
  'notifications':
    'threads':
      'subscription': false
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
    # Enterprise-only:
    'site_admin': false
    'suspended' : false

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
    'teams'         : false
    'tags'          : false
    'branches'      : false
    'contributors'  : false
    'subscribers'   : false
    'subscription'  : false
    'stargazers'    : false
    'comments'      : false
    'downloads'     : false
    'forks'         : false
    'milestones':
      'labels'      : false
    'labels'        : false
    'releases':
      'assets'      : false
      'latest'      : false
      'tags'        : false
    'events'        : false
    'notifications' : false
    'merges'        : false
    'statuses'      : false
    'pulls':
      'merge'       : false
      'comments'    : false
      'commits'     : false
      'files'       : false
      'events'      : false
      'labels'      : false
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
      'labels'      : false
    'git':
      'refs':
        'heads'     : false
        'tags'      : false
      'trees'       : false
      'blobs'       : false
      'commits'     : false
    'stats':
      'contributors'    : false
      'commit_activity' : false
      'code_frequency'  : false
      'participation'   : false
      'punch_card'      : false
  'licenses'        : false
  'authorizations':
    'clients'         : false
  'applications':
    'tokens'          : false
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


PREVIEW_HEADERS =
  'application/vnd.github.drax-preview+json': /// ^ (https?://[^/]+)? (/api/v3)?
    (
        /licenses
      | /licenses/ ([^/]+)
      | /repos/ ([^/]+) / ([^/]+)
    )
    $
  ///

  # https://developer.github.com/changes/2014-12-09-new-attributes-for-stars-api/
  'application/vnd.github.v3.star+json': /// ^ (https?://[^/]+)? (/api/v3)?
    /users/ ([^/]+) /starred
    $
  ///

  # https://developer.github.com/v3/oauth_authorizations/
  'application/vnd.github.mirage-preview+json': /// ^ (https?://[^/]+)? (/api/v3)?
    (
        /authorizations
      | /authorizations/clients/ ([^/]{20})
      | /authorizations/clients/ ([^/]{20}) / ([^/]+) # fingerprint
      | /authorizations/ ([\d]+)
      | /applications/ ([^/]{20}) /tokens
      | /applications/ ([^/]{20}) /tokens/ ([^/]+)
    )
    $
  ///

DEFAULT_HEADER = (url) ->
  for key, val of PREVIEW_HEADERS
    return key if val.test(url)
  return 'application/vnd.github.v3+json'

module.exports = {URL_VALIDATOR, TREE_OPTIONS, OBJECT_MATCHER, DEFAULT_HEADER}

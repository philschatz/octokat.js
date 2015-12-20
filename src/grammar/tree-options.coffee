module.exports =
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

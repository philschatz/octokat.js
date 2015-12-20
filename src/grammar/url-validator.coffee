module.exports = /// ^

  # Status APIs
  (https://status.github.com/api/
    (
      status.json
    | last-message.json
    | messages.json
    )
    $
  )

  |

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

    | user (/\d+)?          # Fetching paged results for a user uses the userid
    | user (/\d+)? / (
      | repos
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
  # Optional query string params
  (\?.*)?
  $
///

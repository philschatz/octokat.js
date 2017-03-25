module.exports =
  'repos': /// ^
    (https?://[^/]+)? # Optional protocol, host, and port
    (/api/v3)?        # Optional API root for enterprise GitHub users
    / (repos (/[^/]+){2} | repositories / ([0-9]+))
    $
  ///
  'gists': /// ^ (https?://[^/]+)? (/api/v3)?
    /gists/ [^/]+
    $
  ///
  'issues': /// ^ (https?://[^/]+)? (/api/v3)?
    / (repos (/[^/]+){2} | repositories / ([0-9]+))
    /(issues|pulls)/ [^/]+
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
  'teams': /// ^ (https?://[^/]+)? (/api/v3)?
    /teams/ [^/]+
    $
  ///
  'repos.comments': /// ^
    (https?://[^/]+)? # Optional protocol, host, and port
    (/api/v3)?        # Optional API root for enterprise GitHub users
    /repos/ [^/]+ / [^/]+
    /comments/ [^/]+
    $
  ///

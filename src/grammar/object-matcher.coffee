module.exports =
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

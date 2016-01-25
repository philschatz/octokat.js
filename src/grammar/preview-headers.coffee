module.exports =
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

  # # https://developer.github.com/v3/oauth_authorizations/
  # 'application/vnd.github.mirage-preview+json': /// ^ (https?://[^/]+)? (/api/v3)?
  #   (
  #       /authorizations
  #     | /authorizations/clients/ ([^/]{20})
  #     | /authorizations/clients/ ([^/]{20}) / ([^/]+) # fingerprint
  #     | /authorizations/ ([\d]+)
  #     | /applications/ ([^/]{20}) /tokens
  #     | /applications/ ([^/]{20}) /tokens/ ([^/]+)
  #   )
  #   $
  # ///

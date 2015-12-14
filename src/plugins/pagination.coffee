module.exports = new class Pagination
  responseMiddleware: ({jqXHR, data}) ->
    return unless jqXHR # The plugins are all used in `octo.parse()` which does not have a jqXHR

    # Only JSON responses have next/prev/first/last link headers
    # Add them to data so the resolved value is iterable

    if Array.isArray(data)
      data = data[...]

      # Parse the Link headers
      # of the form `<http://a.com>; rel="next", <https://b.com?a=b&c=d>; rel="previous"`
      links = jqXHR.getResponseHeader('Link')
      for part in links?.split(',') or []
        [discard, href, rel] = part.match(/<([^>]+)>;\ rel="([^"]+)"/)
        # Add the pagination functions on the JSON since Promises resolve one value
        # Name the functions `nextPage`, `previousPage`, `firstPage`, `lastPage`
        data["#{rel}_page_url"] = href

      {data}

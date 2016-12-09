module.exports = new class Pagination {
  responseMiddlewareAsync (input, cb) {
    let {jqXHR, data} = input
    if (!jqXHR) { return cb(null, input) } // The plugins are all used in `octo.parse()` which does not have a jqXHR

    // Only JSON responses have next/prev/first/last link headers
    // Add them to data so the resolved value is iterable

    if (Array.isArray(data)) {
      data = {items: data.slice()} // Convert to object so we can add the next/prev/first/last link headers

      // Parse the Link headers
      // of the form `<http://a.com>; rel="next", <https://b.com?a=b&c=d>; rel="previous"`
      let linksHeader = jqXHR.getResponseHeader('Link')
      if (linksHeader) {
        linksHeader.split(',').forEach((part) => {
          let [unusedField, href, rel] = part.match(/<([^>]+)>; rel="([^"]+)"/)
          // Add the pagination functions on the JSON since Promises resolve one value
          // Name the functions `nextPage`, `previousPage`, `firstPage`, `lastPage`
          data[`${rel}_page_url`] = href
        })
      }
      input.data = data // or throw new Error('BUG! Expected JSON data to exist')
    }
    return cb(null, input)
  }
}()

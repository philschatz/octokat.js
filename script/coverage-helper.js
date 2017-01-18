var fs = require('fs')
var glob = require('glob')

glob('./dist/node/**/*.map', removeSourcesContent)
glob('./test-transpiled/**/*.map', removeSourcesContent)

function removeSourcesContent(err, files) {
  if (files.length === 0) {
    console.error('Could not find any sourcemap files to tweak for remap-istanbul')
    process.exit(1)
  }
  files.forEach(function(file) {
    var contents = JSON.parse(fs.readFileSync(file))
    delete contents.sourcesContent
    fs.writeFileSync(file, JSON.stringify(contents))
  })
}

#!/bin/bash

# Istanbul does not preserve sourcemaps when generating code coverage so
# this uses remap-istanbul. But remap-istanbul likes to use the sourcesContent
# field in the sourcemap files which causes them to not point to the correct
# source. So coverage-helper.js removes that field in all sourcemap files.

nodeVer=$(node --version)
semver=( ${nodeVer//./ } )

if [[ "${semver[0]}" == "v6" ]]; then

  echo "==> Reporting coverage to codecov"
  rm ./coverage/coverage.json # Just in case so codecov does not find it
  node ./script/coverage-helper.js
  $(npm bin)/remap-istanbul --exclude 'index.js' --input ./coverage/coverage-final.json --output ./coverage/coverage-mapped-to-source.json --type json
  $(npm bin)/codecov --file=./coverage/coverage-mapped-to-source.json

else
  echo "==> Skipping coverage reporting because remap-istanbul only works on node v6+"
fi

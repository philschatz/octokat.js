#!/bin/bash

nodeVer=$(node --version)
semver=( ${nodeVer//./ } )

if [[ "${semver[0]}" == "v6" ]]; then

  echo "==> Reporting coverage to codecov"
  $(npm bin)/remap-istanbul --exclude 'index.js' --input ./coverage/coverage.json --output ./coverage/coverage-mapped-to-source.json --type json
  $(npm bin)/codecov --file ./coverage/coverage-mapped-to-source.json

else
  echo "==> Skipping coverage reporting because remap-istanbul only works on node v6+"
fi

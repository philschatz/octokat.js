#! /bin/bash

for filePath in $(find src -name "*.js")
do
  filePathNoExt="${filePath%.*}"

  if [[ ( -f "${filePathNoExt}.coffee" ) && ( -f "${filePathNoExt}.js" ) ]]
  then
    echo "Preserving ${filePathNoExt}"
    mv "${filePathNoExt}.js" "${filePathNoExt}.js.backup"
    git mv "${filePathNoExt}.coffee" "${filePathNoExt}.js"
    mv "${filePathNoExt}.js.backup" "${filePathNoExt}.js"
  else
    echo "Skipping ${filePathNoExt}.coffee"

  fi
done

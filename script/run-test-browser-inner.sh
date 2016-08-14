#!/bin/sh

npm run test-browser-only

# So that parallelshell exits on success, send a non-zero exit status
if [ $? -eq 0 ]
then
  exit 42
else
  exit $?
fi

#!/bin/sh
parallelshell --verbose "http-server --silent -p 9876 ." "./script/run-test-browser-inner.sh"

# run-test-browser-inner.sh returns 42 if successful. This is because parallelshell will only
# exit if a process errors. It does not exit if a process exited with status 0.
if [ $? -eq 42 ]
then
  exit 0
else
  exit $?
fi

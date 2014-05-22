define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  require 'cs!./commit-comments.spec'
  require 'cs!./commits.spec'
  require 'cs!./contents.spec'
  require 'cs!./deployments.spec'
  require 'cs!./downloads.spec'
  require 'cs!./events.spec'

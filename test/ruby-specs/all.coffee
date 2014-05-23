define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  require 'cs!./commit-comments.spec'
  require 'cs!./commits.spec'
  require 'cs!./contents.spec'
  require 'cs!./deployments.spec'
  require 'cs!./downloads.spec'
  require 'cs!./events.spec'
  require 'cs!./gists.spec'
  # require 'cs!./gitignore.spec' This is already handled by simple
  # require 'cs!./hooks.spec' This is already handled by simple

  require 'cs!./status.spec'
  require 'cs!./stats.spec'

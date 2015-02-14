define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  require 'cs!./ruby-specs/all'
  require 'cs!./simple.spec'
  require 'cs!./object.spec'

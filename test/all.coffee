define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  require 'cs!./simple.spec'
  require 'cs!./ruby-specs/all'

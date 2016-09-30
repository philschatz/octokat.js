define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  require 'cs!./emitter.spec'
  require 'cs!./ruby-specs/all'
  require 'cs!./simple.spec'
  require 'cs!./object.spec'
  require 'cs!./hypermedia.spec'

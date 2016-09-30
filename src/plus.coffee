# Both of these internal methods are really small/simple and we are only
# working with arrays anyway
filter = require 'lodash/internal/arrayFilter'
forEach = require 'lodash/internal/arrayEach'
map = require 'lodash/internal/arrayMap'

# From async
onlyOnce = (fn) ->
  return () ->
    throw new Error("Callback was already called.") if fn is null
    callFn = fn
    fn = null
    callFn.apply(@, arguments)

# require('underscore-plus')
plus =
  camelize: (string) ->
    if string
      string.replace /[_-]+(\w)/g, (m) -> m[1].toUpperCase()
    else
      ''

  uncamelize: (string) ->
    return '' unless string
    return string.replace /([A-Z])+/g, (match, letter='') -> "_#{letter.toLowerCase()}"

  dasherize: (string) ->
    return '' unless string

    string = string[0].toLowerCase() + string[1..]
    string.replace /([A-Z])|(_)/g, (m, letter) ->
      if letter
        '-' + letter.toLowerCase()
      else
        '-'

  waterfall: (tasks, cb) ->
    taskIndex = 0
    nextTask = (val) ->
      if taskIndex is tasks.length
        return cb(null, val)

      taskCallback = onlyOnce (err, val) ->
        return cb(err, val) if err
        nextTask(val)

      task = tasks[taskIndex++]
      if val
        task(val, taskCallback)
      else
        task(taskCallback)

    nextTask(null) # Initial value passed to the 1st

  # Just _.extend(target, source)
  extend: (target, source) ->
    if source
      for key in Object.keys(source)
        target[key] = source[key]

  # Just _.forOwn(obj, iterator)
  forOwn: (obj, iterator) ->
    for key in Object.keys(obj)
      iterator(obj[key], key)

  filter: filter
  forEach: forEach
  map: map

module.exports = plus

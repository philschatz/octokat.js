// Both of these internal methods are really small/simple and we are only
// working with arrays anyway
const filter = require('lodash/_arrayFilter')
const forEach = require('lodash/_arrayEach')
const map = require('lodash/_arrayMap')

// From async
let onlyOnce = fn =>
  function () {
    if (fn === null) { throw new Error('Callback was already called.') }
    let callFn = fn
    fn = null
    return callFn.apply(this, arguments)
  }

// require('underscore-plus')
let plus = {
  camelize (string) {
    if (string) {
      return string.replace(/[_-]+(\w)/g, m => m[1].toUpperCase())
    } else {
      return ''
    }
  },

  uncamelize (string) {
    if (!string) { return '' }
    return string.replace(/([A-Z])+/g, (match, letter = '') => `_${letter.toLowerCase()}`)
  },

  dasherize (string) {
    if (!string) { return '' }

    string = string[0].toLowerCase() + string.slice(1)
    return string.replace(/([A-Z])|(_)/g, function (m, letter) {
      if (letter) {
        return `-${letter.toLowerCase()}`
      } else {
        return '-'
      }
    }
    )
  },

  waterfall (tasks, cb) {
    let taskIndex = 0
    let nextTask = function (val) {
      if (taskIndex === tasks.length) {
        return cb(null, val)
      }

      let taskCallback = onlyOnce(function (err, val) {
        if (err) { return cb(err, val) }
        return nextTask(val)
      })

      let task = tasks[taskIndex++]
      if (val) {
        return task(val, taskCallback)
      } else {
        return task(taskCallback)
      }
    }

    return nextTask(null) // Initial value passed to the 1st
  },

  // Just _.extend(target, source)
  extend (target, source) {
    if (source) {
      return Object.keys(source).map((key) => {
        target[key] = source[key]
      })
    }
  },

  // Just _.forOwn(obj, iterator)
  forOwn (obj, iterator) {
    return Object.keys(obj).map((key) =>
      iterator(obj[key], key))
  },

  filter,
  forEach,
  map
}

module.exports = plus

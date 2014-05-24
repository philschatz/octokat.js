MODULES = {}

# This project is written to use RequireJS (and can be used this way for development) but
# Since all the files are concatenated, use a simple `define` function
# rather than RequireJS and all of its machinery.
#
# Also, the files are concatenated to match the dependency tree so the callback
# can be called immediately.
@define ?= (moduleName, deps, callback) ->
  args = for depName in deps
    # Split off the `cs!` when loading coffeescript files
    [first, second] = depName.split('!')
    depName = second or first
    throw new Error('Files are not concatenated based on their dependencies') unless MODULES[depName]
    MODULES[depName]
  val = callback.apply(@, args)
  MODULES[moduleName] = val
  val

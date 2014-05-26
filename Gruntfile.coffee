module.exports = (grunt) ->

  fs = require('fs')
  pkg = require('./package.json')

  # Enable Sepia fixtures
  process.env['VCR_MODE'] ?= 'playback'

  # Project configuration.
  grunt.initConfig
    pkg: pkg

    # Lint
    # ----

    # CoffeeLint
    coffeelint:
      options:
        arrow_spacing:
          level: 'error'
        line_endings:
          level: 'error'
          value: 'unix'
        max_line_length:
          level: 'error'
          value: 150
        no_unnecessary_fat_arrows:
          level: "ignore"

      source: ['src/*.coffee']
      grunt: 'Gruntfile.coffee'


    # Dist
    # ----


    # Clean
    clean:
      files:
        src: [
          'dist/'
          'tmp/'
        ]
        # filter: 'isFile'


    # Compile CoffeeScript to JavaScript
    coffee:
      compile:
        options:
          bare: true
          sourceMap: false # true
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee']
          dest: 'tmp/coffee/'
          ext: '.js'
        ]

    transpile:
      amd:
        type: 'amd'
        moduleName: (srcWithoutExt, file) -> "./#{srcWithoutExt}"
        files: [
          expand: true
          cwd: 'tmp/coffee/'
          src: ['**/*.js']
          dest: 'tmp/'
          ext: '.amd.js'
        ]

      commonjs:
        type: 'cjs'
        files: [{
          expand: true
          cwd: 'tmp/coffee/'
          src: ['*.js']
          dest: 'dist/commonjs/'
          ext: '.js'
        }]

    concat:
      amd:
        src: 'tmp/**/*.amd.js',
        dest: 'tmp/octokat.all.js'


    browser:
      dist:
        src: ['vendor/loader.js', 'tmp/octokat.all.js']
        dest: 'dist/octokat.js'
        options:
          barename: './octokat'
          namespace: 'Octokat'

    # Release a new version and push upstream
    bump:
      options:
        commit: true
        push: true
        pushTo: ''
        commitFiles: ['package.json', 'bower.json', 'dist/octokat.js']
        # Files to bump the version number of
        files: ['package.json', 'bower.json']

    mochaTest:
      test:
        options:
          reporter: 'spec'
          require: 'coffee-script'
        src: ['test/**/node*.coffee']

    # Used for coveralls.io code coverage
    mochacov:
      options:
        coverage: true # use blanket
        reporter: 'spec'
        require: ['coffee-script']
        compilers: ['coffee:coffee-script']
      all: ['test/**/node*.coffee']

    # Code coverage in PhantomJS requires commenting out the following in
    # node_modules/mocha/mocha.js:
    # - `self.suiteURL(suite)`
    # - `self.testURL(test)`
    blanket_mocha:
      all: [ 'test/index.html' ]
      options:
        threshold: 54
        log: true
        reporter: 'Dot'

    mocha_phantomjs:
      all:
        options:
          urls: [ 'http://localhost:9876/test/index.html' ]

    connect:
      server:
        options:
          port: 9876
          base: '.'



  # Dependencies
  # ============
  for name of pkg.dependencies when name.substring(0, 6) is 'grunt-'
    grunt.loadNpmTasks(name)
  for name of pkg.devDependencies when name.substring(0, 6) is 'grunt-'
    if grunt.file.exists("./node_modules/#{name}")
      grunt.loadNpmTasks(name)

  # Tasks
  # =====

  grunt.registerMultiTask 'browser', "Export a module to the window", () ->
    opts = @options()
    @files.forEach (f) ->
      output = ["(function(globals) {"]

      output.push.apply(output, f.src.map(grunt.file.read))

      globalDeclare = '''
        window.<%= namespace %> = requireModule("<%= barename %>")["default"];

        if (typeof define === "function") {
          define('octokat', function() {
            return requireModule("<%= barename %>")["default"];
          });
        }
        '''

      output.push grunt.template.process globalDeclare,
        data:
          namespace: opts.namespace
          barename: opts.barename

      output.push('})(window);')

      grunt.file.write(f.dest, grunt.template.process(output.join('\n')))


  # Travis CI
  # -----

  grunt.registerTask 'dist', [
    'clean'
    'coffee'
    'transpile:amd'
    'concat:amd'
    'browser'

    'transpile:commonjs' # NodeJS
  ]

  grunt.registerTask 'test', [
    'dist'
    'mochaTest'
    'connect'
    'mocha_phantomjs'
    # 'blanket_mocha' # NOTE: Uncomment once the `suiteURL` problem noted above is fixed
  ]

  # Dist
  # -----
  grunt.registerTask 'release', [
    'test'
    'bump'
  ]

  grunt.registerTask 'release-minor', [
    'test'
    'bump:minor'
  ]

  # Default
  # -----
  grunt.registerTask 'default', [
    'test'
  ]

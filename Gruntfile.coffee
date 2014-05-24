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
          'dist/octokat.js'
          'tmp/helper-before.js'
          'tmp/octokat-coffee.js'
        ]
        filter: 'isFile'


    # Compile CoffeeScript to JavaScript
    coffee:
      compile:
        options:
          sourceMap: false # true
        files:
          'tmp/helper-before.js': ['build/helper-before.coffee']
          'tmp/octokat-coffee.js': [
            # The order of these is important because we use a much simpler AMD loader than RequireJS
            'src/grammar.coffee'
            'src/plus.coffee'
            'src/helper-base64.coffee'
            'src/helper-promise.coffee'
            'src/chainer.coffee'
            'src/replacer.coffee'
            'src/request.coffee'
            'src/octokat.coffee'
          ]

    concat:
      dist:
        src: [
            'tmp/helper-before.js'
            'tmp/octokat-coffee.js'
        ]
        dest: 'dist/octokat.js'


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

  # Travis CI
  # -----
  grunt.registerTask 'test', [
    'clean'
    'coffeelint'
    'coffee'
    'concat'
    'mochaTest'
    'connect'
    'mocha_phantomjs'
    #'blanket_mocha' NOTE: Uncomment once the `suiteURL` problem noted above is fixed
  ]

  # Dist
  # -----
  grunt.registerTask 'release', [
    'clean'
    'coffeelint'
    'coffee'
    'mochaTest'
    #'blanket_mocha'
    'bump'
  ]

  grunt.registerTask 'release-minor', [
    'clean'
    'coffeelint'
    'coffee'
    'mochaTest'
    #'blanket_mocha'
    'bump:minor'
  ]

  # Default
  # -----
  grunt.registerTask 'default', [
    'coffeelint'
    'clean'
    'coffee'
    'mochaTest'
    'connect'
    'mocha_phantomjs'
  ]

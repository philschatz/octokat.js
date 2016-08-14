module.exports = (grunt) ->

  fs = require('fs')
  pkg = require('./package.json')

  # Enable Sepia fixtures
  process.env['VCR_MODE'] ?= 'playback'

  # Project configuration.
  grunt.initConfig
    pkg: pkg

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

    watch:
      files: 'src/**/*.coffee'
      tasks: ['dist']


  # Dependencies
  # ============
  for name of pkg.dependencies when name.substring(0, 6) is 'grunt-'
    grunt.loadNpmTasks(name)
  for name of pkg.devDependencies when name.substring(0, 6) is 'grunt-'
    if grunt.file.exists("./node_modules/#{name}")
      grunt.loadNpmTasks(name)

  # Tasks
  # =====

  grunt.registerTask 'test', [
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

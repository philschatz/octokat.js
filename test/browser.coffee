require ['cs!./all'], () ->

  describe 'Root construction', () ->
    it 'can be instantiated via window.Octokat', () ->
      throw new Error('window.Octokat is not a function') unless window.Octokat?()

    it 'can be instantiated via require("octokat", cb)', (done) ->
      require ['octokat'], (Octokat) ->
        return done() if Octokat?()
        return done(new Error('Could not instantiate'))

  # from http://www.geekdave.com/2013/08/02/automated-code-coverage-enforcement-for-mocha-using-grunt-and-blanket/
  if @PHANTOMJS
    @blanket.options('reporter', '../node_modules/grunt-blanket-mocha/support/grunt-reporter.js')

  mocha.checkLeaks()

  # Needs to run once this file is loaded
  window.sepia.fixtureDir('node_modules/octokat-fixtures/fixtures')
  window.sepia.start()

  if window.mochaPhantomJS
    mochaPhantomJS.run()
  else
    mocha.run()

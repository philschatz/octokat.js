require ['cs!./all'], () ->

  # from http://www.geekdave.com/2013/08/02/automated-code-coverage-enforcement-for-mocha-using-grunt-and-blanket/
  if @PHANTOMJS
    @blanket.options('reporter', '../node_modules/grunt-blanket-mocha/support/grunt-reporter.js')

  mocha.checkLeaks()

  # Needs to run once this file is loaded
  window.sepia.start();

  if window.mochaPhantomJS
    mochaPhantomJS.run()
  else
    mocha.run()

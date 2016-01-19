define = window?.define or (deps, cb) -> cb((require(dep.replace('cs!', '')) for dep in deps)...)
define ['chai', 'cs!./test-config'], ({assert, expect}, {Octokat, TOKEN, REPO_USER, REPO_NAME}) ->

  describe 'Event Emitter', ->

    it 'emits when a request begins and when it completes', (done) ->
      emittedStart = false
      # emittedEnd = false
      emitter = (name, id, {method, path}, status, rate) ->
        expect(method).to.equal('GET')
        expect(path).to.be.a('string')
        switch name
          when 'start'
            emittedStart = true
          when 'end'
            expect(emittedStart).to.be.true
            expect(status).to.equal(200)
            expect(rate.remaining).to.be.gt(0)
            expect(rate.limit).to.be.gt(0)
            expect(rate.reset).to.be.gt(0)
            done()
          else
            done('Woah! odd event name ' + name)

      client = new Octokat({token: TOKEN, emitter: emitter})
      client.repos(REPO_USER, REPO_NAME).fetch().then (info) ->
        expect(info).to.not.be.null

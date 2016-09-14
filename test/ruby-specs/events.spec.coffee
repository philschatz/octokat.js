define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo} = require 'cs!../test-config'

  describe 'Events', () ->
    @timeout(LONG_TIMEOUT)

    it "returns all public events", ->
      client.events.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "returns all user events", ->
      client.users('sferik').events.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "returns public events performed by a user", ->
      client.users('sferik').events.public.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "returns all user received events", ->
      client.users('api-padawan').receivedEvents.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "returns public user received events", ->
      client.users('api-padawan').receivedEvents.public.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "returns events for a repository", ->
      client.repos('sferik/rails_admin').events.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    # TODO: returns all events for an organization

    it "returns an organization's public events", ->
      client.orgs('github').events.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "lists issue events for a repository", ->
      client.repos('octokit/octokit.rb').issues.events.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "lists issue events for a repository", ->
      client.repos('octokit/octokit.rb').issues(4).events.fetch()
      .then (events) ->
        expect(events).to.be.an.Array

    it "lists issue events for a repository", ->
      client.repos('octokit/octokit.rb').issues.events(37786228).fetch()
      .then (events) ->
        expect(events).to.be.an.Array

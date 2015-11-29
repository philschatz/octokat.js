# Examples from Unit Tests

This list is by no means exhaustive but only meant to illustrate some of the commands possible:

## Promises vs Callbacks

The examples below return a `Promise`. If you prefer callbacks, you can pass a callback as the last argument to the last function call (ie `.fetch(cb)`, `.read(cb)`, `.add(cb)`, `.create({...}, cb)`) instead.

# Repos

```coffee
repo = octo.repos(USER, REPO)

repo.fetch()
repo.readme.read()

repo.collaborators.fetch()
repo.collaborators('philschatz2').add()
repo.collaborators('philschatz2').remove()

repo.comments.fetch()
repo.comments(COMMENT_ID).fetch()

repo.commits.fetch()
repo.commits.fetch({"sha":"master"})
repo.commits.fetch({"since":"2011-01-20"})
repo.commits(COMMIT_ID).comments.create({"body":":metal:\n:sparkles:\n:cake:"})
repo.commits(COMMIT_ID).fetch()
repo.commits(COMMIT_ID).comments.fetch()

repo.compare(COMMIT_ID1, COMMIT_ID2).fetch()

repo.contents(PATH).read()
repo.contents(PATH).add({"message":"I am commit-ing","content":"SGVyZSBiZSB0aGUgY29udGVudAo="})
repo.contents(PATH).add({"sha":COMMIT_ID,"message":"I am commit-ing","content":"SGVyZSBiZSBtb2FyIGNvbnRlbnQ="})
repo.contents(PATH).fetch()
repo.contents(PATH).remove({"sha":COMMIT_ID,"message":"I am rm-ing"})

repo.downloads(DOWNLOAD_ID).fetch()
repo.downloads.fetch()
repo.events.fetch()

repo.git.blobs(BLOB_ID).read()
repo.git.blobs(BLOB_ID).readBinary()
repo.git.blobs.create({"content":"Hello","encoding":"utf-8"})
repo.git.blobs.create({"content":"SGVsbG8=","encoding":"base64"})
repo.git.commits(COMMIT_ID).fetch()
repo.git.commits.create({"message":"My commit message","tree":TREE_ID,"parents":[COMMIT_ID]})
repo.git.refs.create({"ref":"refs/heads/branch-to-merge","sha":SHA})
repo.git.refs.heads(branch-to-merge).remove()

repo.issues(4).events.fetch()
repo.issues.events(EVENT_ID).fetch()
repo.issues.events.fetch()

repo.merges.create({"base":"branch-to-merge","head":"master","commitMessage":"Testing the merge API"})

repo.stats.commit_activity.fetch()
repo.stats.contributors.fetch()
repo.stats.participation.fetch()
repo.stats.punch_card.fetch()
```

# Gists

```coffee
octo.gists.fetch()
octo.gists.starred.fetch()

octo.gists.create({"description":"Test Gist","public":false,"files":{"hello.txt":{"content":"Hello World"}}})

gist = octo.gists(GIST_ID)

gist.fetch()
gist.forks.create()
gist.update({"description":"GitHub Zen"})

gist.comments.fetch()
gist.comments.create({"body":":metal:"})

gist.comments(COMMENT_ID).fetch()
gist.comments(COMMENT_ID).remove()
gist.comments(COMMENT_ID).update({"body":":heart:"})
```

# Users

```coffee
octo.user.repos.fetch()
octo.user.starred('philschatz', 'octokat.js').add()

octo.users.fetch()
octo.users(USER).events.fetch()
octo.users(USER).events.public.fetch()
octo.users(USER).received_events.fetch()
octo.users(USER).received_events.public.fetch()
```

# Misc

```coffee
octo.events.fetch()
octo.orgs(ORG_NAME).events.fetch()

octo.licenses.fetch()
octo.licenses('MIT').fetch()
```

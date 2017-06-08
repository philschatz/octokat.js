

declare module 'octokat' {

  export interface Callback<T> {
    (error: Error | null, result: T): void
  }

  export type json = any
  export type FilesMap = any // Unfortunately, the keys of this object are the filenames

  // Base types
  export interface ParamFiles { files: Object }
export interface ParamBranch { branch: String }
export interface ParamClientId { client_id?: String }
export interface ParamSha { sha: String }
export interface ParamDescription { description?: String }
export interface ParamId { id: String }
export interface ParamRef { ref: String }
export interface ParamNumber { number: Number }
export interface ParamName { name: String }
export interface ParamDirection { direction?: "asc"|"desc" }
export interface ParamSince { since?: String }
export interface ParamUntil { until?: String }
export interface ParamState { state?: "open"|"closed"|"all" }
export interface ParamColor { color: String }
export interface ParamBase { base: String }
export interface ParamHead { head: String }
export interface ParamPath { path: String }
export interface ParamPosition { position: Number }
export interface ParamBody { body: String }
export interface ParamHomepage { homepage?: String }
export interface ParamPrivate { private?: Boolean }
export interface ParamHasIssues { has_issues?: Boolean }
export interface ParamHasWiki { has_wiki?: Boolean }
export interface ParamHasDownloads { has_downloads?: Boolean }
export interface ParamDefaultBranch { default_branch?: String }
export interface ParamTitle { title: String }
export interface ParamKey { key: String }
export interface ParamPage { page?: Number }
export interface ParamPerPage { per_page?: Number }
export interface ParamScopes { scopes?: string[] }
export interface ParamNote { note?: String }
export interface ParamNoteUrl { note_url?: String }
export interface ParamAutoInit { auto_init?: Boolean }
export interface ParamGitignoreTemplate { gitignore_template?: String }
export interface ParamLicenseTemplate { license_template?: String }
export interface ParamOrder { order?: "asc"|"desc" }
export interface ParamQ { q: String }
export interface ParamData { data: String }
export interface ParamPrivacy { privacy?: "secret"|"closed" }
export interface ParamFingerprint { fingerprint?: String }
export interface ParamAccessToken { access_token: String }
export interface ParamAssignees { assignees?: string[] }

  // Response Types
  export type Download = {
  readonly url: string
  readonly id: number
  readonly html_url: string
  readonly name: string
  readonly description: string
  readonly created_at: string
  readonly size: number
  readonly download_count: number
  readonly content_type: string
}

export type EventActor = {
  readonly id: number
  readonly login: string
  readonly display_login: string
  readonly gravatar_id?: string
  readonly url: string
  readonly avatar_url: string
}

export type File = {
  readonly content: CommitSlugMaybe
  readonly commit: GitCommit
}

export type FileContents = {
  readonly filename: string
  readonly type: string
  readonly language: string
  readonly raw_url: string
  readonly size: number
  readonly truncated: boolean
  readonly content: string
}

export type RepoReadmeFile = {
  readonly name: string
  readonly path: string
  readonly sha: string
  readonly size: number
  readonly url: string
  readonly html_url: string
  readonly git_url: string
  readonly download_url: string
  readonly type: 'file'
  readonly content: string
  readonly encoding: 'base64'
  readonly '_links': json
}

export type FileSlug = {
  readonly filename: string
  readonly type: string
  readonly language?: string
  readonly raw_url: string
  readonly size: number
}

export type Gist = {
  readonly url: string
  readonly forks_url: string
  readonly commits_url: string
  readonly id: string
  readonly git_pull_url: string
  readonly git_push_url: string
  readonly html_url: string
  readonly files: FilesMap
  readonly created_at: string
  readonly updated_at: string
  readonly description?: string
  readonly user?: UserWithName
  readonly comments_url: string
  readonly owner?: UserWithName
  readonly truncated: boolean
}

export type GitBlob = {
  readonly sha: string
  readonly url: string
}

export type RepoBranch = {
  readonly name: string
  readonly commit: GitBlob
}

export type GitCommit = {
  readonly sha: string
  readonly url: string
  readonly html_url: string
  readonly author: UserSlug
  readonly committer: UserSlug
  readonly tree: GitBlob
  readonly message: string
  readonly parents: CommitSlugMaybe[]
}

export type CommitSlugMaybe = {
  readonly name: string
  readonly path: string
  readonly sha: string
  readonly size: number
  readonly url: string
  readonly html_url: string
  readonly git_url: string
  readonly download_url: string
  readonly type: string
  readonly '_links': json
}

export type GitPatch = {
  readonly sha: string
  readonly filename: string
  readonly status: string
  readonly additions: number
  readonly deletions: number
  readonly changes: number
  readonly blob_url: string
  readonly raw_url: string
  readonly contents_url: string
  readonly patch: string
}

export type GitRef = {
  readonly ref: string
  readonly url: string
  readonly object: { readonly sha: string
  readonly type: string
  readonly url: string }
}

export type RepoIssue = {
  readonly url: string
  readonly repository_url: string
  readonly labels_url: string
  readonly comments_url: string
  readonly events_url: string
  readonly html_url: string
  readonly id: number
  readonly number: number
  readonly title: string
  readonly user: UserNoName
  readonly labels: IssueLabel[]
  readonly state: 'open' | 'closed'
  readonly locked: boolean
  readonly assignee?: UserNoName
  readonly assignees: UserNoName[]
  readonly milestone?: any
  readonly comments: number
  readonly created_at: string
  readonly updated_at: string
  readonly closed_at?: string
  readonly body?: string
  readonly closed_by?: UserNoName
}

export type IssueComment = {
  readonly url: string
  readonly html_url: string
  readonly issue_url: string
  readonly id: number
  readonly user: UserNoName
  readonly created_at: string
  readonly updated_at: string
  readonly body: string
}

export type IssueEvent = {
  readonly id: number
  readonly url: string
  readonly actor: UserNoName
  readonly event: string
  readonly commit_id?: any
  readonly commit_url?: any
  readonly created_at: string
  readonly 'RepoIssue'?: RepoIssue
}

export type IssueLabel = {
  readonly id: number
  readonly url: string
  readonly name: string
  readonly color: string
  readonly default: boolean
}

export type Organization = {
  readonly login: string
  readonly id: number
  readonly url: string
  readonly repos_url: string
  readonly events_url: string
  readonly hooks_url: string
  readonly issues_url: string
  readonly members_url: string
  readonly public_members_url: string
  readonly avatar_url: string
  readonly description?: any
  readonly has_organization_projects: boolean
  readonly has_repository_projects: boolean
  readonly public_repos: number
  readonly public_gists: number
  readonly followers: number
  readonly following: number
  readonly html_url: string
  readonly created_at: string
  readonly updated_at: string
  readonly type: string
  readonly total_private_repos: number
  readonly owned_private_repos: number
  readonly private_gists: number
  readonly disk_usage: number
  readonly collaborators: number
  readonly billing_email: string
  readonly plan: { readonly name: string
  readonly space: number
  readonly private_repos: number
  readonly filled_seats: number
  readonly seats: number }
  readonly default_repository_permission: string
  readonly members_can_create_repositories?: any
}

export type OrganizationSlug = {
  readonly login: string
  readonly id: number
  readonly url: string
  readonly repos_url: string
  readonly events_url: string
  readonly hooks_url: string
  readonly issues_url: string
  readonly members_url: string
  readonly public_members_url: string
  readonly avatar_url: string
  readonly description?: string
}

export type OrganizationSlug2 = {
  readonly id: number
  readonly login: string
  readonly display_login: string
  readonly gravatar_id: string
  readonly url: string
  readonly avatar_url: string
}

export type OrganizationSlug3 = {
  readonly id: number
  readonly login: string
  readonly gravatar_id: string
  readonly url: string
  readonly avatar_url: string
}

export type Rate = {
  readonly resources: RateResources
  readonly rate: RateRate
}

export type RateResources = {
  readonly core: RateRate
  readonly search: RateRate
  readonly graphql: RateRate
}

export type RateRate = {
  readonly limit: number
  readonly remaining: number
  readonly reset: number
}

export type RepoComment = {
  readonly url: string
  readonly html_url: string
  readonly id: number
  readonly user: UserNoName
  readonly position?: any
  readonly line?: any
  readonly path?: any
  readonly commit_id: string
  readonly created_at: string
  readonly updated_at: string
  readonly body: string
}

export type RepoCommitSingle = {
  readonly sha: string
  readonly commit: RepoCommitSingleSlug
  readonly url: string
  readonly html_url: string
  readonly comments_url: string
  readonly author: UserNoName
  readonly committer: UserNoName
  readonly parents: RepoCommitSingleSlug[]
  readonly stats: RepoDiffStats
  readonly files: GitPatch[]
}

export type RepoCommitSingleSlug = {
  readonly author: UserSlug
  readonly committer: UserSlug
  readonly message: string
  readonly tree: GitBlob
  readonly url: string
  readonly comment_count: number
}

export type RepoCommitItem = {
  readonly sha: string
  readonly commit: RepoCommitItemSlug1
  readonly url: string
  readonly html_url: string
  readonly comments_url: string
  readonly author: UserNoName
  readonly committer: UserNoName
  readonly parents: RepoCommitItemSlug2[]
  readonly stats?: RepoDiffStats
}

export type RepoCommitItemSlug1 = {
  readonly author: UserSlug
  readonly committer: UserSlug
  readonly message: string
  readonly url: string
  readonly comment_count: number
  readonly tree: GitBlob
}

export type RepoCommitItemSlug2 = {
  readonly sha: string
  readonly url: string
  readonly html_url: string
}

export type RepoDiffStats = {
  readonly total: number
  readonly additions: number
  readonly deletions: number
}

export type RepoCommitStatus = {
  readonly state: 'pending' | 'success' | 'error' | 'failure'
  readonly statuses: any[]
  readonly sha: string
  readonly total_count: number
  readonly commit_url: string
  readonly url: string
  readonly repository: RepoSlug
}

export type RepoContributors = {
  readonly login: string
  readonly id: number
  readonly avatar_url: string
  readonly gravatar_id: string
  readonly url: string
  readonly html_url: string
  readonly followers_url: string
  readonly following_url: string
  readonly gists_url: string
  readonly starred_url: string
  readonly subscriptions_url: string
  readonly organizations_url: string
  readonly repos_url: string
  readonly events_url: string
  readonly received_events_url: string
  readonly type: 'User' | 'Organization'
  readonly site_admin: boolean
  readonly contributions: number
}

export type RepoStatsContributors = {
  readonly author: UserWithName
  readonly total: number
  readonly weeks: RepoStatsContributorsWeek[]
}

export type RepoStatsContributorsWeek = {
  readonly w: string
  readonly a: number
  readonly d: number
  readonly c: number
}

export type RepoStatsCommits = {
  readonly days: number[]
  readonly total: number
  readonly week: number
}

export type RepoDeployment = {
  readonly url: string
  readonly id: number
  readonly sha: string
  readonly ref: string
  readonly task: 'deploy'
  readonly payload: json
  readonly environment: string
  readonly description?: string
  readonly creator: UserNoName
  readonly created_at: string
  readonly updated_at: string
  readonly statuses_url: string
  readonly repository_url: string
}

export type RepoEvent = {
  readonly id: string
  readonly type: string
  readonly actor: EventActor
  readonly repo: RepoSlug
  readonly payload: RepoEventPayload
  readonly public: boolean
  readonly created_at: string
}

export type RepoEventPayload = {
  readonly member?: UserWithName
  readonly action?: string
}

export type RepoPagesBuild = {
  readonly url: string
  readonly status: 'built'
  readonly error: RepoPagesBuildError
  readonly pusher: UserNoName
  readonly commit: string
  readonly duration: number
  readonly created_at: string
  readonly updated_at: string
}

export type RepoPagesBuildError = {
  readonly message?: any
}

export type RepoPermission = {
  readonly permission: 'admin' | 'read' | 'write'
  readonly user: UserNoName
  readonly url: string
}

export type RepoPullRequest = {
  readonly url: string
  readonly comments_url: string
  readonly html_url: string
  readonly id: number
  readonly number: number
  readonly title: string
  readonly user: UserNoName
  readonly state: 'open' | 'closed'
  readonly locked: boolean
  readonly assignee?: UserNoName
  readonly assignees: UserWithName[]
  readonly milestone?: any
  readonly comments: number
  readonly created_at: string
  readonly updated_at: string
  readonly closed_at?: string
  readonly body?: string
  readonly closed_by?: UserNoName
  readonly merged_at?: string
  readonly merge_commit_sha?: string
  readonly requested_reviewers: UserWithName[]
  readonly review_comments_url: string
  readonly review_comment_url: string
  readonly statuses_url: string
  readonly head: RepoPullRequestRef
  readonly base: RepoPullRequestRef
  readonly '_links': json
  readonly merged: boolean
  readonly mergeable?: boolean
  readonly rebaseable?: any
  readonly mergeable_state: 'unknown'
  readonly merged_by?: UserNoName
  readonly review_comments: number
  readonly maintainer_can_modify: boolean
  readonly commits: number
  readonly additions: number
  readonly deletions: number
  readonly changed_files: number
}

export type RepoPullRequestRef = {
  readonly label: string
  readonly ref: string
  readonly sha: string
  readonly user: UserNoName
  readonly repo: Repository
}

export type RepoPullRequestReview = {
  readonly id: number
  readonly user: UserNoName
  readonly body: string
  readonly state: 'COMMENTED' | 'APPROVED' | 'REQUESTED_CHANGES' | 'PENDING'
  readonly html_url: string
  readonly pull_request_url: string
  readonly '_links': json
  readonly submitted_at: string
  readonly commit_id: string
  readonly url?: string
}

export type RepoStatsParticipation = {
  readonly all: number[]
  readonly owner: number[]
  readonly url: string
}

export type RepoSlug = {
  readonly id: number
  readonly name: string
  readonly url: string
}

export type RepoSubscription = {
  readonly subscribed: boolean
  readonly ignored: boolean
  readonly reason?: any
  readonly created_at: string
  readonly url: string
  readonly repository_url: string
}

export type RepoTrafficClones = {
  readonly clones: any[]
  readonly url: string
  readonly count: number
  readonly uniques: number
}

export type RepoTrafficReferrer = {
  readonly referrer: string
  readonly count: number
  readonly uniques: number
}

export type RepoTrafficPath = {
  readonly path: string
  readonly title: string
  readonly count: number
  readonly uniques: number
}

export type RepoTrafficViews = {
  readonly views: RepoTrafficView[]
  readonly url: string
  readonly count: number
  readonly uniques: number
}

export type RepoTrafficView = {
  readonly timestamp: string
  readonly count: number
  readonly uniques: number
}

export type Repository = {
  readonly id: number
  readonly name: string
  readonly full_name: string
  readonly owner: UserNoName
  readonly private: boolean
  readonly html_url: string
  readonly description?: string
  readonly fork: boolean
  readonly url: string
  readonly forks_url: string
  readonly keys_url: string
  readonly collaborators_url: string
  readonly teams_url: string
  readonly hooks_url: string
  readonly issue_events_url: string
  readonly events_url: string
  readonly assignees_url: string
  readonly branches_url: string
  readonly tags_url: string
  readonly blobs_url: string
  readonly git_tags_url: string
  readonly git_refs_url: string
  readonly trees_url: string
  readonly statuses_url: string
  readonly languages_url: string
  readonly stargazers_url: string
  readonly contributors_url: string
  readonly subscribers_url: string
  readonly subscription_url: string
  readonly commits_url: string
  readonly git_commits_url: string
  readonly comments_url: string
  readonly issue_comment_url: string
  readonly contents_url: string
  readonly compare_url: string
  readonly merges_url: string
  readonly archive_url: string
  readonly downloads_url: string
  readonly issues_url: string
  readonly pulls_url: string
  readonly milestones_url: string
  readonly notifications_url: string
  readonly labels_url: string
  readonly releases_url: string
  readonly deployments_url: string
  readonly created_at: string
  readonly updated_at: string
  readonly pushed_at: string
  readonly git_url: string
  readonly ssh_url: string
  readonly clone_url: string
  readonly svn_url: string
  readonly homepage?: any
  readonly size: number
  readonly stargazers_count: number
  readonly watchers_count: number
  readonly language?: string
  readonly has_issues: boolean
  readonly has_projects: boolean
  readonly has_downloads: boolean
  readonly has_wiki: boolean
  readonly has_pages: boolean
  readonly forks_count: number
  readonly mirror_url?: any
  readonly open_issues_count: number
  readonly forks?: number
  readonly open_issues: number
  readonly watchers: number
  readonly default_branch: string
  readonly permissions?: RepositoryPermissions
}

export type RepositoryPermissions = {
  readonly admin: boolean
  readonly push: boolean
  readonly pull: boolean
}

export type RootFeeds = {
  readonly timeline_url: string
  readonly user_url: string
  readonly current_user_public_url: string
  readonly '_links': json
  readonly url: string
}

export type RootLicense = {
  readonly key: string
  readonly name: string
  readonly spdx_id: string
  readonly url: string
  readonly featured: boolean
}

export type RootMeta = {
  readonly verifiable_password_authentication: boolean
  readonly github_services_sha: string
  readonly hooks: string[]
  readonly git: string[]
  readonly pages: string[]
  readonly importer: string[]
  readonly url: string
}

export type RootNotification = {
  readonly id: string
  readonly unread: boolean
  readonly reason: 'assign' | 'author' | 'comment' | 'invitation' | 'manual' | 'mention' | 'state_change' | 'subscribed' | 'team_mention' | 'review_requested' | 'review_request_removed'
  readonly updated_at: string
  readonly last_read_at?: string
  readonly subject: RootNotificationSubject
  readonly repository: RepoSlug
  readonly url: string
  readonly subscription_url: string
}

export type RootNotificationSubject = {
  readonly title: string
  readonly url: string
  readonly latest_comment_url?: string
  readonly type: 'Issue' | 'PullRequest'
}

export type RootTeam = {
  readonly name: string
  readonly id: number
  readonly slug: string
  readonly description?: string
  readonly privacy: 'secret' | 'closed'
  readonly url: string
  readonly members_url: string
  readonly repositories_url: string
  readonly permission: 'push' | 'pull' | 'admin'
  readonly members_count: number
  readonly repos_count: number
  readonly organization: OrganizationSlug
}





export type Stargazer = {
  readonly starred_at: string
  readonly repo: Repository
}

export type UserWithName = {
  readonly login: string
  readonly name: string
  readonly id: number
  readonly avatar_url: string
  readonly gravatar_id: string
  readonly url: string
  readonly html_url: string
  readonly followers_url: string
  readonly following_url: string
  readonly gists_url: string
  readonly starred_url: string
  readonly subscriptions_url: string
  readonly organizations_url: string
  readonly repos_url: string
  readonly events_url: string
  readonly received_events_url: string
  readonly type: 'User' | 'Organization'
  readonly site_admin: boolean
}

export type UserNoName = {
  readonly login: string
  readonly id: number
  readonly avatar_url: string
  readonly gravatar_id: string
  readonly url: string
  readonly html_url: string
  readonly followers_url: string
  readonly following_url: string
  readonly gists_url: string
  readonly starred_url: string
  readonly subscriptions_url: string
  readonly organizations_url: string
  readonly repos_url: string
  readonly events_url: string
  readonly received_events_url: string
  readonly type: 'User' | 'Organization'
  readonly site_admin: boolean
}

export type UserEmail = {
  readonly email: string
  readonly primary: boolean
  readonly verified: boolean
  readonly visibility?: 'public' | 'private'
}

export type UserSlug = {
  readonly name: string
  readonly email: string
  readonly date: string
}

  export type SearchResult<T> = {
    readonly total_count: number
    readonly incomplete_results: boolean
    readonly items: T[]
    readonly nextPage?:     { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
    readonly previousPage?: { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
    readonly firstPage?:    { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
    readonly lastPage?:     { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
  }


  // Input Param Types
  export type OctokatApplicationsGrantsFnGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatApplicationsGrantsFnDeleteParams = & ParamId & {  }
export type OctokatApplicationsGrantsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatAuthorizationsFnGetParams = & ParamId & {  }
export type OctokatAuthorizationsFnPatchParams = & ParamId
& ParamScopes
& ParamNote
& ParamNoteUrl
& ParamFingerprint & { add_scopes?: String[];
remove_scopes?: String[]; }
export type OctokatAuthorizationsFnDeleteParams = & ParamId & {  }
export type OctokatAuthorizationsClientsPutParams = & ParamScopes
& ParamNote
& ParamNoteUrl
& ParamFingerprint & { client_secret: String; }
export type OctokatAuthorizationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatAuthorizationsPostParams = & ParamScopes
& ParamNote
& ParamNoteUrl
& ParamClientId
& ParamFingerprint & { client_secret?: String; }
export type OctokatEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnLockPutParams = & ParamNumber & {  }
export type OctokatReposIssuesFnLockDeleteParams = & ParamNumber & {  }
export type OctokatReposIssuesFnAssigneesPostParams = & ParamNumber & { assignees: String[]; }
export type OctokatReposIssuesFnAssigneesDeleteParams = & ParamNumber
& ParamAssignees & {  }
export type OctokatReposIssuesFnCommentsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnCommentsPostParams = & ParamNumber
& ParamBody & {  }
export type OctokatReposIssuesFnEventsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnLabelsFnDeleteParams = & ParamNumber & { name: String; }
export type OctokatReposIssuesFnLabelsGetParams = & ParamNumber & {  }
export type OctokatReposIssuesFnLabelsPostParams = & ParamNumber & { labels: String[]; }
export type OctokatReposIssuesFnLabelsPutParams = & ParamNumber & { labels: String[]; }
export type OctokatReposIssuesFnLabelsDeleteParams = & ParamNumber & {  }
export type OctokatReposIssuesFnTimelineGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnReactionsGetParams = & ParamNumber & { content?: String; }
export type OctokatReposIssuesFnReactionsPostParams = & ParamNumber & { content: String; }
export type OctokatReposIssuesFnGetParams = & ParamNumber & {  }
export type OctokatReposIssuesFnPatchParams = & ParamNumber
& ParamAssignees & { title?: String;
body?: String;
assignee?: String;
state?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposIssuesEventsFnGetParams = & ParamId & {  }
export type OctokatReposIssuesEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesCommentsFnReactionsGetParams = & ParamId & { content?: String; }
export type OctokatReposIssuesCommentsFnReactionsPostParams = & ParamId & { content: String; }
export type OctokatReposIssuesCommentsFnGetParams = & ParamId & {  }
export type OctokatReposIssuesCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatReposIssuesCommentsFnDeleteParams = & ParamId & {  }
export type OctokatReposIssuesCommentsGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { milestone?: String;
state?: String;
assignee?: String;
creator?: String;
mentioned?: String;
labels?: String;
sort?: String; }
export type OctokatReposIssuesPostParams = & ParamAssignees & { title: String;
body?: String;
assignee?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposNotificationsGetParams = & ParamSince & { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatReposNotificationsPutParams =  & { last_read_at?: String; }
export type OctokatReposStargazersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposSubscribersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposSubscriptionGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposSubscriptionPutParams =  & { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatReposGitBlobsFnGetParams = & ParamSha
& ParamPage
& ParamPerPage & {  }
export type OctokatReposGitBlobsPostParams =  & { content: String;
encoding: String; }
export type OctokatReposGitCommitsFnGetParams = & ParamSha & {  }
export type OctokatReposGitCommitsPostParams =  & { message: String;
tree: String;
parents: String[];
author?: Object;
committer?: Object; }
export type OctokatReposGitRefsFnPatchParams = & ParamSha & { force?: Boolean; }
export type OctokatReposGitRefsTagsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposGitRefsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposGitRefsPostParams = & ParamSha & { ref: String; }
export type OctokatReposGitTagsPostParams =  & { tag: String;
message: String;
object: String;
type: String;
tagger: Object; }
export type OctokatReposGitTreesFnGetParams =  & { recursive?: Boolean; }
export type OctokatReposGitTreesPostParams =  & { tree: Object;
base_tree?: String; }
export type OctokatReposAssigneesFnGetParams =  & { assignee: String; }
export type OctokatReposLabelsFnGetParams = & ParamName & {  }
export type OctokatReposLabelsFnPatchParams = & ParamColor & { name: String; }
export type OctokatReposLabelsFnDeleteParams = & ParamName & {  }
export type OctokatReposLabelsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposLabelsPostParams = & ParamName
& ParamColor & {  }
export type OctokatReposMilestonesFnLabelsGetParams = & ParamNumber & {  }
export type OctokatReposMilestonesFnGetParams = & ParamNumber & {  }
export type OctokatReposMilestonesFnPatchParams = & ParamNumber
& ParamState
& ParamDescription & { title: String;
due_on?: Date; }
export type OctokatReposMilestonesFnDeleteParams = & ParamNumber & {  }
export type OctokatReposMilestonesGetParams = & ParamState
& ParamPage
& ParamPerPage & { sort?: String;
direction?: String; }
export type OctokatReposMilestonesPostParams = & ParamState
& ParamDescription & { title: String;
due_on?: Date; }
export type OctokatReposImportAuthorsFnPatchParams =  & { author_id: String;
email?: String;
name?: String; }
export type OctokatReposImportAuthorsGetParams =  & { since?: String; }
export type OctokatReposImportPutParams =  & { vcs_url: String;
vcs?: String;
vcs_username?: String;
vcs_password?: String;
tfvc_project?: String; }
export type OctokatReposProjectsPostParams = & ParamName & { body?: String; }
export type OctokatReposPullsFnCommitsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnFilesGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnMergeGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnMergePutParams = & ParamNumber & { commit_title?: String;
commit_message?: String;
sha?: String;
merge_method?: String; }
export type OctokatReposPullsFnReviewsFnCommentsGetParams = & ParamNumber
& ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnReviewsFnEventsPostParams = & ParamNumber
& ParamId & { body?: String;
event?: String; }
export type OctokatReposPullsFnReviewsFnDismissalsPutParams = & ParamNumber
& ParamId
& ParamPage
& ParamPerPage & { message?: String; }
export type OctokatReposPullsFnReviewsFnGetParams = & ParamNumber
& ParamId & {  }
export type OctokatReposPullsFnReviewsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnReviewsPostParams = & ParamNumber & { body?: String;
event?: String;
comments?: String[];
path?: String;
position?: Number; }
export type OctokatReposPullsFnCommentsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnCommentsPostParams = & ParamNumber
& ParamBody & { in_reply_to: Number; }
export type OctokatReposPullsFnRequestedReviewersGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnRequestedReviewersPostParams = & ParamNumber & { reviewers?: String[]; }
export type OctokatReposPullsFnRequestedReviewersDeleteParams = & ParamNumber & { reviewers?: String[]; }
export type OctokatReposPullsFnGetParams = & ParamNumber & {  }
export type OctokatReposPullsFnPatchParams = & ParamNumber
& ParamState & { title?: String;
body?: String;
base?: String; }
export type OctokatReposPullsCommentsFnReactionsGetParams = & ParamId & { content?: String; }
export type OctokatReposPullsCommentsFnReactionsPostParams = & ParamId & { content: String; }
export type OctokatReposPullsCommentsFnGetParams = & ParamId & {  }
export type OctokatReposPullsCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatReposPullsCommentsFnDeleteParams = & ParamId & {  }
export type OctokatReposPullsCommentsGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposPullsGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { state?: String;
head?: String;
base?: String;
sort?: String; }
export type OctokatReposPullsPostParams = & ParamHead
& ParamBase & { issue: Number; }
export type OctokatReposCommentsFnReactionsGetParams = & ParamId & { content?: String; }
export type OctokatReposCommentsFnReactionsPostParams = & ParamId & { content: String; }
export type OctokatReposCommentsFnGetParams = & ParamId & {  }
export type OctokatReposCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatReposCommentsFnDeleteParams = & ParamId & {  }
export type OctokatReposCommentsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposContributorsGetParams = & ParamPage
& ParamPerPage & { anon?: Boolean; }
export type OctokatReposLanguagesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTagsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams =  & { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams =  & { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams =  & { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams = & ParamPage
& ParamPerPage & { include_admins?: Boolean;
strict?: Boolean;
contexts?: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksDeleteParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams =  & { include_admins?: Boolean; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams =  & { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams =  & { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams =  & { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPostParams =  & { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPutParams =  & { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams =  & { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionPutParams = & ParamPage
& ParamPerPage & { required_status_checks: Object;
required_pull_request_reviews: Object;
restrictions: Object; }
export type OctokatReposBranchesFnProtectionDeleteParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesGetParams = & ParamPage
& ParamPerPage & { protected?: Boolean; }
export type OctokatReposCollaboratorsFnPutParams =  & { permission?: String; }
export type OctokatReposCollaboratorsGetParams = & ParamPage
& ParamPerPage & { affiliation?: String; }
export type OctokatReposCommitsFnCommentsGetParams = & ParamPage
& ParamPerPage & { ref: String; }
export type OctokatReposCommitsFnCommentsPostParams = & ParamSha
& ParamBody & { path?: String;
position?: Number;
line?: Number; }
export type OctokatReposCommitsFnStatusesGetParams = & ParamPage
& ParamPerPage & { ref: String; }
export type OctokatReposCommitsFnStatusGetParams = & ParamPage
& ParamPerPage & { ref: String; }
export type OctokatReposCommitsFnGetParams = & ParamSha & {  }
export type OctokatReposCommitsGetParams = & ParamSince
& ParamUntil
& ParamPage
& ParamPerPage & { sha?: String;
path?: String;
author?: String; }
export type OctokatReposReadmeGetParams =  & { ref?: String; }
export type OctokatReposContentsGetParams =  & { path: String;
ref?: String; }
export type OctokatReposContentsPutParams =  & { path: String;
message: String;
content: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposContentsDeleteParams =  & { path: String;
message: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposTarballGetParams =  & { ref?: String; }
export type OctokatReposZipballGetParams =  & { ref?: String; }
export type OctokatReposKeysFnGetParams = & ParamId & {  }
export type OctokatReposKeysFnDeleteParams = & ParamId & {  }
export type OctokatReposKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposKeysPostParams = & ParamTitle
& ParamKey & { read_only?: Boolean; }
export type OctokatReposDeploymentsFnStatusesGetParams = & ParamId & {  }
export type OctokatReposDeploymentsFnStatusesPostParams = & ParamId & { state?: String;
target_url?: String;
log_url?: String;
description?: String;
environment_url?: String;
auto_inactive?: Boolean; }
export type OctokatReposDeploymentsGetParams = & ParamPage
& ParamPerPage & { sha?: String;
ref?: String;
task?: String;
environment?: String; }
export type OctokatReposDeploymentsPostParams =  & { ref: String;
task?: String;
auto_merge?: Boolean;
required_contexts?: String[];
payload?: String;
environment?: String;
description?: String;
transient_environment?: Boolean;
production_environment?: Boolean; }
export type OctokatReposDownloadsFnGetParams = & ParamId & {  }
export type OctokatReposDownloadsFnDeleteParams = & ParamId & {  }
export type OctokatReposDownloadsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposForksGetParams = & ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposForksPostParams =  & { organization?: String; }
export type OctokatReposMergesPostParams = & ParamBase
& ParamHead & { commit_message?: String; }
export type OctokatReposPagesBuildsFnGetParams = & ParamId & {  }
export type OctokatReposPagesBuildsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPagesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposReleasesFnAssetsGetParams = & ParamId & {  }
export type OctokatReposReleasesFnAssetsPostParams = & ParamId & { filePath: String;
name: String;
label?: String; }
export type OctokatReposReleasesFnGetParams = & ParamId & {  }
export type OctokatReposReleasesFnPatchParams = & ParamId & { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposReleasesFnDeleteParams = & ParamId & {  }
export type OctokatReposReleasesTagsGetParams =  & { tag: String; }
export type OctokatReposReleasesAssetsGetParams = & ParamId & {  }
export type OctokatReposReleasesAssetsPatchParams = & ParamId
& ParamName & { label?: String; }
export type OctokatReposReleasesAssetsDeleteParams = & ParamId & {  }
export type OctokatReposReleasesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposReleasesPostParams =  & { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposStatusesPostParams =  & { state: String;
target_url?: String;
description?: String;
context?: String; }
export type OctokatReposTrafficPopularReferrersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTrafficPopularPathsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTrafficViewsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTrafficClonesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposHooksFnTestsPostParams = & ParamId & {  }
export type OctokatReposHooksFnPingsPostParams = & ParamId & {  }
export type OctokatReposHooksFnGetParams = & ParamId & {  }
export type OctokatReposHooksFnPatchParams = & ParamId
& ParamName & { config: Object;
events?: String[];
add_events?: String[];
remove_events?: String[];
active?: Boolean; }
export type OctokatReposHooksFnDeleteParams = & ParamId & {  }
export type OctokatReposHooksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposHooksPostParams = & ParamName & { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatReposPatchParams = & ParamName
& ParamDescription
& ParamHomepage
& ParamPrivate
& ParamHasIssues
& ParamHasWiki
& ParamHasDownloads
& ParamDefaultBranch & { allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatNetworksEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatOrgsMigrationsFnArchiveGetParams = & ParamId & {  }
export type OctokatOrgsMigrationsFnArchiveDeleteParams = & ParamId & {  }
export type OctokatOrgsMigrationsFnReposLockDeleteParams = & ParamId & { repo_name: String; }
export type OctokatOrgsMigrationsFnGetParams = & ParamId & {  }
export type OctokatOrgsMigrationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsMigrationsPostParams =  & { repositories: String[];
lock_repositories?: Boolean;
exclude_attachments?: Boolean; }
export type OctokatOrgsMembersGetParams = & ParamPage
& ParamPerPage & { filter?: String;
role?: String; }
export type OctokatOrgsMembershipsPutParams =  & { role: String; }
export type OctokatOrgsOutsideCollaboratorsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsTeamsPostParams = & ParamName
& ParamPrivacy & { description?: String;
maintainers?: String[];
repo_names?: String[]; }
export type OctokatOrgsHooksFnPingsPostParams = & ParamId & {  }
export type OctokatOrgsHooksFnGetParams = & ParamId & {  }
export type OctokatOrgsHooksFnPatchParams = & ParamId & { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsHooksFnDeleteParams = & ParamId & {  }
export type OctokatOrgsHooksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsHooksPostParams =  & { name: String;
config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsBlocksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsProjectsPostParams = & ParamName & { body?: String; }
export type OctokatOrgsReposGetParams = & ParamPage
& ParamPerPage & { type?: String; }
export type OctokatOrgsReposPostParams = & ParamName
& ParamDescription
& ParamHomepage
& ParamPrivate
& ParamHasIssues
& ParamHasWiki
& ParamHasDownloads
& ParamAutoInit
& ParamGitignoreTemplate
& ParamLicenseTemplate & { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsPatchParams =  & { billing_email?: String;
company?: String;
email?: String;
location?: String;
name?: String;
description?: String;
default_repository_permission?: String;
members_can_create_repositories?: Boolean; }
export type OctokatUsersFnReceivedEventsPublicGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnReceivedEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnEventsPublicGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnEventsOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnStarredGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatUsersFnSubscriptionsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnGistsGetParams = & ParamSince
& ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnReposGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { type?: String;
sort?: String; }
export type OctokatUsersFnFollowersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnFollowingFnGetParams =  & { target_user: String; }
export type OctokatUsersFnFollowingGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnGetParams = & ParamId & {  }
export type OctokatUsersGetParams =  & { since?: Number; }
export type OctokatNotificationsThreadsSubscriptionGetParams = & ParamId & {  }
export type OctokatNotificationsThreadsSubscriptionPutParams = & ParamId & { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatNotificationsThreadsSubscriptionDeleteParams = & ParamId & {  }
export type OctokatNotificationsThreadsGetParams = & ParamId & {  }
export type OctokatNotificationsThreadsPatchParams = & ParamId & {  }
export type OctokatNotificationsGetParams = & ParamSince & { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatNotificationsPutParams =  & { last_read_at?: String; }
export type OctokatUserStarredFnGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserStarredGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatUserSubscriptionsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatUserReposGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { visibility?: String;
affiliation?: String;
type?: String;
sort?: String; }
export type OctokatUserReposPostParams = & ParamName
& ParamDescription
& ParamHomepage
& ParamPrivate
& ParamHasIssues
& ParamHasWiki
& ParamHasDownloads
& ParamAutoInit
& ParamGitignoreTemplate
& ParamLicenseTemplate & { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatUserOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserMembershipsOrgsFnPatchParams =  & { state: String; }
export type OctokatUserMembershipsOrgsGetParams =  & { state?: String; }
export type OctokatUserTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserPublicEmailsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserEmailsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserEmailsPostParams =  & { emails: String[]; }
export type OctokatUserEmailsDeleteParams =  & { emails: String[]; }
export type OctokatUserFollowersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserFollowingGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserKeysFnGetParams = & ParamId & {  }
export type OctokatUserKeysFnDeleteParams = & ParamId & {  }
export type OctokatUserKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserKeysPostParams = & ParamTitle
& ParamKey & {  }
export type OctokatUserGpgKeysFnGetParams = & ParamId & {  }
export type OctokatUserGpgKeysFnDeleteParams = & ParamId & {  }
export type OctokatUserGpgKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserGpgKeysPostParams =  & { armored_public_key: String; }
export type OctokatUserPatchParams =  & { name?: String;
email?: String;
blog?: String;
company?: String;
location?: String;
hireable?: Boolean;
bio?: String; }
export type OctokatGistsFnCommitsGetParams = & ParamId & {  }
export type OctokatGistsFnStarGetParams = & ParamId & {  }
export type OctokatGistsFnStarPutParams = & ParamId & {  }
export type OctokatGistsFnStarDeleteParams = & ParamId & {  }
export type OctokatGistsFnForksGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatGistsFnForksPostParams = & ParamId & {  }
export type OctokatGistsFnCommentsFnGetParams = & ParamId & {  }
export type OctokatGistsFnCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatGistsFnCommentsFnDeleteParams = & ParamId & {  }
export type OctokatGistsFnCommentsGetParams = & ParamId & {  }
export type OctokatGistsFnCommentsPostParams = & ParamId
& ParamBody & {  }
export type OctokatGistsFnGetParams = & ParamId & {  }
export type OctokatGistsFnPatchParams = & ParamId
& ParamDescription
& ParamFiles & { content?: String;
filename?: String; }
export type OctokatGistsFnDeleteParams = & ParamId & {  }
export type OctokatGistsPublicGetParams = & ParamSince & {  }
export type OctokatGistsStarredGetParams = & ParamSince & {  }
export type OctokatGistsGetParams = & ParamSince
& ParamPage
& ParamPerPage & {  }
export type OctokatGistsPostParams = & ParamFiles
& ParamDescription & { public: Boolean; }
export type OctokatIntegrationInstallationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatIntegrationIdentityUserPostParams =  & { nonce?: String; }
export type OctokatInstallationsAccessTokensPostParams =  & { user_id?: String; }
export type OctokatInstallationRepositoriesGetParams =  & { user_id?: String; }
export type OctokatIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatGitignoreTemplatesFnGetParams =  & { name: String; }
export type OctokatLicensesFnGetParams =  & { license: String; }
export type OctokatMarkdownRawPostParams = & ParamData & {  }
export type OctokatMarkdownPostParams =  & { text: String;
mode?: String;
context?: String; }
export type OctokatOrganizationsGetParams = & ParamPage
& ParamPerPage & { since?: String; }
export type OctokatTeamsMembersGetParams = & ParamId
& ParamPage
& ParamPerPage & { role?: String; }
export type OctokatTeamsMembershipsGetParams = & ParamId & {  }
export type OctokatTeamsMembershipsPutParams = & ParamId & { role?: String; }
export type OctokatTeamsMembershipsDeleteParams = & ParamId & {  }
export type OctokatTeamsReposFnGetParams = & ParamId & {  }
export type OctokatTeamsReposFnPutParams =  & { permission?: String; }
export type OctokatTeamsReposFnDeleteParams = & ParamId & {  }
export type OctokatTeamsReposGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatTeamsInvitationsGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatTeamsGetParams = & ParamId & {  }
export type OctokatTeamsPatchParams = & ParamId
& ParamName
& ParamPrivacy & { description?: String; }
export type OctokatTeamsDeleteParams = & ParamId & {  }
export type OctokatProjectsFnColumnsGetParams = & ParamId & {  }
export type OctokatProjectsFnColumnsPostParams = & ParamId
& ParamName & {  }
export type OctokatProjectsFnGetParams = & ParamId & {  }
export type OctokatProjectsFnPatchParams = & ParamId
& ParamName & { body?: String; }
export type OctokatProjectsFnDeleteParams = & ParamId & {  }
export type OctokatProjectsColumnsFnCardsPostParams =  & { note?: String;
content_id?: String;
content_type?: String; }
export type OctokatProjectsColumnsFnMovesPostParams = & ParamId & { position: String; }
export type OctokatProjectsColumnsFnGetParams = & ParamId & {  }
export type OctokatProjectsColumnsFnPatchParams = & ParamId
& ParamName & {  }
export type OctokatProjectsColumnsFnDeleteParams = & ParamId & {  }
export type OctokatProjectsColumnsCardsMovesPostParams = & ParamId & { position: String;
column_id?: String; }
export type OctokatProjectsColumnsCardsGetParams = & ParamId & {  }
export type OctokatProjectsColumnsCardsPatchParams = & ParamId & { note?: String; }
export type OctokatProjectsColumnsCardsDeleteParams = & ParamId & {  }
export type OctokatReactionsDeleteParams = & ParamId & {  }
export type OctokatRepositoriesFnCommunityProfileGetParams = & ParamId & {  }
export type OctokatRepositoriesFnInvitationsFnPatchParams = & ParamId & { permission?: String; }
export type OctokatRepositoriesFnInvitationsFnDeleteParams = & ParamId & {  }
export type OctokatRepositoriesFnInvitationsGetParams = & ParamId & {  }
export type OctokatRepositoriesFnGetParams = & ParamId & {  }
export type OctokatRepositoriesGetParams =  & { since?: String; }
export type OctokatSearchRepositoriesGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchCodeGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchCommitsGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchIssuesGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchUsersGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { q: String;
sort?: String; }
export type OctokatLegacyUserEmailGetParams =  & { email: String; }
export type OctokatEnterpriseStatsGetParams =  & { type: String; }
export type OctokatAdminLdapUsersMappingPatchParams =  & { ldap_dn: String; }
export type OctokatAdminLdapTeamsMappingPatchParams =  & { team_id: Number;
ldap_dn: String; }
export type OctokatAdminLdapTeamsSyncPostParams =  & { team_id: Number; }
export type OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsFnDownloadsPostParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsFnGetParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsFnPatchParams = & ParamId & { name: String;
image_url: String; }
export type OctokatAdminPreReceiveEnvironmentsFnDeleteParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsPostParams =  & { name: String;
image_url: String; }
export type OctokatAdminPreReceiveHooksFnGetParams = & ParamId & {  }
export type OctokatAdminPreReceiveHooksFnPatchParams = & ParamId & { hook: Object; }
export type OctokatAdminPreReceiveHooksFnDeleteParams = & ParamId & {  }
export type OctokatAdminPreReceiveHooksPostParams =  & { name: String;
script: String;
script_repository: Object;
environment: Object;
enforcement?: String;
allow_downstream_configuration?: Boolean; }
export type OctokatAdminOrganizationsPostParams =  & { login: String;
admin: String;
profile_name?: String; }
export type OctokatStaffIndexingJobsPostParams =  & { target: String; }

  export default class Octokat {
    constructor(options?: Object)
    

applications: { 
(client_id: String): { 


// Syntactic shortcut used here
tokens(access_token: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }


 }
grants: { 
(application_id: String): { 


fetch(params?: OctokatApplicationsGrantsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatApplicationsGrantsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatApplicationsGrantsFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatApplicationsGrantsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatApplicationsGrantsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatApplicationsGrantsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatApplicationsGrantsGetParams, callback?: Callback<any>): Promise<any>
 }

 }
authorizations: { 
(authorization_id: String): { 


fetch(params?: OctokatAuthorizationsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAuthorizationsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAuthorizationsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatAuthorizationsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatAuthorizationsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
clients(client_id: String): { 


add(params: OctokatAuthorizationsClientsPutParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatAuthorizationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAuthorizationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAuthorizationsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatAuthorizationsPostParams, callback?: Callback<any>): Promise<any>
 }
events: { 


fetch(params?: OctokatEventsGetParams, callback?: Callback<SearchResult<RepoEvent>>): Promise<SearchResult<RepoEvent>>
fetchAll(params?: OctokatEventsGetParams, callback?: Callback<RepoEvent[]>): Promise<RepoEvent[]>
read(params?: OctokatEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatEventsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
repos(owner: String, repo: String): { 

events: { 


fetch(params?: OctokatReposEventsGetParams, callback?: Callback<SearchResult<RepoEvent>>): Promise<SearchResult<RepoEvent>>
fetchAll(params?: OctokatReposEventsGetParams, callback?: Callback<RepoEvent[]>): Promise<RepoEvent[]>
read(params?: OctokatReposEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposEventsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 
(issue_number: Number): { 

lock: { 


add(params?: OctokatReposIssuesFnLockPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposIssuesFnLockDeleteParams, callback?: Callback<any>): Promise<any>
 }
assignees: { 


create(params: OctokatReposIssuesFnAssigneesPostParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposIssuesFnAssigneesDeleteParams, callback?: Callback<void>): Promise<void>
 }
comments: { 


fetch(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<SearchResult<IssueComment>>): Promise<SearchResult<IssueComment>>
fetchAll(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<IssueComment[]>): Promise<IssueComment[]>
read(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposIssuesFnCommentsPostParams, callback?: Callback<IssueComment>): Promise<IssueComment>
 }
events: { 


fetch(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<SearchResult<IssueEvent>>): Promise<SearchResult<IssueEvent>>
fetchAll(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<IssueEvent[]>): Promise<IssueEvent[]>
read(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<any>): Promise<any>
 }
labels: { 
(name: String): { 


remove(params: OctokatReposIssuesFnLabelsFnDeleteParams, callback?: Callback<void>): Promise<void>
 }

fetch(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<IssueLabel[]>): Promise<IssueLabel[]>
read(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesFnLabelsPostParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
add(params: OctokatReposIssuesFnLabelsPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposIssuesFnLabelsDeleteParams, callback?: Callback<any>): Promise<any>
 }
timeline: { 


fetch(params?: OctokatReposIssuesFnTimelineGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposIssuesFnTimelineGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnTimelineGetParams, callback?: Callback<any>): Promise<any>
 }
reactions: { 


fetch(params?: OctokatReposIssuesFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposIssuesFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposIssuesFnGetParams, callback?: Callback<RepoIssue>): Promise<RepoIssue>
read(params?: OctokatReposIssuesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposIssuesFnPatchParams, callback?: Callback<RepoIssue>): Promise<RepoIssue>
 }
events: { 
(issue_event_id: String): { 


fetch(params?: OctokatReposIssuesEventsFnGetParams, callback?: Callback<IssueEvent>): Promise<IssueEvent>
read(params?: OctokatReposIssuesEventsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesEventsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<SearchResult<IssueEvent>>): Promise<SearchResult<IssueEvent>>
fetchAll(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<IssueEvent[]>): Promise<IssueEvent[]>
read(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(issue_comment_id: String): { 

reactions: { 


fetch(params?: OctokatReposIssuesCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposIssuesCommentsFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesCommentsFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposIssuesCommentsFnGetParams, callback?: Callback<IssueComment>): Promise<IssueComment>
read(params?: OctokatReposIssuesCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposIssuesCommentsFnPatchParams, callback?: Callback<IssueComment>): Promise<IssueComment>
remove(params?: OctokatReposIssuesCommentsFnDeleteParams, callback?: Callback<void>): Promise<void>
 }

fetch(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<SearchResult<IssueComment>>): Promise<SearchResult<IssueComment>>
fetchAll(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<IssueComment[]>): Promise<IssueComment[]>
read(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposIssuesGetParams, callback?: Callback<SearchResult<RepoIssue>>): Promise<SearchResult<RepoIssue>>
fetchAll(params?: OctokatReposIssuesGetParams, callback?: Callback<RepoIssue[]>): Promise<RepoIssue[]>
read(params?: OctokatReposIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesPostParams, callback?: Callback<RepoIssue>): Promise<RepoIssue>
 }
notifications: { 


fetch(params?: OctokatReposNotificationsGetParams, callback?: Callback<SearchResult<RootNotification>>): Promise<SearchResult<RootNotification>>
fetchAll(params?: OctokatReposNotificationsGetParams, callback?: Callback<RootNotification[]>): Promise<RootNotification[]>
read(params?: OctokatReposNotificationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposNotificationsGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatReposNotificationsPutParams, callback?: Callback<any>): Promise<any>
 }
stargazers: { 


fetch(params?: OctokatReposStargazersGetParams, callback?: Callback<SearchResult<Stargazer>>): Promise<SearchResult<Stargazer>>
fetchAll(params?: OctokatReposStargazersGetParams, callback?: Callback<Stargazer[]>): Promise<Stargazer[]>
read(params?: OctokatReposStargazersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposStargazersGetParams, callback?: Callback<any>): Promise<any>
 }
subscribers: { 


fetch(params?: OctokatReposSubscribersGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatReposSubscribersGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatReposSubscribersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposSubscribersGetParams, callback?: Callback<any>): Promise<any>
 }
subscription: { 


fetch(params?: OctokatReposSubscriptionGetParams, callback?: Callback<RepoSubscription>): Promise<RepoSubscription>
read(params?: OctokatReposSubscriptionGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposSubscriptionGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatReposSubscriptionPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
git: { 

blobs: { 
(blob_sha: String): { 


fetch(params?: OctokatReposGitBlobsFnGetParams, callback?: Callback<GitBlob>): Promise<GitBlob>
read(params?: OctokatReposGitBlobsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitBlobsFnGetParams, callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitBlobsPostParams, callback?: Callback<any>): Promise<any>
 }
commits: { 
(commit_sha: String): { 


fetch(params?: OctokatReposGitCommitsFnGetParams, callback?: Callback<GitCommit>): Promise<GitCommit>
read(params?: OctokatReposGitCommitsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitCommitsFnGetParams, callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitCommitsPostParams, callback?: Callback<GitCommit>): Promise<GitCommit>
 }
refs: { 
(ref: String): { 


fetch(callback?: Callback<GitCommit>): Promise<GitCommit>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params?: OctokatReposGitRefsFnPatchParams, callback?: Callback<GitRef>): Promise<GitRef>
remove(callback?: Callback<any>): Promise<any>
 }
tags: { 


fetch(params?: OctokatReposGitRefsTagsGetParams, callback?: Callback<GitRef>): Promise<GitRef>
read(params?: OctokatReposGitRefsTagsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitRefsTagsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposGitRefsGetParams, callback?: Callback<SearchResult<GitRef>>): Promise<SearchResult<GitRef>>
fetchAll(params?: OctokatReposGitRefsGetParams, callback?: Callback<GitRef[]>): Promise<GitRef[]>
read(params?: OctokatReposGitRefsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitRefsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposGitRefsPostParams, callback?: Callback<GitRef>): Promise<GitRef>
 }
tags: { 
(sha: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitTagsPostParams, callback?: Callback<any>): Promise<any>
 }
trees: { 
(sha: String): { 


fetch(params?: OctokatReposGitTreesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposGitTreesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitTreesFnGetParams, callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitTreesPostParams, callback?: Callback<any>): Promise<any>
 }

 }
assignees: { 
(assignee: String): { 


fetch(params: OctokatReposAssigneesFnGetParams, callback?: Callback<Boolean>): Promise<Boolean>
read(params: OctokatReposAssigneesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposAssigneesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
labels: { 
(label_name: String): { 


fetch(params?: OctokatReposLabelsFnGetParams, callback?: Callback<IssueLabel>): Promise<IssueLabel>
read(params?: OctokatReposLabelsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposLabelsFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposLabelsFnPatchParams, callback?: Callback<IssueLabel>): Promise<IssueLabel>
remove(params?: OctokatReposLabelsFnDeleteParams, callback?: Callback<void>): Promise<void>
 }

fetch(params?: OctokatReposLabelsGetParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposLabelsGetParams, callback?: Callback<IssueLabel[]>): Promise<IssueLabel[]>
read(params?: OctokatReposLabelsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposLabelsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposLabelsPostParams, callback?: Callback<IssueLabel>): Promise<IssueLabel>
 }
milestones: { 
(milestone_number: Number): { 

labels: { 


fetch(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<IssueLabel[]>): Promise<IssueLabel[]>
read(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposMilestonesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposMilestonesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposMilestonesFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposMilestonesFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposMilestonesFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposMilestonesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposMilestonesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposMilestonesGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposMilestonesPostParams, callback?: Callback<any>): Promise<any>
 }
import: { 

authors: { 
(author_id: String): { 


update(params: OctokatReposImportAuthorsFnPatchParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposImportAuthorsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposImportAuthorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposImportAuthorsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(callback?: Callback<any>): Promise<any>
add(params: OctokatReposImportPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
license: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
projects: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params?: OctokatReposProjectsPostParams, callback?: Callback<any>): Promise<any>
 }
pulls: { 
(pull_request_number: Number): { 

commits: { 


fetch(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<SearchResult<RepoCommitItem>>): Promise<SearchResult<RepoCommitItem>>
fetchAll(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<RepoCommitItem[]>): Promise<RepoCommitItem[]>
read(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
 }
files: { 


fetch(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<SearchResult<GitPatch>>): Promise<SearchResult<GitPatch>>
fetchAll(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<GitPatch[]>): Promise<GitPatch[]>
read(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<any>): Promise<any>
 }
merge: { 


fetch(params?: OctokatReposPullsFnMergeGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnMergeGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnMergeGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatReposPullsFnMergePutParams, callback?: Callback<any>): Promise<any>
 }
reviews: { 
(review_id: Number): { 

comments: { 


fetch(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
events: { 


create(params?: OctokatReposPullsFnReviewsFnEventsPostParams, callback?: Callback<any>): Promise<any>
 }
dismissals: { 


add(params?: OctokatReposPullsFnReviewsFnDismissalsPutParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsFnReviewsFnGetParams, callback?: Callback<RepoPullRequestReview>): Promise<RepoPullRequestReview>
read(params?: OctokatReposPullsFnReviewsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<SearchResult<RepoPullRequestReview>>): Promise<SearchResult<RepoPullRequestReview>>
fetchAll(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<RepoPullRequestReview[]>): Promise<RepoPullRequestReview[]>
read(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposPullsFnReviewsPostParams, callback?: Callback<any>): Promise<any>
 }
comments: { 


fetch(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposPullsFnCommentsPostParams, callback?: Callback<any>): Promise<any>
 }
requestedReviewers: { 


fetch(params?: OctokatReposPullsFnRequestedReviewersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnRequestedReviewersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnRequestedReviewersGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposPullsFnRequestedReviewersPostParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposPullsFnRequestedReviewersDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsFnGetParams, callback?: Callback<RepoPullRequest>): Promise<RepoPullRequest>
read(params?: OctokatReposPullsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposPullsFnPatchParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(pull_request_comment_id: String): { 

reactions: { 


fetch(params?: OctokatReposPullsCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsCommentsFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposPullsCommentsFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsCommentsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposPullsCommentsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposPullsCommentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsGetParams, callback?: Callback<SearchResult<RepoPullRequest>>): Promise<SearchResult<RepoPullRequest>>
fetchAll(params?: OctokatReposPullsGetParams, callback?: Callback<RepoPullRequest[]>): Promise<RepoPullRequest[]>
read(params?: OctokatReposPullsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposPullsPostParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(repo_comment_id: String): { 

reactions: { 


fetch(params?: OctokatReposCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposCommentsFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposCommentsFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposCommentsFnGetParams, callback?: Callback<RepoComment>): Promise<RepoComment>
read(params?: OctokatReposCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposCommentsFnPatchParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
remove(params?: OctokatReposCommentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params?: OctokatReposCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params?: OctokatReposCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
contributors: { 


fetch(params?: OctokatReposContributorsGetParams, callback?: Callback<SearchResult<RepoContributors>>): Promise<SearchResult<RepoContributors>>
fetchAll(params?: OctokatReposContributorsGetParams, callback?: Callback<RepoContributors[]>): Promise<RepoContributors[]>
read(params?: OctokatReposContributorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposContributorsGetParams, callback?: Callback<any>): Promise<any>
 }
languages: { 


fetch(params?: OctokatReposLanguagesGetParams, callback?: Callback<json>): Promise<json>
read(params?: OctokatReposLanguagesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposLanguagesGetParams, callback?: Callback<any>): Promise<any>
 }
teams: { 


fetch(params?: OctokatReposTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTeamsGetParams, callback?: Callback<any>): Promise<any>
 }
tags: { 


fetch(params?: OctokatReposTagsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTagsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTagsGetParams, callback?: Callback<any>): Promise<any>
 }
branches: { 
(branch: String): { 

protection: { 

requiredStatusChecks: { 

contexts: { 


fetch(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksDeleteParams, callback?: Callback<any>): Promise<any>
 }
requiredPullRequestReviews: { 


fetch(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
restrictions: { 

teams: { 


fetch(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams, callback?: Callback<any>): Promise<any>
 }
users: { 


fetch(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsUsersPostParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsUsersPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionGetParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposBranchesFnProtectionDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnGetParams, callback?: Callback<RepoBranch>): Promise<RepoBranch>
read(params?: OctokatReposBranchesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposBranchesGetParams, callback?: Callback<SearchResult<RepoBranch>>): Promise<SearchResult<RepoBranch>>
fetchAll(params?: OctokatReposBranchesGetParams, callback?: Callback<RepoBranch[]>): Promise<RepoBranch[]>
read(params?: OctokatReposBranchesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesGetParams, callback?: Callback<any>): Promise<any>
 }
collaborators: { 
(username: String): { 

permission: { 


fetch(callback?: Callback<RepoPermission>): Promise<RepoPermission>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(params?: OctokatReposCollaboratorsFnPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
 }
commits: { 
(commit_sha: String): { 

comments: { 


fetch(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposCommitsFnCommentsPostParams, callback?: Callback<any>): Promise<any>
 }
statuses: { 


fetch(params: OctokatReposCommitsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposCommitsFnStatusesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposCommitsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
 }
status: { 


fetch(params: OctokatReposCommitsFnStatusGetParams, callback?: Callback<RepoCommitStatus>): Promise<RepoCommitStatus>
read(params: OctokatReposCommitsFnStatusGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposCommitsFnStatusGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposCommitsFnGetParams, callback?: Callback<RepoCommitSingle>): Promise<RepoCommitSingle>
read(params?: OctokatReposCommitsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommitsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposCommitsGetParams, callback?: Callback<SearchResult<RepoCommitItem>>): Promise<SearchResult<RepoCommitItem>>
fetchAll(params?: OctokatReposCommitsGetParams, callback?: Callback<RepoCommitItem[]>): Promise<RepoCommitItem[]>
read(params?: OctokatReposCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommitsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
compare(base: String, head: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

readme: { 


fetch(params?: OctokatReposReadmeGetParams, callback?: Callback<RepoReadmeFile>): Promise<RepoReadmeFile>
read(params?: OctokatReposReadmeGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReadmeGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
contents(path: String): { 


fetch(params: OctokatReposContentsGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposContentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposContentsGetParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposContentsPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposContentsDeleteParams, callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
tarball(tarball_ref: String): { 


fetch(params?: OctokatReposTarballGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTarballGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTarballGetParams, callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
zipball(tarball_ref: String): { 


fetch(params?: OctokatReposZipballGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposZipballGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposZipballGetParams, callback?: Callback<any>): Promise<any>
 }

keys: { 
(key_id: String): { 


fetch(params?: OctokatReposKeysFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposKeysFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposKeysFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposKeysFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposKeysGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposKeysPostParams, callback?: Callback<any>): Promise<any>
 }
deployments: { 
(deployment_id: String): { 

statuses: { 


fetch(params?: OctokatReposDeploymentsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDeploymentsFnStatusesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDeploymentsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposDeploymentsFnStatusesPostParams, callback?: Callback<any>): Promise<any>
 }

 }

fetch(params?: OctokatReposDeploymentsGetParams, callback?: Callback<SearchResult<RepoDeployment>>): Promise<SearchResult<RepoDeployment>>
fetchAll(params?: OctokatReposDeploymentsGetParams, callback?: Callback<RepoDeployment[]>): Promise<RepoDeployment[]>
read(params?: OctokatReposDeploymentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDeploymentsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposDeploymentsPostParams, callback?: Callback<any>): Promise<any>
 }
downloads: { 
(download_id: String): { 


fetch(params?: OctokatReposDownloadsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDownloadsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDownloadsFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposDownloadsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposDownloadsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDownloadsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDownloadsGetParams, callback?: Callback<any>): Promise<any>
 }
forks: { 


fetch(params?: OctokatReposForksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposForksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposForksGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposForksPostParams, callback?: Callback<any>): Promise<any>
 }
merges: { 


create(params?: OctokatReposMergesPostParams, callback?: Callback<any>): Promise<any>
 }
pages: { 

builds: { 
(build_id: String): { 


fetch(params?: OctokatReposPagesBuildsFnGetParams, callback?: Callback<RepoPagesBuild>): Promise<RepoPagesBuild>
read(params?: OctokatReposPagesBuildsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPagesBuildsFnGetParams, callback?: Callback<any>): Promise<any>
 }
latest: { 


fetch(callback?: Callback<RepoPagesBuild>): Promise<RepoPagesBuild>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<SearchResult<RepoPagesBuild>>): Promise<SearchResult<RepoPagesBuild>>
fetchAll(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<RepoPagesBuild[]>): Promise<RepoPagesBuild[]>
read(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<any>): Promise<any>
create(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPagesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPagesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPagesGetParams, callback?: Callback<any>): Promise<any>
 }
releases: { 
(release_id: String): { 

assets: { 


fetch(params?: OctokatReposReleasesFnAssetsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesFnAssetsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesFnAssetsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposReleasesFnAssetsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposReleasesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposReleasesFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposReleasesFnDeleteParams, callback?: Callback<any>): Promise<any>
 }
latest: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
tags(tag: String): { 


fetch(params: OctokatReposReleasesTagsGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposReleasesTagsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposReleasesTagsGetParams, callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
assets(asset_id: String): { 


fetch(params?: OctokatReposReleasesAssetsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesAssetsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesAssetsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposReleasesAssetsPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposReleasesAssetsDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposReleasesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposReleasesPostParams, callback?: Callback<any>): Promise<any>
 }
stats: { 

contributors: { 


fetch(callback?: Callback<json>): Promise<json>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
commitActivity: { 


fetch(callback?: Callback<json>): Promise<json>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
codeFrequency: { 


fetch(callback?: Callback<json>): Promise<json>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
participation: { 


fetch(callback?: Callback<RepoStatsParticipation>): Promise<RepoStatsParticipation>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
punchCard: { 


fetch(callback?: Callback<SearchResult<number[]>>): Promise<SearchResult<number[]>>
fetchAll(callback?: Callback<number[][]>): Promise<number[][]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

 }

// Syntactic shortcut used here
statuses(sha: String): { 


create(params: OctokatReposStatusesPostParams, callback?: Callback<any>): Promise<any>
 }

traffic: { 

popular: { 

referrers: { 


fetch(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<SearchResult<RepoTrafficReferrer>>): Promise<SearchResult<RepoTrafficReferrer>>
fetchAll(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<RepoTrafficReferrer[]>): Promise<RepoTrafficReferrer[]>
read(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<any>): Promise<any>
 }
paths: { 


fetch(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<SearchResult<RepoTrafficPath>>): Promise<SearchResult<RepoTrafficPath>>
fetchAll(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<RepoTrafficPath[]>): Promise<RepoTrafficPath[]>
read(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<any>): Promise<any>
 }

 }
views: { 


fetch(params?: OctokatReposTrafficViewsGetParams, callback?: Callback<RepoTrafficViews>): Promise<RepoTrafficViews>
read(params?: OctokatReposTrafficViewsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficViewsGetParams, callback?: Callback<any>): Promise<any>
 }
clones: { 


fetch(params?: OctokatReposTrafficClonesGetParams, callback?: Callback<RepoTrafficClones>): Promise<RepoTrafficClones>
read(params?: OctokatReposTrafficClonesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficClonesGetParams, callback?: Callback<any>): Promise<any>
 }

 }
hooks: { 
(repo_hook_id: String): { 

tests: { 


create(params?: OctokatReposHooksFnTestsPostParams, callback?: Callback<any>): Promise<any>
 }
pings: { 


create(params?: OctokatReposHooksFnPingsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposHooksFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposHooksFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposHooksFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposHooksFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposHooksFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposHooksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposHooksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposHooksGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposHooksPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<Repository>): Promise<Repository>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params?: OctokatReposPatchParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
networks(owner: String, repo: String): { 

events: { 


fetch(params?: OctokatNetworksEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNetworksEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNetworksEventsGetParams, callback?: Callback<any>): Promise<any>
 }

 }


// Syntactic shortcut used here
orgs(org: String): { 

events: { 


fetch(params?: OctokatOrgsEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsEventsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 


fetch(params?: OctokatOrgsIssuesGetParams, callback?: Callback<SearchResult<RepoIssue>>): Promise<SearchResult<RepoIssue>>
fetchAll(params?: OctokatOrgsIssuesGetParams, callback?: Callback<RepoIssue[]>): Promise<RepoIssue[]>
read(params?: OctokatOrgsIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
migrations: { 
(migration_id: String): { 

archive: { 


fetch(params?: OctokatOrgsMigrationsFnArchiveGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsMigrationsFnArchiveGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMigrationsFnArchiveGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatOrgsMigrationsFnArchiveDeleteParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
repos(repo: String): { 

lock: { 


remove(params: OctokatOrgsMigrationsFnReposLockDeleteParams, callback?: Callback<any>): Promise<any>
 }

 }

fetch(params?: OctokatOrgsMigrationsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsMigrationsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMigrationsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsMigrationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsMigrationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMigrationsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatOrgsMigrationsPostParams, callback?: Callback<any>): Promise<any>
 }
members: { 
(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsMembersGetParams, callback?: Callback<SearchResult<UserWithName>>): Promise<SearchResult<UserWithName>>
fetchAll(params?: OctokatOrgsMembersGetParams, callback?: Callback<UserWithName[]>): Promise<UserWithName[]>
read(params?: OctokatOrgsMembersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMembersGetParams, callback?: Callback<any>): Promise<any>
 }
publicMembers: { 
(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<Boolean>): Promise<Boolean>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<SearchResult<UserWithName>>): Promise<SearchResult<UserWithName>>
fetchAll(callback?: Callback<UserWithName[]>): Promise<UserWithName[]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(params: OctokatOrgsMembershipsPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

invitations: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
outsideCollaborators: { 


fetch(params?: OctokatOrgsOutsideCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsOutsideCollaboratorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsOutsideCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
outsideCollaborator(username: String): { 


add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

teams: { 


fetch(params?: OctokatOrgsTeamsGetParams, callback?: Callback<SearchResult<RootTeam>>): Promise<SearchResult<RootTeam>>
fetchAll(params?: OctokatOrgsTeamsGetParams, callback?: Callback<RootTeam[]>): Promise<RootTeam[]>
read(params?: OctokatOrgsTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsTeamsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatOrgsTeamsPostParams, callback?: Callback<any>): Promise<any>
 }
hooks: { 
(org_hook_id: String): { 

pings: { 


create(params?: OctokatOrgsHooksFnPingsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatOrgsHooksFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsHooksFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsHooksFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatOrgsHooksFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatOrgsHooksFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsHooksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsHooksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsHooksGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatOrgsHooksPostParams, callback?: Callback<any>): Promise<any>
 }
blocks: { 
(username: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsBlocksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsBlocksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsBlocksGetParams, callback?: Callback<any>): Promise<any>
 }
projects: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params?: OctokatOrgsProjectsPostParams, callback?: Callback<any>): Promise<any>
 }
repos: { 


fetch(params?: OctokatOrgsReposGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsReposGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatOrgsReposPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatOrgsGetParams, callback?: Callback<Organization>): Promise<Organization>
read(params?: OctokatOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatOrgsPatchParams, callback?: Callback<Organization>): Promise<Organization>
 }

users: { 
(username: String): { 

receivedEvents: { 

public: { 


fetch(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<SearchResult<RepoEvent>>): Promise<SearchResult<RepoEvent>>
fetchAll(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<RepoEvent[]>): Promise<RepoEvent[]>
read(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<SearchResult<RepoEvent>>): Promise<SearchResult<RepoEvent>>
fetchAll(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<RepoEvent[]>): Promise<RepoEvent[]>
read(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<any>): Promise<any>
 }
events: { 

public: { 


fetch(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<SearchResult<RepoEvent>>): Promise<SearchResult<RepoEvent>>
fetchAll(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<RepoEvent[]>): Promise<RepoEvent[]>
read(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
orgs(org: String): { 


fetch(params?: OctokatUsersFnEventsOrgsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnEventsOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnEventsOrgsGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUsersFnEventsGetParams, callback?: Callback<SearchResult<RepoEvent>>): Promise<SearchResult<RepoEvent>>
fetchAll(params?: OctokatUsersFnEventsGetParams, callback?: Callback<RepoEvent[]>): Promise<RepoEvent[]>
read(params?: OctokatUsersFnEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnEventsGetParams, callback?: Callback<any>): Promise<any>
 }
starred: { 


fetch(params?: OctokatUsersFnStarredGetParams, callback?: Callback<SearchResult<Stargazer>>): Promise<SearchResult<Stargazer>>
fetchAll(params?: OctokatUsersFnStarredGetParams, callback?: Callback<Stargazer[]>): Promise<Stargazer[]>
read(params?: OctokatUsersFnStarredGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnStarredGetParams, callback?: Callback<any>): Promise<any>
 }
subscriptions: { 


fetch(params?: OctokatUsersFnSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnSubscriptionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
 }
gists: { 


fetch(params?: OctokatUsersFnGistsGetParams, callback?: Callback<SearchResult<Gist>>): Promise<SearchResult<Gist>>
fetchAll(params?: OctokatUsersFnGistsGetParams, callback?: Callback<Gist[]>): Promise<Gist[]>
read(params?: OctokatUsersFnGistsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnGistsGetParams, callback?: Callback<any>): Promise<any>
 }
orgs: { 


fetch(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<SearchResult<OrganizationSlug>>): Promise<SearchResult<OrganizationSlug>>
fetchAll(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<OrganizationSlug[]>): Promise<OrganizationSlug[]>
read(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<any>): Promise<any>
 }
repos: { 


fetch(params?: OctokatUsersFnReposGetParams, callback?: Callback<SearchResult<Repository>>): Promise<SearchResult<Repository>>
fetchAll(params?: OctokatUsersFnReposGetParams, callback?: Callback<Repository[]>): Promise<Repository[]>
read(params?: OctokatUsersFnReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnReposGetParams, callback?: Callback<any>): Promise<any>
 }
followers: { 


fetch(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<any>): Promise<any>
 }
following: { 
(target_user: String): { 


fetch(params: OctokatUsersFnFollowingFnGetParams, callback?: Callback<Boolean>): Promise<Boolean>
read(params: OctokatUsersFnFollowingFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatUsersFnFollowingFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<any>): Promise<any>
 }
keys: { 


fetch(params?: OctokatUsersFnKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnKeysGetParams, callback?: Callback<any>): Promise<any>
 }
siteAdmin: { 


add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
suspended: { 


add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatUsersFnGetParams, callback?: Callback<UserWithName>): Promise<UserWithName>
read(params?: OctokatUsersFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUsersGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatUsersGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatUsersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersGetParams, callback?: Callback<any>): Promise<any>
 }
feeds: { 


fetch(callback?: Callback<RootFeeds>): Promise<RootFeeds>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
notifications: { 


// Syntactic shortcut used here
threads(thread_id: String): { 

subscription: { 


fetch(params?: OctokatNotificationsThreadsSubscriptionGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNotificationsThreadsSubscriptionGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNotificationsThreadsSubscriptionGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatNotificationsThreadsSubscriptionPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatNotificationsThreadsSubscriptionDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatNotificationsThreadsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNotificationsThreadsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNotificationsThreadsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatNotificationsThreadsPatchParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatNotificationsGetParams, callback?: Callback<SearchResult<RootNotification>>): Promise<SearchResult<RootNotification>>
fetchAll(params?: OctokatNotificationsGetParams, callback?: Callback<RootNotification[]>): Promise<RootNotification[]>
read(params?: OctokatNotificationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNotificationsGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatNotificationsPutParams, callback?: Callback<any>): Promise<any>
 }
user: { 

starred: { 
(owner: String, repo: String): { 


fetch(params?: OctokatUserStarredFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserStarredFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserStarredFnGetParams, callback?: Callback<any>): Promise<any>
add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserStarredGetParams, callback?: Callback<SearchResult<Repository>>): Promise<SearchResult<Repository>>
fetchAll(params?: OctokatUserStarredGetParams, callback?: Callback<Repository[]>): Promise<Repository[]>
read(params?: OctokatUserStarredGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserStarredGetParams, callback?: Callback<any>): Promise<any>
 }
subscriptions: { 


fetch(params?: OctokatUserSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserSubscriptionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 


fetch(params?: OctokatUserIssuesGetParams, callback?: Callback<SearchResult<RepoIssue>>): Promise<SearchResult<RepoIssue>>
fetchAll(params?: OctokatUserIssuesGetParams, callback?: Callback<RepoIssue[]>): Promise<RepoIssue[]>
read(params?: OctokatUserIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
repos: { 


fetch(params?: OctokatUserReposGetParams, callback?: Callback<SearchResult<Repository>>): Promise<SearchResult<Repository>>
fetchAll(params?: OctokatUserReposGetParams, callback?: Callback<Repository[]>): Promise<Repository[]>
read(params?: OctokatUserReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserReposGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatUserReposPostParams, callback?: Callback<any>): Promise<any>
 }
orgs: { 


fetch(params?: OctokatUserOrgsGetParams, callback?: Callback<SearchResult<OrganizationSlug>>): Promise<SearchResult<OrganizationSlug>>
fetchAll(params?: OctokatUserOrgsGetParams, callback?: Callback<OrganizationSlug[]>): Promise<OrganizationSlug[]>
read(params?: OctokatUserOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserOrgsGetParams, callback?: Callback<any>): Promise<any>
 }
memberships: { 

orgs: { 
(org: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params: OctokatUserMembershipsOrgsFnPatchParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserMembershipsOrgsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserMembershipsOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserMembershipsOrgsGetParams, callback?: Callback<any>): Promise<any>
 }

 }
teams: { 


fetch(params?: OctokatUserTeamsGetParams, callback?: Callback<SearchResult<RootTeam>>): Promise<SearchResult<RootTeam>>
fetchAll(params?: OctokatUserTeamsGetParams, callback?: Callback<RootTeam[]>): Promise<RootTeam[]>
read(params?: OctokatUserTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserTeamsGetParams, callback?: Callback<any>): Promise<any>
 }
publicEmails: { 


fetch(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<SearchResult<UserEmail>>): Promise<SearchResult<UserEmail>>
fetchAll(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<UserEmail[]>): Promise<UserEmail[]>
read(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<any>): Promise<any>
 }
emails: { 


fetch(params?: OctokatUserEmailsGetParams, callback?: Callback<SearchResult<UserEmail>>): Promise<SearchResult<UserEmail>>
fetchAll(params?: OctokatUserEmailsGetParams, callback?: Callback<UserEmail[]>): Promise<UserEmail[]>
read(params?: OctokatUserEmailsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserEmailsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatUserEmailsPostParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatUserEmailsDeleteParams, callback?: Callback<any>): Promise<any>
 }
followers: { 


fetch(params?: OctokatUserFollowersGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatUserFollowersGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatUserFollowersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserFollowersGetParams, callback?: Callback<any>): Promise<any>
 }
following: { 
(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<Boolean>): Promise<Boolean>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserFollowingGetParams, callback?: Callback<SearchResult<UserNoName>>): Promise<SearchResult<UserNoName>>
fetchAll(params?: OctokatUserFollowingGetParams, callback?: Callback<UserNoName[]>): Promise<UserNoName[]>
read(params?: OctokatUserFollowingGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserFollowingGetParams, callback?: Callback<any>): Promise<any>
 }
keys: { 
(user_key_id: String): { 


fetch(params?: OctokatUserKeysFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserKeysFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserKeysFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatUserKeysFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserKeysGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatUserKeysPostParams, callback?: Callback<any>): Promise<any>
 }
gpgKeys: { 
(gpg_id: String): { 


fetch(params?: OctokatUserGpgKeysFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserGpgKeysFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserGpgKeysFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatUserGpgKeysFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserGpgKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserGpgKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserGpgKeysGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatUserGpgKeysPostParams, callback?: Callback<any>): Promise<any>
 }
blocks: { 
(username: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
repositoryInvitations: { 
(invitation_id: String): { 


update(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<UserWithName>): Promise<UserWithName>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params?: OctokatUserPatchParams, callback?: Callback<any>): Promise<any>
 }
gists: { 
(gist_id: String): { 

commits: { 


fetch(params?: OctokatGistsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
 }
star: { 


fetch(params?: OctokatGistsFnStarGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnStarGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnStarGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatGistsFnStarPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatGistsFnStarDeleteParams, callback?: Callback<any>): Promise<any>
 }
forks: { 


fetch(params?: OctokatGistsFnForksGetParams, callback?: Callback<SearchResult<Gist>>): Promise<SearchResult<Gist>>
fetchAll(params?: OctokatGistsFnForksGetParams, callback?: Callback<Gist[]>): Promise<Gist[]>
read(params?: OctokatGistsFnForksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnForksGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatGistsFnForksPostParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(gist_comment_id: String): { 


fetch(params?: OctokatGistsFnCommentsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatGistsFnCommentsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatGistsFnCommentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatGistsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatGistsFnCommentsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatGistsFnGetParams, callback?: Callback<Gist>): Promise<Gist>
read(params?: OctokatGistsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatGistsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatGistsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }
public: { 


fetch(params?: OctokatGistsPublicGetParams, callback?: Callback<SearchResult<Gist>>): Promise<SearchResult<Gist>>
fetchAll(params?: OctokatGistsPublicGetParams, callback?: Callback<Gist[]>): Promise<Gist[]>
read(params?: OctokatGistsPublicGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsPublicGetParams, callback?: Callback<any>): Promise<any>
 }
starred: { 


fetch(params?: OctokatGistsStarredGetParams, callback?: Callback<SearchResult<Gist>>): Promise<SearchResult<Gist>>
fetchAll(params?: OctokatGistsStarredGetParams, callback?: Callback<Gist[]>): Promise<Gist[]>
read(params?: OctokatGistsStarredGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsStarredGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatGistsGetParams, callback?: Callback<SearchResult<Gist>>): Promise<SearchResult<Gist>>
fetchAll(params?: OctokatGistsGetParams, callback?: Callback<Gist[]>): Promise<Gist[]>
read(params?: OctokatGistsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatGistsPostParams, callback?: Callback<any>): Promise<any>
 }
integration: { 

installations: { 


fetch(params?: OctokatIntegrationInstallationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatIntegrationInstallationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatIntegrationInstallationsGetParams, callback?: Callback<any>): Promise<any>
 }
identity: { 

user: { 


create(params?: OctokatIntegrationIdentityUserPostParams, callback?: Callback<any>): Promise<any>
 }

 }

 }

// Syntactic shortcut used here
installations(installation_id: String): { 

accessTokens: { 


create(params?: OctokatInstallationsAccessTokensPostParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
repositories(repository_id: String): { 


create(callback?: Callback<any>): Promise<any>
 }


 }

installation: { 

repositories: { 


fetch(params?: OctokatInstallationRepositoriesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatInstallationRepositoriesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatInstallationRepositoriesGetParams, callback?: Callback<any>): Promise<any>
 }

 }
issues: { 


fetch(params?: OctokatIssuesGetParams, callback?: Callback<SearchResult<RepoIssue>>): Promise<SearchResult<RepoIssue>>
fetchAll(params?: OctokatIssuesGetParams, callback?: Callback<RepoIssue[]>): Promise<RepoIssue[]>
read(params?: OctokatIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
emojis: { 


fetch(callback?: Callback<json>): Promise<json>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
gitignore: { 

templates: { 
(template_name: String): { 


fetch(params: OctokatGitignoreTemplatesFnGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatGitignoreTemplatesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatGitignoreTemplatesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<SearchResult<string>>): Promise<SearchResult<string>>
fetchAll(callback?: Callback<string[]>): Promise<string[]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

 }
licenses: { 
(license: String): { 


fetch(params: OctokatLicensesFnGetParams, callback?: Callback<RootLicense>): Promise<RootLicense>
read(params: OctokatLicensesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatLicensesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<SearchResult<RootLicense>>): Promise<SearchResult<RootLicense>>
fetchAll(callback?: Callback<RootLicense[]>): Promise<RootLicense[]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
markdown: { 

raw: { 


create(params?: OctokatMarkdownRawPostParams, callback?: Callback<any>): Promise<any>
 }
create(params: OctokatMarkdownPostParams, callback?: Callback<any>): Promise<any>
 }
meta: { 


fetch(callback?: Callback<RootMeta>): Promise<RootMeta>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
rateLimit: { 


fetch(callback?: Callback<Rate>): Promise<Rate>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
organizations: { 


fetch(params?: OctokatOrganizationsGetParams, callback?: Callback<SearchResult<OrganizationSlug>>): Promise<SearchResult<OrganizationSlug>>
fetchAll(params?: OctokatOrganizationsGetParams, callback?: Callback<OrganizationSlug[]>): Promise<OrganizationSlug[]>
read(params?: OctokatOrganizationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrganizationsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
teams(team_id: String): { 

members: { 


fetch(params?: OctokatTeamsMembersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsMembersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsMembersGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: String): { 


fetch(params?: OctokatTeamsMembershipsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsMembershipsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsMembershipsGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatTeamsMembershipsPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatTeamsMembershipsDeleteParams, callback?: Callback<any>): Promise<any>
 }

repos: { 
(owner: String, repo: String): { 


fetch(params?: OctokatTeamsReposFnGetParams, callback?: Callback<Repository>): Promise<Repository>
read(params?: OctokatTeamsReposFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsReposFnGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatTeamsReposFnPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatTeamsReposFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatTeamsReposGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsReposGetParams, callback?: Callback<any>): Promise<any>
 }
invitations: { 


fetch(params?: OctokatTeamsInvitationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsInvitationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsInvitationsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatTeamsGetParams, callback?: Callback<RootTeam>): Promise<RootTeam>
read(params?: OctokatTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatTeamsPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatTeamsDeleteParams, callback?: Callback<any>): Promise<any>
 }

projects: { 
(project_id: String): { 

columns: { 


fetch(params?: OctokatProjectsFnColumnsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsFnColumnsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsFnColumnsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatProjectsFnColumnsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatProjectsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatProjectsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatProjectsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }
columns: { 
(column_id: String): { 

cards: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params?: OctokatProjectsColumnsFnCardsPostParams, callback?: Callback<any>): Promise<any>
 }
moves: { 


create(params: OctokatProjectsColumnsFnMovesPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatProjectsColumnsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsColumnsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsColumnsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatProjectsColumnsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatProjectsColumnsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
cards(card_id: Number): { 

moves: { 


create(params: OctokatProjectsColumnsCardsMovesPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatProjectsColumnsCardsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsColumnsCardsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsColumnsCardsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatProjectsColumnsCardsPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatProjectsColumnsCardsDeleteParams, callback?: Callback<any>): Promise<any>
 }


 }

 }

// Syntactic shortcut used here
reactions(reaction_id: String): { 


remove(params?: OctokatReactionsDeleteParams, callback?: Callback<any>): Promise<any>
 }

repositories: { 
(repository_id: String): { 

community: { 

profile: { 


fetch(params?: OctokatRepositoriesFnCommunityProfileGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatRepositoriesFnCommunityProfileGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesFnCommunityProfileGetParams, callback?: Callback<any>): Promise<any>
 }

 }
invitations: { 
(invitation_id: String): { 


update(params?: OctokatRepositoriesFnInvitationsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatRepositoriesFnInvitationsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatRepositoriesFnInvitationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatRepositoriesFnInvitationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesFnInvitationsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatRepositoriesFnGetParams, callback?: Callback<Repository>): Promise<Repository>
read(params?: OctokatRepositoriesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatRepositoriesGetParams, callback?: Callback<SearchResult<RepoSlug>>): Promise<SearchResult<RepoSlug>>
fetchAll(params?: OctokatRepositoriesGetParams, callback?: Callback<RepoSlug[]>): Promise<RepoSlug[]>
read(params?: OctokatRepositoriesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesGetParams, callback?: Callback<any>): Promise<any>
 }
search: { 

repositories: { 


fetch(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<SearchResult<Repository>>): Promise<SearchResult<Repository>>
fetchAll(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<Repository[]>): Promise<Repository[]>
read(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<any>): Promise<any>
 }
code: { 


fetch(params?: OctokatSearchCodeGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatSearchCodeGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchCodeGetParams, callback?: Callback<any>): Promise<any>
 }
commits: { 


fetch(params?: OctokatSearchCommitsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatSearchCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchCommitsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 


fetch(params?: OctokatSearchIssuesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatSearchIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
users: { 


fetch(params: OctokatSearchUsersGetParams, callback?: Callback<SearchResult<UserWithName>>): Promise<SearchResult<UserWithName>>
fetchAll(params: OctokatSearchUsersGetParams, callback?: Callback<UserWithName[]>): Promise<UserWithName[]>
read(params: OctokatSearchUsersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatSearchUsersGetParams, callback?: Callback<any>): Promise<any>
 }

 }
legacy: { 

user: { 


// Syntactic shortcut used here
email(email: String): { 


fetch(params: OctokatLegacyUserEmailGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatLegacyUserEmailGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatLegacyUserEmailGetParams, callback?: Callback<any>): Promise<any>
 }


 }

 }
enterprise: { 


// Syntactic shortcut used here
stats(stats_type: String): { 


fetch(params: OctokatEnterpriseStatsGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatEnterpriseStatsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatEnterpriseStatsGetParams, callback?: Callback<any>): Promise<any>
 }

settings: { 

license: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

 }

 }
admin: { 

ldap: { 


// Syntactic shortcut used here
users(username: String): { 

mapping: { 


update(params: OctokatAdminLdapUsersMappingPatchParams, callback?: Callback<any>): Promise<any>
 }
sync: { 


create(callback?: Callback<any>): Promise<any>
 }

 }


// Syntactic shortcut used here
teams(team_id: String): { 

mapping: { 


update(params: OctokatAdminLdapTeamsMappingPatchParams, callback?: Callback<any>): Promise<any>
 }
sync: { 


create(params: OctokatAdminLdapTeamsSyncPostParams, callback?: Callback<any>): Promise<any>
 }

 }


 }
preReceiveEnvironments: { 
(environment_id: String): { 

downloads: { 

latest: { 


fetch(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams, callback?: Callback<any>): Promise<any>
 }
create(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatAdminPreReceiveEnvironmentsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAdminPreReceiveEnvironmentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAdminPreReceiveEnvironmentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatAdminPreReceiveEnvironmentsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatAdminPreReceiveEnvironmentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params: OctokatAdminPreReceiveEnvironmentsPostParams, callback?: Callback<any>): Promise<any>
 }
preReceiveHooks: { 
(pre_receive_hook_id: String): { 


fetch(params?: OctokatAdminPreReceiveHooksFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAdminPreReceiveHooksFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAdminPreReceiveHooksFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatAdminPreReceiveHooksFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatAdminPreReceiveHooksFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params: OctokatAdminPreReceiveHooksPostParams, callback?: Callback<any>): Promise<any>
 }
organizations: { 


create(params: OctokatAdminOrganizationsPostParams, callback?: Callback<any>): Promise<any>
 }

 }
staff: { 

indexingJobs: { 


create(params: OctokatStaffIndexingJobsPostParams, callback?: Callback<any>): Promise<any>
 }

 }
zen: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }


  }
}

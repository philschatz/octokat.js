

declare module 'octokat' {
  export type OctokatAuthorizationsFnPatchParams = { add_scopes?: String[];
remove_scopes?: String[]; }
export type OctokatAuthorizationsClientsPutParams = { client_secret: String; }
export type OctokatAuthorizationsPostParams = { client_secret?: String; }
export type OctokatReposIssuesFnAssigneesPostParams = { assignees: String[]; }
export type OctokatReposIssuesFnLabelsFnDeleteParams = { name: String; }
export type OctokatReposIssuesFnLabelsPostParams = { labels: String[]; }
export type OctokatReposIssuesFnLabelsPutParams = { labels: String[]; }
export type OctokatReposIssuesFnReactionsGetParams = { content?: String; }
export type OctokatReposIssuesFnReactionsPostParams = { content: String; }
export type OctokatReposIssuesFnPatchParams = { title?: String;
body?: String;
assignee?: String;
state?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposIssuesCommentsFnReactionsGetParams = { content?: String; }
export type OctokatReposIssuesCommentsFnReactionsPostParams = { content: String; }
export type OctokatReposIssuesCommentsGetParams = { sort?: String; }
export type OctokatReposIssuesGetParams = { milestone?: String;
state?: String;
assignee?: String;
creator?: String;
mentioned?: String;
labels?: String;
sort?: String; }
export type OctokatReposIssuesPostParams = { title: String;
body?: String;
assignee?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposNotificationsGetParams = { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatReposNotificationsPutParams = { last_read_at?: String; }
export type OctokatReposSubscriptionPutParams = { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatReposGitBlobsPostParams = { content: String;
encoding: String; }
export type OctokatReposGitCommitsPostParams = { message: String;
tree: String;
parents: String[];
author?: Object;
committer?: Object; }
export type OctokatReposGitRefsFnPatchParams = { force?: Boolean; }
export type OctokatReposGitRefsPostParams = { ref: String; }
export type OctokatReposGitTagsPostParams = { tag: String;
message: String;
object: String;
type: String;
tagger: Object; }
export type OctokatReposGitTreesFnGetParams = { recursive?: Boolean; }
export type OctokatReposGitTreesPostParams = { tree: Object;
base_tree?: String; }
export type OctokatReposAssigneesFnGetParams = { assignee: String; }
export type OctokatReposLabelsFnPatchParams = { name: String; }
export type OctokatReposMilestonesFnPatchParams = { title: String;
due_on?: Date; }
export type OctokatReposMilestonesGetParams = { sort?: String;
direction?: String; }
export type OctokatReposMilestonesPostParams = { title: String;
due_on?: Date; }
export type OctokatReposImportAuthorsFnPatchParams = { author_id: String;
email?: String;
name?: String; }
export type OctokatReposImportAuthorsGetParams = { since?: String; }
export type OctokatReposImportPutParams = { vcs_url: String;
vcs?: String;
vcs_username?: String;
vcs_password?: String;
tfvc_project?: String; }
export type OctokatReposProjectsPostParams = { body?: String; }
export type OctokatReposPullsFnMergePutParams = { commit_title?: String;
commit_message?: String;
sha?: String;
merge_method?: String; }
export type OctokatReposPullsFnReviewsFnEventsPostParams = { body?: String;
event?: String; }
export type OctokatReposPullsFnReviewsFnDismissalsPutParams = { message?: String; }
export type OctokatReposPullsFnReviewsPostParams = { body?: String;
event?: String;
comments?: String[];
path?: String;
position?: Number; }
export type OctokatReposPullsFnCommentsPostParams = { in_reply_to: Number; }
export type OctokatReposPullsFnRequestedReviewersPostParams = { reviewers?: String[]; }
export type OctokatReposPullsFnRequestedReviewersDeleteParams = { reviewers?: String[]; }
export type OctokatReposPullsFnPatchParams = { title?: String;
body?: String;
base?: String; }
export type OctokatReposPullsCommentsFnReactionsGetParams = { content?: String; }
export type OctokatReposPullsCommentsFnReactionsPostParams = { content: String; }
export type OctokatReposPullsCommentsGetParams = { sort?: String; }
export type OctokatReposPullsGetParams = { state?: String;
head?: String;
base?: String;
sort?: String; }
export type OctokatReposPullsPostParams = { issue: Number; }
export type OctokatReposCommentsFnReactionsGetParams = { content?: String; }
export type OctokatReposCommentsFnReactionsPostParams = { content: String; }
export type OctokatReposContributorsGetParams = { anon?: Boolean; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams = { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams = { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams = { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams = { include_admins?: Boolean;
strict?: Boolean;
contexts?: String[]; }
export type OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams = { include_admins?: Boolean; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams = { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams = { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams = { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPostParams = { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPutParams = { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams = { users: String[]; }
export type OctokatReposBranchesFnProtectionPutParams = { required_status_checks: Object;
required_pull_request_reviews: Object;
restrictions: Object; }
export type OctokatReposBranchesGetParams = { protected?: Boolean; }
export type OctokatReposCollaboratorsFnPutParams = { permission?: String; }
export type OctokatReposCollaboratorsGetParams = { affiliation?: String; }
export type OctokatReposCommitsFnCommentsGetParams = { ref: String; }
export type OctokatReposCommitsFnStatusesGetParams = { ref: String; }
export type OctokatReposCommitsFnStatusGetParams = { ref: String; }
export type OctokatReposCommitsGetParams = { sha?: String;
path?: String;
author?: String; }
export type OctokatReposReadmeGetParams = { ref?: String; }
export type OctokatReposContentsGetParams = { path: String;
ref?: String; }
export type OctokatReposContentsPutParams = { path: String;
message: String;
content: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposContentsDeleteParams = { path: String;
message: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposTarballGetParams = { ref?: String; }
export type OctokatReposZipballGetParams = { ref?: String; }
export type OctokatReposKeysPostParams = { read_only?: Boolean; }
export type OctokatReposDeploymentsFnStatusesPostParams = { state?: String;
target_url?: String;
log_url?: String;
description?: String;
environment_url?: String;
auto_inactive?: Boolean; }
export type OctokatReposDeploymentsGetParams = { sha?: String;
ref?: String;
task?: String;
environment?: String; }
export type OctokatReposDeploymentsPostParams = { ref: String;
task?: String;
auto_merge?: Boolean;
required_contexts?: String[];
payload?: String;
environment?: String;
description?: String;
transient_environment?: Boolean;
production_environment?: Boolean; }
export type OctokatReposForksGetParams = { sort?: String; }
export type OctokatReposForksPostParams = { organization?: String; }
export type OctokatReposMergesPostParams = { commit_message?: String; }
export type OctokatReposReleasesFnAssetsPostParams = { filePath: String;
name: String;
label?: String; }
export type OctokatReposReleasesFnPatchParams = { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposReleasesTagsGetParams = { tag: String; }
export type OctokatReposReleasesAssetsPatchParams = { label?: String; }
export type OctokatReposReleasesPostParams = { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposStatusesPostParams = { state: String;
target_url?: String;
description?: String;
context?: String; }
export type OctokatReposHooksFnPatchParams = { config: Object;
events?: String[];
add_events?: String[];
remove_events?: String[];
active?: Boolean; }
export type OctokatReposHooksPostParams = { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatReposPatchParams = { allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatOrgsIssuesGetParams = { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatOrgsMigrationsFnReposLockDeleteParams = { repo_name: String; }
export type OctokatOrgsMigrationsPostParams = { repositories: String[];
lock_repositories?: Boolean;
exclude_attachments?: Boolean; }
export type OctokatOrgsMembersGetParams = { filter?: String;
role?: String; }
export type OctokatOrgsMembershipsPutParams = { role: String; }
export type OctokatOrgsTeamsPostParams = { description?: String;
maintainers?: String[];
repo_names?: String[]; }
export type OctokatOrgsHooksFnPatchParams = { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsHooksPostParams = { name: String;
config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsProjectsPostParams = { body?: String; }
export type OctokatOrgsReposGetParams = { type?: String; }
export type OctokatOrgsReposPostParams = { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatOrgsPatchParams = { billing_email?: String;
company?: String;
email?: String;
location?: String;
name?: String;
description?: String;
default_repository_permission?: String;
members_can_create_repositories?: Boolean; }
export type OctokatUsersFnStarredGetParams = { sort?: String; }
export type OctokatUsersFnReposGetParams = { type?: String;
sort?: String; }
export type OctokatUsersFnFollowingFnGetParams = { target_user: String; }
export type OctokatUsersGetParams = { since?: Number; }
export type OctokatNotificationsThreadsSubscriptionPutParams = { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatNotificationsGetParams = { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatNotificationsPutParams = { last_read_at?: String; }
export type OctokatUserStarredGetParams = { sort?: String; }
export type OctokatUserIssuesGetParams = { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatUserReposGetParams = { visibility?: String;
affiliation?: String;
type?: String;
sort?: String; }
export type OctokatUserReposPostParams = { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatUserMembershipsOrgsFnPatchParams = { state: String; }
export type OctokatUserMembershipsOrgsGetParams = { state?: String; }
export type OctokatUserEmailsPostParams = { emails: String[]; }
export type OctokatUserEmailsDeleteParams = { emails: String[]; }
export type OctokatUserGpgKeysPostParams = { armored_public_key: String; }
export type OctokatUserPatchParams = { name?: String;
email?: String;
blog?: String;
company?: String;
location?: String;
hireable?: Boolean;
bio?: String; }
export type OctokatGistsFnPatchParams = { content?: String;
filename?: String; }
export type OctokatGistsPostParams = { public: Boolean; }
export type OctokatIntegrationIdentityUserPostParams = { nonce?: String; }
export type OctokatInstallationsAccessTokensPostParams = { user_id?: String; }
export type OctokatInstallationRepositoriesGetParams = { user_id?: String; }
export type OctokatIssuesGetParams = { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatGitignoreTemplatesFnGetParams = { name: String; }
export type OctokatLicensesFnGetParams = { license: String; }
export type OctokatMarkdownPostParams = { text: String;
mode?: String;
context?: String; }
export type OctokatOrganizationsGetParams = { since?: String; }
export type OctokatTeamsMembersGetParams = { role?: String; }
export type OctokatTeamsMembershipsPutParams = { role?: String; }
export type OctokatTeamsReposFnPutParams = { permission?: String; }
export type OctokatTeamsPatchParams = { description?: String; }
export type OctokatProjectsFnPatchParams = { body?: String; }
export type OctokatProjectsColumnsFnCardsPostParams = { note?: String;
content_id?: String;
content_type?: String; }
export type OctokatProjectsColumnsFnMovesPostParams = { position: String; }
export type OctokatProjectsColumnsCardsMovesPostParams = { position: String;
column_id?: String; }
export type OctokatProjectsColumnsCardsPatchParams = { note?: String; }
export type OctokatRepositoriesFnInvitationsFnPatchParams = { permission?: String; }
export type OctokatRepositoriesGetParams = { since?: String; }
export type OctokatSearchRepositoriesGetParams = { sort?: String; }
export type OctokatSearchCodeGetParams = { sort?: String; }
export type OctokatSearchCommitsGetParams = { sort?: String; }
export type OctokatSearchIssuesGetParams = { sort?: String; }
export type OctokatSearchUsersGetParams = { sort?: String; }
export type OctokatLegacyUserEmailGetParams = { email: String; }
export type OctokatEnterpriseStatsGetParams = { type: String; }
export type OctokatAdminLdapUsersMappingPatchParams = { ldap_dn: String; }
export type OctokatAdminLdapTeamsMappingPatchParams = { team_id: Number;
ldap_dn: String; }
export type OctokatAdminLdapTeamsSyncPostParams = { team_id: Number; }
export type OctokatAdminPreReceiveEnvironmentsFnPatchParams = { name: String;
image_url: String; }
export type OctokatAdminPreReceiveEnvironmentsPostParams = { name: String;
image_url: String; }
export type OctokatAdminPreReceiveHooksFnPatchParams = { hook: Object; }
export type OctokatAdminPreReceiveHooksPostParams = { name: String;
script: String;
script_repository: Object;
environment: Object;
enforcement?: String;
allow_downstream_configuration?: Boolean; }
export type OctokatAdminOrganizationsPostParams = { login: String;
admin: String;
profile_name?: String; }
export type OctokatStaffIndexingJobsPostParams = { target: String; }

  export default class Octokat {
    constructor(options?: Object)
    

applications: { 
(client_id: any): { 


// Syntactic shortcut used here
tokens(access_token: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
remove(): Promise<any>
 }


 }
grants: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
authorizations: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatAuthorizationsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
clients(client_id: any): { 


add(params: OctokatAuthorizationsClientsPutParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatAuthorizationsPostParams): Promise<any>
 }
events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
repos(owner: any, repo: any): { 

events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
issues: { 
(number: any): { 

lock: { 


add(): Promise<any>
remove(): Promise<any>
 }
assignees: { 


create(params: OctokatReposIssuesFnAssigneesPostParams): Promise<any>
remove(): Promise<any>
 }
comments: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
labels: { 
(name: any): { 


remove(params: OctokatReposIssuesFnLabelsFnDeleteParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposIssuesFnLabelsPostParams): Promise<any>
add(params: OctokatReposIssuesFnLabelsPutParams): Promise<any>
remove(): Promise<any>
 }
timeline: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
reactions: { 


fetch(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
read(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
create(params: OctokatReposIssuesFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposIssuesFnPatchParams): Promise<any>
 }
events: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposIssuesCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
read(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
 }
fetch(params?: OctokatReposIssuesGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesGetParams): Promise<any>
read(params?: OctokatReposIssuesGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesGetParams): Promise<any>
create(params: OctokatReposIssuesPostParams): Promise<any>
 }
notifications: { 


fetch(params?: OctokatReposNotificationsGetParams): Promise<any>
fetchAll(params?: OctokatReposNotificationsGetParams): Promise<any>
read(params?: OctokatReposNotificationsGetParams): Promise<any>
readBinary(params?: OctokatReposNotificationsGetParams): Promise<any>
add(params?: OctokatReposNotificationsPutParams): Promise<any>
 }
stargazers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
subscribers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
subscription: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatReposSubscriptionPutParams): Promise<any>
remove(): Promise<any>
 }
git: { 

blobs: { 
(sha: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitBlobsPostParams): Promise<any>
 }
commits: { 
(sha: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitCommitsPostParams): Promise<any>
 }
refs: { 
(ref: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposGitRefsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
tags: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
create(params: OctokatReposGitRefsPostParams): Promise<any>
 }
tags: { 
(sha: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitTagsPostParams): Promise<any>
 }
trees: { 
(sha: any): { 


fetch(params?: OctokatReposGitTreesFnGetParams): Promise<any>
fetchAll(params?: OctokatReposGitTreesFnGetParams): Promise<any>
read(params?: OctokatReposGitTreesFnGetParams): Promise<any>
readBinary(params?: OctokatReposGitTreesFnGetParams): Promise<any>
 }

create(params: OctokatReposGitTreesPostParams): Promise<any>
 }

 }
assignees: { 
(assignee: any): { 


fetch(params: OctokatReposAssigneesFnGetParams): Promise<any>
fetchAll(params: OctokatReposAssigneesFnGetParams): Promise<any>
read(params: OctokatReposAssigneesFnGetParams): Promise<any>
readBinary(params: OctokatReposAssigneesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
labels: { 
(name: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposLabelsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
milestones: { 
(number: any): { 

labels: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposMilestonesFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposMilestonesGetParams): Promise<any>
fetchAll(params?: OctokatReposMilestonesGetParams): Promise<any>
read(params?: OctokatReposMilestonesGetParams): Promise<any>
readBinary(params?: OctokatReposMilestonesGetParams): Promise<any>
create(params: OctokatReposMilestonesPostParams): Promise<any>
 }
import: { 

authors: { 
(author_id: any): { 


update(params: OctokatReposImportAuthorsFnPatchParams): Promise<any>
 }

fetch(params?: OctokatReposImportAuthorsGetParams): Promise<any>
fetchAll(params?: OctokatReposImportAuthorsGetParams): Promise<any>
read(params?: OctokatReposImportAuthorsGetParams): Promise<any>
readBinary(params?: OctokatReposImportAuthorsGetParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
add(params: OctokatReposImportPutParams): Promise<any>
remove(): Promise<any>
 }
license: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
projects: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposProjectsPostParams): Promise<any>
 }
pulls: { 
(number: any): { 

commits: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
files: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
merge: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatReposPullsFnMergePutParams): Promise<any>
 }
reviews: { 
(id: any): { 

comments: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
events: { 


create(params?: OctokatReposPullsFnReviewsFnEventsPostParams): Promise<any>
 }
dismissals: { 


add(params?: OctokatReposPullsFnReviewsFnDismissalsPutParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposPullsFnReviewsPostParams): Promise<any>
 }
comments: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposPullsFnCommentsPostParams): Promise<any>
 }
requestedReviewers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposPullsFnRequestedReviewersPostParams): Promise<any>
remove(params?: OctokatReposPullsFnRequestedReviewersDeleteParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposPullsFnPatchParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposPullsCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposPullsCommentsGetParams): Promise<any>
fetchAll(params?: OctokatReposPullsCommentsGetParams): Promise<any>
read(params?: OctokatReposPullsCommentsGetParams): Promise<any>
readBinary(params?: OctokatReposPullsCommentsGetParams): Promise<any>
 }
fetch(params?: OctokatReposPullsGetParams): Promise<any>
fetchAll(params?: OctokatReposPullsGetParams): Promise<any>
read(params?: OctokatReposPullsGetParams): Promise<any>
readBinary(params?: OctokatReposPullsGetParams): Promise<any>
create(params: OctokatReposPullsPostParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
contributors: { 


fetch(params?: OctokatReposContributorsGetParams): Promise<any>
fetchAll(params?: OctokatReposContributorsGetParams): Promise<any>
read(params?: OctokatReposContributorsGetParams): Promise<any>
readBinary(params?: OctokatReposContributorsGetParams): Promise<any>
 }
languages: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
tags: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
branches: { 
(branch: any): { 

protection: { 

requiredStatusChecks: { 

contexts: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams): Promise<any>
remove(): Promise<any>
 }
requiredPullRequestReviews: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams): Promise<any>
remove(): Promise<any>
 }
restrictions: { 

teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams): Promise<any>
 }
users: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsUsersPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsUsersPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params: OctokatReposBranchesFnProtectionPutParams): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposBranchesGetParams): Promise<any>
fetchAll(params?: OctokatReposBranchesGetParams): Promise<any>
read(params?: OctokatReposBranchesGetParams): Promise<any>
readBinary(params?: OctokatReposBranchesGetParams): Promise<any>
 }
collaborators: { 
(username: any): { 

permission: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatReposCollaboratorsFnPutParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposCollaboratorsGetParams): Promise<any>
fetchAll(params?: OctokatReposCollaboratorsGetParams): Promise<any>
read(params?: OctokatReposCollaboratorsGetParams): Promise<any>
readBinary(params?: OctokatReposCollaboratorsGetParams): Promise<any>
 }
commits: { 
(ref: any): { 

comments: { 


fetch(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
fetchAll(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
read(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
readBinary(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
 }
statuses: { 


fetch(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
fetchAll(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
read(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
readBinary(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
 }
status: { 


fetch(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
fetchAll(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
read(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
readBinary(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposCommitsGetParams): Promise<any>
fetchAll(params?: OctokatReposCommitsGetParams): Promise<any>
read(params?: OctokatReposCommitsGetParams): Promise<any>
readBinary(params?: OctokatReposCommitsGetParams): Promise<any>
 }

// Syntactic shortcut used here
compare(base: any, head: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

readme: { 


fetch(params?: OctokatReposReadmeGetParams): Promise<any>
fetchAll(params?: OctokatReposReadmeGetParams): Promise<any>
read(params?: OctokatReposReadmeGetParams): Promise<any>
readBinary(params?: OctokatReposReadmeGetParams): Promise<any>
 }

// Syntactic shortcut used here
contents(path: any): { 


fetch(params: OctokatReposContentsGetParams): Promise<any>
fetchAll(params: OctokatReposContentsGetParams): Promise<any>
read(params: OctokatReposContentsGetParams): Promise<any>
readBinary(params: OctokatReposContentsGetParams): Promise<any>
add(params: OctokatReposContentsPutParams): Promise<any>
remove(params: OctokatReposContentsDeleteParams): Promise<any>
 }


// Syntactic shortcut used here
tarball(ref: any): { 


fetch(params?: OctokatReposTarballGetParams): Promise<any>
fetchAll(params?: OctokatReposTarballGetParams): Promise<any>
read(params?: OctokatReposTarballGetParams): Promise<any>
readBinary(params?: OctokatReposTarballGetParams): Promise<any>
 }


// Syntactic shortcut used here
zipball(ref: any): { 


fetch(params?: OctokatReposZipballGetParams): Promise<any>
fetchAll(params?: OctokatReposZipballGetParams): Promise<any>
read(params?: OctokatReposZipballGetParams): Promise<any>
readBinary(params?: OctokatReposZipballGetParams): Promise<any>
 }

keys: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposKeysPostParams): Promise<any>
 }
deployments: { 
(id: any): { 

statuses: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposDeploymentsFnStatusesPostParams): Promise<any>
 }

 }

fetch(params?: OctokatReposDeploymentsGetParams): Promise<any>
fetchAll(params?: OctokatReposDeploymentsGetParams): Promise<any>
read(params?: OctokatReposDeploymentsGetParams): Promise<any>
readBinary(params?: OctokatReposDeploymentsGetParams): Promise<any>
create(params: OctokatReposDeploymentsPostParams): Promise<any>
 }
downloads: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
forks: { 


fetch(params?: OctokatReposForksGetParams): Promise<any>
fetchAll(params?: OctokatReposForksGetParams): Promise<any>
read(params?: OctokatReposForksGetParams): Promise<any>
readBinary(params?: OctokatReposForksGetParams): Promise<any>
create(params?: OctokatReposForksPostParams): Promise<any>
 }
merges: { 


create(params?: OctokatReposMergesPostParams): Promise<any>
 }
pages: { 

builds: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
latest: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
releases: { 
(id: any): { 

assets: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposReleasesFnAssetsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposReleasesFnPatchParams): Promise<any>
remove(): Promise<any>
 }
latest: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
tags(tag: any): { 


fetch(params: OctokatReposReleasesTagsGetParams): Promise<any>
fetchAll(params: OctokatReposReleasesTagsGetParams): Promise<any>
read(params: OctokatReposReleasesTagsGetParams): Promise<any>
readBinary(params: OctokatReposReleasesTagsGetParams): Promise<any>
 }


// Syntactic shortcut used here
assets(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposReleasesAssetsPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposReleasesPostParams): Promise<any>
 }
stats: { 

contributors: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
commitActivity: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
codeFrequency: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
participation: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
punchCard: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }

// Syntactic shortcut used here
statuses(sha: any): { 


create(params: OctokatReposStatusesPostParams): Promise<any>
 }

traffic: { 

popular: { 

referrers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
paths: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
views: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
clones: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
hooks: { 
(id: any): { 

tests: { 


create(): Promise<any>
 }
pings: { 


create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposHooksPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposPatchParams): Promise<any>
remove(): Promise<any>
 }


// Syntactic shortcut used here
networks(owner: any, repo: any): { 

events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }


// Syntactic shortcut used here
orgs(org: any): { 

events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
issues: { 


fetch(params?: OctokatOrgsIssuesGetParams): Promise<any>
fetchAll(params?: OctokatOrgsIssuesGetParams): Promise<any>
read(params?: OctokatOrgsIssuesGetParams): Promise<any>
readBinary(params?: OctokatOrgsIssuesGetParams): Promise<any>
 }
migrations: { 
(id: any): { 

archive: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
repos(repo_name: any): { 

lock: { 


remove(params: OctokatOrgsMigrationsFnReposLockDeleteParams): Promise<any>
 }

 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatOrgsMigrationsPostParams): Promise<any>
 }
members: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatOrgsMembersGetParams): Promise<any>
fetchAll(params?: OctokatOrgsMembersGetParams): Promise<any>
read(params?: OctokatOrgsMembersGetParams): Promise<any>
readBinary(params?: OctokatOrgsMembersGetParams): Promise<any>
 }
publicMembers: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params: OctokatOrgsMembershipsPutParams): Promise<any>
remove(): Promise<any>
 }

invitations: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
outsideCollaborators: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
outsideCollaborator(username: any): { 


add(): Promise<any>
remove(): Promise<any>
 }

teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatOrgsTeamsPostParams): Promise<any>
 }
hooks: { 
(id: any): { 

pings: { 


create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatOrgsHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatOrgsHooksPostParams): Promise<any>
 }
blocks: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
projects: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatOrgsProjectsPostParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatOrgsReposGetParams): Promise<any>
fetchAll(params?: OctokatOrgsReposGetParams): Promise<any>
read(params?: OctokatOrgsReposGetParams): Promise<any>
readBinary(params?: OctokatOrgsReposGetParams): Promise<any>
create(params?: OctokatOrgsReposPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatOrgsPatchParams): Promise<any>
 }

users: { 
(username: any): { 

receivedEvents: { 

public: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
events: { 

public: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
orgs(org: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
starred: { 


fetch(params?: OctokatUsersFnStarredGetParams): Promise<any>
fetchAll(params?: OctokatUsersFnStarredGetParams): Promise<any>
read(params?: OctokatUsersFnStarredGetParams): Promise<any>
readBinary(params?: OctokatUsersFnStarredGetParams): Promise<any>
 }
subscriptions: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
gists: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
orgs: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
repos: { 


fetch(params?: OctokatUsersFnReposGetParams): Promise<any>
fetchAll(params?: OctokatUsersFnReposGetParams): Promise<any>
read(params?: OctokatUsersFnReposGetParams): Promise<any>
readBinary(params?: OctokatUsersFnReposGetParams): Promise<any>
 }
followers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
following: { 
(target_user: any): { 


fetch(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
fetchAll(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
read(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
readBinary(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
keys: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
siteAdmin: { 


add(): Promise<any>
remove(): Promise<any>
 }
suspended: { 


add(): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatUsersGetParams): Promise<any>
fetchAll(params?: OctokatUsersGetParams): Promise<any>
read(params?: OctokatUsersGetParams): Promise<any>
readBinary(params?: OctokatUsersGetParams): Promise<any>
 }
feeds: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
notifications: { 


// Syntactic shortcut used here
threads(id: any): { 

subscription: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatNotificationsThreadsSubscriptionPutParams): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
 }

fetch(params?: OctokatNotificationsGetParams): Promise<any>
fetchAll(params?: OctokatNotificationsGetParams): Promise<any>
read(params?: OctokatNotificationsGetParams): Promise<any>
readBinary(params?: OctokatNotificationsGetParams): Promise<any>
add(params?: OctokatNotificationsPutParams): Promise<any>
 }
user: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
starred: { 
(owner: any, repo: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatUserStarredGetParams): Promise<any>
fetchAll(params?: OctokatUserStarredGetParams): Promise<any>
read(params?: OctokatUserStarredGetParams): Promise<any>
readBinary(params?: OctokatUserStarredGetParams): Promise<any>
 }
subscriptions: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
issues: { 


fetch(params?: OctokatUserIssuesGetParams): Promise<any>
fetchAll(params?: OctokatUserIssuesGetParams): Promise<any>
read(params?: OctokatUserIssuesGetParams): Promise<any>
readBinary(params?: OctokatUserIssuesGetParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatUserReposGetParams): Promise<any>
fetchAll(params?: OctokatUserReposGetParams): Promise<any>
read(params?: OctokatUserReposGetParams): Promise<any>
readBinary(params?: OctokatUserReposGetParams): Promise<any>
create(params?: OctokatUserReposPostParams): Promise<any>
 }
orgs: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
memberships: { 

orgs: { 
(org: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatUserMembershipsOrgsFnPatchParams): Promise<any>
 }

fetch(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
fetchAll(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
read(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
readBinary(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
 }

 }
teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
emails: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatUserEmailsPostParams): Promise<any>
remove(params: OctokatUserEmailsDeleteParams): Promise<any>
 }
followers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
following: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
keys: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
gpgKeys: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatUserGpgKeysPostParams): Promise<any>
 }
blocks: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
repositoryInvitations: { 
(invitation_id: any): { 


update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatUserPatchParams): Promise<any>
 }
gists: { 
(id: any): { 

commits: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
star: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }
forks: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
comments: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatGistsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
public: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
starred: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatGistsPostParams): Promise<any>
 }
integration: { 

installations: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
identity: { 

user: { 


create(params?: OctokatIntegrationIdentityUserPostParams): Promise<any>
 }

 }

 }

// Syntactic shortcut used here
installations(installation_id: any): { 

accessTokens: { 


create(params?: OctokatInstallationsAccessTokensPostParams): Promise<any>
 }

// Syntactic shortcut used here
repositories(repository_id: any): { 


create(): Promise<any>
 }


 }

installation: { 

repositories: { 


fetch(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
fetchAll(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
read(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
readBinary(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
 }

 }
issues: { 


fetch(params?: OctokatIssuesGetParams): Promise<any>
fetchAll(params?: OctokatIssuesGetParams): Promise<any>
read(params?: OctokatIssuesGetParams): Promise<any>
readBinary(params?: OctokatIssuesGetParams): Promise<any>
 }
emojis: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
gitignore: { 

templates: { 
(name: any): { 


fetch(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
fetchAll(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
read(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
readBinary(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
licenses: { 
(license: any): { 


fetch(params: OctokatLicensesFnGetParams): Promise<any>
fetchAll(params: OctokatLicensesFnGetParams): Promise<any>
read(params: OctokatLicensesFnGetParams): Promise<any>
readBinary(params: OctokatLicensesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
markdown: { 

raw: { 


create(): Promise<any>
 }
create(params: OctokatMarkdownPostParams): Promise<any>
 }
meta: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
rateLimit: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
organizations: { 


fetch(params?: OctokatOrganizationsGetParams): Promise<any>
fetchAll(params?: OctokatOrganizationsGetParams): Promise<any>
read(params?: OctokatOrganizationsGetParams): Promise<any>
readBinary(params?: OctokatOrganizationsGetParams): Promise<any>
 }

// Syntactic shortcut used here
teams(id: any): { 

members: { 


fetch(params?: OctokatTeamsMembersGetParams): Promise<any>
fetchAll(params?: OctokatTeamsMembersGetParams): Promise<any>
read(params?: OctokatTeamsMembersGetParams): Promise<any>
readBinary(params?: OctokatTeamsMembersGetParams): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatTeamsMembershipsPutParams): Promise<any>
remove(): Promise<any>
 }

repos: { 
(owner: any, repo: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatTeamsReposFnPutParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
invitations: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatTeamsPatchParams): Promise<any>
remove(): Promise<any>
 }

projects: { 
(id: any): { 

columns: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatProjectsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
columns: { 
(id: any): { 

cards: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatProjectsColumnsFnCardsPostParams): Promise<any>
 }
moves: { 


create(params: OctokatProjectsColumnsFnMovesPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
cards(id: any): { 

moves: { 


create(params: OctokatProjectsColumnsCardsMovesPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatProjectsColumnsCardsPatchParams): Promise<any>
remove(): Promise<any>
 }


 }

 }

// Syntactic shortcut used here
reactions(id: any): { 


remove(): Promise<any>
 }

repositories: { 
(id: any): { 

community: { 

profile: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
invitations: { 
(invitation_id: any): { 


update(params?: OctokatRepositoriesFnInvitationsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatRepositoriesGetParams): Promise<any>
fetchAll(params?: OctokatRepositoriesGetParams): Promise<any>
read(params?: OctokatRepositoriesGetParams): Promise<any>
readBinary(params?: OctokatRepositoriesGetParams): Promise<any>
 }
search: { 

repositories: { 


fetch(params?: OctokatSearchRepositoriesGetParams): Promise<any>
fetchAll(params?: OctokatSearchRepositoriesGetParams): Promise<any>
read(params?: OctokatSearchRepositoriesGetParams): Promise<any>
readBinary(params?: OctokatSearchRepositoriesGetParams): Promise<any>
 }
code: { 


fetch(params?: OctokatSearchCodeGetParams): Promise<any>
fetchAll(params?: OctokatSearchCodeGetParams): Promise<any>
read(params?: OctokatSearchCodeGetParams): Promise<any>
readBinary(params?: OctokatSearchCodeGetParams): Promise<any>
 }
commits: { 


fetch(params?: OctokatSearchCommitsGetParams): Promise<any>
fetchAll(params?: OctokatSearchCommitsGetParams): Promise<any>
read(params?: OctokatSearchCommitsGetParams): Promise<any>
readBinary(params?: OctokatSearchCommitsGetParams): Promise<any>
 }
issues: { 


fetch(params?: OctokatSearchIssuesGetParams): Promise<any>
fetchAll(params?: OctokatSearchIssuesGetParams): Promise<any>
read(params?: OctokatSearchIssuesGetParams): Promise<any>
readBinary(params?: OctokatSearchIssuesGetParams): Promise<any>
 }
users: { 


fetch(params?: OctokatSearchUsersGetParams): Promise<any>
fetchAll(params?: OctokatSearchUsersGetParams): Promise<any>
read(params?: OctokatSearchUsersGetParams): Promise<any>
readBinary(params?: OctokatSearchUsersGetParams): Promise<any>
 }

 }
legacy: { 

user: { 


// Syntactic shortcut used here
email(email: any): { 


fetch(params: OctokatLegacyUserEmailGetParams): Promise<any>
fetchAll(params: OctokatLegacyUserEmailGetParams): Promise<any>
read(params: OctokatLegacyUserEmailGetParams): Promise<any>
readBinary(params: OctokatLegacyUserEmailGetParams): Promise<any>
 }


 }

 }
enterprise: { 


// Syntactic shortcut used here
stats(type: any): { 


fetch(params: OctokatEnterpriseStatsGetParams): Promise<any>
fetchAll(params: OctokatEnterpriseStatsGetParams): Promise<any>
read(params: OctokatEnterpriseStatsGetParams): Promise<any>
readBinary(params: OctokatEnterpriseStatsGetParams): Promise<any>
 }

settings: { 

license: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }

 }
admin: { 

ldap: { 


// Syntactic shortcut used here
users(username: any): { 

mapping: { 


update(params: OctokatAdminLdapUsersMappingPatchParams): Promise<any>
 }
sync: { 


create(): Promise<any>
 }

 }


// Syntactic shortcut used here
teams(team_id: any): { 

mapping: { 


update(params: OctokatAdminLdapTeamsMappingPatchParams): Promise<any>
 }
sync: { 


create(params: OctokatAdminLdapTeamsSyncPostParams): Promise<any>
 }

 }


 }
preReceiveEnvironments: { 
(id: any): { 

downloads: { 

latest: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatAdminPreReceiveEnvironmentsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatAdminPreReceiveEnvironmentsPostParams): Promise<any>
 }
preReceiveHooks: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatAdminPreReceiveHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatAdminPreReceiveHooksPostParams): Promise<any>
 }
organizations: { 


create(params: OctokatAdminOrganizationsPostParams): Promise<any>
 }

 }
staff: { 

indexingJobs: { 


create(params: OctokatStaffIndexingJobsPostParams): Promise<any>
 }

 }
zen: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }


  }
}

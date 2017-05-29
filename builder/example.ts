// This is an example file showing what it would look like if using the TypeScript interfaces and objects.

// This first part is boilerplate for making the `octo` instance
import {IInputRepos, InputRepos} from './generated-ts/InputRepos'
import {IInputRepo} from './generated-ts/InputRepo'
import {IInputRepoIssues} from './generated-ts/InputRepoIssues'
import {IInputRepoIssue} from './generated-ts/InputRepoIssue'
import {IRepoResponse} from './generated-ts/RepoResponse'
import {IRepoIssueResponse} from './generated-ts/RepoIssueResponse'
import {IIssueCommentResponse} from './generated-ts/IssueCommentResponse'


const pretendOctoInstance = {
  repos: InputRepos('/repos')
}

const octo = pretendOctoInstance


// Begin reading here

export class App {
  private async getMyRepo() {
    // Just showing the types of each object

    const _1: IInputRepos       = octo.repos
    const _2: IInputRepo        = octo.repos('philschatz', 'octokat.js')
    const _3: IInputRepoIssues  = octo.repos('philschatz', 'octokat.js').issues
    const _4: IInputRepoIssue   = octo.repos('philschatz', 'octokat.js').issues(1)

    const ret_1: IInputRepo           = await _1.create()
    const ret_2: IRepoResponse        = await _2.fetch()
    const ret_3: IRepoIssueResponse[] = await _3.fetch()
    const ret_4: IRepoIssueResponse   = await _4.fetch()
    return ret_4
  }

  private async getFirstIssueComments() {
    const ret: IIssueCommentResponse = await octo.repos('philschatz', 'octokat.js').issues(1).comments(123456).fetch()
    return ret
  }
}

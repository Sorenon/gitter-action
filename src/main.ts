import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github';
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema';
import { readFileSync } from 'fs';

async function run(): Promise<void> {
  try {
    const myToken = core.getInput('myToken');
    var octokit = getOctokit(myToken);

    const pullRequestEvent = context.payload as PullRequestEvent; 

    const userId = pullRequestEvent.pull_request.user.id;
    
    const fileContents = readFileSync("USERS", {encoding:'utf8', flag:'r'})
    var found = false;
    for (var i = 0; i < fileContents.length; i++) {
      core.info(`${i}`)
      if (parseInt(fileContents[i]) == userId) {
        found = true;
        break;
      }
    }
    if (!found) {
      return;
    }

    // const pullSender = pullRequestEvent.pull_request.user; TODO
    // const pullRepoOwner = pullRequestEvent.repository.owner;

    var res = await octokit.rest.pulls.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullRequestEvent.number,
      sha: pullRequestEvent.pull_request.head.sha,
      merge_method: "rebase"
    })

    core.info(`${JSON.stringify(res, null, 2)}`)

    // // const ms: string = core.getInput('millisecondsagain')
    // // throw new Error('I am annoyed')
    // core.info("why is this not showing up")
    // core.info(`${JSON.stringify(process.env)}`)
    // core.info(`${JSON.stringify(context)}`)
    // core.notice("I'm a notice")
    // core.error("I'm an error")
    // core.warning("I'm a warning")

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

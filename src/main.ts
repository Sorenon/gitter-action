import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github';
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema';
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const myToken = core.getInput('myToken');
    var octokit = getOctokit(myToken);

    const pullRequestEvent = context.payload as PullRequestEvent; 

    octokit.rest.pulls.update(
      {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: pullRequestEvent.number,
        title: "Please work"
      }
    )

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

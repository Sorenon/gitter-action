import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github';
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // const ms: string = core.getInput('millisecondsagain')
    // throw new Error('I am annoyed')
    core.info("why is this not showing up")
    core.info(`${JSON.stringify(process.env)}`)
    core.info(`${JSON.stringify(context)}`)
    core.notice("I'm a notice")
    core.error("I'm an error")
    core.warning("I'm a warning")

    

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

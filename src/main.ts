import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github';
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`${process.env}`)    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

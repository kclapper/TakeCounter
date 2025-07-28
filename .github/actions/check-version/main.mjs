import * as core from '@actions/core';
import * as github from '@actions/github';

function getPaths() {
  const packages = core.getInput('packages');
  return packages
          .trim()
          .split('\n')
          .map((item) => 
            process.env.GITHUB_WORKSPACE + '/' + item
          );
}

export async function run() {
  try {
    const tagPattern = /refs\/tags\/v(.*)/;
    let tag = github.context.ref.match(tagPattern);
    if (tag === null) {
      core.setFailed(`Could not find release version tag`);
      return;
    }

    let version = tag[1];
    core.info(`Release tag: ${version}`);
  
    const packages = getPaths();
    for (const item of packages) {
      const module = await import(item);
      const packageJson = module.default;

      if (!packageJson.name) {
        core.setFailed(`${item} has no name attribute`);
      }

      if (!packageJson.version) {
        core.setFailed(`${packageJson.name} has no version`);
      }

      core.info(`${packageJson.name} version: ${packageJson.version}`);

      if (packageJson.version !== version) {
        core.setFailed(`${packageJson.name} does not match version. Expected ${version} found ${packageJson.version}`);
      }
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}
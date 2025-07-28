const core = require('@actions/core');
const github = require('@actions/github');

function getPaths() {
  const packages = core.getInput('packages');
  return packages
          .trim()
          .split('\n')
          .map((item) => 
            process.env.GITHUB_WORKSPACE + '/' + item
          );
}

async function run() {
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
      const module = await require(item);
      const packageJson = module;

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

module.exports = {
  run
};
const core = require('@actions/core');
const github = require('@actions/github');

function getPath(inputName) {
  const relativePath = core.getInput(inputName);
  return process.env.GITHUB_WORKSPACE + '/' + relativePath;
}

function getVersion(path) {
  const packageJson = require(path);
  return packageJson.version;
}

try {
  const electronPath = getPath('electron-package-path');
  const webPath = getPath('web-package-path');

  const electronVersion = getVersion(electronPath);
  const webVersion = getVersion(webPath);

  core.info(`Electron version: ${electronVersion}`);
  core.info(`Web version: ${webVersion}`);

  if (electronVersion !== webVersion) {
    core.setFailed("Package versions don't match!");
  }

  const tagPattern = /refs\/tags\/v(.*)/;
  let tag = github.context.ref.match(tagPattern);
  if (tag !== null) {
    tag = tag[1];

    core.info(`Release tag: ${tag}`);

    if (electronVersion !== tag) {
      core.setFailed("Package version doesn't match tag!");
    }
  }

} catch (error) {
  core.setFailed(error.message);
}

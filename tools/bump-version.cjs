const fs = require('node:fs/promises');

async function bumpVersion(path, version) {
    const packageJsonString = await fs.readFile(path, { encoding: 'utf-8' });
    let packageJson = JSON.parse(packageJsonString);

    packageJson['version'] = version;

    await fs.writeFile(
        path,
        JSON.stringify(packageJson, null, 4) + "\n",
        { encoding: 'utf-8' }
    );
}

const packageJsonFiles = [
    './web/package.json',
    './electron/package.json',
    './components/package.json',
];

const version = process.argv.slice(2)[0];
console.log(`Bump version to ${version}`);

const versionRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
if (!versionRegex.test(version)) {
    console.error(`${verison} is an invalid version`);
    process.exit(1);
}

(async () => {
    for (const path of packageJsonFiles) {
        await bumpVersion(path, version);
    }
})();
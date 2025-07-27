import { jest, test } from '@jest/globals';

const core = {
    getInput: () => {
        return "../../../electron/package.json\n../../../web/package.json\n../../../components/package.json";
    },
    setFailed: (msg) => { throw Error(msg) },
    info: (msg) => { console.log(`INFO: ${msg}`) },
};

const github = {
    context: {
        ref: {
            match: () => {
                return ['v', '0.7.0'];
            }
        }
    }
};

jest.unstable_mockModule('@actions/core', () => core);
jest.unstable_mockModule('@actions/github', () => github);

const { run } = await import('./main');

test('local package.json files', async () => {
    process.env['GITHUB_WORKSPACE'] = '.';
    await run();
});
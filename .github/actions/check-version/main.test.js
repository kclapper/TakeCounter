const { test, beforeEach } = require('@jest/globals');

// const core = require('@actions/core');
// const github = require('@actions/github');

const { run } = require('./main');

const core = {
    __esModule: true,
    getInput: () => {
        return "../../../electron/package.json\n../../../web/package.json\n../../../components/package.json";
    },
    setFailed: (msg) => { throw Error(msg) },
    info: (msg) => { console.log(`INFO: ${msg}`) },
};

const github = {
    __esModule: true,
    context: {
        ref: {
            match: () => {
                return ['v', '0.8.0'];
            }
        }
    }
};

jest.mock('@actions/core', () => core);
jest.mock('@actions/github', () => github);

// beforeEach(() => {
//     core.info.mockImplementation((msg) => { console.log(`INFO: ${msg}`) });
//     core.setFailed.mockImplementation((msg) => { throw Error(msg) });
//     core.getInput.mockImplementation(() => {
//         return "../../../electron/package.json\n../../../web/package.json\n../../../components/package.json";
//     });

//     github.context = {
//         ref: {
//             match: () => {
//                 return ['v', '0.8.0'];
//             }
//         }
//     };
// });

test('local package.json files', async () => {
    process.env['GITHUB_WORKSPACE'] = '.';
    await run();
});
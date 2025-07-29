import { readFile } from 'node:fs/promises';

import { test as jestTest, expect, jest } from '@jest/globals';

import withLocalTmpDir from 'with-local-tmp-dir';
import outputFiles from 'output-files';
import endent_formats from 'endent';
const endent = endent_formats.default;

import { TrackWatcher } from './file_watcher';

const test = process.env.CI ? jestTest.skip : jestTest;

test('get current take', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });
    const watcher = new TrackWatcher('Audio Files');

    expect(watcher.currentTake)
        .toEqual(0);

    await watcher.watchTrackName('Audio 1');
    await watcher.nextUpdate();

    await outputFiles({
        'Audio Files': {
            'Audio 1_01.wav': ``
        }
    });

    await watcher.nextUpdate();
    expect(watcher.currentTake)
        .toEqual(1);

    await outputFiles({
        'Audio Files': {
            'Audio 1.01_01.wav': ``
        }
    });

    await watcher.nextUpdate();
    expect(watcher.currentTake)
        .toEqual(1);

    await outputFiles({
        'Audio Files': {
            'Audio 1.01_02.wav': ``
        }
    });

    await watcher.nextUpdate();
    expect(watcher.currentTake)
        .toEqual(2);

    await watcher.stopWatching();
}));
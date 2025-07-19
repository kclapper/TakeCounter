import { readFile } from 'node:fs/promises';

import { test, expect } from '@jest/globals';

import withLocalTmpDir from 'with-local-tmp-dir';
import outputFiles from 'output-files';
import endent_formats from 'endent';
const endent = endent_formats.default;

import { FileWatcher } from '.';

test('write temp file', () => withLocalTmpDir(async () => {
    await outputFiles({
        'README.md': endent`
            # README
            This is a "read me".
        `
    });

    expect(await readFile('README.md', { encoding: 'utf-8' }))
        .toEqual(endent`
            # README
            This is a "read me".
        `);
}));

test('start and stop watcher', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });

    const watcher = new FileWatcher('Audio Files');
    watcher.watchTrackName('Audio 1');

    expect(watcher.isWatching).toBe(true);

    watcher.stopWatching();

    expect(watcher.isWatching).toBe(false);
}));

test('change track to watch', () => withLocalTmpDir(async () => {

}));

test('change path to Audio Files', () => withLocalTmpDir(async () => {

}));

test('emit event when take changes', () => withLocalTmpDir(async () => {

}));

test('add and remove listeners', () => withLocalTmpDir(async () => {

}));

test.skip('get current take', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });

    const watcher = new FileWatcher('Audio Files');
    watcher.watchTrackName('Audio 1');

    await outputFiles({
        'Audio Files': {
            'Audio 1_01.wav': ``
        }
    });

    expect(watcher.currentTake)
        .toEqual(1);

    watcher.stopWatching();
}));

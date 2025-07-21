import { readFile } from 'node:fs/promises';

import { test, expect, jest } from '@jest/globals';

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

    await watcher.watchTrackName('Audio 1');

    expect(watcher.isWatching).toBe(true);

    await watcher.stopWatching();

    expect(watcher.isWatching).toBe(false);
}));

test('get current take', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });
    const watcher = new FileWatcher('Audio Files');

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
        .toEqual(2);

    await watcher.stopWatching();
}));

test('change track to watch', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });
    const watcher = new FileWatcher('Audio Files');

    await watcher.watchTrackName('Audio 1');
    await watcher.nextUpdate();

    await outputFiles({
        'Audio Files': {
            'Audio 1.01_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    expect(watcher.currentTake)
        .toEqual(2);

    await watcher.watchTrackName('Drums 1'); 
    await outputFiles({
        'Audio Files': {
            'Drums 1_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    expect(watcher.currentTake)
        .toEqual(1);

    await outputFiles({
        'Audio Files': {
            'Audio 1.03_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    expect(watcher.currentTake)
        .toEqual(1);

    await watcher.stopWatching();
}));

test('emit event when take changes', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });
    const watcher = new FileWatcher('Audio Files');
    await watcher.watchTrackName('Audio 1');
    await watcher.nextUpdate();

    const expectOne = jest.fn((event) => {
        expect(event.take).toBe(1);
    });
    const expectTwo = jest.fn((event) => {
        expect(event.take).toBe(2);
    });

    watcher.addEventListener('takeUpdate', expectOne);

    await outputFiles({
        'Audio Files': {
            'Audio 1_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    watcher.removeEventListener('takeUpdate', expectOne);
    watcher.addEventListener('takeUpdate', expectTwo);

    await outputFiles({
        'Audio Files': {
            'Audio 1.01_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    await outputFiles({
        'Audio Files': {
            'Drums 1.02_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    expect(expectOne).toHaveBeenCalledTimes(1);
    expect(expectTwo).toHaveBeenCalledTimes(1);

    await watcher.stopWatching();
}));

test('stop a watcher that hasnt started', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        }
    });
    const watcher = new FileWatcher('Audio Files');
    await watcher.stopWatching();
}));

test('change path to Audio Files', () => withLocalTmpDir(async () => {
    await outputFiles({
        'Audio Files': {
            'whatever.txt': `Some file to create the Audio Files folder`
        },
        'Other Files': {
            'whatever.txt': `Some file to create the Other Files folder`
        }
    });
    const watcher = new FileWatcher('Audio Files');

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

    await watcher.changeAudioFilesDirectory('Other Files');

    await outputFiles({
        'Other Files': {
            'Audio 1.01_01.wav': ``
        }
    });
    await watcher.nextUpdate();

    expect(watcher.currentTake)
        .toEqual(2);

    await watcher.stopWatching();
}));
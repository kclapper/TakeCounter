import { readFile } from 'node:fs/promises';

import { test, expect } from '@jest/globals';

import withLocalTmpDir from 'with-local-tmp-dir';
import outputFiles from 'output-files';
import endent_formats from 'endent';
const endent = endent_formats.default;

import { FileWatcher } from '.';

test('write temp file', () => withLocalTmpDir(async () => {
    console.log(endent);
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


test('watch file and emit events', () => withLocalTmpDir(async () => {
    const watcher = new FileWatcher();
}));
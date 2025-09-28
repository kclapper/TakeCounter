import { watch, opendir } from 'node:fs/promises';
import path from 'node:path';

class TakeEvent extends Event {
    constructor(take) {
        super('takeUpdate');
        this.take = take;
    }
}

/*
https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
*/
function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export class PlaylistWatcher extends EventTarget {
    constructor(audioFilePath) {
        super();

        this.audioFilePath = audioFilePath;
        this.isWatching = false;
        this.trackName = '';
        this.offset = 1;

        this.#setUpNextUpdatePromise();
    }

    #setUpNextUpdatePromise() {
        this.nextUpdatePromise = new Promise((resolve) => {
            this.nextUpdatePromiseResolveCallback = resolve;
        });
    }

    #resolveNextUpdate() {
        this.nextUpdatePromiseResolveCallback();
        this.#setUpNextUpdatePromise();
    }

    setOffset(offset) {
        if (!Number.isInteger(offset)) {
            return;
        }
        this.offset = offset;
    }

    get currentTake() {
        if (!this.lastAudioFile) {
            return 0;
        }

        const lastTake = this.parseTake(this.lastAudioFile);
        if (lastTake === false) {
            return 0;
        }

        return lastTake;
    }

    parseTake(audioFileName) {
        const matcher = this.getRE();

        if (!matcher.test(audioFileName)) {
            return false;
        }

        let take = this.offset;

        const match = audioFileName.match(matcher);
        if (match[3]) {
            take = Number(match[3]) + this.offset;
        }

        return take < 0 ? 1 : take;
    }

    getRE() {
        if (this.trackName.trim() === '') {
            return new RegExp(
                `([^\.]+)(\.?([0-9]+))?(_([0-9]+)\.(wav|aif))`
            );
        }
        else {
            const trackNameEscaped = escapeRegex(this.trackName);
            return new RegExp(
                `(${trackNameEscaped})(\.?([0-9]+))?(_([0-9]+)\.(wav|aif))`
            );
        }
    }

    watchTrackName(trackName) {
        return this.stopWatching()
            .then(async () => {
                this.trackName = trackName;

                if (this.audioFilePath === '') {
                    return;
                }

                this.watchAbort = new AbortController();
                this.watchGenerators = [];

                await this.#watchFolder(this.audioFilePath);

                this.isWatching = true;
                this.#nextWatchResult();
            });
    }

    async #watchFolder(folder)
    {
        const generator = watch(
            folder,
            {
                signal: this.watchAbort.signal
            }
        )
        this.watchGenerators.push(generator);

        await this.#watchChildFolders(folder);

        return generator;
    }

    async #watchChildFolders(folder) {
        let dir;
        try {
            dir = await opendir(folder);
        } catch {
            console.error("Failed to open folder");
        }

        for await (const child of dir) {
            if (!child.isDirectory()) {
                continue;
            }

            const childPath = path.resolve(folder, child.name);
            await this.#watchFolder(childPath);
        }
    }

    #nextWatchResult() {
        for (const generator of this.watchGenerators) {
            generator
                .next()
                .then((watchIteratorResult) => {
                    this.#handleWatchIteratorResult(watchIteratorResult);
                    this.#resolveNextUpdate();
                })
                .catch((err) => {
                    if (err.name == 'AbortError') {
                        this.isWatching = false;
                        this.#resolveNextUpdate();
                        return;
                    }
                    throw err;
                });
        }
    }

    #handleWatchIteratorResult(watchIteratorResult) {
        if (watchIteratorResult.done) {
            return;
        }

        const changeEvent = watchIteratorResult.value;
        this.#handleAudioFilesChange(changeEvent);
        this.#nextWatchResult();
    }

    #handleAudioFilesChange(changeEvent) {
        if (changeEvent.eventType != 'rename') {
            return;
        }

        const filename = changeEvent.filename;
        const take = this.parseTake(filename);
        if (take === false) {
            return;
        }

        this.lastAudioFile = filename;
        this.dispatchEvent(new TakeEvent(take));
    }

    stopWatching() {
        if (this.isWatching) {
            this.watchAbort.abort();
        }
        return this.nextUpdate();
    }

    nextUpdate() {
        if (!this.isWatching) {
            return Promise.resolve();
        }

        return this.nextUpdatePromise;
    }

    changeAudioFilesPath(directory) {
        this.audioFilePath = directory;

        return this.stopWatching()
            .then(() => {
                return this.watchTrackName(this.trackName);
            })
    }
}

export class ClipWatcher extends PlaylistWatcher {
    constructor(audioFilePath) {
        super(audioFilePath);
        this.offset = 0;
    }

    parseTake(audioFileName) {
        const matcher = this.getRE();
        
        if (!matcher.test(audioFileName)) {
            return false;
        }

        let take = this.offset;

        const match = audioFileName.match(matcher);
        if (match[5]) {
            take = Number(match[5]) + this.offset;
        }

        return take < 0 ? 1 : take;
    }
}
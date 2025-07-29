import { watch } from 'node:fs/promises';

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
                `([^\.]+)(\.?([0-9]+))?(_([0-9]+)\.wav)`
            );
        }
        else {
            const trackNameEscaped = escapeRegex(this.trackName);
            return new RegExp(
                `(${trackNameEscaped})(\.?([0-9]+))?(_([0-9]+)\.wav)`
            );
        }
    }

    watchTrackName(trackName) {
        return this.stopWatching()
            .then(() => {
                this.trackName = trackName;

                if (this.audioFilePath === '') {
                    return;
                }

                this.watchAbort = new AbortController();
                this.watchGenerator = watch(
                    this.audioFilePath, 
                    {  
                        signal: this.watchAbort.signal 
                    }
                );

                this.isWatching = true;
                this.#nextWatchResult();
            });
    }

    #nextWatchResult() {
        this.currentWatchPromise = this.watchGenerator
            .next()
            .then((watchIteratorResult) => {
                this.#handleWatchIteratorResult(watchIteratorResult);
            })
            .catch((err) => {
                if (err.name == 'AbortError') {
                    this.isWatching = false;
                    return;
                }
                throw err;
            });
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

        return new Promise((resolve) => {
            this.currentWatchPromise
                .then(() => {
                    resolve();
                });
        });
    }

    changeAudioFilesPath(directory) {
        this.audioFilePath = directory;

        if (!this.isWatching) {
            return Promise.resolve();
        }

        return this.stopWatching()
            .then(() => {
                return this.watchTrackName(this.trackName);
            })
    }
}

export class TrackWatcher extends PlaylistWatcher {
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
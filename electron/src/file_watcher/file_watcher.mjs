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

export class FileWatcher extends EventTarget {
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

        const lastTake = this.#parseTake(this.lastAudioFile);
        if (lastTake === false) {
            return 0;
        }

        return lastTake;
    }

    #parseTake(audioFileName) {
        if (!this.trackNameRE) {
            return false;
        }
        
        if (!this.trackNameRE.test(audioFileName)) {
            return false;
        }

        let take = this.offset;

        const match = audioFileName.match(this.trackNameRE);
        if (match[3]) {
            take = Number(match[3]) + this.offset;
        }

        return take < 0 ? 1 : take;
    }

    watchTrackName(trackName) {
        return this.stopWatching()
            .then(() => {
                this.trackName = trackName;

                if (this.audioFilePath === '') {
                    return;
                }

                if (this.trackName.trim() === '') {
                    this.trackNameRE = new RegExp(
                        `([^\.]+)(\.?([0-9]+))?(_[0-9]+\.wav)`
                    );
                }
                else {
                    const trackNameEscaped = escapeRegex(trackName);
                    this.trackNameRE = new RegExp(
                        `(${trackNameEscaped})(\.?([0-9]+))?(_[0-9]+\.wav)`
                    );
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
        const take = this.#parseTake(filename);
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
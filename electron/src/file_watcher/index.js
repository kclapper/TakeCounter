import path from 'node:path';
import { watch } from 'node:fs/promises';

export class FileWatcher extends EventTarget {
    constructor(audioFilePath) {
        super();

        this.audioFilePath = audioFilePath;
        this.isWatching = false;
        this.watchAbort = new AbortController();
    }

    get currentTake() {
        return 0;
    }

    watchTrackName(trackName) {
        this.trackName = trackName;

        this.watchGenerator = watch(
            this.audioFilePath, 
            {  
                signal: this.watchAbort.signal 
            }
        );

        this.#nextWatchResult();
        this.isWatching = true;
    }

    #nextWatchResult() {
        this.currentWatchPromise = this.watchGenerator.next();
        this.currentWatchPromise   
            .then((watchIteratorResult) => {
                this.#handleWatchIteratorResult(watchIteratorResult);
            })
            .catch((err) => {
                if (err.name == 'AbortError') {
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
        console.log(changeEvent);
    }

    stopWatching() {
        this.watchAbort.abort();
        this.isWatching = false;
    }

    async nextUpdate() {
        await this.currentWatchPromise;
    }
}
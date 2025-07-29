import { settingsEmitter } from "../settings.cjs";
import { FileWatcher, PlaylistWatcher, TrackWatcher } from "./file_watcher.mjs";

let audioFilesPath;
let trackName;
let offset;
let watcher;
let mode;

let notifyNewTake;

export async function fileWatcherInit(mainWindow) {
    settingsEmitter.on('change', handleNewSettings);
    settingsEmitter.on('loaded', handleNewSettings);

    notifyNewTake = (take) => {
        mainWindow.webContents.send('set-count', take);
    }

    return mainWindow;
}

function handleNewSettings(settings) {
    if (settings.counterMode != 'ptFileWatcher') {
        if (watcher) {
            watcher.stopWatching();
        }
        return;
    }

    handleFileWatcherMode(settings.ptFileWatcherMode);
}

async function handleFileWatcherMode(fileWatcherSettings) {
    if (!mode || !watcher || mode != fileWatcherSettings.mode) {
        if (watcher) {
            await watcher.stopWatching();
        }

        mode = fileWatcherSettings.mode;
        watcher = getWatcher(fileWatcherSettings.mode);

        if (audioFilesPath) {
            await watcher.changeAudioFilesPath(audioFilesPath);
        }

        if (trackName !== undefined) {
            await watcher.watchTrackName(trackName);
        }

        if (offset) {
            watcher.setOffset(offset);
        }
    }

    if (!audioFilesPath || audioFilesPath != fileWatcherSettings.audioFilesPath) {
        audioFilesPath = fileWatcherSettings.audioFilesPath; 
        await watcher.changeAudioFilesPath(audioFilesPath);
    } 

    if (!trackName || trackName != fileWatcherSettings.trackName) {
        trackName = fileWatcherSettings.trackName;
        await watcher.watchTrackName(trackName);
    }

    if (!offset || offset != fileWatcherSettings.offset) {
        offset = fileWatcherSettings.offset;
        watcher.setOffset(offset);
    }
} 

function getWatcher(fileWatcherMode) {
    let watcher;
    if (fileWatcherMode === 'track') {
        watcher = new TrackWatcher('');
    } else {
        watcher = new PlaylistWatcher('');
    }
    watcher.addEventListener('takeUpdate', handleTakeChange);
    return watcher;
}

function handleTakeChange(event) {
    if (!notifyNewTake) {
        return;
    }

    notifyNewTake(event.take);    
}
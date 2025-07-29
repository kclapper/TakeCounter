import { settingsEmitter } from "../settings.cjs";
import { PlaylistWatcher, TrackWatcher } from "./file_watcher.mjs";

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
    if (mode === undefined || mode != fileWatcherSettings.mode) {
        if (watcher !== undefined) {
            await watcher.stopWatching();
        }

        mode = fileWatcherSettings.mode;
        watcher = await getWatcher(mode);
    }

    if (audioFilesPath === undefined || audioFilesPath != fileWatcherSettings.audioFilesPath) {
        audioFilesPath = fileWatcherSettings.audioFilesPath; 
        await watcher.changeAudioFilesPath(audioFilesPath);
    } 

    if (trackName === undefined || trackName != fileWatcherSettings.trackName) {
        trackName = fileWatcherSettings.trackName;
        await watcher.watchTrackName(trackName);
    }

    if (offset === undefined || offset != fileWatcherSettings.offset) {
        offset = fileWatcherSettings.offset;
        watcher.setOffset(offset);
    }
} 

async function getWatcher(fileWatcherMode) {
    let watcher;

    if (fileWatcherMode === 'track') {
        watcher = new TrackWatcher('');
    } else {
        watcher = new PlaylistWatcher('');
    }

    watcher.addEventListener('takeUpdate', handleTakeChange);

    if (audioFilesPath !== undefined) {
        await watcher.changeAudioFilesPath(audioFilesPath);
    }

    if (trackName !== undefined) {
        await watcher.watchTrackName(trackName);
    }

    if (offset !== undefined) {
        watcher.setOffset(offset);
    }

    return watcher;
}

function handleTakeChange(event) {
    if (!notifyNewTake) {
        return;
    }

    notifyNewTake(event.take);    
}
import { settingsEmitter } from "../settings.cjs";
import { FileWatcher } from "./file_watcher.mjs";

let audioFilesPath;
let trackName;
let offset;
let watcher;

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
    if (settings.counterMode != 'fileWatcher') {
        if (watcher) {
            watcher.stopWatching();
        }
        return;
    }

    handleFileWatcherMode(settings.fileWatcherMode);
}

async function handleFileWatcherMode(fileWatcherSettings) {
    if (!watcher) {
        audioFilesPath = fileWatcherSettings.audioFilesPath; 
        watcher = new FileWatcher(audioFilesPath);
        watcher.addEventListener('takeUpdate', handleTakeChange);
    }

    if (audioFilesPath != fileWatcherSettings.audioFilesPath) {
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

function handleTakeChange(event) {
    if (!notifyNewTake) {
        return;
    }

    notifyNewTake(event.take);    
}
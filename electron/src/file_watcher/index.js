import { settingsEmitter } from "../settings.cjs";
import { FileWatcher } from "./file_watcher.js";

let audioFilesPath;
let trackName;
let watcher;

let notifyNewTake;

export async function fileWatcherInit(mainWindow) {
    settingsEmitter.on('change', handleNewSettings);
    settingsEmitter.on('loaded', handleNewSettings);

    notifyNewTake = (take) => {
        mainWindow.webContent.send('set-take', take);
    }

    return mainWindow;
}

function handleNewSettings(settings) {
    if (settings.counterMode != 'fileWatcherMode') {
        if (watcher) {
            watcher.stopWatching();
        }
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
} 

function handleTakeChange(event) {
    if (!notifyNewTake) {
        return;
    }

    notifyNewTake(event.take);    
}
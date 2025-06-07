const EventEmitter = require('node:events');
const path = require('node:path');
const fs = require('node:fs/promises');

const { app, ipcMain } = require('electron');

const { copy } = require('common/util');

const { defaultSettings, settingsAreValid } = require("common/settings");

class SettingsEmitter extends EventEmitter {}
const settingsEmitter = new SettingsEmitter();

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

// The main settings object
let settings;
function getSettings() {
  return copy(settings);
}

function resetDefaultSettings()
{
  fs.writeFile(
    settingsPath, 
    JSON.stringify(defaultSettings), 
    { encoding: 'utf8' }
  );
  settings = copy(defaultSettings);
}

async function loadSettings() {
  console.info(`Settings path: ${settingsPath}`);

  let loadedSettings;

  try {
    const settingsJson = await fs.readFile(settingsPath, { encoding: 'utf8' });
    loadedSettings = JSON.parse(settingsJson);
  } catch (err) {
    console.warn("Could not load settings, using defaults");
    resetDefaultSettings();
    return;
  }

  if (settingsAreValid(loadedSettings)) {
    settings = copy(loadedSettings);
  } else {
    console.error("Invalid settings found, using defaults");
    resetDefaultSettings();
  }

  console.info("Finished loading settings");
  settingsEmitter.emit('loaded');
}

async function changeSettings(newSettings) {
  if (settingsAreValid(newSettings)) {
    try {
      await fs.writeFile(settingsPath, JSON.stringify(newSettings));
      settings = newSettings;
      settingsEmitter.emit('change', settings);
    } catch (err) {
      console.warn(`Could not save settings:\n${err}`);
    }
  } else {
    throw new Error('Tried to save invalid application settings');
  }
}

async function registerSettingsHandlers() {
  ipcMain.handle('get-settings', () => copy(settings));
  ipcMain.handle('change-settings', (event, newSettings) => {
    changeSettings(newSettings);
    return newSettings;
  });
}

async function alwaysOnTopInit(mainWindow) {
    console.info(`${settings.alwaysOnTop ? "Enabling" : "Disabling"} always on top`);
    mainWindow.setAlwaysOnTop(settings.alwaysOnTop);

    settingsEmitter.on('change', (settings) => {
      console.info(`${settings.alwaysOnTop ? "Enabling" : "Disabling"} always on top`);
      mainWindow.setAlwaysOnTop(settings.alwaysOnTop);
    });

    return mainWindow;
}

module.exports = {
  settingsEmitter,
  getSettings,
  loadSettings,
  changeSettings,
  registerSettingsHandlers,
  alwaysOnTopInit
};

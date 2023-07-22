const EventEmitter = require('node:events');
const path = require('node:path');
const fs = require('node:fs/promises');

const { app, ipcMain } = require('electron');

const { copy } = require('@common/util');

const { defaultSettings, settingsAreValid } = require("@common/settings");

class SettingsEmitter extends EventEmitter {}

const settingsEmitter = new SettingsEmitter();

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

// The main settings object
let settings;
function getSettings() {
  return copy(settings);
}

async function loadSettings() {
  fs.readFile(settingsPath, { encoding: 'utf8' })
    .then((settingsJson) => {
      const loadedSettings = JSON.parse(settingsJson);

      if (!settingsAreValid(loadedSettings)) {
        throw new Error('Invalid settings found');
      }

      settings = loadedSettings;
    })
    .catch((err) => {
      console.warn(err.message);
      console.warn("Loading default settings");

      return fs.writeFile(settingsPath, JSON.stringify(defaultSettings), { encoding: 'utf8' });
    })
    .catch((err) => {
      console.warn(err.message);
      console.warn("Failed to save settings.");
    });

  settings = copy(defaultSettings);

  settingsEmitter.emit('loaded');
}

async function changeSettings(newSettings) {
  if (settingsAreValid(newSettings)) {
    try {
      await fs.writeFile(settingsPath, JSON.stringify(newSettings));
      settings = newSettings;
      settingsEmitter.emit('change');
    } catch (err) {
      console.warn("Could not save settings.");
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

module.exports = {
  settingsEmitter,
  getSettings,
  loadSettings,
  changeSettings,
  registerSettingsHandlers
};

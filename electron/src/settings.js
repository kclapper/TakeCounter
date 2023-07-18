const EventEmitter = require('node:events');
const path = require('node:path');
const fs = require('node:fs/promises');

const { ipcMain } = require('electron');

const { copy } = require('@common/util');

const { defaultSettings, settingsAreValid } = require("@common/settings");

class SettingsEmitter extends EventEmitter {}

const settingsEmitter = new SettingsEmitter();

const settingsPath = path.join(__dirname, 'settings.json');

// The main settings object
let settings;
function getSettings() {
  return copy(settings);
}

async function loadSettings() {
  try {
    settings = await fs.readFile(settingsPath, { encoding: 'utf8' });

    if (!settingsAreValid(settings)) {
      throw new Error('Invalid settings found');
    }
  } catch (err) {
    console.warn(err.message);
    console.warn("Loading default settings");

    await fs.writeFile(settingsPath, JSON.stringify(defaultSettings), { encoding: 'utf8' });
    settings = copy(defaultSettings);
  }

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

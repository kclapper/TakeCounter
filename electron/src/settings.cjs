const EventEmitter = require('node:events');
const path = require('node:path');
const fs = require('node:fs/promises');

const { app, ipcMain, dialog } = require('electron');

const { copy } = require('../../components/src/util');

const { defaultSettings, settingsAreValid } = require("../../components/src/settings/schema");

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

async function loadSettings(mainWindow) {
  console.info(`Settings path: ${settingsPath}`);

  let loadedSettings;

  try {
    const settingsJson = await fs.readFile(settingsPath, { encoding: 'utf8' });
    loadedSettings = JSON.parse(settingsJson);
  } catch {
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
  settingsEmitter.emit('loaded', settings);

  return mainWindow;
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

async function registerSettingsHandlers(mainWindow) {
  ipcMain.handle('get-settings', () => copy(settings));
  ipcMain.handle('change-settings', (event, newSettings) => {
    changeSettings(newSettings);
    return newSettings;
  });
  ipcMain.handle('show-dialog', (event, dialogArg) => {
    dialog.showOpenDialog(dialogArg)
      .then((path) => {
        mainWindow.webContents.send('dialog-response', path);
      })
      .catch(() => {
        console.log("Failed while opening dialog");
      });
  });
  return mainWindow;
}

let alwaysOnTopEnabled = false;
async function alwaysOnTopInit(mainWindow) {
    mainWindow.setAlwaysOnTop(settings.alwaysOnTop);
    alwaysOnTopEnabled = settings.alwaysOnTop;

    settingsEmitter.on('change', (settings) => {
      if (settings.alwaysOnTop == alwaysOnTopEnabled) {
        return;
      }

      mainWindow.setAlwaysOnTop(settings.alwaysOnTop);
      alwaysOnTopEnabled = settings.alwaysOnTop;
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

const {
  globalShortcut
} = require('electron');
const {
  settingsEmitter,
  getSettings,
  changeSettings
} = require('./settings.cjs');
const { defaultSettings } = require("../../components/src/settings/schema");

function Shortcut(setting, keybind, activateCallback) {
  this.setting = setting;
  this.keybind = keybind;
  this.activateCallback = activateCallback;

  settingsEmitter.on('change', this.onSettingChange.bind(this));
  globalShortcut.register(keybind, activateCallback);
}

Shortcut.prototype.onSettingChange = function(settings) {
  if (settings.keyboardShortcuts[this.setting] === this.keybind) {
    return;
  }

  globalShortcut.unregister(this.keybind);

  const keybind = settings['keyboardShortcuts'][this.setting];
  let status = globalShortcut.register(keybind, this.activateCallback);
  if (!status) {
    console.log(`Invalid ${this.setting} shortcut: ${keybind}`);
    settings.keyboardShortcuts[this.setting] = defaultSettings.keyboardShortcuts[this.setting]; 
    changeSettings(settings);
    return;
  }

  this.keybind = keybind;
}

async function registerKeyboardShortcuts(mainWindow) {
  let settings = getSettings();

  new Shortcut(
    'incrementCount', 
    settings.keyboardShortcuts.incrementCount,
    () => {
      mainWindow.webContents.send('increment-counter');
    }
  );

  new Shortcut(
    'decrementCount', 
    settings.keyboardShortcuts.decrementCount,
    () => {
      mainWindow.webContents.send('decrement-counter');
    }
  );

  new Shortcut(
    'resetCount', 
    settings.keyboardShortcuts.resetCount,
    () => {
      mainWindow.webContents.send('reset-counter');
    }
  );

  new Shortcut(
    'manualMode', 
    settings.keyboardShortcuts.manualMode,
    () => {
      mainWindow.webContents.send('set-mode', 'manual');
    }
  );

  new Shortcut(
    'fileWatcherMode', 
    settings.keyboardShortcuts.fileWatcherMode,
    () => {
      mainWindow.webContents.send('set-mode', 'ptFileWatcher');
    }
  );

  return mainWindow;
}

module.exports = {
  registerKeyboardShortcuts
};

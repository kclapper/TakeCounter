const {
  globalShortcut
} = require('electron');
const {
  settingsEmitter,
  getSettings,
  changeSettings
} = require('./settings.cjs');
const { defaultSettings } = require("../../components/src/settings/schema");

function registerCountShortcuts(mainWindow) {
  let settings = getSettings();
  const shortcuts = settings.keyboardShortcuts;

  let status = globalShortcut.register(shortcuts.incrementCount, () => {
    mainWindow.webContents.send('increment-counter');
  });
  if (!status) {
    console.log("Invalid increment count shortcut", shortcuts.incrementCount);
    settings.keyboardShortcuts.incrementCount = defaultSettings.keyboardShortcuts.incrementCount; 
    changeSettings(settings);
    return;
  }

  status = globalShortcut.register(shortcuts.decrementCount, () => {
    mainWindow.webContents.send('decrement-counter');
  });
  if (!status) {
    console.log("Invalid decrement count shortcut", shortcuts.decrementCount);
    settings.keyboardShortcuts.decrementCount = defaultSettings.keyboardShortcuts.decrementCount; 
    changeSettings(settings);
    return;
  }

  status = globalShortcut.register(shortcuts.resetCount, () => {
    mainWindow.webContents.send('reset-counter');
  });
  if (!status) {
    console.log("Invalid reset count shortcut", shortcuts.resetCount);
    settings.keyboardShortcuts.resetCount = defaultSettings.keyboardShortcuts.resetCount; 
    changeSettings(settings);
    return;
  }
}

async function registerKeyboardShortcuts(mainWindow) {
  registerCountShortcuts(mainWindow);

  settingsEmitter.on('change', () => {
    globalShortcut.unregisterAll();
    registerCountShortcuts(mainWindow);
  });

  return mainWindow;
}

module.exports = {
  registerKeyboardShortcuts
};

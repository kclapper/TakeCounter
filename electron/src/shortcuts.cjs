const {
  globalShortcut
} = require('electron');
const {
  settingsEmitter,
  getSettings
} = require('./settings.cjs');

function registerCountShortcuts(mainWindow) {
  const shortcuts = getSettings().keyboardShortcuts;

  globalShortcut.register(shortcuts.incrementCount, () => {
    mainWindow.webContents.send('increment-counter');
  });
  globalShortcut.register(shortcuts.decrementCount, () => {
    mainWindow.webContents.send('decrement-counter');
  });
  globalShortcut.register(shortcuts.resetCount, () => {
    mainWindow.webContents.send('reset-counter');
  });
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

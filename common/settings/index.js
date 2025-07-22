const defaultSettings = {
  currentTake: 1,
  keyboardShortcuts: {
    incrementCount: "Alt+Shift+=",
    decrementCount: "Alt+Shift+-",
    resetCount: "Alt+Shift+0"
  },
  alwaysOnTop: false,
  counterMode: 'manual',
  fileWatcherMode: {
    audioFilesPath: '',
    trackName: ''
  }
};

function settingsAreValid(settings, schema = defaultSettings) {
  for (const [key, value] of Object.entries(settings)) {
    // Recur into objects and arrays
    if (typeof value === 'object') {
      if (!settingsAreValid(value, schema[key])) {
        return false;
      }
      continue;
    }

    // If the key isn't in the schema
    if (schema[key] === undefined) {
      return false;
    }

    // If the value is the wrong type
    if (typeof value !== typeof schema[key]) {
      return false;
    }
  }

  // If the settings are missing a key
  for (const key of Object.keys(schema)) {
    if (settings[key] === undefined) {
      return false;
    }
  }

  return true;
}

module.exports = {
  defaultSettings,
  settingsAreValid
};

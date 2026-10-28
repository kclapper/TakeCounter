export const defaultSettings = {
  schemaVersion: 3,
  currentTake: 1,
  keyboardShortcuts: {
    incrementCount: "Alt+Shift+=",
    decrementCount: "Alt+Shift+-",
    resetCount: "Alt+Shift+0",
    manualMode: "Alt+Shift+M",
    fileWatcherMode: "Alt+Shift+W",
  },
  alwaysOnTop: true,
  showDetailsBox: true,
  counterMode: 'manual', /* manual, ptFileWatcher */
  ptFileWatcherMode: {
    mode: 'clip', /* clip, playlist */
    showModeIndicator: true,
    subMode: 'all', /* all, specific */
    offset: 0,
    offsetShortcuts: false,
    showOffset: true,
    trackName: '',
    audioFilesPath: ''
  },
  takeDisplaySettings: {
    takeTextPrefix: 'Take',
    showTakePrefix: true,
    showTakeButtons: true,
  },
  colorScheme: {
    background: '#282c34',
    counterButtons: '#f468f7',
    settingsButtons: '#ced900',
  }
};

export function settingsNeedMigration(settings) {
  if (!settings['schemaVersion']) {
    return true;
  }

  return settings['schemaVersion'] !== defaultSettings['schemaVersion'];
}

export function migrateSettings(settings) {
  if (!settings['schemaVersion']) {
    return defaultSettings;
  }

  switch (settings['schemaVersion']) {
    case 1: {
      settings['keyboardShortcuts']['manualMode'] = defaultSettings['keyboardShortcuts']['manualMode'];
      settings['keyboardShortcuts']['fileWatcherMode'] = defaultSettings['keyboardShortcuts']['fileWatcherMode'];
      settings['schemaVersion'] = 2;
    }
    // Fallthrough
    case 2: {
      settings['colorScheme'] =  {
        background: '#282c34',
        counterButtons: '#f468f7',
        settingsButtons: '#ced900',
      };
      settings['schemaVersion'] = 3;
    }
    // Fallthrough
  }

  if (settings['schemaVersion'] != defaultSettings['schemaVersion']) {
    console.error('Something went wrong while migrating settings');
    return defaultSettings;
  }

  return settings;
}

export function settingsAreValid(settings, schema = defaultSettings) {
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
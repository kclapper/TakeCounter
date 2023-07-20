import { createContext, useContext } from 'react';

import { defaultSettings } from '@common/settings';

const runningInElectron = window.settings !== undefined;

// Some defaults are different on the web.
if (!runningInElectron) {
  defaultSettings.keyboardShortcuts.incrementCount = "Shift+Plus";
  defaultSettings.keyboardShortcuts.decrementCount = "Shift+_";
  defaultSettings.keyboardShortcuts.resetCount = "Shift+R";
}

export async function loadSettings() {
  if (runningInElectron) {
    return await window.settings.getSettings();
  }
  return defaultSettings;
}

export const initialSettings = await loadSettings();

export const SettingsContext = createContext({
  get: () => initialSettings,
  change: () => {}
});

export const useSettings = (setting) => {
  const settings = useContext(SettingsContext);

  if (setting === undefined) {
    return settings;
  }

  const requestedSetting = settings.get()[setting];
  if (requestedSetting === undefined) {
    throw new Error(`Could not find setting ${setting}`);
  }

  return requestedSetting;
};

export { settingsAreValid } from '@common/settings';

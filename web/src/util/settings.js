import { createContext, useCallback, useContext } from 'react';

import { defaultSettings } from 'common';
import { copy, deepFreeze } from 'common';

export { settingsAreValid } from 'common';

const runningInElectron = window.settings !== undefined;

// Some defaults are different on the web.
if (!runningInElectron) {
  defaultSettings.keyboardShortcuts.incrementCount = "Shift+Plus";
  defaultSettings.keyboardShortcuts.decrementCount = "Shift+_";
  defaultSettings.keyboardShortcuts.resetCount = "Shift+R";
}

deepFreeze(defaultSettings);
export { defaultSettings };

export async function loadSettings() {
  if (runningInElectron) {
    return await window.settings.getSettings();
  }
  return copy(defaultSettings);
}

export let initialSettings = defaultSettings;
loadSettings().then((settings) => {
  initialSettings = settings;
})

export const SettingsContext = createContext({
  get: () => initialSettings,
  change: () => {},
  reset: () => {}
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
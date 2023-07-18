import React from 'react';
import {
  useState,
  useCallback,
  createContext
} from 'react';

import { defaultSettings, settingsAreValid } from '@common/settings';
import { copy } from '@common/util';

const runningInElectron = window.settings !== undefined;

async function loadSettings() {
  if (runningInElectron) {
    return await window.settings.getSettings();
  }
  return defaultSettings;
}

const initialSettings = await loadSettings();

export const SettingsContext = createContext(initialSettings);

export default function Settings({ children }) {
  const [settings, setSettings] = useState(initialSettings);

  const get = useCallback(() => copy(settings), [settings]);

  const change = useCallback((newSettings) => {
    if (settingsAreValid(newSettings)) {
      setSettings(newSettings);

      if (runningInElectron) {
        window.settings.changeSettings(newSettings);
      }
    } else {
      console.warn("Invalid settings provided");
    }
  }, [setSettings]);

  return <SettingsContext.Provider value={{ get, change }}>
           { children }
         </SettingsContext.Provider>
}

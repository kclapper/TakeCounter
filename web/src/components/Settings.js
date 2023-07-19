import React from 'react';
import { useState, useCallback } from 'react';

import { copy } from '../util';
import {
  initialSettings,
  settingsAreValid,
  SettingsContext
} from '../util/settings';

export default function Settings({ children }) {
  const [settings, setSettings] = useState(initialSettings);

  const get = useCallback(() => copy(settings), [settings]);

  const change = useCallback((newSettings) => {
    if (settingsAreValid(newSettings)) {
      setSettings(newSettings);

      if (window.settings !== undefined) {
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

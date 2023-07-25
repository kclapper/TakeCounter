import React from 'react';
import { useState, useCallback } from 'react';

import { copy } from '@common/util';
import {
  initialSettings,
  settingsAreValid,
  SettingsContext,
  defaultSettings
} from '../../util/settings';

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

  const reset = useCallback(() => {
    change(defaultSettings);
  }, [change]);

  return <SettingsContext.Provider value={{ get, change, reset }}>
           { children }
         </SettingsContext.Provider>
}

import { useContext, useCallback, useReducer, createContext } from 'react';
import React from 'react';

import { copy } from '../../../../common/util';
import { defaultSettings } from '../../../../common/settings';
import { loadedSettings } from './load';

export const SettingsContext = createContext(null);
export const SettingsDispatchContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, dispatch] = useReducer(settingsReducer, loadedSettings);

  return (
    <SettingsContext value={ settings }>
      <SettingsDispatchContext value={ dispatch }>
        { children }
      </SettingsDispatchContext>
    </SettingsContext>
  );
}

function settingsReducer(settings, action) {
  switch (action.type) {
    case 'change': {
      return handleChangeAction(settings, action);
    }
    case 'reset': {
      if (window.settings !== undefined) {
        window.settings.changeSettings(defaultSettings);
      }
      return copy(defaultSettings);
    }
    default: {
      throw Error('[Settings][Reducer] Unknown reducer action');
    }
  }
}

function handleChangeAction(settings, action) {
  if (action.settingKeys === undefined) {
    return action.value;
  }

  if (action.settingKeys.length === 0) {
    return action.value;
  }

  const settingKeys = action.settingKeys;
  let setting = settings;
  for (let i = 0; i < settingKeys.length - 1; i++) {
    const key = settingKeys[i];

    if (setting[key] === undefined) {
      throw Error(`settings.${action.settingKeys.join('.')} does not exist`);
    }

    setting = setting[key];
  }

  setting[settingKeys.at(-1)] = action.value;

  if (window.settings !== undefined) {
    window.settings.changeSettings(settings);
  }

  return copy(settings);
}

export function useSetting(...settingKeys) {
  const settings = useContext(SettingsContext);
  const dispatch = useContext(SettingsDispatchContext);

  const setter = useCallback((value) => {
    dispatch({
      type: 'change',
      settingKeys: settingKeys, 
      value: value
    });
  }, [settingKeys, dispatch]);

  let setting = settings;
  for (const key of settingKeys) {
    if (setting[key] === undefined) {
      throw Error(`useSetting: the key ${settingKeys.join('.')}is not a valid setting`);
    }

    setting = setting[key];
  }

  return [setting, setter];
}

export function useResetter() {
  const dispatch = useContext(SettingsDispatchContext);
  return useCallback(() => {
    dispatch({
      type: 'reset'
    });
  }, [dispatch]);
}
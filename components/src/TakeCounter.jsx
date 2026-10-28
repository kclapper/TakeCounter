import React from 'react';

import './index.scss';

import { SettingsProvider } from './Settings';
import { MainScreen } from './MainScreen';

export default function TakeCounter() {
  return (
    <SettingsProvider>
      <MainScreen />
    </SettingsProvider>
  );
}

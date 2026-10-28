import React from 'react';
import Details from './Details';
import SettingsMenu from './Settings/Menu';
import Counter from './Counter';
import { useTextContrastForColorSetting } from './Settings';

export function MainScreen() {
    const contrast = useTextContrastForColorSetting('background');
    const textClass = contrast === 'light' ? 'text-white' : 'text-black';

    return (
        <div className={ "d-flex flex-column " + textClass } style={{ minHeight: "100vh" }}>
          <div className="d-flex justify-content-between ms-4 me-4 mt-2 mb-0 m-sm-4">
            <Details />
            <SettingsMenu />
          </div>
          <Counter />
        </div>
    );
}
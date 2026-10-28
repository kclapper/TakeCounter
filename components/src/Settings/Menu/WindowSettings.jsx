import React from 'react';

import { useSetting } from '..';
import { BooleanItem } from '../Items';
import { ColorItem } from '../Items/ColorItem';

export function WindowSettings() {
    const [alwaysOnTop, setAlwaysOnTop] = useSetting('alwaysOnTop');
    const [showDetailsBox, setShowDetailsBox] = useSetting('showDetailsBox');
    const [backgroundColor, setBackgroundColor] = useSetting('colorScheme', 'background');
    const [counterButtonsColor, setCounterButtonsColor] = useSetting('colorScheme', 'counterButtons');

    if (window.settings === undefined) {
        return undefined;
    }

    return (
        <div>
            <h4 className='row border-bottom mt-3'>
                Window
            </h4>
            <BooleanItem name='Always on top'
                         value={ alwaysOnTop }
                         onChange={ setAlwaysOnTop }/>
            <BooleanItem name='Show details box'
                         value={ showDetailsBox }
                         onChange={ setShowDetailsBox }/>
            <ColorItem name='Background color'
                       value={ backgroundColor } 
                       onChange={ setBackgroundColor } />
            <ColorItem name='Counter button color'
                       value={ counterButtonsColor }
                       onChange={ setCounterButtonsColor } />
                       
        </div>
    );
}
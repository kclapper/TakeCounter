import React from 'react';

import { useSetting } from '..';
import { BooleanItem } from '../Items';

export function WindowSettings() {
    const [alwaysOnTop, setAlwaysOnTop] = useSetting('alwaysOnTop');

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
        </div>
    );
}
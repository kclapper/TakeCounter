import React from 'react';

import { useSetting } from '..';
import { DropdownItem } from '../Items';

export function CounterSettings() {
    const [mode, setMode] = useSetting('counterMode');

    const options = [
        { name: 'Manual', value: 'manual' }
    ];

    if (window.settings !== undefined) {
        options.push({ name: 'Pro Tools File Watcher', value: 'ptFileWatcher' });
    }

    return (
        <>
            <h4 className='row border-bottom'>
                Take Counting
            </h4>
            <DropdownItem name='Mode' 
                            value={ mode } 
                            onChange={ setMode }
                            options={ options } /> 
        </>
    )    
}
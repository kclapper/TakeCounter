import React from 'react';

import { useSetting } from '..';
import { DropdownItem } from '../Items';

export function CounterSettings() {
    const [mode, setMode] = useSetting('counterMode');

    return (
        <>
            <h4 className='row border-bottom'>
                Take Counting
            </h4>
            <DropdownItem name='Mode' 
                            value={ mode } 
                            onChange={ setMode }
                            options={[ 
                            { name: 'Manual', value: 'manual' },
                            { name: 'Pro Tools File Watcher', value: 'fileWatcher' },
                            ]} /> 
        </>
    )    
}
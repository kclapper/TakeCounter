import React from 'react';

import { useSetting } from '../Settings';
import { defaultSettings } from '../Settings/schema';

export default function ModeIndicator() {
    const [counterMode] = useSetting('counterMode');
    const [fileWatcherMode] = useSetting('ptFileWatcherMode', 'mode');
    const [offset] = useSetting('ptFileWatcherMode', 'offset');
    const [showOffset] = useSetting('ptFileWatcherMode', 'showOffset');

    let modeIndicator;

    switch (counterMode) {
        case "ptFileWatcher":
            modeIndicator = "Pro Tools File Watcher Mode";
            modeIndicator += ` (${fileWatcherMode})`;
            break;
        case "manual":
        default:
            return <></>;
    }

    const offsetIndicator = 
        showOffset
        && offset !== defaultSettings.ptFileWatcherMode.offset 
        && (
            <>
                <br/>
                Offset: {offset}
            </>
        );

    return (
        <div>
            <p className='text-info fw-bold text-center'>
                {offsetIndicator ? undefined : <br/>}
                {modeIndicator}
                {offsetIndicator}
            </p>
        </div>
    )
}

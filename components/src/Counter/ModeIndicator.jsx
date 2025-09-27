import React, { useCallback, useState } from 'react';

import { useSetting } from '../Settings';

export default function ModeIndicator() {
    const [counterMode] = useSetting('counterMode');
    const [fileWatcherMode] = useSetting('ptFileWatcherMode', 'mode');

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

    return (
        <div>
            <p className='text-info fw-bold'>
                {modeIndicator}
            </p>
        </div>
    )
}

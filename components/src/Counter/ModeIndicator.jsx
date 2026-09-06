import React from 'react';

import { useSetting } from '../Settings';

import * as styles from './ModeIndicator.module.css';

export default function ModeIndicator() {
    const [counterMode] = useSetting('counterMode');
    const [fileWatcherMode] = useSetting('ptFileWatcherMode', 'mode');
    const [offset] = useSetting('ptFileWatcherMode', 'offset');
    const [showOffset] = useSetting('ptFileWatcherMode', 'showOffset');
    const [showModeIndicator] = useSetting('ptFileWatcherMode', 'showModeIndicator');

    if (counterMode === 'manual') {
        return <></>;
    }

    const itemClassName = 'text-info fw-bold text-center mx-1';

    const fileWatcherModeName = fileWatcherMode.charAt(0).toUpperCase() + fileWatcherMode.slice(1);

    const modeIndicator = (
        showModeIndicator
        && (
            <p className={ itemClassName }>
                Pro Tools { fileWatcherModeName } Watcher
            </p>
        )
    );

    const offsetIndicator = 
        showOffset
        && (
            <p className={ itemClassName }>
                Offset: {offset}
            </p>
        );

    const separator = 
        modeIndicator 
        && offsetIndicator
        && <div className={styles['separator']} />;

    return (
        <div className={ styles['container'] }>
            { modeIndicator }
            { separator }
            { offsetIndicator }
        </div>
    )
}

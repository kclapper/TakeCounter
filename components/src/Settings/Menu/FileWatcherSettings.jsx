import React, { useCallback } from 'react';

import { useSetting } from '..';
import { TextItem, PathItem, DropdownItem, IntegerItem } from '../Items/index';

export function FileWatcherSettings({}) {
    const [counterMode] = useSetting('counterMode');
    const [fileWatcherMode, setFileWatcherMode] = useSetting('fileWatcherMode', 'mode');
    const [trackName, setTrackName] = useSetting('fileWatcherMode', 'trackName');
    const [audioFilesPath, setAudioFilesPath] = useSetting('fileWatcherMode', 'audioFilesPath');
    const [offset, setOffset] = useSetting('fileWatcherMode', 'offset');

    const handleSetMode = useCallback((mode) => {
        if (mode === 'allFiles') {
            setTrackName('');
        }
        setFileWatcherMode(mode);
    }, [setFileWatcherMode, setTrackName]);

    if (window.settings === undefined) {
        return undefined;
    }

    if (counterMode !== 'fileWatcher') {
        return undefined;
    }

    return (
        <div>
            <h4 className='row border-bottom mt-3'>
                Pro Tools File Watcher
            </h4>
            <DropdownItem name='Files to watch'
                          value={ fileWatcherMode }
                          onChange={ handleSetMode }
                          options={[
                            { name: 'All files', value: 'allFiles' },
                            { name: 'Specific Track', value: 'specificTrack' },
                          ]}/>
            {
                fileWatcherMode === 'specificTrack' ?
                <TextItem name='Track name'
                            value={ trackName }
                            onChange={ setTrackName }> 
                </TextItem>
                : undefined
            }
            <PathItem name='Audio files path'
                        value={ audioFilesPath }
                        onChange={ setAudioFilesPath }/>
            <IntegerItem name='Take offset'
                         value={ offset }
                         onChange={ setOffset }>
                Add or subtract from the automatic take value.
            </IntegerItem>
        </div>
    );
}
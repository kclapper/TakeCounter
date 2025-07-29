import React, { useCallback } from 'react';

import { useSetting } from '..';
import { TextItem, PathItem, DropdownItem, IntegerItem } from '../Items/index';

export function FileWatcherSettings() {
    const [counterMode] = useSetting('counterMode');
    const [fileWatcherMode, setFileWatcherMode] = useSetting('ptFileWatcherMode', 'mode');
    const [fileWatcherSubMode, setFileWatcherSubMode] = useSetting('ptFileWatcherMode', 'subMode');
    const [trackName, setTrackName] = useSetting('ptFileWatcherMode', 'trackName');
    const [audioFilesPath, setAudioFilesPath] = useSetting('ptFileWatcherMode', 'audioFilesPath');
    const [offset, setOffset] = useSetting('ptFileWatcherMode', 'offset');

    const handleSetSubMode = useCallback((mode) => {
        if (mode === 'all') {
            setTrackName('');
        }
        setFileWatcherSubMode(mode);
    }, [fileWatcherSubMode, setFileWatcherSubMode, setTrackName]);

    if (window.settings === undefined) {
        return undefined;
    }

    if (counterMode !== 'ptFileWatcher') {
        return undefined;
    }

    const trackModeSettings = 
        <>
            <DropdownItem name='Track to watch'
                          value={ fileWatcherSubMode }
                          onChange={ handleSetSubMode }
                          options={[
                              { name: 'All tracks', value: 'all' },
                              { name: 'Specific track', value: 'specific' },
                          ]}/>
            {
                fileWatcherSubMode === 'specific' ?
                <TextItem name='Track name'
                            value={ trackName }
                            onChange={ setTrackName }> 
                </TextItem>
                : undefined
            }
        </>;

    const playlistModeSettings = 
        <>
            <DropdownItem name='Playlist to watch'
                          value={ fileWatcherSubMode }
                          onChange={ handleSetSubMode }
                          options={[
                              { name: 'All playlists', value: 'all' },
                              { name: 'Specific playlist', value: 'specific' },
                          ]}/>
            {
                fileWatcherSubMode === 'specific' ?
                <TextItem name='Playlist name'
                          value={ trackName }
                          onChange={ setTrackName }> 
                </TextItem>
                : undefined
            }
        </>;

    return (
        <div>
            <h4 className='row border-bottom mt-3'>
                Pro Tools File Watcher
            </h4>
            <PathItem name='Audio files path'
                        value={ audioFilesPath }
                        onChange={ setAudioFilesPath }/>
            <IntegerItem name='Take offset'
                         value={ offset }
                         onChange={ setOffset }>
                Add or subtract from the automatic take value.
            </IntegerItem>
            <DropdownItem name='What to watch'
                          value={ fileWatcherMode }
                          onChange={ setFileWatcherMode }
                          options={[
                              { name: 'Track', value: 'track' },
                              { name: 'Playlist(s)', value: 'playlist' },
                          ]}/>
            {
                fileWatcherMode === 'playlist' ?
                playlistModeSettings 
                : trackModeSettings
            }
        </div>
    );
}
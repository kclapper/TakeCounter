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

    const clipModeSettings = 
        <>
            <DropdownItem name='Tracks to watch'
                          value={ fileWatcherSubMode }
                          onChange={ handleSetSubMode }
                          options={[
                              { name: 'Any Track', value: 'all' },
                              { name: 'Specific Track', value: 'specific' },
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
            <DropdownItem name='Playlists to watch'
                          value={ fileWatcherSubMode }
                          onChange={ handleSetSubMode }
                          options={[
                              { name: 'Any Track Playlists', value: 'all' },
                              { name: 'Specific Track Playlists', value: 'specific' },
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

    return (
        <div>
            <h4 className='row border-bottom mt-3'>
                Pro Tools File Watcher
            </h4>
            <PathItem name='Audio Files folder path'
                      value={ audioFilesPath }
                      onChange={ setAudioFilesPath }/>
            <DropdownItem name='Take Count follows'
                          value={ fileWatcherMode }
                          onChange={ setFileWatcherMode }
                          options={[
                              { name: 'Clip Number', value: 'clip' },
                              { name: 'Playlist Number', value: 'playlist' },
                          ]}/>
            {
                fileWatcherMode === 'playlist' ?
                playlistModeSettings 
                : clipModeSettings
            }
            <IntegerItem name='Take Count offset'
                         value={ offset }
                         onChange={ setOffset }>
                Offset adjusts the automatic take value up or down.
            </IntegerItem>
        </div>
    );
}
import React, { useCallback } from 'react';

import { useSetting } from '..';
import { TextItem, PathItem, DropdownItem, IntegerItem } from '../Items/index';

export function FileWatcherSettings() {
    const [counterMode] = useSetting('counterMode');
    const [fileWatcherMode, setFileWatcherMode] = useSetting('ptFileWatcherMode', 'mode');
    const [playlistMode, setPlaylistMode] = useSetting('ptFileWatcherMode', 'playlistMode', 'mode');
    const [trackName, setTrackName] = useSetting('ptFileWatcherMode', 'trackName');
    const [audioFilesPath, setAudioFilesPath] = useSetting('ptFileWatcherMode', 'audioFilesPath');
    const [offset, setOffset] = useSetting('ptFileWatcherMode', 'offset');

    const handleSetPlaylistMode = useCallback((mode) => {
        if (playlistMode === 'allFiles') {
            setTrackName('');
        }
        setPlaylistMode(mode);
    }, [playlistMode, setPlaylistMode, setTrackName]);

    if (window.settings === undefined) {
        return undefined;
    }

    if (counterMode !== 'ptFileWatcher') {
        return undefined;
    }

    const trackModeSettings = 
        <>
            <TextItem name='Track name'
                        value={ trackName }
                        onChange={ setTrackName }> 
            </TextItem>
        </>;

    const playlistModeSettings = 
        <>
            <DropdownItem name='Playlist to watch'
                          value={ playlistMode }
                          onChange={ handleSetPlaylistMode }
                          options={[
                              { name: 'All playlists', value: 'allPlaylists' },
                              { name: 'Specific playlist', value: 'specificPlaylist' },
                          ]}/>
            {
                playlistMode === 'specificPlaylist' ?
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
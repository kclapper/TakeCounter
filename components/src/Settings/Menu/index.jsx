import React from 'react';

import { useSetting, useResetter } from '..';

import { Gear } from './Gear';
import Button from '../../Button';
import KeyItem from './KeyItem';
import BooleanItem from './BooleanItem';
import DropdownItem from './DropdownItem';
import TextItem from './TextItem';
import PathItem from './PathItem';

export default function Menu() {
  const resetDefaultSettings = useResetter();

  const [mode, setMode] = useSetting('counterMode');

  const [trackName, setTrackName] = useSetting('fileWatcherMode', 'trackName');
  const [audioFilesPath, setAudioFilesPath] = useSetting('fileWatcherMode', 'audioFilesPath');

  const [alwaysOnTop, setAlwaysOnTop] = useSetting('alwaysOnTop');

  const [incrementCountShortcut, setIncrementCountShortcut] = useSetting('keyboardShortcuts', 'incrementCount');
  const [decrementCountShortcut, setDecrementCountShortcut] = useSetting('keyboardShortcuts', 'decrementCount');
  const [resetCountShortcut, setResetCountShortcut] = useSetting('keyboardShortcuts', 'resetCount');

  const fileWatcherSettings = mode != 'fileWatcher' ? undefined :
    <div>
      <h4 className='row border-bottom mt-3'>
        File Watcher
      </h4>
      <TextItem name='Track Name'
                value={ trackName }
                onChange={ setTrackName }/> 
      <PathItem name='Audio Files Path'
                value={ audioFilesPath }
                onChange={ setAudioFilesPath }/>
    </div>;

  const windowSettings = 
    <div>
      <h4 className='row border-bottom mt-3'>
        Window
      </h4>
      <BooleanItem name='Always On Top'
                  value={ alwaysOnTop }
                  onChange={ setAlwaysOnTop }/>
    </div>;

  const electronSettings = window.settings == undefined ? undefined :
    <div>
      { fileWatcherSettings }
      { windowSettings }
    </div>;

  return <div>
           <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#settingsMenu" aria-controls="settingsMenu">
             <Gear />
           </button>

           <div className="w-100 offcanvas offcanvas-start overflow-y-scroll p-4" tabIndex="-1" id="settingsMenu" aria-labelledby="settingsMenu" data-bs-theme="dark">
             <div className="offcanvas-header">
               {/* <h2 className="offcanvas-title" id="settingsMenuLabel">Settings</h2> */}
               <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
             </div>

             <div className='container'>
               <h4 className='row border-bottom'>
                 Take Counting
               </h4>
               <DropdownItem name='Mode' 
                             value={ mode } 
                             onChange={ setMode }
                             options={[ 
                              { name: 'Manual', value: 'manual' },
                              { name: 'File Watcher', value: 'fileWatcher' },
                              ]} /> 

                { electronSettings }

               <h4 className='row border-bottom mt-3'>
                 Keyboard Shortcuts
               </h4>
               <p>
                 To change keyboard shortcuts:
                 click the shortcut box,
                 enter the shortcut you want,
                 then click away from the box.
               </p>

               <KeyItem name='Increment Count'
                        value={ incrementCountShortcut }
                        onChange={ setIncrementCountShortcut } />
               <KeyItem name='Decrement Count'
                        value={ decrementCountShortcut }
                        onChange={ setDecrementCountShortcut }/>
               <KeyItem name='Reset Count'
                        value={ resetCountShortcut }
                        onChange={ setResetCountShortcut }/>

               <div className='row justify-content-start border-top mt-3 pt-2'>
                  <h4 className='col-6 my-auto'>
                    Reset
                  </h4>
                  <div className='col-6 d-flex'>
                    <div className='flex-grow-1' />
                    <Button className='btn btn-outline-secondary'
                            onClick={ resetDefaultSettings }>
                      Reset Default Settings
                    </Button>
                  </div>
               </div>
             </div>
           </div>
         </div>;
}

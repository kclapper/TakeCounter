import React from 'react';

import { Gear } from './Gear';

import { FileWatcherSettings } from './FileWatcherSettings';
import { KeyboardShortcutSettings } from './KeyboardShortcutSettings';
import { WindowSettings } from './WindowSettings';
import { CounterSettings } from './CounterSettings';
import { ResetDefaults } from './ResetDefaults';

export default function Menu() {
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
              <CounterSettings />
              <FileWatcherSettings />
              <WindowSettings />
              <KeyboardShortcutSettings />
              <ResetDefaults />
             </div>
           </div>
         </div>;
}

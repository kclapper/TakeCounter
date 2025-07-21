import React from 'react';
import { useContext } from 'react';

import bootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg';

import { copy } from 'common';
import { SettingsContext } from '../../../util/settings';

import Button from '../../Button';
import KeyItem from './KeyItem';
import BooleanItem from './BooleanItem';
import DropdownItem from './DropdownItem';

const gear = <svg className='bi' width='24' height='24' fill='white' ><use href={ bootstrapIcons + '#gear-wide-connected' }/></svg>;

export default function Menu() {
  const settingsCtx = useContext(SettingsContext);
  const settings = settingsCtx.get();
  const changeSettings = settingsCtx.change;
  const resetSettings = settingsCtx.reset;

  const makeSettingChanger = (...args) => {
    function makeChanger(settingsToChange, args) {
      if (args.length === 1) {
        return function (changedSettingValue) {
          let settings = copy(settingsToChange);
          settings[args[0]] = changedSettingValue;
          return settings;
        }
      }

      return function (changedSettingValue) {
        let settings = copy(settingsToChange);
        const changer = makeChanger(settings[args[0]], args.slice(1));
        settings[args[0]] = changer(changedSettingValue);
        return settings;
      }
    }

    const changer = makeChanger(settings, args);
    return function (changedSettingValue) {
      changeSettings(changer(changedSettingValue));
    }
  };

  const windowSettings = <div>
                           <h4 className='row border-bottom'>
                             Window
                           </h4>
                           <BooleanItem name='Always On Top'
                                        value={ settings.alwaysOnTop }
                                        onChange={ makeSettingChanger('alwaysOnTop') }/>
                         </div>

  return <div>
           <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#settingsMenu" aria-controls="settingsMenu">
             { gear }
           </button>

           <div className="w-100 offcanvas offcanvas-start" tabIndex="-1" id="settingsMenu" aria-labelledby="settingsMenu" data-bs-theme="dark">
             <div className="offcanvas-header">
               <h2 className="offcanvas-title" id="settingsMenuLabel">Settings</h2>
               <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
             </div>

             <p className='container'>
               To change keyboard shortcuts:
               click the shortcut box,
               enter the shortcut you want,
               then click away from the box.
             </p>

             <div className='container'>
               <h4 className='row border-bottom'>
                 Keyboard Shortcuts
               </h4>
               <KeyItem name='Increment Count'
                        value={ settings.keyboardShortcuts.incrementCount }
                        onChange={ makeSettingChanger('keyboardShortcuts', 'incrementCount') } />
               <KeyItem name='Decrement Count'
                        value={ settings.keyboardShortcuts.decrementCount }
                        onChange={ makeSettingChanger('keyboardShortcuts', 'decrementCount') }/>
               <KeyItem name='Reset Count'
                        value={ settings.keyboardShortcuts.resetCount }
                        onChange={ makeSettingChanger('keyboardShortcuts', 'resetCount') }/>

               <h4 className='row border-bottom'>
                 Take Counting
               </h4>
               <DropdownItem name='Mode' 
                             value={settings.counterMode} 
                             onChange={ makeSettingChanger('counterMode') }
                             options={[ 
                              { name: 'Manual', value: 'manual' },
                              { name: 'File Watcher', value: 'fileWatcher' },
                              ]} /> 

               { window.settings === undefined ? undefined : windowSettings }


               <h4 className='row border-bottom'>
                 Reset
               </h4>
               <Button className='btn btn-outline-light m-1'
                       onClick={ resetSettings }>
                 Reset Default Settings
               </Button>
             </div>
           </div>
         </div>;
}

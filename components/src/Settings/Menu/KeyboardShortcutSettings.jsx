import React, { useEffect } from 'react';

import { useSetting } from '..';
import { defaultSettings } from '../schema';

import { KeyItem } from '../Items';

export function KeyboardShortcutSettings() {
    const [incrementCountShortcut, setIncrementCountShortcut] = useSetting('keyboardShortcuts', 'incrementCount');
    const [decrementCountShortcut, setDecrementCountShortcut] = useSetting('keyboardShortcuts', 'decrementCount');
    const [resetCountShortcut, setResetCountShortcut] = useSetting('keyboardShortcuts', 'resetCount');
    const [manualModeShortcut, setManualModeShortcut] = useSetting('keyboardShortcuts', 'manualMode');
    const [fileWatcherModeShortcut, setFileWatcherModeShortcut] = useSetting('keyboardShortcuts', 'fileWatcherMode');

    const [, setCounterMode] = useSetting('counterMode');

    useEffect(() => {
        if (!window.counter) {
            return;
        }

        window.counter.handleSetMode(setCounterMode);
    }, [setCounterMode]);

    return (
        <div>
            <h4 className='row border-bottom mt-3'>
                Keyboard Shortcuts
            </h4>
            <p>
                To change keyboard shortcuts:
                click the shortcut box,
                enter the shortcut you want,
                then click away from the box.
            </p>

            <KeyItem name='Increment count'
                     value={ incrementCountShortcut }
                     onChange={ setIncrementCountShortcut } 
                     showReset={ true }
                     resetValue={ defaultSettings.keyboardShortcuts.incrementCount }/>
            <KeyItem name='Decrement count'
                     value={ decrementCountShortcut }
                     onChange={ setDecrementCountShortcut }
                     showReset={ true }
                     resetValue={ defaultSettings.keyboardShortcuts.decrementCount }/>
            <KeyItem name='Reset count'
                     value={ resetCountShortcut }
                     onChange={ setResetCountShortcut }
                     showReset={ true }
                     resetValue={ defaultSettings.keyboardShortcuts.resetCount }/>
            <KeyItem name='Manual mode'
                     value={ manualModeShortcut }
                     onChange={ setManualModeShortcut }
                     showReset={ true }
                     resetValue={ defaultSettings.keyboardShortcuts.manualModeShortcut }/>
            <KeyItem name='File watcher mode'
                     value={ fileWatcherModeShortcut }
                     onChange={ setFileWatcherModeShortcut }
                     showReset={ true }
                     resetValue={ defaultSettings.keyboardShortcuts.fileWatcherModeShortcut }/>
        </div>
    )
}
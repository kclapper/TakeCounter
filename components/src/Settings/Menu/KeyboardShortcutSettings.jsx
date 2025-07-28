import React from 'react';

import { useSetting } from '..';

import { KeyItem } from '../Items';

export function KeyboardShortcutSettings({}) {
    const [incrementCountShortcut, setIncrementCountShortcut] = useSetting('keyboardShortcuts', 'incrementCount');
    const [decrementCountShortcut, setDecrementCountShortcut] = useSetting('keyboardShortcuts', 'decrementCount');
    const [resetCountShortcut, setResetCountShortcut] = useSetting('keyboardShortcuts', 'resetCount');

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
                    onChange={ setIncrementCountShortcut } />
            <KeyItem name='Decrement count'
                    value={ decrementCountShortcut }
                    onChange={ setDecrementCountShortcut }/>
            <KeyItem name='Reset count'
                    value={ resetCountShortcut }
                    onChange={ setResetCountShortcut }/>
        </div>
    )
}
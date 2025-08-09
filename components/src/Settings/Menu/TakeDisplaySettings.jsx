import React from 'react';

import { useSetting } from '..';
import { TextItem , BooleanItem } from '../Items/index';

export function TakeDisplaySettings() {
const [takeTextPrefix, setTakePrefix] = useSetting( 'TakeDisplaySettings', 'takeTextPrefix' );
const [showTakePrefix, setShowTakePrefix] = useSetting( 'TakeDisplaySettings', 'showTakePrefix' );
const [showTakeButtons, setShowTakeButtons] = useSetting( 'TakeDisplaySettings', 'showTakeButtons' );


    if (window.settings === undefined) {
        return undefined;
    }

   return (
        <div>
            <h4 className='row border-bottom mt-3'>
                Take Display
            </h4>
                <TextItem name='Take Display Prefix'
                         value={ takeTextPrefix }
                         onChange={ setTakePrefix }> 
                </TextItem>
                <BooleanItem name = 'Show Take Prefix'
                        value={ showTakePrefix }
                        onChange={ setShowTakePrefix }
                        />
{                <BooleanItem name = 'Show Take Buttons'
                        value={ showTakeButtons }
                        onChange={ setShowTakeButtons }
                        />}
            </div>
            );
}
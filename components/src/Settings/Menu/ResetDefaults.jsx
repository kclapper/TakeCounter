import React, { useCallback } from 'react';

import { useResetter } from '..';
import { Item } from '../Items/Item';
import Button from '../../Button';

export function ResetDefaults({ children }) {
    const resetDefaultSettings = useResetter();

    const handleReset = useCallback(() => {
        document.activeElement.blur();
        resetDefaultSettings();
    }, [resetDefaultSettings]);

    return (
        <div className='row justify-content-start border-top mt-3 pt-2'>
            <Item name='Reset' description={ children }>
                <div className='d-flex'>
                    <div className='flex-grow-1' />
                    <Button className='btn btn-outline-secondary'
                            onClick={ handleReset }>
                        Reset Default Settings
                    </Button>
                </div>
            </Item>
        </div>
    );
}
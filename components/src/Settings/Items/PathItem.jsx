import React from 'react';
import { useCallback } from 'react';

import { Item } from './Item';
import { ClearButton, clearButtonParentStyleClassName } from './ClearButton';

import * as styles from './ClearButton.module.css';

export function PathItem({ name, value, onChange, children }) {
  const handlePathSelect = useCallback((path) => {
    onChange(path);
  }, [ onChange ]);

  const handleClick = useCallback(() => {
    window.settings.handleDialogResponse(handlePathSelect);
    window.settings.showDialog({ properties: ['openDirectory'] });
  }, []);

  const handleClear = useCallback(() => {
    onChange('');
  }, [ onChange ]);

  return (
    <Item name={ name } description={ children }>
        <div className={ clearButtonParentStyleClassName + ' input-group' }>
          <input type="text" 
                 readOnly 
                 value={ value }
                 className='form-control overflow-x-scroll' />
          <ClearButton onClick={ handleClear } />
          <div className="btn btn-outline-secondary"
               onClick={ handleClick }>
            Browse
          </div>
        </div>
    </Item>
  );
}
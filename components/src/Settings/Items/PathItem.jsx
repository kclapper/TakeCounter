import React from 'react';
import { useCallback } from 'react';

import { Item } from './Item';

export function PathItem({ name, value, onChange, children }) {
  const handlePathSelect = useCallback((path) => {
    onChange(path);
  }, [ onChange ]);

  const handleClick = useCallback(() => {
    window.settings.handleDialogResponse(handlePathSelect);
    window.settings.showDialog({ properties: ['openDirectory'] });
  }, []);

  return (
    <Item name={ name } description={ children }>
        <div className='input-group'>
          <input type="text" 
                readOnly 
                value={ value }
             className="form-control overflow-x-scroll" />
          <div className="btn btn-outline-secondary"
                  onClick={ handleClick }>
            Browse
          </div>
        </div>
    </Item>
  );
}
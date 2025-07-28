import React from 'react';
import { useCallback } from 'react';

import { Item } from './Item';

export function BooleanItem({ name, value, onChange, children }) {

  const handleChange = useCallback((event) => {
    onChange(Boolean(event.target.checked));
  }, [onChange]);

  return (
    <Item name={ name } description={ children }>
      <div className="form-check form-switch form-check-reverse me-2">
        <input className="form-check-input"
                role="switch"
                onChange={ handleChange }
                checked={ value }
                type="checkbox" 
                id="flexSwitchCheckReverse" 
                style={{ transform: 'scale(1.5)' }} />
      </div>
    </Item>
  );
}

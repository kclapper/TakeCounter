import React from 'react';
import { useCallback } from 'react';

import { Item } from './Item';

export function DropdownItem({ name, options, value, onChange, children }) {
  const handleChange = useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);

  const selectOptions = options.map((option) => {
    return <option value={ option.value }
                   key={option.value}>
                    { option.name }
           </option>;
  });

  return (
    <Item name={ name } description={ children }>
      <select className="form-select" 
              aria-label={ name } 
              onChange={ handleChange }
              value={value} >
        { selectOptions }
      </select>
    </Item>
  );
}

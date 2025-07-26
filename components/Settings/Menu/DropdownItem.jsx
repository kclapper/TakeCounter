import React from 'react';
import { useCallback } from 'react';

export default function DropdownItem({ name, options, value, onChange }) {
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
    <div className='row justify-content-start'>
      <h5 className='col-6 my-auto'>
        { name }
      </h5>
      <div className='col-6'>
        <select className="form-select" 
                aria-label={ name } 
                onChange={ handleChange }
                value={value} >
          { selectOptions }
        </select>
      </div>
    </div>
  );
}

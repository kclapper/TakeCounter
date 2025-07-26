import React from 'react';
import { useCallback } from 'react';

export default function BooleanItem({ name, value, onChange }) {

  const handleChange = useCallback((event) => {
    onChange(Boolean(event.target.checked));
  }, [onChange]);

  return (
    <div className='row justify-content-start'>
      <h5 className='col-6 my-auto'>
        { name }
      </h5>
      <div className='col-6'>
        <div className="form-check form-switch form-check-reverse me-2">
          <input className="form-check-input"
                  role="switch"
                  onChange={ handleChange }
                  checked={ value }
                  type="checkbox" 
                  id="flexSwitchCheckReverse" 
                  style={{ transform: 'scale(1.5)' }} />
        </div>
      </div>
    </div>
  );
}

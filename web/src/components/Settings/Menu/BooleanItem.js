import React from 'react';
import { useCallback } from 'react';

export default function BooleanItem({ name, value, onChange }) {

  const handleChange = useCallback((event) => {
    onChange(Boolean(event.target.checked));
  }, [onChange]);

  return <div className="form-check form-switch form-check-reverse">
            <input className="form-check-input"
                   role="switch"
                   onChange={ handleChange }
                   checked={ value }
                   type="checkbox" id="flexSwitchCheckReverse" />
            <label className="form-check-label"
                   htmlFor="flexSwitchCheckReverse">
              { name }
            </label>
         </div>
}

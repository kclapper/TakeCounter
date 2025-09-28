import React from 'react';
import { useCallback, useState } from 'react';

import InputDisplay from '../../Input/InputDisplay';
import { Item } from './Item';

function validateInput(input, event) {
  const invalidCharacters = /(\n)[^\n]/;

  const isValid = input.search(invalidCharacters) === -1;
  if (!isValid) {
    event.target.blur();
  }
    
  return isValid;
}

export function TextItem({ name, value, onChange, showReset=false, resetValue="", children }) {
  const [ reading, setReading ] = useState(false);
  const [ display, setDisplay ] = useState(value);

  const handleFocus = useCallback(() => {
    setDisplay(value);
    setReading(true);
  }, [value, setDisplay, setReading]);

  const handleBlur = useCallback(() => {
    onChange(display);
    setReading(false);
  }, [setReading, display, onChange]);

  const handleInput = useCallback((input) => {
    setDisplay(input);
  }, [setDisplay]);

  const handleReset = useCallback(() => {
    onChange(resetValue);
  }, [onChange]);

  let inputDisplayClassName = 'p-1 ';
  inputDisplayClassName += showReset ? 'form-control' : 'border rounded';

  let itemContent = (
    <InputDisplay className={ inputDisplayClassName }
                  display={ reading ? display : value }
                  onInput={ handleInput }
                  onFocus={ handleFocus }
                  onBlur={ handleBlur }
                  validateInput={ validateInput }
                  style={{ minWidth: "20%" }}/>
  );

  if (showReset) {
    itemContent = (
      <div className='input-group'>
        {itemContent}
        <div className="btn btn-outline-secondary"
             onClick={handleReset}>
          Reset
        </div>
      </div>
    );
  }

  return (
    <Item name={ name } description={ children }>
      {itemContent}
    </Item>
  );
}

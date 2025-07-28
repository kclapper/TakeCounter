import React from 'react';
import { useCallback, useState } from 'react';

import InputDisplay from '../../Input/InputDisplay';
import { Item } from './Item';

function validateInput(input, event) {
  const invalidCharacters = /(\n)[^\n]/;

  const isValid = input.search(invalidCharacters) === -1;
  console.log(event);
  console.log(input);
  console.log(input.search(invalidCharacters));
  console.log(input.match(invalidCharacters));
  if (!isValid) {
    event.target.blur();
  }
  console.log(isValid);
    
  return isValid;
}

export function TextItem({ name, value, onChange, children }) {
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

  return (
    <Item name={ name } description={ children }>
      <InputDisplay className='border rounded p-1'
                    display={ reading ? display : value }
                    onInput={ handleInput }
                    onFocus={ handleFocus }
                    onBlur={ handleBlur }
                    validateInput={ validateInput }
                    style={{ minWidth: "20%" }}/>
    </Item>
  );
}

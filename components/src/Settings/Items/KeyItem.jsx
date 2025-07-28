import React from 'react';
import { useState, useCallback, useEffect } from 'react';

import { setIsOnlyModifiers, setToShortcut } from '../../util/shortcuts';

import InputDisplay from '../../Input/InputDisplay';
import { Item } from './Item';

const newShortcut = new Set();

function keyIsInvalid(key) {
  console.log(key);
  switch (key) {
    case 'Escape':
    case 'Enter':
    case ' ':
    case 'Backspace':
      return true;
    default:
      return false;
  }
}

export function KeyItem({ name, value, onChange, children }) {
  const [ reading, setReading ] = useState(false);
  const [ display, setDisplay ] = useState(value);

  useEffect(() => {
    const handler = (event) => {
      if (keyIsInvalid(event.code)) {
        event.target.blur();
        return;
      }

      if (newShortcut.size >= 5) {
        event.target.blur();
        return;
      }

      newShortcut.add(event.code);
      setDisplay(setToShortcut(newShortcut));
    };

    if (reading) {
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [reading, setDisplay]);

  const handleFocus = useCallback(() => {
    setDisplay(value);
    setReading(true);
  }, [setReading, setDisplay, value]);

  const handleBlur = useCallback(() => {
    setReading(false);

    if (newShortcut.size !== 0 && !setIsOnlyModifiers(newShortcut)) {
      onChange(setToShortcut(newShortcut));
    }

    newShortcut.clear();
    setDisplay(value);
  }, [setReading, onChange, setDisplay, value]);

  return (
    <Item name={ name } description={ children }>
      <InputDisplay className='border rounded p-1'
                    display={ reading ? display : value }
                    onInput={ () => {} }
                    onFocus={ handleFocus }
                    onBlur={ handleBlur }
                    style={{ minWidth: "20%" }}/>
    </Item>
  );
};

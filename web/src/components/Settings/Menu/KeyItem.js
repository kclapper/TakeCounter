import React from 'react';
import { useState, useCallback, useEffect } from 'react';

import { setToShortcut } from '../../../util/shortcuts';

import InputDisplay from '../../InputDisplay';

const newShortcut = new Set();

export default function KeyItem({ name, value, onChange }) {
  const [ reading, setReading ] = useState(false);
  const [ display, setDisplay ] = useState(value);

  useEffect(() => {
    const handler = (event) => {
      newShortcut.add(event.key);
      setDisplay(setToShortcut(newShortcut));
    };

    if (reading) {
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [reading, setDisplay]);

  const handleFocus = useCallback(() => {
    setReading(true);
  }, [setReading]);

  const handleBlur = useCallback(() => {
    setReading(false);
    onChange(setToShortcut(newShortcut));
    newShortcut.clear();

  }, [setReading, onChange]);

  return <div className='row justify-content-start'>
           <h5 className='col'>
             { name }
           </h5>
           <InputDisplay className='col border p-1'
                         display={ reading ? display : value }
                         onInput={ () => {} }
                         onFocus={ handleFocus }
                         onBlur={ handleBlur }
                         style={{ minWidth: "20%" }}/>
         </div>
};

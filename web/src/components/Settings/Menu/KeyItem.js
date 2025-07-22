import React from 'react';
import { useState, useCallback, useEffect } from 'react';

import { setToShortcut } from '../../../util/shortcuts';

import InputDisplay from '../../Input/InputDisplay';

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

    if (newShortcut.size !== 0) {
      onChange(setToShortcut(newShortcut));
      newShortcut.clear();
      setDisplay(value);
    }
  }, [setReading, onChange, setDisplay]);

  return <div className='row justify-content-start'>
           <h5 className='col-6 my-auto'>
             { name }
           </h5>
           <InputDisplay className='col-6 border rounded p-1'
                         display={ reading ? display : value }
                         onInput={ () => {} }
                         onFocus={ handleFocus }
                         onBlur={ handleBlur }
                         style={{ minWidth: "20%" }}/>
         </div>
};

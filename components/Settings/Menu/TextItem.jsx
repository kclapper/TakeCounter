import React from 'react';
import { useCallback, useState } from 'react';

import InputDisplay from '../../Input/InputDisplay';

export default function TextItem({ name, value, onChange }) {
  const [ reading, setReading ] = useState(false);
  const [ display, setDisplay ] = useState(value);

  const handleFocus = useCallback(() => {
    setReading(true);
  }, [setReading]);

  const handleBlur = useCallback(() => {
    setReading(false);
    onChange(display);
    setDisplay(value);
  }, [setReading, display, onChange, setDisplay]);

  const handleInput = useCallback((input) => {
    setDisplay(input);
  }, [setDisplay]);

  return (
    <div className='row justify-content-start'>
      <h5 className='col-6 my-auto'>
        { name }
      </h5>
      <InputDisplay className='col-6 border rounded p-1'
                    display={ reading ? display : value }
                    onInput={ handleInput }
                    onFocus={ handleFocus }
                    onBlur={ handleBlur }
                    style={{ minWidth: "20%" }}/>
    </div>
  );
}

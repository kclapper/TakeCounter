import React from 'react';

import InputDisplay from '../InputDisplay';

export default function TakeInputDisplay({ display, onInput }) {
  const inputIsValid = (input) => Number.isInteger(Number(input));

  const handleInput = (input) => onInput(Number(input));

  return <InputDisplay
           className="display-1"
           validateInput={ inputIsValid }
           onInput={ handleInput }
           display={ display }
         />
}

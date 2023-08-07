import React from 'react';

import InputDisplay from '../Input/InputDisplay';

export default function TakeInputDisplay({ display, onInput }) {
  const inputIsValid = (input) => {
    try {
      return BigInt(input);
    } catch {
      return false;
    }
  };

  const handleInput = (input) => onInput(BigInt(input));

  return <InputDisplay
           className="display-1"
           validateInput={ inputIsValid }
           onInput={ handleInput }
           display={ display }
         />
}

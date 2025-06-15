import React from 'react';

import InputDisplay from '../Input/InputDisplay';
import { isValidCount, getValidatedCount } from '../../util';

export default function TakeInputDisplay({ display, onInput }) {
  const handleInput = (input) => {
    onInput(getValidatedCount(input))
  };

  return <InputDisplay
           className="display-1"
           validateInput={ isValidCount }
           onInput={ handleInput }
           display={ display }
         />
}

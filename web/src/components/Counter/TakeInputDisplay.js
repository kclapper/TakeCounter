import React, { useCallback, useState } from 'react';

import InputDisplay from '../Input/InputDisplay';
import { isValidCount, getValidatedCount } from '../../util';

export default function TakeInputDisplay({ take, onInput }) {
  const [showEmpty, setShowEmpty] = useState(false);

  const handleInput = useCallback((input) => {
    console.log(input);
    if (input.trim().length === 0) {
      setShowEmpty(true);
      return;
    }

    if (!isValidCount(input)) {
      return;
    }

    setShowEmpty(false);
    onInput(getValidatedCount(input))
  }, [onInput, setShowEmpty]);

  const handleOnBlur = useCallback(() => {
    setShowEmpty(false);
  }, [setShowEmpty]);

  return <InputDisplay
           className="display-1"
           onInput={ handleInput }
           display={ showEmpty ? '' : take }
           onBlur={ handleOnBlur }
         />
}

import React from 'react';
import { useRef, useCallback, useState, useEffect } from 'react';

import ExpandingInput from './ExpandingInput';

export default function InputDisplay(props) {
  const {
    display,
    onInput,
    validateInput,
    ...restProps
  } = props;

  const inputDisplay = useRef(null);
  const [caretOffset, setCaretOffset] = useState(1);

  useEffect(() => {
    if (inputDisplay.current !== null) {
      inputDisplay.current.innerText = display;
    }
    const selection = window.getSelection();
    for (let i = 0; i < caretOffset; i++) {
      selection.modify("move", "right", "character");
    }
  }, [inputDisplay, display, caretOffset]);

  const handleValidation = useCallback((event) => {
    if (validateInput === undefined) {
      return;
    }
    if (!validateInput(event.data)) {
      event.preventDefault();
    }
  }, [validateInput]);

  const handleInput = useCallback((event) => {
    if (event.nativeEvent.inputType === "insertFromPaste") {
      return;
    }

    const selection = window.getSelection();
    const caretOffset = selection.anchorOffset;
    setCaretOffset(caretOffset);

    onInput(event.target.innerText);
  }, [onInput, setCaretOffset]);

  const handlePaste = useCallback((event) => {
    const text = event.clipboardData.getData('text');
    if (validateInput !== undefined) {
      if (validateInput(text)) {
        onInput(text);
      }
    } else {
      onInput(text);
    }
    event.preventDefault();
  }, [validateInput, onInput]);

  return <ExpandingInput
           ref={ inputDisplay }
           onBeforeInput={ handleValidation }
           onPaste={ handlePaste }
           onInput={ handleInput }
           { ...restProps } />
}

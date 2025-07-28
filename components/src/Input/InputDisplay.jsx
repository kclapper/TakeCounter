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

    if (document.activeElement !== inputDisplay.current) {
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return;
    }

    for (let i = 0; i < caretOffset; i++) {
      selection.modify("move", "right", "character");
    }
  }, [inputDisplay, display, caretOffset]);

  const handleValidation = useCallback((event) => {
    if (validateInput === undefined) {
      return;
    }

    const currentText = event.target.innerText;

    const startIndex = event.currentTarget.selectionStart || 0;
    const endIndex = event.currentTarget.selectionEnd || startIndex;

    const nextInput = `${currentText.slice(0, startIndex)}${event.data}${currentText.slice(endIndex)}`;
    
    if (!validateInput(nextInput, event)) {
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

    onInput(event.target.innerText, event);
  }, [onInput, setCaretOffset]);

  const handlePaste = useCallback((event) => {
    const text = event.clipboardData.getData('text');
    if (validateInput !== undefined) {
      if (validateInput(text)) {
        onInput(text, event);
      }
    } else {
      onInput(text, event);
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

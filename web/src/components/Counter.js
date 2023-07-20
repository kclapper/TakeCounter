import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

import { setMinimum } from '../util';
import { useShortcut } from '../util/shortcuts';
import { useSettings } from '../util/settings';

import Button from './Button';

const fontSize = "7em";

function Counter() {
  const takeInput = useRef(null);
  const [caretOffset, setCaretOffset] = useState(1);

  const [count, setRawCount] = useState(1);
  const setCount = setMinimum(setRawCount);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  const decrementCount = useCallback(() => {
    setCount(count - 1);
  }, [count, setCount])
  const resetCount = useCallback(() => {
    setCount(1);
  }, [setCount]);

  useEffect(() => {
    if (takeInput.current !== null) {
      takeInput.current.innerText = count;
    }

    document.title = "Take " + count;

    // HACK: This feels like an ugly way to reset the cursor
    // position when someone types in a take number.
    const selection = window.getSelection();
    for (let i = 0; i < caretOffset; i++) {
      selection.modify("move", "right", "character");
    }
  }, [count, takeInput, caretOffset]);

  const shortcuts = useSettings("keyboardShortcuts");

  useShortcut(incrementCount, shortcuts.incrementCount, "counter.handleIncrement");
  useShortcut(decrementCount, shortcuts.decrementCount, "counter.handleDecrement");
  useShortcut(resetCount, shortcuts.resetCount, "counter.handleReset");

  const validateNewCount = useCallback((event) => {
    if (!Number.isInteger(Number(event.data))) {
      event.preventDefault();
    }
  }, []);

  const inputCount = useCallback((event) => {
    const selection = window.getSelection();
    const caretOffset = selection.anchorOffset;
    setCaretOffset(caretOffset);

    setRawCount(Number(event.target.innerText));
  }, [setRawCount]);

  return <div className='d-flex flex-column align-items-center justify-content-center' style={{ flexGrow: 1 }}>
           <div style={{ flexGrow: 0.75 }}/>
           <div className="d-flex">
             <h1 className="" style={{ fontSize, marginRight: "0.5ch" }}>
               Take
             </h1>
             <div ref={ takeInput }
                 className="h1"
                 contentEditable="true"
                 onBeforeInput={ validateNewCount }
                 onInput={ inputCount }
                 style={{
                   outline: "none",
                   fontSize,
                 }} />
           </div>
           <div className=''>
             <Button onClick={ decrementCount }
                     tooltip={ shortcuts.decrementCount }
                     tooltipPlacement="bottom">
               -
             </Button>
             <Button onClick={ resetCount }
                     tooltip={ shortcuts.resetCount }
                     tooltipPlacement="bottom">
               reset
             </Button>
             <Button onClick={ incrementCount }
                     tooltip={ shortcuts.incrementCount }
                     tooltipPlacement="bottom">
               +
             </Button>
           </div>
           <div style={{ flexGrow: 1 }}/>
         </div>
}

export default Counter;
